import { ValuationsService } from './valuations.service';
import { CreateValuationDto } from './dto/create-valuation.dto';
import { UpdateValuationDto } from './dto/update-valuation.dto';
import { Valuation } from './entities/valuation.entity';
export declare class ValuationsController {
    private readonly valuationsService;
    constructor(valuationsService: ValuationsService);
    create(createValuationDto: CreateValuationDto): Promise<Valuation>;
    findAll(vehicleId?: string): Promise<Valuation[]>;
    getStats(): Promise<{
        totalValuations: number;
        byMethod: Record<string, number>;
        byStatus: Record<string, number>;
        averageValue: number;
        averageProcessingTime: number;
    }>;
    findOne(id: string): Promise<Valuation>;
    update(id: string, updateValuationDto: UpdateValuationDto): Promise<Valuation>;
    remove(id: string): Promise<void>;
}
