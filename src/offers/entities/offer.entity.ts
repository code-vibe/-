import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Loan } from '../../loans/entities/loan.entity';

/**
 * Offer entity representing loan offers generated for loan applications
 * Stores offer terms, conditions, and status
 */
@Entity('offers')
export class Offer {
  @ApiProperty({ 
    description: 'Unique offer identifier',
    example: '550e8400-e29b-41d4-a716-446655440000' 
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ 
    description: 'Offer reference number',
    example: 'OF20240112001',
    uniqueItems: true
  })
  @Column({ unique: true, length: 50 })
  offerNumber: string;

  @ApiProperty({ 
    description: 'Approved loan amount',
    example: 8500000,
    minimum: 100000
  })
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  approvedAmount: number;

  @ApiProperty({ 
    description: 'Currency code (ISO 4217)',
    example: 'NGN',
    maxLength: 3
  })
  @Column({ length: 3, default: 'NGN' })
  currency: string;

  @ApiProperty({ 
    description: 'Offered loan term in months',
    example: 36,
    minimum: 6,
    maximum: 84
  })
  @Column()
  termMonths: number;

  @ApiProperty({ 
    description: 'Annual interest rate (percentage)',
    example: 18.5,
    minimum: 5.0,
    maximum: 35.0
  })
  @Column({ type: 'decimal', precision: 5, scale: 2 })
  interestRate: number;

  @ApiProperty({ 
    description: 'Interest rate type',
    example: 'Fixed',
    enum: ['Fixed', 'Variable', 'Mixed']
  })
  @Column({ 
    type: 'varchar',
    length: 10,
    default: 'Fixed'
  })
  interestRateType: 'Fixed' | 'Variable' | 'Mixed';

  @ApiProperty({ 
    description: 'Monthly payment amount',
    example: 325000,
    minimum: 1000
  })
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  monthlyPayment: number;

  @ApiProperty({ 
    description: 'Total amount to be paid over loan term',
    example: 11700000,
    minimum: 100000
  })
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  totalPayableAmount: number;

  @ApiProperty({ 
    description: 'Total interest to be paid',
    example: 3200000,
    minimum: 0
  })
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  totalInterest: number;

  @ApiProperty({ 
    description: 'Required down payment',
    example: 1500000,
    minimum: 0
  })
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  requiredDownPayment: number;

  @ApiProperty({ 
    description: 'Processing fee amount',
    example: 85000,
    minimum: 0
  })
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  processingFee: number;

  @ApiProperty({ 
    description: 'Insurance premium (if applicable)',
    example: 150000,
    minimum: 0
  })
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  insurancePremium: number;

  @ApiProperty({ 
    description: 'Other fees and charges',
    example: 25000,
    minimum: 0
  })
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  otherFees: number;

  @ApiProperty({ 
    description: 'Annual Percentage Rate (APR)',
    example: 19.8,
    minimum: 5.0,
    maximum: 40.0
  })
  @Column({ type: 'decimal', precision: 5, scale: 2 })
  apr: number;

  @ApiProperty({ 
    description: 'Offer type or category',
    example: 'Standard',
    enum: ['Standard', 'Premium', 'Budget', 'Special', 'Promotional']
  })
  @Column({ 
    type: 'varchar',
    length: 20,
    default: 'Standard'
  })
  offerType: 'Standard' | 'Premium' | 'Budget' | 'Special' | 'Promotional';

  @ApiProperty({ 
    description: 'Current offer status',
    example: 'Active',
    enum: ['Draft', 'Active', 'Accepted', 'Rejected', 'Expired', 'Withdrawn', 'Cancelled']
  })
  @Column({ 
    type: 'varchar',
    length: 20,
    default: 'Active'
  })
  status: 'Draft' | 'Active' | 'Accepted' | 'Rejected' | 'Expired' | 'Withdrawn' | 'Cancelled';

  @ApiProperty({ 
    description: 'Offer priority level',
    example: 'Medium',
    enum: ['Low', 'Medium', 'High', 'Urgent']
  })
  @Column({ 
    type: 'varchar',
    length: 10,
    default: 'Medium'
  })
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';

  @ApiProperty({ 
    description: 'Offer validity period in days',
    example: 7,
    minimum: 1,
    maximum: 30
  })
  @Column({ default: 7 })
  validityDays: number;

  @ApiProperty({ 
    description: 'Offer expiry date',
    example: '2024-01-19T23:59:59Z'
  })
  @Column({ type: 'datetime', nullable: true })
  expiresAt?: Date;

