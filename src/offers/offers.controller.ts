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
} from '@nestjs/swagger';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferStatusDto } from './dto/update-offer-status.dto';
import { Offer } from './entities/offer.entity';

/**
 * Controller for loan offer management
 * Provides endpoints for creating, managing, and responding to loan offers
 */
@ApiTags('offers')
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create loan offer',
    description: 'Generate a new loan offer with calculated terms and conditions'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Offer successfully created',
    type: Offer,
  })
  @ApiBadRequestResponse({
    description: 'Invalid offer data or loan not eligible for offers',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Cannot create offers for loans with status: Rejected' },
        error: { type: 'string', example: 'Bad Request' },
      }
    }
  })
  async create(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offersService.create(createOfferDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve loan offers',
    description: 'Get all loan offers or filter by loan ID'
  })
  @ApiQuery({
    name: 'loanId',
    required: false,
    description: 'Filter offers by loan ID',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of loan offers',
    type: [Offer],
  })
  async findAll(@Query('loanId') loanId?: string): Promise<Offer[]> {
    return this.offersService.findAll(loanId);
  }

  @Get('stats')
  @ApiOperation({
    summary: 'Get offer statistics',
    description: 'Retrieve aggregated statistics about loan offers'
  })
  @ApiResponse({
    status: HttpStatus.OK,
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
  })
  async getStats() {
    return this.offersService.getStats();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get offer by ID',
    description: 'Retrieve a specific loan offer by its UUID'
  })
  @ApiParam({
    name: 'id',
    description: 'Offer UUID',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Offer found',
    type: Offer,
  })
  @ApiNotFoundResponse({
    description: 'Offer not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Offer with ID 550e8400-e29b-41d4-a716-446655440000 not found' },
        error: { type: 'string', example: 'Not Found' },
      }
    }
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Offer> {
    return this.offersService.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: 'Update offer status',
    description: 'Accept, reject, or update the status of a loan offer'
  })
  @ApiParam({
    name: 'id',
    description: 'Offer UUID',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Offer status successfully updated',
    type: Offer,
  })
  @ApiNotFoundResponse({
    description: 'Offer not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Offer with ID 550e8400-e29b-41d4-a716-446655440000 not found' },
        error: { type: 'string', example: 'Not Found' },
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Invalid status transition',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Cannot change status from Accepted to Rejected' },
        error: { type: 'string', example: 'Bad Request' },
      }
    }
  })
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStatusDto: UpdateOfferStatusDto,
  ): Promise<Offer> {
    return this.offersService.updateStatus(id, updateStatusDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete offer',
    description: 'Remove a loan offer from the database (only for non-accepted offers)'
  })
  @ApiParam({
    name: 'id',
    description: 'Offer UUID',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Offer successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Offer not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Offer with ID 550e8400-e29b-41d4-a716-446655440000 not found' },
        error: { type: 'string', example: 'Not Found' },
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Cannot delete accepted or disbursed offers',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Cannot delete accepted or disbursed offers' },
        error: { type: 'string', example: 'Bad Request' },
      }
    }
  })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.offersService.remove(id);
  }
}
