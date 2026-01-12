import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanStatusDto } from './dto/update-loan-status.dto';
import { LoanQueryDto } from './dto/loan-query.dto';
import { Loan } from './entities/loan.entity';

/**
 * Controller for loan application processing
 * Provides endpoints for submitting, managing, and tracking loan applications
 */
@ApiTags('loans')
@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  @ApiOperation({
    summary: 'Submit loan application',
    description: 'Submit a new loan application with automatic eligibility check and risk assessment'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Loan application successfully submitted',
    type: Loan,
  })
  @ApiBadRequestResponse({
    description: 'Invalid loan application data or vehicle not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Vehicle with ID 550e8400-e29b-41d4-a716-446655440000 not found' },
        error: { type: 'string', example: 'Bad Request' },
      }
    }
  })
  async create(@Body() createLoanDto: CreateLoanDto): Promise<Loan> {
    return this.loansService.create(createLoanDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve loan applications',
    description: 'Get a paginated list of loan applications with optional filtering and sorting'
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter by loan status',
    enum: ['Submitted', 'Under Review', 'Approved', 'Rejected', 'Cancelled', 'Disbursed', 'Defaulted']
  })
  @ApiQuery({
    name: 'eligibilityStatus',
    required: false,
    description: 'Filter by eligibility status',
    enum: ['Eligible', 'Not Eligible', 'Conditionally Eligible', 'Pending Review']
  })
  @ApiQuery({
    name: 'processingStage',
    required: false,
    description: 'Filter by processing stage',
    enum: ['Initial Review', 'Document Verification', 'Credit Check', 'Risk Assessment', 'Final Approval', 'Disbursement']
  })
  @ApiQuery({
    name: 'employmentStatus',
    required: false,
    description: 'Filter by employment status',
    enum: ['Employed', 'Self Employed', 'Unemployed', 'Student', 'Retired']
  })
  @ApiQuery({
    name: 'minRequestedAmount',
    required: false,
    description: 'Filter by minimum requested amount',
    example: 5000000
  })
  @ApiQuery({
    name: 'maxRequestedAmount',
    required: false,
    description: 'Filter by maximum requested amount',
    example: 20000000
  })
  @ApiQuery({
    name: 'minMonthlyIncome',
    required: false,
    description: 'Filter by minimum monthly income',
    example: 200000
  })
  @ApiQuery({
    name: 'riskCategory',
    required: false,
    description: 'Filter by risk category',
    enum: ['Low', 'Medium', 'High', 'Very High']
  })
  @ApiQuery({
    name: 'assignedOfficer',
    required: false,
    description: 'Filter by assigned loan officer',
    example: 'officer@autochek.com'
  })
  @ApiQuery({
    name: 'applicantEmail',
    required: false,
    description: 'Filter by applicant email',
    example: 'john.doe@example.com'
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number (1-based)',
    example: 1
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Records per page (max 100)',
    example: 10
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'Sort field',
    enum: ['createdAt', 'requestedAmount', 'monthlyIncome', 'submittedAt', 'processedAt']
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    description: 'Sort order',
    enum: ['ASC', 'DESC']
  })
  @ApiResponse({
    status: HttpStatus.OK,
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
  })
  async findAll(@Query() query: LoanQueryDto) {
    return this.loansService.findAll(query);
  }

  @Get('stats')
  @ApiOperation({
    summary: 'Get loan statistics',
    description: 'Retrieve aggregated statistics about loan applications'
  })
  @ApiResponse({
    status: HttpStatus.OK,
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
  })
  async getStats() {
    return this.loansService.getStats();
  }

  @Get('application/:applicationNumber')
  @ApiOperation({
    summary: 'Get loan by application number',
    description: 'Retrieve a specific loan application by its application number'
  })
  @ApiParam({
    name: 'applicationNumber',
    description: 'Loan application number',
    example: 'LN20240112001'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Loan application found',
    type: Loan,
  })
  @ApiNotFoundResponse({
    description: 'Loan application not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Loan with application number LN20240112001 not found' },
        error: { type: 'string', example: 'Not Found' },
      }
    }
  })
  async findByApplicationNumber(@Param('applicationNumber') applicationNumber: string): Promise<Loan> {
    return this.loansService.findByApplicationNumber(applicationNumber);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get loan by ID',
    description: 'Retrieve a specific loan application by its UUID'
  })
  @ApiParam({
    name: 'id',
    description: 'Loan UUID',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Loan application found',
    type: Loan,
  })
  @ApiNotFoundResponse({
    description: 'Loan application not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Loan with ID 550e8400-e29b-41d4-a716-446655440000 not found' },
        error: { type: 'string', example: 'Not Found' },
      }
    }
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Loan> {
    return this.loansService.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: 'Update loan status',
    description: 'Update the status and processing stage of a loan application'
  })
  @ApiParam({
    name: 'id',
    description: 'Loan UUID',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Loan status successfully updated',
    type: Loan,
  })
  @ApiNotFoundResponse({
    description: 'Loan application not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Loan with ID 550e8400-e29b-41d4-a716-446655440000 not found' },
        error: { type: 'string', example: 'Not Found' },
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Invalid status update data',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'array', items: { type: 'string' } },
        error: { type: 'string', example: 'Bad Request' },
      }
    }
  })
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStatusDto: UpdateLoanStatusDto,
  ): Promise<Loan> {
    return this.loansService.updateStatus(id, updateStatusDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete loan application',
    description: 'Remove a loan application from the database (only for non-disbursed loans)'
  })
  @ApiParam({
    name: 'id',
    description: 'Loan UUID',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Loan application successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Loan application not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Loan with ID 550e8400-e29b-41d4-a716-446655440000 not found' },
        error: { type: 'string', example: 'Not Found' },
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Cannot delete disbursed or defaulted loans',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Cannot delete disbursed or defaulted loans' },
        error: { type: 'string', example: 'Bad Request' },
      }
    }
  })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.loansService.remove(id);
  }
}
