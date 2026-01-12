export declare class LoanQueryDto {
    status?: 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Cancelled' | 'Disbursed' | 'Defaulted';
    eligibilityStatus?: 'Eligible' | 'Not Eligible' | 'Conditionally Eligible' | 'Pending Review';
    processingStage?: 'Initial Review' | 'Document Verification' | 'Credit Check' | 'Risk Assessment' | 'Final Approval' | 'Disbursement';
    employmentStatus?: 'Employed' | 'Self Employed' | 'Unemployed' | 'Student' | 'Retired';
    minRequestedAmount?: number;
    maxRequestedAmount?: number;
    minMonthlyIncome?: number;
    riskCategory?: 'Low' | 'Medium' | 'High' | 'Very High';
    assignedOfficer?: string;
    applicantEmail?: string;
    page?: number;
    limit?: number;
    sortBy?: 'createdAt' | 'requestedAmount' | 'monthlyIncome' | 'submittedAt' | 'processedAt';
    sortOrder?: 'ASC' | 'DESC';
}
