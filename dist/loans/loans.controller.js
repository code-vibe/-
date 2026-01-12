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
exports.LoansController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const loans_service_1 = require("./loans.service");
const create_loan_dto_1 = require("./dto/create-loan.dto");
const update_loan_status_dto_1 = require("./dto/update-loan-status.dto");
const loan_query_dto_1 = require("./dto/loan-query.dto");
const loan_entity_1 = require("./entities/loan.entity");
let LoansController = class LoansController {
    constructor(loansService) {
        this.loansService = loansService;
    }
    async create(createLoanDto) {
        return this.loansService.create(createLoanDto);
    }
    async findAll(query) {
        return this.loansService.findAll(query);
    }
    async getStats() {
        return this.loansService.getStats();
    }
    async findByApplicationNumber(applicationNumber) {
        return this.loansService.findByApplicationNumber(applicationNumber);
    }
    async findOne(id) {
        return this.loansService.findOne(id);
    }
    async updateStatus(id, updateStatusDto) {
        return this.loansService.updateStatus(id, updateStatusDto);
    }
    async remove(id) {
        return this.loansService.remove(id);
    }
};
exports.LoansController = LoansController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Submit loan application',
        description: 'Submit a new loan application with automatic eligibility check and risk assessment'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Loan application successfully submitted',
        type: loan_entity_1.Loan,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid loan application data or vehicle not found',
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
    __metadata("design:paramtypes", [create_loan_dto_1.CreateLoanDto]),
    __metadata("design:returntype", Promise)
], LoansController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve loan applications',
        description: 'Get a paginated list of loan applications with optional filtering and sorting'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        description: 'Filter by loan status',
        enum: ['Submitted', 'Under Review', 'Approved', 'Rejected', 'Cancelled', 'Disbursed', 'Defaulted']
    }),
    (0, swagger_1.ApiQuery)({
        name: 'eligibilityStatus',
        required: false,
        description: 'Filter by eligibility status',
        enum: ['Eligible', 'Not Eligible', 'Conditionally Eligible', 'Pending Review']
    }),
    (0, swagger_1.ApiQuery)({
        name: 'processingStage',
        required: false,
        description: 'Filter by processing stage',
        enum: ['Initial Review', 'Document Verification', 'Credit Check', 'Risk Assessment', 'Final Approval', 'Disbursement']
    }),
    (0, swagger_1.ApiQuery)({
        name: 'employmentStatus',
        required: false,
        description: 'Filter by employment status',
        enum: ['Employed', 'Self Employed', 'Unemployed', 'Student', 'Retired']
    }),
    (0, swagger_1.ApiQuery)({
        name: 'minRequestedAmount',
        required: false,
        description: 'Filter by minimum requested amount',
        example: 5000000
    }),
    (0, swagger_1.ApiQuery)({
        name: 'maxRequestedAmount',
        required: false,
        description: 'Filter by maximum requested amount',
        example: 20000000
    }),
    (0, swagger_1.ApiQuery)({
        name: 'minMonthlyIncome',
        required: false,
        description: 'Filter by minimum monthly income',
        example: 200000
    }),
    (0, swagger_1.ApiQuery)({
        name: 'riskCategory',
        required: false,
        description: 'Filter by risk category',
        enum: ['Low', 'Medium', 'High', 'Very High']
    }),
    (0, swagger_1.ApiQuery)({
        name: 'assignedOfficer',
        required: false,
        description: 'Filter by assigned loan officer',
        example: 'officer@autochek.com'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'applicantEmail',
        required: false,
        description: 'Filter by applicant email',
        example: 'john.doe@example.com'
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
        enum: ['createdAt', 'requestedAmount', 'monthlyIncome', 'submittedAt', 'processedAt']
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortOrder',
        required: false,
        description: 'Sort order',
        enum: ['ASC', 'DESC']
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'List of loan applications with pagination info',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Loan' }
                },
                total: { type: 'number', example: 50 },
                page: { type: 'number', example: 1 },
                limit: { type: 'number', example: 10 },
                totalPages: { type: 'number', example: 5 },
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loan_query_dto_1.LoanQueryDto]),
    __metadata("design:returntype", Promise)
], LoansController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get loan statistics',
        description: 'Retrieve aggregated statistics about loan applications'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Loan application statistics',
        schema: {
            type: 'object',
            properties: {
                totalLoans: { type: 'number', example: 150 },
                byStatus: {
                    type: 'object',
                    example: {
                        'Submitted': 20,
                        'Under Review': 35,
                        'Approved': 45,
                        'Rejected': 30,
                        'Disbursed': 20
                    }
                },
                byEligibilityStatus: {
                    type: 'object',
                    example: { 'Eligible': 80, 'Not Eligible': 40, 'Conditionally Eligible': 20, 'Pending Review': 10 }
                },
                byRiskCategory: {
                    type: 'object',
                    example: { 'Low': 40, 'Medium': 60, 'High': 35, 'Very High': 15 }
                },
                averageRequestedAmount: { type: 'number', example: 8500000 },
                averageMonthlyIncome: { type: 'number', example: 550000 },
                averageProcessingTime: { type: 'number', example: 72.5 },
                approvalRate: { type: 'number', example: 65.5 },
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LoansController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('application/:applicationNumber'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get loan by application number',
        description: 'Retrieve a specific loan application by its application number'
    }),
    (0, swagger_1.ApiParam)({
        name: 'applicationNumber',
        description: 'Loan application number',
        example: 'LN20240112001'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Loan application found',
        type: loan_entity_1.Loan,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Loan application not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Loan with application number LN20240112001 not found' },
                error: { type: 'string', example: 'Not Found' },
            }
        }
    }),
    __param(0, (0, common_1.Param)('applicationNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoansController.prototype, "findByApplicationNumber", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get loan by ID',
        description: 'Retrieve a specific loan application by its UUID'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Loan UUID',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Loan application found',
        type: loan_entity_1.Loan,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Loan application not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Loan with ID 550e8400-e29b-41d4-a716-446655440000 not found' },
                error: { type: 'string', example: 'Not Found' },
            }
        }
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoansController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update loan status',
        description: 'Update the status and processing stage of a loan application'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Loan UUID',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Loan status successfully updated',
        type: loan_entity_1.Loan,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Loan application not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Loan with ID 550e8400-e29b-41d4-a716-446655440000 not found' },
                error: { type: 'string', example: 'Not Found' },
            }
        }
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid status update data',
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
    __metadata("design:paramtypes", [String, update_loan_status_dto_1.UpdateLoanStatusDto]),
    __metadata("design:returntype", Promise)
], LoansController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete loan application',
        description: 'Remove a loan application from the database (only for non-disbursed loans)'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Loan UUID',
        example: '550e8400-e29b-41d4-a716-446655440000'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'Loan application successfully deleted',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Loan application not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Loan with ID 550e8400-e29b-41d4-a716-446655440000 not found' },
                error: { type: 'string', example: 'Not Found' },
            }
        }
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Cannot delete disbursed or defaulted loans',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 400 },
                message: { type: 'string', example: 'Cannot delete disbursed or defaulted loans' },
                error: { type: 'string', example: 'Bad Request' },
            }
        }
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoansController.prototype, "remove", null);
exports.LoansController = LoansController = __decorate([
    (0, swagger_1.ApiTags)('loans'),
    (0, common_1.Controller)('loans'),
    __metadata("design:paramtypes", [loans_service_1.LoansService])
], LoansController);
//# sourceMappingURL=loans.controller.js.map