  @ApiProperty({ 
    description: 'Terms and conditions',
    example: 'Standard auto loan terms apply. Vehicle serves as collateral.'
  })
  @Column({ type: 'text', nullable: true })
  termsAndConditions?: string;

  @ApiProperty({ 
    description: 'Special conditions or requirements',
    example: 'Comprehensive insurance required. Regular income verification needed.'
  })
  @Column({ type: 'text', nullable: true })
  specialConditions?: string;

  @ApiProperty({ 
    description: 'Collateral requirements',
    example: 'Vehicle title and registration documents'
  })
  @Column({ type: 'text', nullable: true })
  collateralRequirements?: string;

  @ApiProperty({ 
    description: 'Required documents for offer acceptance',
    example: '["SIGNED_AGREEMENT", "INSURANCE_PROOF", "BANK_DETAILS"]'
  })
  @Column({ type: 'text', nullable: true })
  requiredDocuments?: string; // JSON array

  @ApiProperty({ 
    description: 'Prepayment penalty information',
    example: '2% of outstanding balance if paid within first 12 months'
  })
  @Column({ type: 'text', nullable: true })
  prepaymentPenalty?: string;

  @ApiProperty({ 
    description: 'Late payment penalty rate',
    example: 5.0,
    minimum: 0,
    maximum: 10.0
  })
  @Column({ type: 'decimal', precision: 4, scale: 2, default: 2.5 })
  latePaymentPenaltyRate: number;

  @ApiProperty({ 
    description: 'Grace period for payments (days)',
    example: 5,
    minimum: 0,
    maximum: 15
  })
  @Column({ default: 5 })
  gracePeriodDays: number;

  @ApiProperty({ 
    description: 'Minimum credit score required for this offer',
    example: 650,
    minimum: 300,
    maximum: 850
  })
  @Column({ nullable: true })
  minCreditScore?: number;

  @ApiProperty({ 
    description: 'Maximum debt-to-income ratio allowed',
    example: 0.40,
    minimum: 0.1,
    maximum: 0.8
  })
  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  maxDebtToIncomeRatio?: number;

  @ApiProperty({ 
    description: 'Employment verification required',
    example: true
  })
  @Column({ default: true })
  employmentVerificationRequired: boolean;

  @ApiProperty({ 
    description: 'Income verification required',
    example: true
  })
  @Column({ default: true })
  incomeVerificationRequired: boolean;

  @ApiProperty({ 
    description: 'Offer generation method',
    example: 'Automated',
    enum: ['Automated', 'Manual', 'Hybrid']
  })
  @Column({ 
    type: 'varchar',
    length: 15,
    default: 'Automated'
  })
  generationMethod: 'Automated' | 'Manual' | 'Hybrid';

  @ApiProperty({ 
    description: 'Risk-based pricing applied',
    example: true
  })
  @Column({ default: true })
  riskBasedPricing: boolean;

  @ApiProperty({ 
    description: 'Promotional offer flag',
    example: false
  })
  @Column({ default: false })
  isPromotional: boolean;

  @ApiProperty({ 
    description: 'Promotional discount amount',
    example: 50000,
    minimum: 0
  })
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  promotionalDiscount: number;

  @ApiProperty({ 
    description: 'Date when customer accepted the offer',
    example: '2024-01-15T09:30:00Z'
  })
  @Column({ type: 'datetime', nullable: true })
  acceptedAt?: Date;

  @ApiProperty({ 
    description: 'Date when customer rejected the offer',
    example: '2024-01-16T11:45:00Z'
  })
  @Column({ type: 'datetime', nullable: true })
  rejectedAt?: Date;

  @ApiProperty({ 
    description: 'Customer rejection reason',
    example: 'Interest rate too high'
  })
  @Column({ type: 'text', nullable: true })
  rejectionReason?: string;

  @ApiProperty({ 
    description: 'Internal notes about the offer',
    example: 'Generated based on excellent credit score and stable employment'
  })
  @Column({ type: 'text', nullable: true })
  internalNotes?: string;

  @ApiProperty({ 
    description: 'Record creation timestamp',
    example: '2024-01-12T10:00:00Z'
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ 
    description: 'Record last update timestamp',
    example: '2024-01-12T15:30:00Z'
  })
  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ApiProperty({ 
    description: 'Associated loan application ID',
    example: '550e8400-e29b-41d4-a716-446655440001'
  })
  @Column({ name: 'loan_id' })
  loanId: string;

  @ApiProperty({ 
    description: 'Associated loan application',
    type: () => Loan
  })
  @ManyToOne(() => Loan, (loan) => loan.offers, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'loan_id' })
  loan: Loan;
}
