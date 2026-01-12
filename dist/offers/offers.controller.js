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
exports.OffersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const offers_service_1 = require("./offers.service");
const create_offer_dto_1 = require("./dto/create-offer.dto");
const update_offer_status_dto_1 = require("./dto/update-offer-status.dto");
const offer_entity_1 = require("./entities/offer.entity");
let OffersController = class OffersController {
    constructor(offersService) {
        this.offersService = offersService;
    }
    async create(createOfferDto) {
        return this.offersService.create(createOfferDto);
    }
    async findAll(loanId) {
        return this.offersService.findAll(loanId);
    }
    async getStats() {
        return this.offersService.getStats();
    }
    async findOne(id) {
        return this.offersService.findOne(id);
    }
    async updateStatus(id, updateStatusDto) {
        return this.offersService.updateStatus(id, updateStatusDto);
    }
    async remove(id) {
        return this.offersService.remove(id);
    }
};
exports.OffersController = OffersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create loan offer',
        description: 'Generate a new loan offer with calculated terms and conditions'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Offer successfully created',
        type: offer_entity_1.Offer,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid offer data or loan not eligible for offers',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 400 },
                message: { type: 'string', example: 'Cannot create offers for loans with status: Rejected' },
                error: { type: 'string', example: 'Bad Request' },
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_offer_dto_1.CreateOfferDto]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve loan offers',
        description: 'Get all loan offers or filter by loan ID'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'loanId',
        required: false,
        description: 'Filter offers by loan ID',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'List of loan offers',
        type: [offer_entity_1.Offer],
    }),
    __param(0, (0, common_1.Query)('loanId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get offer statistics',
        description: 'Retrieve aggregated statistics about loan offers'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Offer statistics',
        schema: {
            type: 'object',
            properties: {
                totalOffers: { type: 'number', example: 75 },
                byStatus: {
                    type: 'object',
                    example: {
                        'Active': 25,
                        'Accepted': 20,
                        'Rejected': 15,
                        'Expired': 10,
                        'Withdrawn': 5
                    }
                },
                byOfferType: {
                    type: 'object',
                    example: { 'Standard': 50, 'Premium': 15, 'Budget': 10 }
                },
                averageAmount: { type: 'number', example: 8750000 },
                averageInterestRate: { type: 'number', example: 18.5 },
                acceptanceRate: { type: 'number', example: 75.5 },
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get offer by ID',
        description: 'Retrieve a specific loan offer by its UUID'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Offer UUID',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Offer found',
        type: offer_entity_1.Offer,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Offer not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Offer with ID 550e8400-e29b-41d4-a716-446655440000 not found' },
                error: { type: 'string', example: 'Not Found' },
            }
        }
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update offer status',
        description: 'Accept, reject, or update the status of a loan offer'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Offer UUID',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Offer status successfully updated',
        type: offer_entity_1.Offer,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Offer not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Offer with ID 550e8400-e29b-41d4-a716-446655440000 not found' },
                error: { type: 'string', example: 'Not Found' },
            }
        }
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid status transition',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 400 },
                message: { type: 'string', example: 'Cannot change status from Accepted to Rejected' },
                error: { type: 'string', example: 'Bad Request' },
            }
        }
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_offer_status_dto_1.UpdateOfferStatusDto]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete offer',
        description: 'Remove a loan offer from the database (only for non-accepted offers)'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Offer UUID',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'Offer successfully deleted',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Offer not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Offer with ID 550e8400-e29b-41d4-a716-446655440000 not found' },
                error: { type: 'string', example: 'Not Found' },
            }
        }
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Cannot delete accepted or disbursed offers',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 400 },
                message: { type: 'string', example: 'Cannot delete accepted or disbursed offers' },
                error: { type: 'string', example: 'Bad Request' },
            }
        }
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "remove", null);
exports.OffersController = OffersController = __decorate([
    (0, swagger_1.ApiTags)('offers'),
    (0, common_1.Controller)('offers'),
    __metadata("design:paramtypes", [offers_service_1.OffersService])
], OffersController);
//# sourceMappingURL=offers.controller.js.map