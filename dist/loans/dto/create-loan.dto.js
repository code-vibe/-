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
exports.CreateLoanDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateLoanDto {
}
exports.CreateLoanDto = CreateLoanDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle ID for which the loan is being requested',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateLoanDto.prototype, "vehicleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Requested loan amount',
        example: 10000000,
        minimum: 100000
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(100000, { message: 'Loan amount must be at least 100,000' }),
    __metadata("design:type", Number)
], CreateLoanDto.prototype, "requestedAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Requested loan term in months',
        example: 36,
        minimum: 6,
        maximum: 84
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(6, { message: 'Loan term must be at least 6 months' }),
    (0, class_validator_1.Max)(84, { message: 'Loan term cannot exceed 84 months' }),
    __metadata("design:type", Number)
], CreateLoanDto.prototype, "requestedTermMonths", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applicant first name',
        example: 'John',
        maxLength: 100
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], CreateLoanDto.prototype, "applicantFirstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applicant last name',
        example: 'Doe',
        maxLength: 100
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], CreateLoanDto.prototype, "applicantLastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applicant email address',
        example: 'john.doe@example.com'
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateLoanDto.prototype, "applicantEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applicant phone number',
        example: '+2348123456789',
        maxLength: 20
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 20),
    __metadata("design:type", String)
], CreateLoanDto.prototype, "applicantPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applicant date of birth (YYYY-MM-DD)',
        example: '1990-05-15'
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateLoanDto.prototype, "applicantDateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applicant national identification number',
        example: '12345678901',
        maxLength: 50
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(8, 50),
    __metadata("design:type", String)
], CreateLoanDto.prototype, "applicantNationalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applicant address',
        example: '123 Lagos Street, Victoria Island, Lagos'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 500),
    __metadata("design:type", String)
], CreateLoanDto.prototype, "applicantAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applicant employment status',
        example: 'Employed',
        enum: ['Employed', 'Self Employed', 'Unemployed', 'Student', 'Retired']
    }),
    (0, class_validator_1.IsEnum)(['Employed', 'Self Employed', 'Unemployed', 'Student', 'Retired']),
    __metadata("design:type", String)
], CreateLoanDto.prototype, "employmentStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applicant monthly income',
        example: 500000,
        minimum: 50000
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(50000, { message: 'Monthly income must be at least 50,000' }),
    __metadata("design:type", Number)
], CreateLoanDto.prototype, "monthlyIncome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applicant employer name',
        example: 'Tech Corp Ltd',
        maxLength: 255,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 255),
    __metadata("design:type", String)
], CreateLoanDto.prototype, "employerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Years at current employment',
        example: 3,
        minimum: 0,
        maximum: 50,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(50),
    __metadata("design:type", Number)
], CreateLoanDto.prototype, "yearsAtCurrentJob", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applicant existing monthly debt obligations',
        example: 150000,
        minimum: 0,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateLoanDto.prototype, "existingDebtObligations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Purpose of the loan',
        example: 'Vehicle Purchase',
        enum: ['Vehicle Purchase', 'Refinancing', 'Personal Use', 'Business Use'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Vehicle Purchase', 'Refinancing', 'Personal Use', 'Business Use']),
    __metadata("design:type", String)
], CreateLoanDto.prototype, "loanPurpose", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Down payment amount',
        example: 2000000,
        minimum: 0,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateLoanDto.prototype, "downPayment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Currency code (ISO 4217)',
        example: 'NGN',
        maxLength: 3,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 3),
    __metadata("design:type", String)
], CreateLoanDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Credit score (if known)',
        example: 720,
        minimum: 300,
        maximum: 850,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(300),
    (0, class_validator_1.Max)(850),
    __metadata("design:type", Number)
], CreateLoanDto.prototype, "creditScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Supporting documents provided',
        example: ['ID_CARD', 'PROOF_OF_INCOME', 'BANK_STATEMENT'],
        type: [String],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateLoanDto.prototype, "supportingDocuments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional application notes',
        example: 'First-time car buyer, stable employment',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLoanDto.prototype, "notes", void 0);
//# sourceMappingURL=create-loan.dto.js.map