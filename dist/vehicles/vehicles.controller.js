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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const vehicles_service_1 = require("./vehicles.service");
const create_vehicle_dto_1 = require("./dto/create-vehicle.dto");
const update_vehicle_dto_1 = require("./dto/update-vehicle.dto");
const vehicle_query_dto_1 = require("./dto/vehicle-query.dto");
const vehicle_entity_1 = require("./entities/vehicle.entity");
let VehiclesController = class VehiclesController {
    constructor(vehiclesService) {
        this.vehiclesService = vehiclesService;
    }
    async create(createVehicleDto) {
        return this.vehiclesService.create(createVehicleDto);
    }
    async findAll(query) {
        return this.vehiclesService.findAll(query);
    }
    async getStats() {
        return this.vehiclesService.getStats();
    }
    async findByVin(vin) {
        return this.vehiclesService.findByVin(vin);
    }
    async findOne(id) {
        return this.vehiclesService.findOne(id);
    }
    async update(id, updateVehicleDto) {
        return this.vehiclesService.update(id, updateVehicleDto);
    }
    async remove(id) {
        return this.vehiclesService.remove(id);
    }
};
exports.VehiclesController = VehiclesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Ingest new vehicle data',
        description: 'Create a new vehicle record with VIN validation and optional external data enrichment'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Vehicle successfully created',
        type: vehicle_entity_1.Vehicle,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid vehicle data or VIN format',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 400 },
                message: { type: 'string', example: 'Invalid VIN format' },
                error: { type: 'string', example: 'Bad Request' },
            }
        }
    }),
    (0, swagger_1.ApiConflictResponse)({
        description: 'Vehicle with this VIN already exists',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 409 },
                message: { type: 'string', example: 'Vehicle with VIN 1HGCM82633A123456 already exists' },
                error: { type: 'string', example: 'Conflict' },
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vehicle_dto_1.CreateVehicleDto]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve vehicles with filtering',
        description: 'Get a paginated list of vehicles with optional filtering and sorting'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'make',
        required: false,
        description: 'Filter by vehicle make',
        example: 'Toyota'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'model',
        required: false,
        description: 'Filter by vehicle model',
        example: 'Camry'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'minYear',
        required: false,
        description: 'Filter by minimum year',
        example: 2015
    }),
    (0, swagger_1.ApiQuery)({
        name: 'maxYear',
        required: false,
        description: 'Filter by maximum year',
        example: 2023
    }),
    (0, swagger_1.ApiQuery)({
        name: 'maxMileage',
        required: false,
        description: 'Filter by maximum mileage',
        example: 50000
    }),
    (0, swagger_1.ApiQuery)({
        name: 'condition',
        required: false,
        description: 'Filter by vehicle condition',
        enum: ['Excellent', 'Good', 'Fair', 'Poor']
    }),
    (0, swagger_1.ApiQuery)({
        name: 'fuelType',
        required: false,
        description: 'Filter by fuel type',
        enum: ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'CNG', 'LPG']
    }),
    (0, swagger_1.ApiQuery)({
        name: 'transmission',
        required: false,
        description: 'Filter by transmission type',
        enum: ['Manual', 'Automatic', 'CVT']
    }),
    (0, swagger_1.ApiQuery)({
        name: 'bodyType',
        required: false,
        description: 'Filter by body type',
        enum: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Truck', 'Van']
    }),
    (0, swagger_1.ApiQuery)({
        name: 'location',
        required: false,
        description: 'Filter by location',
        example: 'Lagos'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'verificationStatus',
        required: false,
        description: 'Filter by verification status',
        enum: ['Verified', 'Pending', 'Rejected', 'Not Verified']
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        description: 'Page number (1-based)',
        example: 1
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        description: 'Records per page (max 100)',
        example: 10
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortBy',
        required: false,
        description: 'Sort field',
        enum: ['createdAt', 'year', 'mileage', 'make', 'model']
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortOrder',
        required: false,
        description: 'Sort order',
        enum: ['ASC', 'DESC']
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'List of vehicles with pagination info',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Vehicle' }
                },
                total: { type: 'number', example: 100 },
                page: { type: 'number', example: 1 },
                limit: { type: 'number', example: 10 },
                totalPages: { type: 'number', example: 10 },
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vehicle_query_dto_1.VehicleQueryDto]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get vehicle statistics',
        description: 'Retrieve aggregated statistics about vehicles in the database'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Vehicle statistics',
        schema: {
            type: 'object',
            properties: {
                totalVehicles: { type: 'number', example: 150 },
                byCondition: {
                    type: 'object',
                    example: { 'Excellent': 25, 'Good': 75, 'Fair': 40, 'Poor': 10 }
                },
                byFuelType: {
                    type: 'object',
                    example: { 'Gasoline': 100, 'Diesel': 30, 'Electric': 15, 'Hybrid': 5 }
                },
                byYear: {
                    type: 'object',
                    example: { '2023': 20, '2022': 35, '2021': 45, '2020': 50 }
                },
                averageYear: { type: 'number', example: 2019.5 },
                averageMileage: { type: 'number', example: 45000.25 },
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('vin/:vin'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get vehicle by VIN',
        description: 'Retrieve a specific vehicle by its VIN number'
    }),
    (0, swagger_1.ApiParam)({
        name: 'vin',
        description: 'Vehicle Identification Number (17 characters)',
        example: '1HGCM82633A123456'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Vehicle found',
        type: vehicle_entity_1.Vehicle,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Vehicle not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Vehicle with VIN 1HGCM82633A123456 not found' },
                error: { type: 'string', example: 'Not Found' },
            }
        }
    }),
    __param(0, (0, common_1.Param)('vin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "findByVin", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get vehicle by ID',
        description: 'Retrieve a specific vehicle by its UUID'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Vehicle UUID',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Vehicle found',
        type: vehicle_entity_1.Vehicle,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Vehicle not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Vehicle with ID 550e8400-e29b-41d4-a716-446655440000 not found' },
                error: { type: 'string', example: 'Not Found' },
            }
        }
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update vehicle data',
        description: 'Update an existing vehicle record with partial data'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Vehicle UUID',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Vehicle successfully updated',
        type: vehicle_entity_1.Vehicle,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Vehicle not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Vehicle with ID 550e8400-e29b-41d4-a716-446655440000 not found' },
                error: { type: 'string', example: 'Not Found' },
            }
        }
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid update data',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 400 },
                message: { type: 'array', items: { type: 'string' } },
                error: { type: 'string', example: 'Bad Request' },
            }
        }
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_vehicle_dto_1.UpdateVehicleDto]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete vehicle',
        description: 'Remove a vehicle record from the database'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Vehicle UUID',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'Vehicle successfully deleted',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Vehicle not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Vehicle with ID 550e8400-e29b-41d4-a716-446655440000 not found' },
                error: { type: 'string', example: 'Not Found' },
            }
        }
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "remove", null);
exports.VehiclesController = VehiclesController = __decorate([
    (0, swagger_1.ApiTags)('vehicles'),
    (0, common_1.Controller)('vehicles'),
    __metadata("design:paramtypes", [vehicles_service_1.VehiclesService])
], VehiclesController);
//# sourceMappingURL=vehicles.controller.js.map