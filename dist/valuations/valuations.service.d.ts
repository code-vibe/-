import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Valuation } from './entities/valuation.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { CreateValuationDto } from './dto/create-valuation.dto';
import { UpdateValuationDto } from './dto/update-valuation.dto';
export declare class ValuationsService {
    private valuationRepository;
    private vehicleRepository;
    private configService;
    private readonly logger;
    constructor(valuationRepository: Repository<Valuation>, vehicleRepository: Repository<Vehicle>, configService: ConfigService);
    create(createValuationDto: CreateValuationDto): Promise<Valuation>;
    findAll(vehicleId?: string): Promise<Valuation[]>;
    findOne(id: string): Promise<Valuation>;
    update(id: string, updateValuationDto: UpdateValuationDto): Promise<Valuation>;
    remove(id: string): Promise<void>;
    getStats(): Promise<{
        totalValuations: number;
        byMethod: Record<string, number>;
        byStatus: Record<string, number>;
        averageValue: number;
        averageProcessingTime: number;
    }>;
    private findRecentValuation;
    private determineOptimalValuationMethod;
    private performValuation;
    private performExternalApiValuation;
    private performManualValuation;
    private performMarketComparison;
    private performMLValuation;
    private performDepreciationModelValuation;
    private estimateBaseValue;
}
