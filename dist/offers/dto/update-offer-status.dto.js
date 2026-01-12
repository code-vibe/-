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
exports.UpdateOfferStatusDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateOfferStatusDto {
}
exports.UpdateOfferStatusDto = UpdateOfferStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Updated offer status',
        example: 'Accepted',
        enum: ['Draft', 'Active', 'Accepted', 'Rejected', 'Expired', 'Withdrawn', 'Cancelled']
    }),
    (0, class_validator_1.IsEnum)(['Draft', 'Active', 'Accepted', 'Rejected', 'Expired', 'Withdrawn', 'Cancelled']),
    __metadata("design:type", String)
], UpdateOfferStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Customer rejection reason (if applicable)',
        example: 'Interest rate too high',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOfferStatusDto.prototype, "rejectionReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional notes about the status update',
        example: 'Customer accepted offer, proceeding with disbursement',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOfferStatusDto.prototype, "notes", void 0);
//# sourceMappingURL=update-offer-status.dto.js.map