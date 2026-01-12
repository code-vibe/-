import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
  ApiConflictResponse,
} from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @ApiOperation({
    summary: 'Ingest new vehicle data',
    description: 'Create a new vehicle record with VIN validation'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Vehicle successfully created',
    type: Vehicle,
  })
  @ApiBadRequestResponse({
    description: 'Invalid vehicle data or VIN format'
  })
  @ApiConflictResponse({
    description: 'Vehicle with this VIN already exists'
  })
  async create(@Body() createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve all vehicles',
    description: 'Get a list of all vehicles in the system'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of vehicles',
    type: [Vehicle],
  })
  async findAll(): Promise<Vehicle[]> {
    return this.vehiclesService.findAll();
  }

  @Get('vin/:vin')
  @ApiOperation({
    summary: 'Get vehicle by VIN',
    description: 'Retrieve a specific vehicle by its VIN number'
  })
  @ApiParam({
    name: 'vin',
    description: 'Vehicle Identification Number (17 characters)',
    example: '1HGCM82633A123456'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vehicle found',
    type: Vehicle,
  })
  @ApiNotFoundResponse({
    description: 'Vehicle not found'
  })
  async findByVin(@Param('vin') vin: string): Promise<Vehicle> {
    return this.vehiclesService.findByVin(vin);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get vehicle by ID',
    description: 'Retrieve a specific vehicle by its UUID'
  })
  @ApiParam({
    name: 'id',
    description: 'Vehicle UUID',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vehicle found',
    type: Vehicle,
  })
  @ApiNotFoundResponse({
    description: 'Vehicle not found'
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Vehicle> {
    return this.vehiclesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update vehicle data',
    description: 'Update an existing vehicle record'
  })
  @ApiParam({
    name: 'id',
    description: 'Vehicle UUID',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vehicle successfully updated',
    type: Vehicle,
  })
  @ApiNotFoundResponse({
    description: 'Vehicle not found'
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete vehicle',
    description: 'Remove a vehicle record from the database'
  })
  @ApiParam({
    name: 'id',
    description: 'Vehicle UUID',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Vehicle successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Vehicle not found'
  })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.vehiclesService.remove(id);
  }
}
