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
exports.Vehicle = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const valuation_entity_1 = require("../../valuations/entities/valuation.entity");
const loan_entity_1 = require("../../loans/entities/loan.entity");
let Vehicle = class Vehicle {
};
exports.Vehicle = Vehicle;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique vehicle identifier',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Vehicle.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle Identification Number (VIN)',
        example: '1HGCM82633A123456',
        maxLength: 17,
        minLength: 17
    }),
    (0, typeorm_1.Column)({ unique: true, length: 17 }),
    __metadata("design:type", String)
], Vehicle.prototype, "vin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle manufacturer',
        example: 'Toyota'
    }),
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Vehicle.prototype, "make", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle model',
        example: 'Camry'
    }),
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Vehicle.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Manufacturing year',
        example: 2020,
        minimum: 1900,
        maximum: new Date().getFullYear() + 1
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Vehicle.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle mileage in kilometers',
        example: 45000,
        minimum: 0
    }),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Vehicle.prototype, "mileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle condition',
        example: 'Good',
        enum: ['Excellent', 'Good', 'Fair', 'Poor']
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        default: 'Good'
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "condition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fuel type',
        example: 'Gasoline',
        enum: ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'CNG', 'LPG']
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        nullable: true
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "fuelType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Transmission type',
        example: 'Automatic',
        enum: ['Manual', 'Automatic', 'CVT']
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        nullable: true
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "transmission", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Engine size in liters',
        example: 2.5,
        minimum: 0.5,
        maximum: 10.0
    }),
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 3,
        scale: 1,
        nullable: true
    }),
    __metadata("design:type", Number)
], Vehicle.prototype, "engineSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle color',
        example: 'Black'
    }),
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of doors',
        example: 4,
        minimum: 2,
        maximum: 5
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Vehicle.prototype, "doors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle body type',
        example: 'Sedan',
        enum: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Truck', 'Van']
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 30,
        nullable: true
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "bodyType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional vehicle features and options',
        example: '["Air Conditioning", "GPS Navigation", "Leather Seats"]'
    }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "features", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle location (city, state)',
        example: 'Lagos, Nigeria'
    }),
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current owner information',
        example: 'John Doe Motors'
    }),
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "currentOwner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of previous owners',
        example: 1,
        minimum: 0
    }),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Vehicle.prototype, "previousOwners", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Accident history flag',
        example: false
    }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Vehicle.prototype, "hasAccidentHistory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Service history availability',
        example: true
    }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Vehicle.prototype, "hasServiceHistory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle registration status',
        example: 'Active',
        enum: ['Active', 'Expired', 'Suspended', 'Unknown']
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        default: 'Unknown'
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "registrationStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Insurance status',
        example: 'Insured',
        enum: ['Insured', 'Uninsured', 'Unknown']
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        default: 'Unknown'
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "insuranceStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle verification status',
        example: 'Verified',
        enum: ['Verified', 'Pending', 'Rejected', 'Not Verified']
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        default: 'Not Verified'
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "verificationStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'External data source information',
        example: '{"source": "RapidAPI", "provider": "VIN Lookup", "last_updated": "2024-01-12"}'
    }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "externalData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Record creation timestamp',
        example: '2024-01-12T10:00:00Z'
    }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Vehicle.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Record last update timestamp',
        example: '2024-01-12T15:30:00Z'
    }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Vehicle.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle valuations',
        type: () => [valuation_entity_1.Valuation]
    }),
    (0, typeorm_1.OneToMany)(() => valuation_entity_1.Valuation, (valuation) => valuation.vehicle),
    __metadata("design:type", Array)
], Vehicle.prototype, "valuations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Loan applications for this vehicle',
        type: () => [loan_entity_1.Loan]
    }),
    (0, typeorm_1.OneToMany)(() => loan_entity_1.Loan, (loan) => loan.vehicle),
    __metadata("design:type", Array)
], Vehicle.prototype, "loans", void 0);
exports.Vehicle = Vehicle = __decorate([
    (0, typeorm_1.Entity)('vehicles')
], Vehicle);
//# sourceMappingURL=vehicle.entity.js.map