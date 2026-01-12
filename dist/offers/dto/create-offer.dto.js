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
exports.CreateOfferDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateOfferDto {
}
exports.CreateOfferDto = CreateOfferDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Loan ID for which the offer is being generated',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "loanId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Approved loan amount',
        example: 8500000,
        minimum: 100000
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(100000, { message: 'Approved amount must be at least 100,000' }),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "approvedAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Offered loan term in months',
        example: 36,
        minimum: 6,
        maximum: 84
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(6, { message: 'Term must be at least 6 months' }),
    (0, class_validator_1.Max)(84, { message: 'Term cannot exceed 84 months' }),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "termMonths", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Annual interest rate (percentage)',
        example: 18.5,
        minimum: 5.0,
        maximum: 35.0
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(5.0, { message: 'Interest rate must be at least 5%' }),
    (0, class_validator_1.Max)(35.0, { message: 'Interest rate cannot exceed 35%' }),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "interestRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Interest rate type',
        example: 'Fixed',
        enum: ['Fixed', 'Variable', 'Mixed'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Fixed', 'Variable', 'Mixed']),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "interestRateType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Required down payment',
        example: 1500000,
        minimum: 0,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "requiredDownPayment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Processing fee amount',
        example: 85000,
        minimum: 0,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "processingFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Insurance premium (if applicable)',
        example: 150000,
        minimum: 0,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "insurancePremium", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Other fees and charges',
        example: 25000,
        minimum: 0,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "otherFees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Offer type or category',
        example: 'Standard',
        enum: ['Standard', 'Premium', 'Budget', 'Special', 'Promotional'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Standard', 'Premium', 'Budget', 'Special', 'Promotional']),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "offerType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Offer priority level',
        example: 'Medium',
        enum: ['Low', 'Medium', 'High', 'Urgent'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Low', 'Medium', 'High', 'Urgent']),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Offer validity period in days',
        example: 7,
        minimum: 1,
        maximum: 30,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(30),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "validityDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Terms and conditions',
        example: 'Standard auto loan terms apply. Vehicle serves as collateral.',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "termsAndConditions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Special conditions or requirements',
        example: 'Comprehensive insurance required. Regular income verification needed.',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "specialConditions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Collateral requirements',
        example: 'Vehicle title and registration documents',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "collateralRequirements", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Required documents for offer acceptance',
        example: ['SIGNED_AGREEMENT', 'INSURANCE_PROOF', 'BANK_DETAILS'],
        type: [String],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateOfferDto.prototype, "requiredDocuments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Prepayment penalty information',
        example: '2% of outstanding balance if paid within first 12 months',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "prepaymentPenalty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Late payment penalty rate',
        example: 5.0,
        minimum: 0,
        maximum: 10.0,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(10.0),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "latePaymentPenaltyRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Grace period for payments (days)',
        example: 5,
        minimum: 0,
        maximum: 15,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(15),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "gracePeriodDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Minimum credit score required for this offer',
        example: 650,
        minimum: 300,
        maximum: 850,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(300),
    (0, class_validator_1.Max)(850),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "minCreditScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Maximum debt-to-income ratio allowed',
        example: 0.40,
        minimum: 0.1,
        maximum: 0.8,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.1),
    (0, class_validator_1.Max)(0.8),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "maxDebtToIncomeRatio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employment verification required',
        example: true,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateOfferDto.prototype, "employmentVerificationRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Income verification required',
        example: true,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateOfferDto.prototype, "incomeVerificationRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Risk-based pricing applied',
        example: true,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateOfferDto.prototype, "riskBasedPricing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Promotional offer flag',
        example: false,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateOfferDto.prototype, "isPromotional", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Promotional discount amount',
        example: 50000,
        minimum: 0,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "promotionalDiscount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Currency code (ISO 4217)',
        example: 'NGN',
        maxLength: 3,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Internal notes about the offer',
        example: 'Generated based on excellent credit score and stable employment',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "internalNotes", void 0);
//# sourceMappingURL=create-offer.dto.js.map