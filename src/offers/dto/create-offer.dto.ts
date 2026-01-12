import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEnum, IsUUID, IsBoolean, Min, Max, IsArray } from 'class-validator';

/**
 * DTO for creating a new loan offer
 * Contains all required and optional fields for offer generation
 */
export class CreateOfferDto {
  @ApiProperty({ 
    description: 'Loan ID for which the offer is being generated',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @IsUUID()
  loanId: string;

  @ApiProperty({ 
    description: 'Approved loan amount',
    example: 8500000,
    minimum: 100000
  })
  @IsNumber()
  @Min(100000, { message: 'Approved amount must be at least 100,000' })
  approvedAmount: number;

  @ApiProperty({ 
    description: 'Offered loan term in months',
    example: 36,
    minimum: 6,
    maximum: 84
  })
  @IsNumber()
  @Min(6, { message: 'Term must be at least 6 months' })
  @Max(84, { message: 'Term cannot exceed 84 months' })
  termMonths: number;

  @ApiProperty({ 
    description: 'Annual interest rate (percentage)',
    example: 18.5,
    minimum: 5.0,
    maximum: 35.0
  })
  @IsNumber()
  @Min(5.0, { message: 'Interest rate must be at least 5%' })
  @Max(35.0, { message: 'Interest rate cannot exceed 35%' })
  interestRate: number;

  @ApiProperty({ 
    description: 'Interest rate type',
    example: 'Fixed',
    enum: ['Fixed', 'Variable', 'Mixed'],
    required: false
  })
  @IsOptional()
  @IsEnum(['Fixed', 'Variable', 'Mixed'])
  interestRateType?: 'Fixed' | 'Variable' | 'Mixed';

  @ApiProperty({ 
    description: 'Required down payment',
    example: 1500000,
    minimum: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  requiredDownPayment?: number;

  @ApiProperty({ 
    description: 'Processing fee amount',
    example: 85000,
    minimum: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  processingFee?: number;

  @ApiProperty({ 
    description: 'Insurance premium (if applicable)',
    example: 150000,
    minimum: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  insurancePremium?: number;

  @ApiProperty({ 
    description: 'Other fees and charges',
    example: 25000,
    minimum: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  otherFees?: number;

  @ApiProperty({ 
    description: 'Offer type or category',
    example: 'Standard',
    enum: ['Standard', 'Premium', 'Budget', 'Special', 'Promotional'],
    required: false
  })
  @IsOptional()
  @IsEnum(['Standard', 'Premium', 'Budget', 'Special', 'Promotional'])
  offerType?: 'Standard' | 'Premium' | 'Budget' | 'Special' | 'Promotional';

  @ApiProperty({ 
    description: 'Offer priority level',
    example: 'Medium',
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    required: false
  })
  @IsOptional()
  @IsEnum(['Low', 'Medium', 'High', 'Urgent'])
  priority?: 'Low' | 'Medium' | 'High' | 'Urgent';

  @ApiProperty({ 
    description: 'Offer validity period in days',
    example: 7,
    minimum: 1,
    maximum: 30,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(30)
  validityDays?: number;

  @ApiProperty({ 
    description: 'Terms and conditions',
    example: 'Standard auto loan terms apply. Vehicle serves as collateral.',
    required: false
  })
  @IsOptional()
  @IsString()
  termsAndConditions?: string;

  @ApiProperty({ 
    description: 'Special conditions or requirements',
    example: 'Comprehensive insurance required. Regular income verification needed.',
    required: false
  })
  @IsOptional()
  @IsString()
  specialConditions?: string;

  @ApiProperty({ 
    description: 'Collateral requirements',
    example: 'Vehicle title and registration documents',
    required: false
  })
  @IsOptional()
  @IsString()
  collateralRequirements?: string;

  @ApiProperty({ 
    description: 'Required documents for offer acceptance',
    example: ['SIGNED_AGREEMENT', 'INSURANCE_PROOF', 'BANK_DETAILS'],
    type: [String],
    required: false
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requiredDocuments?: string[];

  @ApiProperty({ 
    description: 'Prepayment penalty information',
    example: '2% of outstanding balance if paid within first 12 months',
    required: false
  })
  @IsOptional()
  @IsString()
  prepaymentPenalty?: string;

  @ApiProperty({ 
    description: 'Late payment penalty rate',
    example: 5.0,
    minimum: 0,
    maximum: 10.0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10.0)
  latePaymentPenaltyRate?: number;

  @ApiProperty({ 
    description: 'Grace period for payments (days)',
    example: 5,
    minimum: 0,
    maximum: 15,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(15)
  gracePeriodDays?: number;

  @ApiProperty({ 
    description: 'Minimum credit score required for this offer',
    example: 650,
    minimum: 300,
    maximum: 850,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(300)
  @Max(850)
  minCreditScore?: number;

  @ApiProperty({ 
    description: 'Maximum debt-to-income ratio allowed',
    example: 0.40,
    minimum: 0.1,
    maximum: 0.8,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0.1)
  @Max(0.8)
  maxDebtToIncomeRatio?: number;

  @ApiProperty({ 
    description: 'Employment verification required',
    example: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  employmentVerificationRequired?: boolean;

  @ApiProperty({ 
    description: 'Income verification required',
    example: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  incomeVerificationRequired?: boolean;

  @ApiProperty({ 
    description: 'Risk-based pricing applied',
    example: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  riskBasedPricing?: boolean;

  @ApiProperty({ 
    description: 'Promotional offer flag',
    example: false,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  isPromotional?: boolean;

  @ApiProperty({ 
    description: 'Promotional discount amount',
    example: 50000,
    minimum: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  promotionalDiscount?: number;

  @ApiProperty({ 
    description: 'Currency code (ISO 4217)',
    example: 'NGN',
    maxLength: 3,
    required: false
  })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ 
    description: 'Internal notes about the offer',
    example: 'Generated based on excellent credit score and stable employment',
    required: false
  })
  @IsOptional()
  @IsString()
  internalNotes?: string;
}
