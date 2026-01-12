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
exports.CreateVehicleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateVehicleDto {
}
exports.CreateVehicleDto = CreateVehicleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle Identification Number (VIN) - must be exactly 17 characters',
        example: '1HGCM82633A123456',
        maxLength: 17,
        minLength: 17
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(17, 17, { message: 'VIN must be exactly 17 characters long' }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "vin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle manufacturer',
        example: 'Toyota',
        maxLength: 100
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "make", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle model',
        example: 'Camry',
        maxLength: 100
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Manufacturing year',
        example: 2020,
        minimum: 1900
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1900, { message: 'Year must be 1900 or later' }),
    (0, class_validator_1.Max)(new Date().getFullYear() + 1, { message: 'Year cannot be in the future beyond next year' }),
    __metadata("design:type", Number)
], CreateVehicleDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle mileage in kilometers',
        example: 45000,
        minimum: 0,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'Mileage cannot be negative' }),
    __metadata("design:type", Number)
], CreateVehicleDto.prototype, "mileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle condition',
        example: 'Good',
        enum: ['Excellent', 'Good', 'Fair', 'Poor'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Excellent', 'Good', 'Fair', 'Poor']),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "condition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fuel type',
        example: 'Gasoline',
        enum: ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'CNG', 'LPG'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'CNG', 'LPG']),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "fuelType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Transmission type',
        example: 'Automatic',
        enum: ['Manual', 'Automatic', 'CVT'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Manual', 'Automatic', 'CVT']),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "transmission", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Engine size in liters',
        example: 2.5,
        minimum: 0.5,
        maximum: 10.0,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.5),
    (0, class_validator_1.Max)(10.0),
    __metadata("design:type", Number)
], CreateVehicleDto.prototype, "engineSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle color',
        example: 'Black',
        maxLength: 50,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of doors',
        example: 4,
        minimum: 2,
        maximum: 5,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(2),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateVehicleDto.prototype, "doors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle body type',
        example: 'Sedan',
        enum: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Truck', 'Van'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Truck', 'Van']),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "bodyType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle features and options',
        example: ['Air Conditioning', 'GPS Navigation', 'Leather Seats'],
        type: [String],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateVehicleDto.prototype, "features", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle location (city, state)',
        example: 'Lagos, Nigeria',
        maxLength: 100,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current owner information',
        example: 'John Doe Motors',
        maxLength: 100,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "currentOwner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of previous owners',
        example: 1,
        minimum: 0,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateVehicleDto.prototype, "previousOwners", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Accident history flag',
        example: false,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateVehicleDto.prototype, "hasAccidentHistory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Service history availability',
        example: true,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateVehicleDto.prototype, "hasServiceHistory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle registration status',
        example: 'Active',
        enum: ['Active', 'Expired', 'Suspended', 'Unknown'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Active', 'Expired', 'Suspended', 'Unknown']),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "registrationStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Insurance status',
        example: 'Insured',
        enum: ['Insured', 'Uninsured', 'Unknown'],
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Insured', 'Uninsured', 'Unknown']),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "insuranceStatus", void 0);
//# sourceMappingURL=create-vehicle.dto.js.map