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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Offer = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const loan_entity_1 = require("../../loans/entities/loan.entity");
let Offer = class Offer {
};
exports.Offer = Offer;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique offer identifier',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Offer.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Offer reference number',
        example: 'OF20240112001',
        uniqueItems: true
    }),
    (0, typeorm_1.Column)({ unique: true, length: 50 }),
    __metadata("design:type", String)
], Offer.prototype, "offerNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Approved loan amount',
        example: 8500000,
        minimum: 100000
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], Offer.prototype, "approvedAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Currency code (ISO 4217)',
        example: 'NGN',
        maxLength: 3
    }),
    (0, typeorm_1.Column)({ length: 3, default: 'NGN' }),
    __metadata("design:type", String)
], Offer.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Offered loan term in months',
        example: 36,
        minimum: 6,
        maximum: 84
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Offer.prototype, "termMonths", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Annual interest rate (percentage)',
        example: 18.5,
        minimum: 5.0,
        maximum: 35.0
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], Offer.prototype, "interestRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Interest rate type',
        example: 'Fixed',
        enum: ['Fixed', 'Variable', 'Mixed']
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 10,
        default: 'Fixed'
    }),
    __metadata("design:type", String)
], Offer.prototype, "interestRateType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Monthly payment amount',
        example: 325000,
        minimum: 1000
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], Offer.prototype, "monthlyPayment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total amount to be paid over loan term',
        example: 11700000,
        minimum: 100000
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], Offer.prototype, "totalPayableAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total interest to be paid',
        example: 3200000,
        minimum: 0
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], Offer.prototype, "totalInterest", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Required down payment',
        example: 1500000,
        minimum: 0
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Offer.prototype, "requiredDownPayment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Processing fee amount',
        example: 85000,
        minimum: 0
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Offer.prototype, "processingFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Insurance premium (if applicable)',
        example: 150000,
        minimum: 0
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Offer.prototype, "insurancePremium", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Other fees and charges',
        example: 25000,
        minimum: 0
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Offer.prototype, "otherFees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Annual Percentage Rate (APR)',
        example: 19.8,
        minimum: 5.0,
        maximum: 40.0
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], Offer.prototype, "apr", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Offer type or category',
        example: 'Standard',
        enum: ['Standard', 'Premium', 'Budget', 'Special', 'Promotional']
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        default: 'Standard'
    }),
    __metadata("design:type", String)
], Offer.prototype, "offerType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current offer status',
        example: 'Active',
        enum: ['Draft', 'Active', 'Accepted', 'Rejected', 'Expired', 'Withdrawn', 'Cancelled']
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        default: 'Active'
    }),
    __metadata("design:type", String)
], Offer.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Offer priority level',
        example: 'Medium',
        enum: ['Low', 'Medium', 'High', 'Urgent']
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 10,
        default: 'Medium'
    }),
    __metadata("design:type", String)
], Offer.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Offer validity period in days',
        example: 7,
        minimum: 1,
        maximum: 30
    }),
    (0, typeorm_1.Column)({ default: 7 }),
    __metadata("design:type", Number)
], Offer.prototype, "validityDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Offer expiry date',
        example: '2024-01-19T23:59:59Z'
    }),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Offer.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Terms and conditions',
        example: 'Standard auto loan terms apply. Vehicle serves as collateral.'
    }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Offer.prototype, "termsAndConditions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Special conditions or requirements',
        example: 'Comprehensive insurance required. Regular income verification needed.'
    }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Offer.prototype, "specialConditions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Collateral requirements',
        example: 'Vehicle title and registration documents'
    }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Offer.prototype, "collateralRequirements", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Required documents for offer acceptance',
        example: '["SIGNED_AGREEMENT", "INSURANCE_PROOF", "BANK_DETAILS"]'
    }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Offer.prototype, "requiredDocuments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Prepayment penalty information',
        example: '2% of outstanding balance if paid within first 12 months'
    }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Offer.prototype, "prepaymentPenalty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Late payment penalty rate',
        example: 5.0,
        minimum: 0,
        maximum: 10.0
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 4, scale: 2, default: 2.5 }),
    __metadata("design:type", Number)
], Offer.prototype, "latePaymentPenaltyRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Grace period for payments (days)',
        example: 5,
        minimum: 0,
        maximum: 15
    }),
    (0, typeorm_1.Column)({ default: 5 }),
    __metadata("design:type", Number)
], Offer.prototype, "gracePeriodDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Minimum credit score required for this offer',
        example: 650,
        minimum: 300,
        maximum: 850
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Offer.prototype, "minCreditScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Maximum debt-to-income ratio allowed',
        example: 0.40,
        minimum: 0.1,
        maximum: 0.8
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 3, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Offer.prototype, "maxDebtToIncomeRatio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employment verification required',
        example: true
    }),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Offer.prototype, "employmentVerificationRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Income verification required',
        example: true
    }),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Offer.prototype, "incomeVerificationRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Offer generation method',
        example: 'Automated',
        enum: ['Automated', 'Manual', 'Hybrid']
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 15,
        default: 'Automated'
    }),
    __metadata("design:type", String)
], Offer.prototype, "generationMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Risk-based pricing applied',
        example: true
    }),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Offer.prototype, "riskBasedPricing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Promotional offer flag',
        example: false
    }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Offer.prototype, "isPromotional", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Promotional discount amount',
        example: 50000,
        minimum: 0
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Offer.prototype, "promotionalDiscount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when customer accepted the offer',
        example: '2024-01-15T09:30:00Z'
    }),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Offer.prototype, "acceptedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when customer rejected the offer',
        example: '2024-01-16T11:45:00Z'
    }),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Offer.prototype, "rejectedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer rejection reason',
        example: 'Interest rate too high'
    }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Offer.prototype, "rejectionReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Internal notes about the offer',
        example: 'Generated based on excellent credit score and stable employment'
    }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Offer.prototype, "internalNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Record creation timestamp',
        example: '2024-01-12T10:00:00Z'
    }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Offer.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Record last update timestamp',
        example: '2024-01-12T15:30:00Z'
    }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Offer.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Associated loan application ID',
        example: '550e8400-e29b-41d4-a716-446655440001'
    }),
    (0, typeorm_1.Column)({ name: 'loan_id' }),
    __metadata("design:type", String)
], Offer.prototype, "loanId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Associated loan application',
        type: () => loan_entity_1.Loan
    }),
    (0, typeorm_1.ManyToOne)(() => loan_entity_1.Loan, (loan) => loan.offers, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'loan_id' }),
    __metadata("design:type", loan_entity_1.Loan)
], Offer.prototype, "loan", void 0);
exports.Offer = Offer = __decorate([
    (0, typeorm_1.Entity)('offers')
], Offer);
//# sourceMappingURL=offer.entity.js.map