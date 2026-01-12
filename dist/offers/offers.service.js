"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var OffersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const offer_entity_1 = require("./entities/offer.entity");
const loan_entity_1 = require("../loans/entities/loan.entity");
let OffersService = OffersService_1 = class OffersService {
    constructor(offerRepository, loanRepository) {
        this.offerRepository = offerRepository;
        this.loanRepository = loanRepository;
        this.logger = new common_1.Logger(OffersService_1.name);
    }
    async create(createOfferDto) {
        const { loanId, requiredDocuments, ...offerData } = createOfferDto;
        this.logger.log(`Creating offer for loan: ${loanId}`);
        const loan = await this.loanRepository.findOne({
            where: { id: loanId },
            relations: ['vehicle']
        });
        if (!loan) {
            throw new common_1.NotFoundException(`Loan with ID ${loanId} not found`);
        }
        if (!['Approved', 'Under Review'].includes(loan.status)) {
            throw new common_1.BadRequestException(`Cannot create offers for loans with status: ${loan.status}`);
        }
        const offerNumber = await this.generateOfferNumber();
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
        const offer = this.offerRepository.create(offerWithCalculations);
        const savedOffer = await this.offerRepository.save(offer);
        this.logger.log(`Created offer: ${savedOffer.offerNumber} for loan: ${loanId}`);
        return savedOffer;
    }
    async findAll(loanId) {
        this.logger.log(`Fetching offers${loanId ? ` for loan: ${loanId}` : ''}`);
        const query = this.offerRepository.createQueryBuilder('offer')
            .leftJoinAndSelect('offer.loan', 'loan')
            .leftJoinAndSelect('loan.vehicle', 'vehicle')
            .orderBy('offer.createdAt', 'DESC');
        if (loanId) {
            query.where('offer.loanId = :loanId', { loanId });
        }
        const offers = await query.getMany();
        return offers.map(offer => ({
            ...offer,
            requiredDocuments: offer.requiredDocuments ? JSON.parse(offer.requiredDocuments) : null,
        }));
    }
    async findOne(id) {
        this.logger.log(`Fetching offer with ID: ${id}`);
        const offer = await this.offerRepository.findOne({
            where: { id },
            relations: ['loan', 'loan.vehicle'],
        });
        if (!offer) {
            throw new common_1.NotFoundException(`Offer with ID ${id} not found`);
        }
        if (offer.requiredDocuments) {
            try {
                offer.requiredDocuments = JSON.parse(offer.requiredDocuments);
            }
            catch (error) {
                this.logger.warn(`Failed to parse required documents for offer ${id}: ${error.message}`);
            }
        }
        return offer;
    }
    async updateStatus(id, updateStatusDto) {
        this.logger.log(`Updating offer status for ID: ${id}`);
        const offer = await this.findOne(id);
        if (!this.isValidStatusTransition(offer.status, updateStatusDto.status)) {
            throw new common_1.BadRequestException(`Cannot change status from ${offer.status} to ${updateStatusDto.status}`);
        }
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
    async remove(id) {
        this.logger.log(`Deleting offer with ID: ${id}`);
        const offer = await this.findOne(id);
        if (['Accepted', 'Disbursed'].includes(offer.status)) {
            throw new common_1.BadRequestException('Cannot delete accepted or disbursed offers');
        }
        await this.offerRepository.remove(offer);
        this.logger.log(`Successfully deleted offer with ID: ${id}`);
    }
    async getStats() {
        this.logger.log('Fetching offer statistics');
        const totalOffers = await this.offerRepository.count();
        const statusStats = await this.offerRepository
            .createQueryBuilder('offer')
            .select('offer.status', 'status')
            .addSelect('COUNT(*)', 'count')
            .groupBy('offer.status')
            .getRawMany();
        const typeStats = await this.offerRepository
            .createQueryBuilder('offer')
            .select('offer.offerType', 'offerType')
            .addSelect('COUNT(*)', 'count')
            .groupBy('offer.offerType')
            .getRawMany();
        const averageStats = await this.offerRepository
            .createQueryBuilder('offer')
            .select('AVG(CAST(offer.approvedAmount AS FLOAT))', 'avgAmount')
            .addSelect('AVG(CAST(offer.interestRate AS FLOAT))', 'avgInterestRate')
            .getRawOne();
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
    async generateOfferNumber() {
        const today = new Date();
        const datePrefix = today.toISOString().slice(0, 10).replace(/-/g, '');
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);
        const todayCount = await this.offerRepository.count({
            where: {
                createdAt: {
                    gte: todayStart,
                    lt: todayEnd,
                }
            }
        });
        const sequenceNumber = (todayCount + 1).toString().padStart(3, '0');
        return `OF${datePrefix}${sequenceNumber}`;
    }
    async calculateOfferTerms(offerData, loan) {
        const { approvedAmount, termMonths, interestRate, processingFee, insurancePremium, otherFees } = offerData;
        const monthlyRate = interestRate / 100 / 12;
        const monthlyPayment = approvedAmount *
            (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
            (Math.pow(1 + monthlyRate, termMonths) - 1);
        const totalPayableAmount = monthlyPayment * termMonths;
        const totalInterest = totalPayableAmount - approvedAmount;
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
    calculateAPR(principal, monthlyPayment, termMonths, totalFees) {
        const totalPaid = (monthlyPayment * termMonths) + totalFees;
        const totalInterestAndFees = totalPaid - principal;
        const annualInterestAndFees = (totalInterestAndFees / (termMonths / 12));
        return (annualInterestAndFees / principal) * 100;
    }
    calculateProcessingFee(amount) {
        const feeRate = 0.01;
        const fee = amount * feeRate;
        const minFee = 50000;
        const maxFee = 200000;
        return Math.max(minFee, Math.min(fee, maxFee));
    }
    isValidStatusTransition(currentStatus, newStatus) {
        const validTransitions = {
            'Draft': ['Active', 'Cancelled'],
            'Active': ['Accepted', 'Rejected', 'Expired', 'Withdrawn'],
            'Accepted': ['Cancelled'],
            'Rejected': [],
            'Expired': ['Active'],
            'Withdrawn': ['Active'],
            'Cancelled': [],
        };
        return validTransitions[currentStatus]?.includes(newStatus) || false;
    }
};
exports.OffersService = OffersService;
exports.OffersService = OffersService = OffersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(offer_entity_1.Offer)),
    __param(1, (0, typeorm_1.InjectRepository)(loan_entity_1.Loan)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OffersService);
//# sourceMappingURL=offers.service.js.map