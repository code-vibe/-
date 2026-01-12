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
exports.UpdateLoanStatusDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateLoanStatusDto {
}
exports.UpdateLoanStatusDto = UpdateLoanStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Updated loan application status',
        example: 'Approved',
        enum: ['Submitted', 'Under Review', 'Approved', 'Rejected', 'Cancelled', 'Disbursed', 'Defaulted']
    }),
    (0, class_validator_1.IsEnum)(['Submitted', 'Under Review', 'Approved', 'Rejected', 'Cancelled', 'Disbursed', 'Defaulted']),
    __metadata("design:type", String)
], UpdateLoanStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Updated processing stage',
        example: 'Final Approval',
        enum: ['Initial Review', 'Document Verification', 'Credit Check', 'Risk Assessment', 'Final Approval', 'Disbursement'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Initial Review', 'Document Verification', 'Credit Check', 'Risk Assessment', 'Final Approval', 'Disbursement']),
    __metadata("design:type", String)
], UpdateLoanStatusDto.prototype, "processingStage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reason for rejection (if applicable)',
        example: 'Insufficient income documentation',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLoanStatusDto.prototype, "rejectionReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional notes about the status update',
        example: 'Approved pending final document verification',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLoanStatusDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Assigned loan officer',
        example: 'officer@autochek.com',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLoanStatusDto.prototype, "assignedOfficer", void 0);
//# sourceMappingURL=update-loan-status.dto.js.map