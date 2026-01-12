import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { Loan } from '../loans/entities/loan.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferStatusDto } from './dto/update-offer-status.dto';

/**
 * Service for managing loan offers
 * Handles offer generation, status updates, and calculations
 */
@Injectable()
export class OffersService {
  private readonly logger = new Logger(OffersService.name);

  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,
  ) {}

  /**
   * Create a new loan offer with automatic calculations
   */
  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    const { loanId, requiredDocuments, ...offerData } = createOfferDto;

    this.logger.log(`Creating offer for loan: ${loanId}`);

    // Verify loan exists and is eligible for offers
    const loan = await this.loanRepository.findOne({
      where: { id: loanId },
      relations: ['vehicle']
    });

    if (!loan) {
      throw new NotFoundException(`Loan with ID ${loanId} not found`);
    }

    if (!['Approved', 'Under Review'].includes(loan.status)) {
      throw new BadRequestException(`Cannot create offers for loans with status: ${loan.status}`);
    }

    // Generate unique offer number
    const offerNumber = await this.generateOfferNumber();

    // Prepare offer data with calculations
    const offerWithCalculations = await this.calculateOfferTerms({
      ...offerData,
      loanId,
      offerNumber,
      currency: offerData.currency || 'NGN',
      offerType: offerData.offerType || 'Standard',
      priority: offerData.priority || 'Medium',
      validityDays: offerData.validityDays || 7,
      interestRateType: offerData.interestRateType || 'Fixed',
      requiredDownPayment: offerData.requiredDownPayment || 0,
      processingFee: offerData.processingFee || this.calculateProcessingFee(offerData.approvedAmount),
      insurancePremium: offerData.insurancePremium || 0,
      otherFees: offerData.otherFees || 0,
      latePaymentPenaltyRate: offerData.latePaymentPenaltyRate || 2.5,
      gracePeriodDays: offerData.gracePeriodDays || 5,
      employmentVerificationRequired: offerData.employmentVerificationRequired ?? true,
      incomeVerificationRequired: offerData.incomeVerificationRequired ?? true,
      riskBasedPricing: offerData.riskBasedPricing ?? true,
      isPromotional: offerData.isPromotional || false,
      promotionalDiscount: offerData.promotionalDiscount || 0,
      requiredDocuments: requiredDocuments ? JSON.stringify(requiredDocuments) : null,
      expiresAt: new Date(Date.now() + ((offerData.validityDays || 7) * 24 * 60 * 60 * 1000))
    }, loan);

    // Create and save offer
    const offer = this.offerRepository.create(offerWithCalculations);
    const savedOffer = await this.offerRepository.save(offer);

    this.logger.log(`Created offer: ${savedOffer.offerNumber} for loan: ${loanId}`);
    return savedOffer;
  }

  /**
   * Find all offers with optional filtering
   */
  async findAll(loanId?: string): Promise<Offer[]> {
    this.logger.log(`Fetching offers${loanId ? ` for loan: ${loanId}` : ''}`);

    const query = this.offerRepository.createQueryBuilder('offer')
      .leftJoinAndSelect('offer.loan', 'loan')
      .leftJoinAndSelect('loan.vehicle', 'vehicle')
      .orderBy('offer.createdAt', 'DESC');

    if (loanId) {
      query.where('offer.loanId = :loanId', { loanId });
    }

    const offers = await query.getMany();

    // Process required documents from JSON string
    return offers.map(offer => ({
      ...offer,
      requiredDocuments: offer.requiredDocuments ? JSON.parse(offer.requiredDocuments) : null,
    }));
  }

  /**
   * Find a single offer by ID
   */
  async findOne(id: string): Promise<Offer> {
    this.logger.log(`Fetching offer with ID: ${id}`);

    const offer = await this.offerRepository.findOne({
      where: { id },
      relations: ['loan', 'loan.vehicle'],
    });

    if (!offer) {
      throw new NotFoundException(`Offer with ID ${id} not found`);
    }

    // Parse required documents from JSON string
    if (offer.requiredDocuments) {
      try {
        offer.requiredDocuments = JSON.parse(offer.requiredDocuments as string) as any;
      } catch (error) {
        this.logger.warn(`Failed to parse required documents for offer ${id}: ${error.message}`);
      }
    }

    return offer;
  }

  /**
   * Update offer status (accept/reject/withdraw)
   */
  async updateStatus(id: string, updateStatusDto: UpdateOfferStatusDto): Promise<Offer> {
    this.logger.log(`Updating offer status for ID: ${id}`);

    const offer = await this.findOne(id);

    // Validate status transition
    if (!this.isValidStatusTransition(offer.status, updateStatusDto.status)) {
      throw new BadRequestException(`Cannot change status from ${offer.status} to ${updateStatusDto.status}`);
    }

    // Update offer status and related fields
    Object.assign(offer, {
      status: updateStatusDto.status,
      rejectionReason: updateStatusDto.rejectionReason,
      internalNotes: updateStatusDto.notes || offer.internalNotes,
      acceptedAt: updateStatusDto.status === 'Accepted' ? new Date() : offer.acceptedAt,
      rejectedAt: updateStatusDto.status === 'Rejected' ? new Date() : offer.rejectedAt,
    });

    const updatedOffer = await this.offerRepository.save(offer);

    this.logger.log(`Updated offer status for ${id}: ${updateStatusDto.status}`);
    return updatedOffer;
  }

  /**
   * Delete an offer
   */
  async remove(id: string): Promise<void> {
    this.logger.log(`Deleting offer with ID: ${id}`);

    const offer = await this.findOne(id);

    // Only allow deletion of certain statuses
    if (['Accepted', 'Disbursed'].includes(offer.status)) {
      throw new BadRequestException('Cannot delete accepted or disbursed offers');
    }

    await this.offerRepository.remove(offer);
    this.logger.log(`Successfully deleted offer with ID: ${id}`);
  }

  /**
   * Get offer statistics
   */
  async getStats(): Promise<{
    totalOffers: number;
    byStatus: Record<string, number>;
    byOfferType: Record<string, number>;
    averageAmount: number;
    averageInterestRate: number;
    acceptanceRate: number;
  }> {
    this.logger.log('Fetching offer statistics');

    const totalOffers = await this.offerRepository.count();

    // Statistics by status
    const statusStats = await this.offerRepository
      .createQueryBuilder('offer')
      .select('offer.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('offer.status')
      .getRawMany();

    // Statistics by offer type
    const typeStats = await this.offerRepository
      .createQueryBuilder('offer')
      .select('offer.offerType', 'offerType')
      .addSelect('COUNT(*)', 'count')
      .groupBy('offer.offerType')
      .getRawMany();

    // Average statistics
    const averageStats = await this.offerRepository
      .createQueryBuilder('offer')
      .select('AVG(CAST(offer.approvedAmount AS FLOAT))', 'avgAmount')
      .addSelect('AVG(CAST(offer.interestRate AS FLOAT))', 'avgInterestRate')
      .getRawOne();

    // Acceptance rate calculation
    const acceptedCount = await this.offerRepository.count({ where: { status: 'Accepted' } });
    const totalActiveOffers = await this.offerRepository.count({
      where: [
        { status: 'Accepted' },
        { status: 'Rejected' },
        { status: 'Expired' }
      ]
    });

    const acceptanceRate = totalActiveOffers > 0 ? (acceptedCount / totalActiveOffers) * 100 : 0;

    return {
      totalOffers,
      byStatus: statusStats.reduce((acc, stat) => {
        acc[stat.status] = parseInt(stat.count);
        return acc;
      }, {}),
      byOfferType: typeStats.reduce((acc, stat) => {
        acc[stat.offerType] = parseInt(stat.count);
        return acc;
      }, {}),
      averageAmount: parseFloat(averageStats.avgAmount) || 0,
      averageInterestRate: parseFloat(averageStats.avgInterestRate) || 0,
      acceptanceRate: Math.round(acceptanceRate * 100) / 100,
    };
  }

  /**
   * Generate unique offer number
   */
  private async generateOfferNumber(): Promise<string> {
    const today = new Date();
    const datePrefix = today.toISOString().slice(0, 10).replace(/-/g, '');

    // Find the count of offers created today
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

    const todayCount = await this.offerRepository.count({
      where: {
        createdAt: {
          gte: todayStart,
          lt: todayEnd,
        } as any
      }
    });

    const sequenceNumber = (todayCount + 1).toString().padStart(3, '0');
    return `OF${datePrefix}${sequenceNumber}`;
  }

  /**
   * Calculate loan offer terms including monthly payment and total amounts
   */
  private async calculateOfferTerms(offerData: any, loan: Loan): Promise<any> {
    const { approvedAmount, termMonths, interestRate, processingFee, insurancePremium, otherFees } = offerData;

    // Calculate monthly interest rate
    const monthlyRate = interestRate / 100 / 12;

    // Calculate monthly payment using loan payment formula
    const monthlyPayment = approvedAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
      (Math.pow(1 + monthlyRate, termMonths) - 1);

    // Calculate total payable amount
    const totalPayableAmount = monthlyPayment * termMonths;

    // Calculate total interest
    const totalInterest = totalPayableAmount - approvedAmount;

    // Calculate APR (including fees)
    const totalFees = processingFee + insurancePremium + otherFees;
    const apr = this.calculateAPR(approvedAmount, monthlyPayment, termMonths, totalFees);

    return {
      ...offerData,
      monthlyPayment: Math.round(monthlyPayment),
      totalPayableAmount: Math.round(totalPayableAmount),
      totalInterest: Math.round(totalInterest),
      apr: Math.round(apr * 100) / 100,
    };
  }

  /**
   * Calculate APR including fees
   */
  private calculateAPR(principal: number, monthlyPayment: number, termMonths: number, totalFees: number): number {
    // Simplified APR calculation - in practice, use more sophisticated method
    const totalPaid = (monthlyPayment * termMonths) + totalFees;
    const totalInterestAndFees = totalPaid - principal;
    const annualInterestAndFees = (totalInterestAndFees / (termMonths / 12));
    return (annualInterestAndFees / principal) * 100;
  }

  /**
   * Calculate processing fee based on loan amount
   */
  private calculateProcessingFee(amount: number): number {
    // 1% processing fee with minimum and maximum
    const feeRate = 0.01;
    const fee = amount * feeRate;
    const minFee = 50000; // 50k NGN minimum
    const maxFee = 200000; // 200k NGN maximum

    return Math.max(minFee, Math.min(fee, maxFee));
  }

  /**
   * Validate status transitions
   */
  private isValidStatusTransition(currentStatus: string, newStatus: string): boolean {
    const validTransitions: Record<string, string[]> = {
      'Draft': ['Active', 'Cancelled'],
      'Active': ['Accepted', 'Rejected', 'Expired', 'Withdrawn'],
      'Accepted': ['Cancelled'], // Only if not yet disbursed
      'Rejected': [], // Final state
      'Expired': ['Active'], // Can reactivate
      'Withdrawn': ['Active'], // Can reactivate
      'Cancelled': [], // Final state
    };

    return validTransitions[currentStatus]?.includes(newStatus) || false;
  }
}
