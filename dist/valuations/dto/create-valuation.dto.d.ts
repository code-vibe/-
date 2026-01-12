export declare class CreateValuationDto {
    vehicleId: string;
    valuationMethod?: 'External API' | 'Manual Assessment' | 'Market Comparison' | 'Machine Learning' | 'Depreciation Model';
    estimatedValue?: number;
    currency?: string;
    source?: string;
    marketCondition?: 'High Demand' | 'Stable' | 'Declining' | 'Volatile' | 'Unknown';
    minValue?: number;
    maxValue?: number;
    confidenceScore?: number;
    notes?: string;
    validityDays?: number;
    requestedBy?: string;
    forceNew?: boolean;
}
