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
exports.ValuationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const valuations_service_1 = require("./valuations.service");
const create_valuation_dto_1 = require("./dto/create-valuation.dto");
const update_valuation_dto_1 = require("./dto/update-valuation.dto");
const valuation_entity_1 = require("./entities/valuation.entity");
let ValuationsController = class ValuationsController {
    constructor(valuationsService) {
        this.valuationsService = valuationsService;
    }
    async create(createValuationDto) {
        return this.valuationsService.create(createValuationDto);
    }
    async findAll(vehicleId) {
        return this.valuationsService.findAll(vehicleId);
    }
    async getStats() {
        return this.valuationsService.getStats();
    }
    async findOne(id) {
        return this.valuationsService.findOne(id);
    }
    async update(id, updateValuationDto) {
        return this.valuationsService.update(id, updateValuationDto);
    }
    async remove(id) {
        return this.valuationsService.remove(id);
    }
};
exports.ValuationsController = ValuationsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Request vehicle valuation',
        description: 'Create a new valuation request for a vehicle using various valuation methods'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Valuation successfully created',
        type: valuation_entity_1.Valuation,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid valuation request or vehicle not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 400 },
                message: { type: 'string', example: 'Vehicle with ID 550e8400-e29b-41d4-a716-446655440000 not found' },
                error: { type: 'string', example: 'Bad Request' },
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_valuation_dto_1.CreateValuationDto]),
    __metadata("design:returntype", Promise)
], ValuationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve valuations',
        description: 'Get all valuations or filter by vehicle ID'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'vehicleId',
        required: false,
        description: 'Filter valuations by vehicle ID',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'List of valuations',
        type: [valuation_entity_1.Valuation],
    }),
    __param(0, (0, common_1.Query)('vehicleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ValuationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get valuation statistics',
        description: 'Retrieve aggregated statistics about valuations'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Valuation statistics',
        schema: {
            type: 'object',
            properties: {
                totalValuations: { type: 'number', example: 50 },
                byMethod: {
                    type: 'object',
                    example: {
                        'External API': 25,
                        'Market Comparison': 15,
                        'Depreciation Model': 10
                    }
                },
                byStatus: {
                    type: 'object',
                    example: { 'Completed': 45, 'Failed': 3, 'In Progress': 2 }
                },
                averageValue: { type: 'number', example: 8500000 },
                averageProcessingTime: { type: 'number', example: 1250 },
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ValuationsController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get valuation by ID',
        description: 'Retrieve a specific valuation record by its UUID'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Valuation UUID',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Valuation found',
        type: valuation_entity_1.Valuation,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Valuation not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Valuation with ID 550e8400-e29b-41d4-a716-446655440000 not found' },
                error: { type: 'string', example: 'Not Found' },
            }
        }
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ValuationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update valuation',
        description: 'Update an existing valuation record'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Valuation UUID',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Valuation successfully updated',
        type: valuation_entity_1.Valuation,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Valuation not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Valuation with ID 550e8400-e29b-41d4-a716-446655440000 not found' },
                error: { type: 'string', example: 'Not Found' },
            }
        }
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_valuation_dto_1.UpdateValuationDto]),
    __metadata("design:returntype", Promise)
], ValuationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete valuation',
        description: 'Remove a valuation record from the database'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Valuation UUID',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'Valuation successfully deleted',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Valuation not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Valuation with ID 550e8400-e29b-41d4-a716-446655440000 not found' },
                error: { type: 'string', example: 'Not Found' },
            }
        }
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ValuationsController.prototype, "remove", null);
exports.ValuationsController = ValuationsController = __decorate([
    (0, swagger_1.ApiTags)('valuations'),
    (0, common_1.Controller)('valuations'),
    __metadata("design:paramtypes", [valuations_service_1.ValuationsService])
], ValuationsController);
//# sourceMappingURL=valuations.controller.js.map