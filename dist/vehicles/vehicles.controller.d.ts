import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleQueryDto } from './dto/vehicle-query.dto';
import { Vehicle } from './entities/vehicle.entity';
export declare class VehiclesController {
    private readonly vehiclesService;
    constructor(vehiclesService: VehiclesService);
    create(createVehicleDto: CreateVehicleDto): Promise<Vehicle>;
    findAll(query: VehicleQueryDto): Promise<{
        data: Vehicle[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getStats(): Promise<{
        totalVehicles: number;
        byCondition: Record<string, number>;
        byFuelType: Record<string, number>;
        byYear: Record<number, number>;
        averageYear: number;
        averageMileage: number;
    }>;
    findByVin(vin: string): Promise<Vehicle>;
    findOne(id: string): Promise<Vehicle>;
    update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle>;
    remove(id: string): Promise<void>;
}
