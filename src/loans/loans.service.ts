import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Loan } from './entities/loan.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanStatusDto } from './dto/update-loan-status.dto';
import { LoanQueryDto } from './dto/loan-query.dto';

/**
 * Service for managing loan applications
 * Handles loan submission, eligibility checks, status updates, and processing
 */
@Injectable()
export class LoansService {
  private readonly logger = new Logger(LoansService.name);

  constructor(
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  /**
   * Submit a new loan application with automatic eligibility check
   */
  async create(createLoanDto: CreateLoanDto): Promise<Loan> {
    const { vehicleId, supportingDocuments, applicantDateOfBirth, ...loanData } = createLoanDto;

    this.logger.log(`Processing loan application for vehicle: ${vehicleId}`);

    // Verify vehicle exists
    const vehicle = await this.vehicleRepository.findOne({
      where: { id: vehicleId }
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${vehicleId} not found`);
    }

    // Generate unique application number
    const applicationNumber = await this.generateApplicationNumber();

    // Prepare loan data
    const loanApplicationData = {
      ...loanData,
      vehicleId,
      applicationNumber,
      applicantDateOfBirth: new Date(applicantDateOfBirth),
      currency: loanData.currency || 'NGN',
      downPayment: loanData.downPayment || 0,
      existingDebtObligations: loanData.existingDebtObligations || 0,
      loanPurpose: loanData.loanPurpose || 'Vehicle Purchase',
      supportingDocuments: supportingDocuments ? JSON.stringify(supportingDocuments) : null,
      submittedAt: new Date(),
    };

    // Create initial loan application
    let loan = this.loanRepository.create(loanApplicationData);
    loan = await this.loanRepository.save(loan);

    this.logger.log(`Created loan application: ${loan.applicationNumber}`);

    // Perform eligibility check
    const eligibilityResult = await this.performEligibilityCheck(loan, vehicle);

    // Update loan with eligibility results
    Object.assign(loan, eligibilityResult);
    const updatedLoan = await this.loanRepository.save(loan);

    this.logger.log(`Completed eligibility check for loan: ${loan.applicationNumber}, status: ${updatedLoan.eligibilityStatus}`);

    return updatedLoan;
  }

  /**
   * Find all loans with optional filtering and pagination
   */
  async findAll(queryDto: LoanQueryDto): Promise<{
    data: Loan[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      ...filters
    } = queryDto;

    this.logger.log(`Fetching loans with filters: ${JSON.stringify(filters)}`);

    const queryBuilder = this.loanRepository.createQueryBuilder('loan')
      .leftJoinAndSelect('loan.vehicle', 'vehicle')
      .leftJoinAndSelect('loan.offers', 'offers');

    // Apply filters
    this.applyFilters(queryBuilder, filters);

    // Apply sorting
    queryBuilder.orderBy(`loan.${sortBy}`, sortOrder);

    // Apply pagination
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    // Execute query
    const [loans, total] = await queryBuilder.getManyAndCount();

    // Process supporting documents from JSON string
    const processedLoans = loans.map(loan => ({
      ...loan,
      supportingDocuments: loan.supportingDocuments ? JSON.parse(loan.supportingDocuments) : null,
    }));

    const totalPages = Math.ceil(total / limit);

    this.logger.log(`Found ${total} loans, returning page ${page} of ${totalPages}`);

    return {
      data: processedLoans,
      total,
      page,
      limit,
      totalPages,
    };
  }

  /**
   * Find a single loan by ID
   */
  async findOne(id: string): Promise<Loan> {
    this.logger.log(`Fetching loan with ID: ${id}`);

    const loan = await this.loanRepository.findOne({
      where: { id },
      relations: ['vehicle', 'offers'],
    });

    if (!loan) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }

    // Parse supporting documents from JSON string
    if (loan.supportingDocuments) {
      try {
        loan.supportingDocuments = JSON.parse(loan.supportingDocuments as string) as any;
      } catch (error) {
        this.logger.warn(`Failed to parse supporting documents for loan ${id}: ${error.message}`);
      }
    }

    return loan;
  }

  /**
   * Find loan by application number
   */
  async findByApplicationNumber(applicationNumber: string): Promise<Loan> {
    this.logger.log(`Fetching loan with application number: ${applicationNumber}`);

    const loan = await this.loanRepository.findOne({
      where: { applicationNumber },
      relations: ['vehicle', 'offers'],
    });

    if (!loan) {
      throw new NotFoundException(`Loan with application number ${applicationNumber} not found`);
    }

    // Parse supporting documents
    if (loan.supportingDocuments) {
      try {
        loan.supportingDocuments = JSON.parse(loan.supportingDocuments as string) as any;
      } catch (error) {
        this.logger.warn(`Failed to parse supporting documents for loan ${applicationNumber}: ${error.message}`);
      }
    }

    return loan;
  }

  /**
   * Update loan application status
   */
  async updateStatus(id: string, updateStatusDto: UpdateLoanStatusDto): Promise<Loan> {
    this.logger.log(`Updating loan status for ID: ${id}`);

    const loan = await this.findOne(id);

    // Update loan status and related fields
    Object.assign(loan, {
      ...updateStatusDto,
      processedAt: ['Approved', 'Rejected', 'Cancelled'].includes(updateStatusDto.status)
        ? new Date() : loan.processedAt,
    });

    // Set disbursement date for disbursed loans
    if (updateStatusDto.status === 'Disbursed' && !loan.actualDisbursementDate) {
      loan.actualDisbursementDate = new Date();
    }

    const updatedLoan = await this.loanRepository.save(loan);

    this.logger.log(`Updated loan status for ${id}: ${updateStatusDto.status}`);
    return updatedLoan;
  }

  /**
   * Delete a loan application
   */
  async remove(id: string): Promise<void> {
    this.logger.log(`Deleting loan with ID: ${id}`);

    const loan = await this.findOne(id);

    // Only allow deletion of certain statuses
    if (['Disbursed', 'Defaulted'].includes(loan.status)) {
      throw new BadRequestException('Cannot delete disbursed or defaulted loans');
    }

    await this.loanRepository.remove(loan);
    this.logger.log(`Successfully deleted loan with ID: ${id}`);
  }

  /**
   * Get loan statistics
   */
  async getStats(): Promise<{
    totalLoans: number;
    byStatus: Record<string, number>;
    byEligibilityStatus: Record<string, number>;
    byRiskCategory: Record<string, number>;
    averageRequestedAmount: number;
    averageMonthlyIncome: number;
    averageProcessingTime: number;
    approvalRate: number;
  }> {
    this.logger.log('Fetching loan statistics');

    const totalLoans = await this.loanRepository.count();

    // Statistics by status
    const statusStats = await this.loanRepository
      .createQueryBuilder('loan')
      .select('loan.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('loan.status')
      .getRawMany();

    // Statistics by eligibility status
    const eligibilityStats = await this.loanRepository
      .createQueryBuilder('loan')
      .select('loan.eligibilityStatus', 'eligibilityStatus')
      .addSelect('COUNT(*)', 'count')
      .groupBy('loan.eligibilityStatus')
      .getRawMany();

    // Statistics by risk category
    const riskStats = await this.loanRepository
      .createQueryBuilder('loan')
      .select('loan.riskCategory', 'riskCategory')
      .addSelect('COUNT(*)', 'count')
      .where('loan.riskCategory IS NOT NULL')
      .groupBy('loan.riskCategory')
      .getRawMany();

    // Average statistics
    const averageStats = await this.loanRepository
      .createQueryBuilder('loan')
      .select('AVG(CAST(loan.requestedAmount AS FLOAT))', 'avgRequestedAmount')
      .addSelect('AVG(CAST(loan.monthlyIncome AS FLOAT))', 'avgMonthlyIncome')
      .getRawOne();

    // Processing time calculation (in hours)
    const processingTimeStats = await this.loanRepository
      .createQueryBuilder('loan')
      .select('AVG(CAST((julianday(loan.processedAt) - julianday(loan.submittedAt)) * 24 AS FLOAT))', 'avgProcessingHours')
      .where('loan.processedAt IS NOT NULL AND loan.submittedAt IS NOT NULL')
      .getRawOne();

    // Approval rate calculation
    const approvedCount = await this.loanRepository.count({ where: { status: 'Approved' } });
    const processedCount = await this.loanRepository.count({
      where: [
        { status: 'Approved' },
        { status: 'Rejected' },
        { status: 'Cancelled' }
      ]
    });

    const approvalRate = processedCount > 0 ? (approvedCount / processedCount) * 100 : 0;

    return {
      totalLoans,
      byStatus: statusStats.reduce((acc, stat) => {
        acc[stat.status] = parseInt(stat.count);
        return acc;
      }, {}),
      byEligibilityStatus: eligibilityStats.reduce((acc, stat) => {
        acc[stat.eligibilityStatus] = parseInt(stat.count);
        return acc;
      }, {}),
      byRiskCategory: riskStats.reduce((acc, stat) => {
        acc[stat.riskCategory] = parseInt(stat.count);
        return acc;
      }, {}),
      averageRequestedAmount: parseFloat(averageStats.avgRequestedAmount) || 0,
      averageMonthlyIncome: parseFloat(averageStats.avgMonthlyIncome) || 0,
      averageProcessingTime: parseFloat(processingTimeStats.avgProcessingHours) || 0,
      approvalRate: Math.round(approvalRate * 100) / 100,
    };
  }

  /**
   * Generate unique application number
   */
  private async generateApplicationNumber(): Promise<string> {
    const today = new Date();
    const datePrefix = today.toISOString().slice(0, 10).replace(/-/g, '');

    // Find the count of applications created today
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

    const todayCount = await this.loanRepository.count({
      where: {
        createdAt: {
          gte: todayStart,
          lt: todayEnd,
        } as any
      }
    });

    const sequenceNumber = (todayCount + 1).toString().padStart(3, '0');
    return `LN${datePrefix}${sequenceNumber}`;
  }

  /**
   * Perform eligibility check for loan application
   */
  private async performEligibilityCheck(loan: Loan, vehicle: Vehicle): Promise<Partial<Loan>> {
    this.logger.log(`Performing eligibility check for loan: ${loan.applicationNumber}`);

    const eligibilityFactors = {
      age: this.checkAgeEligibility(loan.applicantDateOfBirth),
      income: this.checkIncomeEligibility(loan.monthlyIncome),
      employment: this.checkEmploymentEligibility(loan.employmentStatus, loan.yearsAtCurrentJob),
      debtToIncome: this.calculateDebtToIncomeRatio(loan.monthlyIncome, loan.existingDebtObligations),
      loanToValue: await this.calculateLoanToValueRatio(loan.requestedAmount, vehicle),
    };

    // Calculate risk score
    const riskScore = this.calculateRiskScore(eligibilityFactors, loan);
    const riskCategory = this.determineRiskCategory(riskScore);

    // Determine eligibility
    const eligibilityStatus = this.determineEligibilityStatus(eligibilityFactors, riskScore);

    // Update processing stage based on eligibility
    const processingStage = eligibilityStatus === 'Eligible'
      ? 'Document Verification'
      : eligibilityStatus === 'Not Eligible'
        ? 'Initial Review'
        : 'Risk Assessment';

    const result = {
      eligibilityStatus,
      riskScore,
      riskCategory,
      debtToIncomeRatio: eligibilityFactors.debtToIncome,
      loanToValueRatio: eligibilityFactors.loanToValue,
      processingStage,
      status: eligibilityStatus === 'Not Eligible' ? 'Rejected' as const : 'Under Review' as const,
    };

    // Add rejection reason if not eligible
    if (eligibilityStatus === 'Not Eligible') {
      (result as any).rejectionReason = this.generateRejectionReason(eligibilityFactors);
    }

    return result;
  }

  /**
   * Check age eligibility (must be 18-70 years old)
   */
  private checkAgeEligibility(dateOfBirth: Date): { eligible: boolean; age: number } {
    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();

    const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
      ? age - 1 : age;

    return {
      eligible: actualAge >= 18 && actualAge <= 70,
      age: actualAge
    };
  }

  /**
   * Check income eligibility (minimum 100,000 NGN monthly)
   */
  private checkIncomeEligibility(monthlyIncome: number): { eligible: boolean; income: number } {
    const minIncome = 100000; // 100k NGN minimum
    return {
      eligible: monthlyIncome >= minIncome,
      income: monthlyIncome
    };
  }

  /**
   * Check employment eligibility
   */
  private checkEmploymentEligibility(
    status: string,
    yearsAtJob?: number
  ): { eligible: boolean; stable: boolean } {
    const eligibleStatuses = ['Employed', 'Self Employed'];
    const eligible = eligibleStatuses.includes(status);
    const stable = eligible && (yearsAtJob || 0) >= 1; // At least 1 year

    return { eligible, stable };
  }

  /**
   * Calculate debt-to-income ratio
   */
  private calculateDebtToIncomeRatio(monthlyIncome: number, existingDebt: number): number {
    return monthlyIncome > 0 ? existingDebt / monthlyIncome : 1;
  }

  /**
   * Calculate loan-to-value ratio using vehicle valuation
   */
  private async calculateLoanToValueRatio(requestedAmount: number, vehicle: Vehicle): Promise<number> {
    // Estimate vehicle value (simplified)
    const estimatedValue = await this.estimateVehicleValue(vehicle);
    return estimatedValue > 0 ? requestedAmount / estimatedValue : 1;
  }

  /**
   * Estimate vehicle value (simplified method)
   */
  private async estimateVehicleValue(vehicle: Vehicle): Promise<number> {
    // This is a simplified estimation - in a real app, you'd use the ValuationsService
    const currentYear = new Date().getFullYear();
    const age = currentYear - vehicle.year;

    const basePrices: Record<string, number> = {
      'Toyota': 8000000,
      'Honda': 7500000,
      'Hyundai': 6500000,
      'Kia': 6000000,
      'Nissan': 7000000,
      'Ford': 7200000,
    };

    let basePrice = basePrices[vehicle.make] || 5000000;

    // Apply depreciation
    basePrice *= Math.pow(0.85, age);

    // Apply condition adjustment
    const conditionMultiplier = {
      'Excellent': 1.1,
      'Good': 1.0,
      'Fair': 0.85,
      'Poor': 0.7
    };

    basePrice *= conditionMultiplier[vehicle.condition] || 1.0;

    return Math.max(basePrice, 500000); // Minimum 500k NGN
  }

  /**
   * Calculate risk score (0-100, higher = riskier)
   */
  private calculateRiskScore(factors: any, loan: Loan): number {
    let score = 0;

    // Age factor (0-20 points)
    if (factors.age.age < 25 || factors.age.age > 60) score += 15;
    else if (factors.age.age < 30 || factors.age.age > 55) score += 10;
    else score += 5;

    // Income factor (0-25 points)
    if (factors.income.income < 200000) score += 20;
    else if (factors.income.income < 300000) score += 15;
    else if (factors.income.income < 500000) score += 10;
    else score += 5;

    // Employment factor (0-20 points)
    if (!factors.employment.eligible) score += 20;
    else if (!factors.employment.stable) score += 15;
    else if (loan.employmentStatus === 'Self Employed') score += 10;
    else score += 5;

    // Debt-to-income factor (0-20 points)
    if (factors.debtToIncome > 0.5) score += 20;
    else if (factors.debtToIncome > 0.4) score += 15;
    else if (factors.debtToIncome > 0.3) score += 10;
    else score += 5;

    // Loan-to-value factor (0-15 points)
    if (factors.loanToValue > 0.9) score += 15;
    else if (factors.loanToValue > 0.8) score += 12;
    else if (factors.loanToValue > 0.7) score += 8;
    else score += 5;

    return Math.min(score, 100);
  }

  /**
   * Determine risk category based on score
   */
  private determineRiskCategory(riskScore: number): 'Low' | 'Medium' | 'High' | 'Very High' {
    if (riskScore <= 30) return 'Low';
    if (riskScore <= 50) return 'Medium';
    if (riskScore <= 75) return 'High';
    return 'Very High';
  }

  /**
   * Determine overall eligibility status
   */
  private determineEligibilityStatus(
    factors: any,
    riskScore: number
  ): 'Eligible' | 'Not Eligible' | 'Conditionally Eligible' | 'Pending Review' {
    // Must meet basic requirements
    if (!factors.age.eligible || !factors.income.eligible || !factors.employment.eligible) {
      return 'Not Eligible';
    }

    // High risk cases
    if (riskScore > 80 || factors.debtToIncome > 0.6 || factors.loanToValue > 0.95) {
      return 'Not Eligible';
    }

    // Conditional eligibility
    if (riskScore > 60 || factors.debtToIncome > 0.45 || factors.loanToValue > 0.85) {
      return 'Conditionally Eligible';
    }

    // Eligible
    if (riskScore <= 40 && factors.debtToIncome <= 0.35 && factors.loanToValue <= 0.75) {
      return 'Eligible';
    }

    return 'Pending Review';
  }

  /**
   * Generate rejection reason based on failed factors
   */
  private generateRejectionReason(factors: any): string {
    const reasons = [];

    if (!factors.age.eligible) {
      reasons.push('Age requirement not met (18-70 years)');
    }

    if (!factors.income.eligible) {
      reasons.push('Minimum income requirement not met');
    }

    if (!factors.employment.eligible) {
      reasons.push('Employment status not acceptable');
    }

    if (factors.debtToIncome > 0.6) {
      reasons.push('Debt-to-income ratio too high');
    }

    if (factors.loanToValue > 0.95) {
      reasons.push('Loan-to-value ratio exceeds limit');
    }

    return reasons.length > 0 ? reasons.join('; ') : 'Application does not meet eligibility criteria';
  }

  /**
   * Apply filters to query builder
   */
  private applyFilters(queryBuilder: SelectQueryBuilder<Loan>, filters: Partial<LoanQueryDto>): void {
    if (filters.status) {
      queryBuilder.andWhere('loan.status = :status', { status: filters.status });
    }

    if (filters.eligibilityStatus) {
      queryBuilder.andWhere('loan.eligibilityStatus = :eligibilityStatus', {
        eligibilityStatus: filters.eligibilityStatus
      });
    }

    if (filters.processingStage) {
      queryBuilder.andWhere('loan.processingStage = :processingStage', {
        processingStage: filters.processingStage
      });
    }

    if (filters.employmentStatus) {
      queryBuilder.andWhere('loan.employmentStatus = :employmentStatus', {
        employmentStatus: filters.employmentStatus
      });
    }

    if (filters.minRequestedAmount) {
      queryBuilder.andWhere('CAST(loan.requestedAmount AS REAL) >= :minRequestedAmount', {
        minRequestedAmount: filters.minRequestedAmount
      });
    }

    if (filters.maxRequestedAmount) {
      queryBuilder.andWhere('CAST(loan.requestedAmount AS REAL) <= :maxRequestedAmount', {
        maxRequestedAmount: filters.maxRequestedAmount
      });
    }

    if (filters.minMonthlyIncome) {
      queryBuilder.andWhere('CAST(loan.monthlyIncome AS REAL) >= :minMonthlyIncome', {
        minMonthlyIncome: filters.minMonthlyIncome
      });
    }

    if (filters.riskCategory) {
      queryBuilder.andWhere('loan.riskCategory = :riskCategory', {
        riskCategory: filters.riskCategory
      });
    }

    if (filters.assignedOfficer) {
      queryBuilder.andWhere('LOWER(loan.assignedOfficer) LIKE LOWER(:assignedOfficer)', {
        assignedOfficer: `%${filters.assignedOfficer}%`
      });
    }

    if (filters.applicantEmail) {
      queryBuilder.andWhere('LOWER(loan.applicantEmail) LIKE LOWER(:applicantEmail)', {
        applicantEmail: `%${filters.applicantEmail}%`
      });
    }
  }
}
