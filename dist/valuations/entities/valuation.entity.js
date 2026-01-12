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
exports.Valuation = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const vehicle_entity_1 = require("../../vehicles/entities/vehicle.entity");
let Valuation = class Valuation {
};
exports.Valuation = Valuation;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique valuation identifier',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Valuation.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Estimated market value in local currency',
        example: 15000000,
        minimum: 0
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], Valuation.prototype, "estimatedValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Currency code (ISO 4217)',
        example: 'NGN',
        maxLength: 3
    }),
    (0, typeorm_1.Column)({ length: 3, default: 'NGN' }),
    __metadata("design:type", String)
], Valuation.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valuation method used',
        example: 'External API',
        enum: ['External API', 'Manual Assessment', 'Market Comparison', 'Machine Learning', 'Depreciation Model']
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 30
    }),
    __metadata("design:type", String)
], Valuation.prototype, "valuationMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data source for the valuation',
        example: 'RapidAPI VIN Lookup'
    }),
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Valuation.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Confidence score (0-100)',
        example: 85,
        minimum: 0,
        maximum: 100
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Valuation.prototype, "confidenceScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Minimum estimated value',
        example: 14000000,
        minimum: 0
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Valuation.prototype, "minValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Maximum estimated value',
        example: 16000000,
        minimum: 0
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Valuation.prototype, "maxValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Market conditions at time of valuation',
        example: 'Stable',
        enum: ['High Demand', 'Stable', 'Declining', 'Volatile', 'Unknown']
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        default: 'Unknown'
    }),
    __metadata("design:type", String)
], Valuation.prototype, "marketCondition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mileage adjustment factor applied',
        example: -0.05
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], Valuation.prototype, "mileageAdjustment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Condition adjustment factor applied',
        example: 0.10
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], Valuation.prototype, "conditionAdjustment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Age adjustment factor applied',
        example: -0.15
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], Valuation.prototype, "ageAdjustment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Location-based adjustment factor',
        example: 0.08
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], Valuation.prototype, "locationAdjustment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Comparable vehicles found',
        example: 15,
        minimum: 0
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Valuation.prototype, "comparableVehiclesCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Days since last market analysis',
        example: 5,
        minimum: 0
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Valuation.prototype, "daysSinceLastMarketAnalysis", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'External API response data',
        example: '{"provider": "AutoTrader", "data": {...}}'
    }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Valuation.prototype, "externalData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valuation notes and comments',
        example: 'Vehicle in excellent condition, low mileage for year'
    }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Valuation.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valuation validity period in days',
        example: 30,
        minimum: 1
    }),
    (0, typeorm_1.Column)({ default: 30 }),
    __metadata("design:type", Number)
], Valuation.prototype, "validityDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valuation expiry date',
        example: '2024-02-11T10:00:00Z'
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Valuation.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether this valuation is currently active',
        example: true
    }),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Valuation.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valuation status',
        example: 'Completed',
        enum: ['Pending', 'In Progress', 'Completed', 'Failed', 'Expired']
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        default: 'Completed'
    }),
    __metadata("design:type", String)
], Valuation.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User or system that requested the valuation',
        example: 'system'
    }),
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Valuation.prototype, "requestedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Processing time in milliseconds',
        example: 1250,
        minimum: 0
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Valuation.prototype, "processingTimeMs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Record creation timestamp',
        example: '2024-01-12T10:00:00Z'
    }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Valuation.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Record last update timestamp',
        example: '2024-01-12T15:30:00Z'
    }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Valuation.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Associated vehicle ID',
        example: '550e8400-e29b-41d4-a716-446655440001'
    }),
    (0, typeorm_1.Column)({ name: 'vehicle_id' }),
    __metadata("design:type", String)
], Valuation.prototype, "vehicleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Associated vehicle record',
        type: () => vehicle_entity_1.Vehicle
    }),
    (0, typeorm_1.ManyToOne)(() => vehicle_entity_1.Vehicle, (vehicle) => vehicle.valuations, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'vehicle_id' }),
    __metadata("design:type", vehicle_entity_1.Vehicle)
], Valuation.prototype, "vehicle", void 0);
exports.Valuation = Valuation = __decorate([
    (0, typeorm_1.Entity)('valuations')
], Valuation);
//# sourceMappingURL=valuation.entity.js.map