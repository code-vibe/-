import { Repository } from 'typeorm';
import { Loan } from './entities/loan.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanStatusDto } from './dto/update-loan-status.dto';
import { LoanQueryDto } from './dto/loan-query.dto';
export declare class LoansService {
    private loanRepository;
    private vehicleRepository;
    private readonly logger;
    constructor(loanRepository: Repository<Loan>, vehicleRepository: Repository<Vehicle>);
    create(createLoanDto: CreateLoanDto): Promise<Loan>;
    findAll(queryDto: LoanQueryDto): Promise<{
        data: Loan[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<Loan>;
    findByApplicationNumber(applicationNumber: string): Promise<Loan>;
    updateStatus(id: string, updateStatusDto: UpdateLoanStatusDto): Promise<Loan>;
    remove(id: string): Promise<void>;
    getStats(): Promise<{
        totalLoans: number;
        byStatus: Record<string, number>;
        byEligibilityStatus: Record<string, number>;
        byRiskCategory: Record<string, number>;
        averageRequestedAmount: number;
        averageMonthlyIncome: number;
        averageProcessingTime: number;
        approvalRate: number;
    }>;
    private generateApplicationNumber;
    private performEligibilityCheck;
    private checkAgeEligibility;
    private checkIncomeEligibility;
    private checkEmploymentEligibility;
    private calculateDebtToIncomeRatio;
    private calculateLoanToValueRatio;
    private estimateVehicleValue;
    private calculateRiskScore;
    private determineRiskCategory;
    private determineEligibilityStatus;
    private generateRejectionReason;
    private applyFilters;
}
