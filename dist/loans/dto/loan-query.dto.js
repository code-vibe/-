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
exports.LoanQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class LoanQueryDto {
}
exports.LoanQueryDto = LoanQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by loan status',
        example: 'Under Review',
        enum: ['Submitted', 'Under Review', 'Approved', 'Rejected', 'Cancelled', 'Disbursed', 'Defaulted'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Submitted', 'Under Review', 'Approved', 'Rejected', 'Cancelled', 'Disbursed', 'Defaulted']),
    __metadata("design:type", String)
], LoanQueryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by eligibility status',
        example: 'Eligible',
        enum: ['Eligible', 'Not Eligible', 'Conditionally Eligible', 'Pending Review'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Eligible', 'Not Eligible', 'Conditionally Eligible', 'Pending Review']),
    __metadata("design:type", String)
], LoanQueryDto.prototype, "eligibilityStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by processing stage',
        example: 'Document Verification',
        enum: ['Initial Review', 'Document Verification', 'Credit Check', 'Risk Assessment', 'Final Approval', 'Disbursement'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Initial Review', 'Document Verification', 'Credit Check', 'Risk Assessment', 'Final Approval', 'Disbursement']),
    __metadata("design:type", String)
], LoanQueryDto.prototype, "processingStage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by employment status',
        example: 'Employed',
        enum: ['Employed', 'Self Employed', 'Unemployed', 'Student', 'Retired'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Employed', 'Self Employed', 'Unemployed', 'Student', 'Retired']),
    __metadata("design:type", String)
], LoanQueryDto.prototype, "employmentStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by minimum requested amount',
        example: 5000000,
        minimum: 0,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], LoanQueryDto.prototype, "minRequestedAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by maximum requested amount',
        example: 20000000,
        minimum: 0,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], LoanQueryDto.prototype, "maxRequestedAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by minimum monthly income',
        example: 200000,
        minimum: 0,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], LoanQueryDto.prototype, "minMonthlyIncome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by risk category',
        example: 'Medium',
        enum: ['Low', 'Medium', 'High', 'Very High'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Low', 'Medium', 'High', 'Very High']),
    __metadata("design:type", String)
], LoanQueryDto.prototype, "riskCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by assigned loan officer',
        example: 'officer@autochek.com',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoanQueryDto.prototype, "assignedOfficer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by applicant email',
        example: 'john.doe@example.com',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoanQueryDto.prototype, "applicantEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Page number for pagination (1-based)',
        example: 1,
        minimum: 1,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], LoanQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of records per page',
        example: 10,
        minimum: 1,
        maximum: 100,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], LoanQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sort field',
        example: 'createdAt',
        enum: ['createdAt', 'requestedAmount', 'monthlyIncome', 'submittedAt', 'processedAt'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['createdAt', 'requestedAmount', 'monthlyIncome', 'submittedAt', 'processedAt']),
    __metadata("design:type", String)
], LoanQueryDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sort order',
        example: 'DESC',
        enum: ['ASC', 'DESC'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['ASC', 'DESC']),
    __metadata("design:type", String)
], LoanQueryDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=loan-query.dto.js.map