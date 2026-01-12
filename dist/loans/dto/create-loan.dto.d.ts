export declare class CreateLoanDto {
    vehicleId: string;
    requestedAmount: number;
    requestedTermMonths: number;
    applicantFirstName: string;
    applicantLastName: string;
    applicantEmail: string;
    applicantPhone: string;
    applicantDateOfBirth: string;
    applicantNationalId: string;
    applicantAddress: string;
    employmentStatus: 'Employed' | 'Self Employed' | 'Unemployed' | 'Student' | 'Retired';
    monthlyIncome: number;
    employerName?: string;
    yearsAtCurrentJob?: number;
    existingDebtObligations?: number;
    loanPurpose?: 'Vehicle Purchase' | 'Refinancing' | 'Personal Use' | 'Business Use';
    downPayment?: number;
    currency?: string;
    creditScore?: number;
    supportingDocuments?: string[];
    notes?: string;
}
