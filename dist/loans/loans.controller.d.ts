import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanStatusDto } from './dto/update-loan-status.dto';
import { LoanQueryDto } from './dto/loan-query.dto';
import { Loan } from './entities/loan.entity';
export declare class LoansController {
    private readonly loansService;
    constructor(loansService: LoansService);
    create(createLoanDto: CreateLoanDto): Promise<Loan>;
    findAll(query: LoanQueryDto): Promise<{
        data: Loan[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
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
    findByApplicationNumber(applicationNumber: string): Promise<Loan>;
    findOne(id: string): Promise<Loan>;
    updateStatus(id: string, updateStatusDto: UpdateLoanStatusDto): Promise<Loan>;
    remove(id: string): Promise<void>;
}
