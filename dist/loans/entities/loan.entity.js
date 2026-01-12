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
exports.Loan = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const vehicle_entity_1 = require("../../vehicles/entities/vehicle.entity");
const offer_entity_1 = require("../../offers/entities/offer.entity");
let Loan = class Loan {
};
exports.Loan = Loan;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique loan application identifier',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Loan.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Loan application reference number',
        example: 'LN20240112001',
        uniqueItems: true
    }),
    (0, typeorm_1.Column)({ unique: true, length: 50 }),
    __metadata("design:type", String)
], Loan.prototype, "applicationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Requested loan amount',
        example: 10000000,
        minimum: 100000
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], Loan.prototype, "requestedAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Currency code (ISO 4217)',
        example: 'NGN',
        maxLength: 3
    }),
    (0, typeorm_1.Column)({ length: 3, default: 'NGN' }),
    __metadata("design:type", String)
], Loan.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Requested loan term in months',
        example: 36,
        minimum: 6,
        maximum: 84
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Loan.prototype, "requestedTermMonths", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applicant first name',
        example: 'John'
    }),
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Loan.prototype, "applicantFirstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applicant last name',
        example: 'Doe'
    }),
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Loan.prototype, "applicantLastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applicant email address',
        example: 'john.doe@example.com'
    }),
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Loan.prototype, "applicantEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applicant phone number',
        example: '+2348123456789'
    }),
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], Loan.prototype, "applicantPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applicant date of birth',
        example: '1990-05-15'
    }),
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Loan.prototype, "applicantDateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applicant national identification number',
        example: '12345678901'
    }),
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Loan.prototype, "applicantNationalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applicant address',
        example: '123 Lagos Street, Victoria Island, Lagos'
    }),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Loan.prototype, "applicantAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applicant employment status',
        example: 'Employed',
        enum: ['Employed', 'Self Employed', 'Unemployed', 'Student', 'Retired']
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20
    }),
    __metadata("design:type", String)
], Loan.prototype, "employmentStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applicant monthly income',
        example: 500000,
        minimum: 0
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], Loan.prototype, "monthlyIncome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applicant employer name',
        example: 'Tech Corp Ltd'
    }),
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Loan.prototype, "employerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Years at current employment',
        example: 3,
        minimum: 0
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 4, scale: 1, nullable: true }),
    __metadata("design:type", Number)
], Loan.prototype, "yearsAtCurrentJob", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Applicant existing monthly debt obligations',
        example: 150000,
        minimum: 0
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Loan.prototype, "existingDebtObligations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Purpose of the loan',
        example: 'Vehicle Purchase',
        enum: ['Vehicle Purchase', 'Refinancing', 'Personal Use', 'Business Use']
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 30,
        default: 'Vehicle Purchase'
    }),
    __metadata("design:type", String)
], Loan.prototype, "loanPurpose", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Down payment amount',
        example: 2000000,
        minimum: 0
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Loan.prototype, "downPayment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current loan application status',
        example: 'Under Review',
        enum: ['Submitted', 'Under Review', 'Approved', 'Rejected', 'Cancelled', 'Disbursed', 'Defaulted']
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        default: 'Submitted'
    }),
    __metadata("design:type", String)
], Loan.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Loan eligibility status',
        example: 'Eligible',
        enum: ['Eligible', 'Not Eligible', 'Conditionally Eligible', 'Pending Review']
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 30,
        default: 'Pending Review'
    }),
    __metadata("design:type", String)
], Loan.prototype, "eligibilityStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Credit score (if available)',
        example: 720,
        minimum: 300,
        maximum: 850
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Loan.prototype, "creditScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debt-to-income ratio',
        example: 0.35,
        minimum: 0,
        maximum: 1
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], Loan.prototype, "debtToIncomeRatio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Loan-to-value ratio',
        example: 0.80,
        minimum: 0,
        maximum: 1
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], Loan.prototype, "loanToValueRatio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Risk assessment score',
        example: 75,
        minimum: 0,
        maximum: 100
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Loan.prototype, "riskScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Risk category',
        example: 'Medium',
        enum: ['Low', 'Medium', 'High', 'Very High']
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 15,
        nullable: true
    }),
    __metadata("design:type", String)
], Loan.prototype, "riskCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Application rejection reason',
        example: 'Insufficient income'
    }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Loan.prototype, "rejectionReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional application notes',
        example: 'Applicant has strong employment history'
    }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Loan.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Supporting documents provided',
        example: '["ID_CARD", "PROOF_OF_INCOME", "BANK_STATEMENT"]'
    }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Loan.prototype, "supportingDocuments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Processing stage',
        example: 'Document Verification',
        enum: ['Initial Review', 'Document Verification', 'Credit Check', 'Risk Assessment', 'Final Approval', 'Disbursement']
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 30,
        default: 'Initial Review'
    }),
    __metadata("design:type", String)
], Loan.prototype, "processingStage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Assigned loan officer',
        example: 'officer@autochek.com'
    }),
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Loan.prototype, "assignedOfficer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when application was submitted',
        example: '2024-01-12T10:00:00Z'
    }),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Loan.prototype, "submittedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when application was approved/rejected',
        example: '2024-01-15T14:30:00Z'
    }),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Loan.prototype, "processedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Expected disbursement date',
        example: '2024-01-20T00:00:00Z'
    }),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Loan.prototype, "expectedDisbursementDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Actual disbursement date',
        example: '2024-01-18T12:00:00Z'
    }),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Loan.prototype, "actualDisbursementDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Record creation timestamp',
        example: '2024-01-12T10:00:00Z'
    }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Loan.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Record last update timestamp',
        example: '2024-01-12T15:30:00Z'
    }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Loan.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Associated vehicle ID',
        example: '550e8400-e29b-41d4-a716-446655440001'
    }),
    (0, typeorm_1.Column)({ name: 'vehicle_id' }),
    __metadata("design:type", String)
], Loan.prototype, "vehicleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Associated vehicle record',
        type: () => vehicle_entity_1.Vehicle
    }),
    (0, typeorm_1.ManyToOne)(() => vehicle_entity_1.Vehicle, (vehicle) => vehicle.loans, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'vehicle_id' }),
    __metadata("design:type", vehicle_entity_1.Vehicle)
], Loan.prototype, "vehicle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Loan offers generated for this application',
        type: () => [offer_entity_1.Offer]
    }),
    (0, typeorm_1.OneToMany)(() => offer_entity_1.Offer, (offer) => offer.loan),
    __metadata("design:type", Array)
], Loan.prototype, "offers", void 0);
exports.Loan = Loan = __decorate([
    (0, typeorm_1.Entity)('loans')
], Loan);
//# sourceMappingURL=loan.entity.js.map