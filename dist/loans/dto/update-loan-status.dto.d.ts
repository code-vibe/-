export declare class UpdateLoanStatusDto {
    status: 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Cancelled' | 'Disbursed' | 'Defaulted';
    processingStage?: 'Initial Review' | 'Document Verification' | 'Credit Check' | 'Risk Assessment' | 'Final Approval' | 'Disbursement';
    rejectionReason?: string;
    notes?: string;
    assignedOfficer?: string;
}
