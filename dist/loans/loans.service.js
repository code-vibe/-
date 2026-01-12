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
var LoansService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoansService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const loan_entity_1 = require("./entities/loan.entity");
const vehicle_entity_1 = require("../vehicles/entities/vehicle.entity");
let LoansService = LoansService_1 = class LoansService {
    constructor(loanRepository, vehicleRepository) {
        this.loanRepository = loanRepository;
        this.vehicleRepository = vehicleRepository;
        this.logger = new common_1.Logger(LoansService_1.name);
    }
    async create(createLoanDto) {
        const { vehicleId, supportingDocuments, applicantDateOfBirth, ...loanData } = createLoanDto;
        this.logger.log(`Processing loan application for vehicle: ${vehicleId}`);
        const vehicle = await this.vehicleRepository.findOne({
            where: { id: vehicleId }
        });
        if (!vehicle) {
            throw new common_1.NotFoundException(`Vehicle with ID ${vehicleId} not found`);
        }
        const applicationNumber = await this.generateApplicationNumber();
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
        let loan = this.loanRepository.create(loanApplicationData);
        loan = await this.loanRepository.save(loan);
        this.logger.log(`Created loan application: ${loan.applicationNumber}`);
        const eligibilityResult = await this.performEligibilityCheck(loan, vehicle);
        Object.assign(loan, eligibilityResult);
        const updatedLoan = await this.loanRepository.save(loan);
        this.logger.log(`Completed eligibility check for loan: ${loan.applicationNumber}, status: ${updatedLoan.eligibilityStatus}`);
        return updatedLoan;
    }
    async findAll(queryDto) {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC', ...filters } = queryDto;
        this.logger.log(`Fetching loans with filters: ${JSON.stringify(filters)}`);
        const queryBuilder = this.loanRepository.createQueryBuilder('loan')
            .leftJoinAndSelect('loan.vehicle', 'vehicle')
            .leftJoinAndSelect('loan.offers', 'offers');
        this.applyFilters(queryBuilder, filters);
        queryBuilder.orderBy(`loan.${sortBy}`, sortOrder);
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);
        const [loans, total] = await queryBuilder.getManyAndCount();
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
    async findOne(id) {
        this.logger.log(`Fetching loan with ID: ${id}`);
        const loan = await this.loanRepository.findOne({
            where: { id },
            relations: ['vehicle', 'offers'],
        });
        if (!loan) {
            throw new common_1.NotFoundException(`Loan with ID ${id} not found`);
        }
        if (loan.supportingDocuments) {
            try {
                loan.supportingDocuments = JSON.parse(loan.supportingDocuments);
            }
            catch (error) {
                this.logger.warn(`Failed to parse supporting documents for loan ${id}: ${error.message}`);
            }
        }
        return loan;
    }
    async findByApplicationNumber(applicationNumber) {
        this.logger.log(`Fetching loan with application number: ${applicationNumber}`);
        const loan = await this.loanRepository.findOne({
            where: { applicationNumber },
            relations: ['vehicle', 'offers'],
        });
        if (!loan) {
            throw new common_1.NotFoundException(`Loan with application number ${applicationNumber} not found`);
        }
        if (loan.supportingDocuments) {
            try {
                loan.supportingDocuments = JSON.parse(loan.supportingDocuments);
            }
            catch (error) {
                this.logger.warn(`Failed to parse supporting documents for loan ${applicationNumber}: ${error.message}`);
            }
        }
        return loan;
    }
    async updateStatus(id, updateStatusDto) {
        this.logger.log(`Updating loan status for ID: ${id}`);
        const loan = await this.findOne(id);
        Object.assign(loan, {
            ...updateStatusDto,
            processedAt: ['Approved', 'Rejected', 'Cancelled'].includes(updateStatusDto.status)
                ? new Date() : loan.processedAt,
        });
        if (updateStatusDto.status === 'Disbursed' && !loan.actualDisbursementDate) {
            loan.actualDisbursementDate = new Date();
        }
        const updatedLoan = await this.loanRepository.save(loan);
        this.logger.log(`Updated loan status for ${id}: ${updateStatusDto.status}`);
        return updatedLoan;
    }
    async remove(id) {
        this.logger.log(`Deleting loan with ID: ${id}`);
        const loan = await this.findOne(id);
        if (['Disbursed', 'Defaulted'].includes(loan.status)) {
            throw new common_1.BadRequestException('Cannot delete disbursed or defaulted loans');
        }
        await this.loanRepository.remove(loan);
        this.logger.log(`Successfully deleted loan with ID: ${id}`);
    }
    async getStats() {
        this.logger.log('Fetching loan statistics');
        const totalLoans = await this.loanRepository.count();
        const statusStats = await this.loanRepository
            .createQueryBuilder('loan')
            .select('loan.status', 'status')
            .addSelect('COUNT(*)', 'count')
            .groupBy('loan.status')
            .getRawMany();
        const eligibilityStats = await this.loanRepository
            .createQueryBuilder('loan')
            .select('loan.eligibilityStatus', 'eligibilityStatus')
            .addSelect('COUNT(*)', 'count')
            .groupBy('loan.eligibilityStatus')
            .getRawMany();
        const riskStats = await this.loanRepository
            .createQueryBuilder('loan')
            .select('loan.riskCategory', 'riskCategory')
            .addSelect('COUNT(*)', 'count')
            .where('loan.riskCategory IS NOT NULL')
            .groupBy('loan.riskCategory')
            .getRawMany();
        const averageStats = await this.loanRepository
            .createQueryBuilder('loan')
            .select('AVG(CAST(loan.requestedAmount AS FLOAT))', 'avgRequestedAmount')
            .addSelect('AVG(CAST(loan.monthlyIncome AS FLOAT))', 'avgMonthlyIncome')
            .getRawOne();
        const processingTimeStats = await this.loanRepository
            .createQueryBuilder('loan')
            .select('AVG(CAST((julianday(loan.processedAt) - julianday(loan.submittedAt)) * 24 AS FLOAT))', 'avgProcessingHours')
            .where('loan.processedAt IS NOT NULL AND loan.submittedAt IS NOT NULL')
            .getRawOne();
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
    async generateApplicationNumber() {
        const today = new Date();
        const datePrefix = today.toISOString().slice(0, 10).replace(/-/g, '');
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);
        const todayCount = await this.loanRepository.count({
            where: {
                createdAt: {
                    gte: todayStart,
                    lt: todayEnd,
                }
            }
        });
        const sequenceNumber = (todayCount + 1).toString().padStart(3, '0');
        return `LN${datePrefix}${sequenceNumber}`;
    }
    async performEligibilityCheck(loan, vehicle) {
        this.logger.log(`Performing eligibility check for loan: ${loan.applicationNumber}`);
        const eligibilityFactors = {
            age: this.checkAgeEligibility(loan.applicantDateOfBirth),
            income: this.checkIncomeEligibility(loan.monthlyIncome),
            employment: this.checkEmploymentEligibility(loan.employmentStatus, loan.yearsAtCurrentJob),
            debtToIncome: this.calculateDebtToIncomeRatio(loan.monthlyIncome, loan.existingDebtObligations),
            loanToValue: await this.calculateLoanToValueRatio(loan.requestedAmount, vehicle),
        };
        const riskScore = this.calculateRiskScore(eligibilityFactors, loan);
        const riskCategory = this.determineRiskCategory(riskScore);
        const eligibilityStatus = this.determineEligibilityStatus(eligibilityFactors, riskScore);
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
            status: eligibilityStatus === 'Not Eligible' ? 'Rejected' : 'Under Review',
        };
        if (eligibilityStatus === 'Not Eligible') {
            result.rejectionReason = this.generateRejectionReason(eligibilityFactors);
        }
        return result;
    }
    checkAgeEligibility(dateOfBirth) {
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
    checkIncomeEligibility(monthlyIncome) {
        const minIncome = 100000;
        return {
            eligible: monthlyIncome >= minIncome,
            income: monthlyIncome
        };
    }
    checkEmploymentEligibility(status, yearsAtJob) {
        const eligibleStatuses = ['Employed', 'Self Employed'];
        const eligible = eligibleStatuses.includes(status);
        const stable = eligible && (yearsAtJob || 0) >= 1;
        return { eligible, stable };
    }
    calculateDebtToIncomeRatio(monthlyIncome, existingDebt) {
        return monthlyIncome > 0 ? existingDebt / monthlyIncome : 1;
    }
    async calculateLoanToValueRatio(requestedAmount, vehicle) {
        const estimatedValue = await this.estimateVehicleValue(vehicle);
        return estimatedValue > 0 ? requestedAmount / estimatedValue : 1;
    }
    async estimateVehicleValue(vehicle) {
        const currentYear = new Date().getFullYear();
        const age = currentYear - vehicle.year;
        const basePrices = {
            'Toyota': 8000000,
            'Honda': 7500000,
            'Hyundai': 6500000,
            'Kia': 6000000,
            'Nissan': 7000000,
            'Ford': 7200000,
        };
        let basePrice = basePrices[vehicle.make] || 5000000;
        basePrice *= Math.pow(0.85, age);
        const conditionMultiplier = {
            'Excellent': 1.1,
            'Good': 1.0,
            'Fair': 0.85,
            'Poor': 0.7
        };
        basePrice *= conditionMultiplier[vehicle.condition] || 1.0;
        return Math.max(basePrice, 500000);
    }
    calculateRiskScore(factors, loan) {
        let score = 0;
        if (factors.age.age < 25 || factors.age.age > 60)
            score += 15;
        else if (factors.age.age < 30 || factors.age.age > 55)
            score += 10;
        else
            score += 5;
        if (factors.income.income < 200000)
            score += 20;
        else if (factors.income.income < 300000)
            score += 15;
        else if (factors.income.income < 500000)
            score += 10;
        else
            score += 5;
        if (!factors.employment.eligible)
            score += 20;
        else if (!factors.employment.stable)
            score += 15;
        else if (loan.employmentStatus === 'Self Employed')
            score += 10;
        else
            score += 5;
        if (factors.debtToIncome > 0.5)
            score += 20;
        else if (factors.debtToIncome > 0.4)
            score += 15;
        else if (factors.debtToIncome > 0.3)
            score += 10;
        else
            score += 5;
        if (factors.loanToValue > 0.9)
            score += 15;
        else if (factors.loanToValue > 0.8)
            score += 12;
        else if (factors.loanToValue > 0.7)
            score += 8;
        else
            score += 5;
        return Math.min(score, 100);
    }
    determineRiskCategory(riskScore) {
        if (riskScore <= 30)
            return 'Low';
        if (riskScore <= 50)
            return 'Medium';
        if (riskScore <= 75)
            return 'High';
        return 'Very High';
    }
    determineEligibilityStatus(factors, riskScore) {
        if (!factors.age.eligible || !factors.income.eligible || !factors.employment.eligible) {
            return 'Not Eligible';
        }
        if (riskScore > 80 || factors.debtToIncome > 0.6 || factors.loanToValue > 0.95) {
            return 'Not Eligible';
        }
        if (riskScore > 60 || factors.debtToIncome > 0.45 || factors.loanToValue > 0.85) {
            return 'Conditionally Eligible';
        }
        if (riskScore <= 40 && factors.debtToIncome <= 0.35 && factors.loanToValue <= 0.75) {
            return 'Eligible';
        }
        return 'Pending Review';
    }
    generateRejectionReason(factors) {
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
    applyFilters(queryBuilder, filters) {
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
};
exports.LoansService = LoansService;
exports.LoansService = LoansService = LoansService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(loan_entity_1.Loan)),
    __param(1, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LoansService);
//# sourceMappingURL=loans.service.js.map