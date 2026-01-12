import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleQueryDto } from './dto/vehicle-query.dto';
export declare class VehiclesService {
    private vehicleRepository;
    private configService;
    private readonly logger;
    constructor(vehicleRepository: Repository<Vehicle>, configService: ConfigService);
    create(createVehicleDto: CreateVehicleDto): Promise<Vehicle>;
    findAll(queryDto: VehicleQueryDto): Promise<{
        data: Vehicle[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<Vehicle>;
    findByVin(vin: string): Promise<Vehicle>;
    update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle>;
    remove(id: string): Promise<void>;
    getStats(): Promise<{
        totalVehicles: number;
        byCondition: Record<string, number>;
        byFuelType: Record<string, number>;
        byYear: Record<number, number>;
        averageYear: number;
        averageMileage: number;
    }>;
    private isValidVin;
    private lookupVinData;
    private applyFilters;
}
