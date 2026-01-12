import { Injectable, NotFoundException, ConflictException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  private readonly logger = new Logger(VehiclesService.name);

  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    this.logger.log(`Creating new vehicle with VIN: ${createVehicleDto.vin}`);

    // Check if VIN already exists
    const existingVehicle = await this.vehicleRepository.findOne({
      where: { vin: createVehicleDto.vin }
    });

    if (existingVehicle) {
      throw new ConflictException(`Vehicle with VIN ${createVehicleDto.vin} already exists`);
    }

    // Validate VIN format
    if (!this.isValidVin(createVehicleDto.vin)) {
      throw new BadRequestException('Invalid VIN format');
    }

    const vehicle = this.vehicleRepository.create(createVehicleDto);
    const savedVehicle = await this.vehicleRepository.save(vehicle);

    this.logger.log(`Successfully created vehicle with ID: ${savedVehicle.id}`);
    return savedVehicle;
  }

  async findAll(): Promise<Vehicle[]> {
    this.logger.log('Fetching all vehicles');
    return await this.vehicleRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Vehicle> {
    this.logger.log(`Fetching vehicle with ID: ${id}`);
    const vehicle = await this.vehicleRepository.findOne({ where: { id } });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return vehicle;
  }

  async findByVin(vin: string): Promise<Vehicle> {
    this.logger.log(`Fetching vehicle with VIN: ${vin}`);
    const vehicle = await this.vehicleRepository.findOne({ where: { vin } });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with VIN ${vin} not found`);
    }

    return vehicle;
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    this.logger.log(`Updating vehicle with ID: ${id}`);
    
    const vehicle = await this.findOne(id);

    // Check for VIN conflicts if VIN is being updated
    if (updateVehicleDto.vin && updateVehicleDto.vin !== vehicle.vin) {
      const existingVehicle = await this.vehicleRepository.findOne({
        where: { vin: updateVehicleDto.vin }
      });
      if (existingVehicle) {
        throw new ConflictException(`Vehicle with VIN ${updateVehicleDto.vin} already exists`);
      }
    }

    Object.assign(vehicle, updateVehicleDto);
    const savedVehicle = await this.vehicleRepository.save(vehicle);

    this.logger.log(`Successfully updated vehicle with ID: ${id}`);
    return savedVehicle;
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Deleting vehicle with ID: ${id}`);
    const vehicle = await this.findOne(id);
    await this.vehicleRepository.remove(vehicle);
    this.logger.log(`Successfully deleted vehicle with ID: ${id}`);
  }

  private isValidVin(vin: string): boolean {
    if (!vin || vin.length !== 17) {
      return false;
    }

    // Basic VIN validation - no I, O, or Q
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
    return vinRegex.test(vin);
  }
}
