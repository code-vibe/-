export declare class UpdateOfferStatusDto {
    status: 'Draft' | 'Active' | 'Accepted' | 'Rejected' | 'Expired' | 'Withdrawn' | 'Cancelled';
    rejectionReason?: string;
    notes?: string;
}
