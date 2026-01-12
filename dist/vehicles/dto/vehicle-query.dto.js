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
exports.VehicleQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class VehicleQueryDto {
}
exports.VehicleQueryDto = VehicleQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by vehicle make',
        example: 'Toyota',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VehicleQueryDto.prototype, "make", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by vehicle model',
        example: 'Camry',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VehicleQueryDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by minimum year',
        example: 2015,
        minimum: 1900,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1900),
    __metadata("design:type", Number)
], VehicleQueryDto.prototype, "minYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by maximum year',
        example: 2023,
        minimum: 1900,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1900),
    (0, class_validator_1.Max)(new Date().getFullYear() + 1),
    __metadata("design:type", Number)
], VehicleQueryDto.prototype, "maxYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by maximum mileage',
        example: 50000,
        minimum: 0,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], VehicleQueryDto.prototype, "maxMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by vehicle condition',
        example: 'Good',
        enum: ['Excellent', 'Good', 'Fair', 'Poor'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Excellent', 'Good', 'Fair', 'Poor']),
    __metadata("design:type", String)
], VehicleQueryDto.prototype, "condition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by fuel type',
        example: 'Gasoline',
        enum: ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'CNG', 'LPG'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'CNG', 'LPG']),
    __metadata("design:type", String)
], VehicleQueryDto.prototype, "fuelType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by transmission type',
        example: 'Automatic',
        enum: ['Manual', 'Automatic', 'CVT'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Manual', 'Automatic', 'CVT']),
    __metadata("design:type", String)
], VehicleQueryDto.prototype, "transmission", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by body type',
        example: 'Sedan',
        enum: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Truck', 'Van'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Truck', 'Van']),
    __metadata("design:type", String)
], VehicleQueryDto.prototype, "bodyType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by location',
        example: 'Lagos',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VehicleQueryDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filter by verification status',
        example: 'Verified',
        enum: ['Verified', 'Pending', 'Rejected', 'Not Verified'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Verified', 'Pending', 'Rejected', 'Not Verified']),
    __metadata("design:type", String)
], VehicleQueryDto.prototype, "verificationStatus", void 0);
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
], VehicleQueryDto.prototype, "page", void 0);
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
], VehicleQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sort field',
        example: 'createdAt',
        enum: ['createdAt', 'year', 'mileage', 'make', 'model'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['createdAt', 'year', 'mileage', 'make', 'model']),
    __metadata("design:type", String)
], VehicleQueryDto.prototype, "sortBy", void 0);
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
], VehicleQueryDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=vehicle-query.dto.js.map