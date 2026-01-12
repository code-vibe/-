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
exports.CreateValuationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateValuationDto {
}
exports.CreateValuationDto = CreateValuationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle ID to be valued',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateValuationDto.prototype, "vehicleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Preferred valuation method',
        example: 'External API',
        enum: ['External API', 'Manual Assessment', 'Market Comparison', 'Machine Learning', 'Depreciation Model'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['External API', 'Manual Assessment', 'Market Comparison', 'Machine Learning', 'Depreciation Model']),
    __metadata("design:type", String)
], CreateValuationDto.prototype, "valuationMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Manual estimated value (if using manual assessment)',
        example: 15000000,
        minimum: 100000,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(100000, { message: 'Estimated value must be at least 100,000' }),
    __metadata("design:type", Number)
], CreateValuationDto.prototype, "estimatedValue", void 0);
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
], CreateValuationDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data source for the valuation',
        example: 'RapidAPI VIN Lookup',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateValuationDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Market conditions assessment',
        example: 'Stable',
        enum: ['High Demand', 'Stable', 'Declining', 'Volatile', 'Unknown'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['High Demand', 'Stable', 'Declining', 'Volatile', 'Unknown']),
    __metadata("design:type", String)
], CreateValuationDto.prototype, "marketCondition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Minimum estimated value range',
        example: 14000000,
        minimum: 0,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateValuationDto.prototype, "minValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Maximum estimated value range',
        example: 16000000,
        minimum: 0,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateValuationDto.prototype, "maxValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Confidence score (0-100)',
        example: 85,
        minimum: 0,
        maximum: 100,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateValuationDto.prototype, "confidenceScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valuation notes and comments',
        example: 'Vehicle in excellent condition, low mileage for year',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateValuationDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valuation validity period in days',
        example: 30,
        minimum: 1,
        maximum: 365,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(365),
    __metadata("design:type", Number)
], CreateValuationDto.prototype, "validityDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User or system requesting the valuation',
        example: 'user@autochek.com',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateValuationDto.prototype, "requestedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Force new valuation even if recent one exists',
        example: false,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateValuationDto.prototype, "forceNew", void 0);
//# sourceMappingURL=create-valuation.dto.js.map