import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { ValuationsService } from './valuations.service';
import { CreateValuationDto } from './dto/create-valuation.dto';
import { Valuation } from './entities/valuation.entity';

@ApiTags('valuations')
@Controller('valuations')
export class ValuationsController {
  constructor(private readonly valuationsService: ValuationsService) {}

  @Post()
  @ApiOperation({
    summary: 'Request vehicle valuation',
    description: 'Create a new vehicle valuation using multiple assessment methods'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Valuation successfully created',
    type: Valuation,
  })
  @ApiBadRequestResponse({
    description: 'Invalid valuation request data'
  })
  @ApiNotFoundResponse({
    description: 'Vehicle not found'
  })
  async create(@Body() createValuationDto: CreateValuationDto): Promise<Valuation> {
    return this.valuationsService.create(createValuationDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve all valuations',
    description: 'Get a list of all vehicle valuations'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of valuations',
    type: [Valuation],
  })
  async findAll(): Promise<Valuation[]> {
    return this.valuationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get valuation by ID',
    description: 'Retrieve a specific valuation by its UUID'
  })
  @ApiParam({
    name: 'id',
    description: 'Valuation UUID',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Valuation found',
    type: Valuation,
  })
  @ApiNotFoundResponse({
    description: 'Valuation not found'
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Valuation> {
    return this.valuationsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete valuation',
    description: 'Remove a valuation record from the database'
  })
  @ApiParam({
    name: 'id',
    description: 'Valuation UUID',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Valuation successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Valuation not found'
  })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.valuationsService.remove(id);
  }
}
