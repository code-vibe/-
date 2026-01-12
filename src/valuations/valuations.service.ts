import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Valuation } from './entities/valuation.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { CreateValuationDto } from './dto/create-valuation.dto';

@Injectable()
export class ValuationsService {
  private readonly logger = new Logger(ValuationsService.name);

  constructor(
    @InjectRepository(Valuation)
    private valuationRepository: Repository<Valuation>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(createValuationDto: CreateValuationDto): Promise<Valuation> {
    this.logger.log(`Creating valuation for vehicle: ${createValuationDto.vehicleId}`);

    // Verify vehicle exists
    const vehicle = await this.vehicleRepository.findOne({
      where: { id: createValuationDto.vehicleId }
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${createValuationDto.vehicleId} not found`);
    }

    // Create valuation record
    const valuation = this.valuationRepository.create({
      vehicleId: createValuationDto.vehicleId,
      requestedBy: createValuationDto.requestedBy,
      notes: createValuationDto.notes,
      valuationMethod: createValuationDto.valuationMethod || this.selectOptimalMethod(vehicle),
      status: 'In Progress',
    });

    const savedValuation = await this.valuationRepository.save(valuation);

    // Perform valuation calculation
    const valuationResult = await this.performValuation(vehicle, savedValuation);
    
    // Update with results
    Object.assign(savedValuation, valuationResult, { status: 'Completed' });
    const completedValuation = await this.valuationRepository.save(savedValuation);

    this.logger.log(`Completed valuation for vehicle: ${createValuationDto.vehicleId}, estimated value: ${completedValuation.estimatedValue}`);
    return completedValuation;
  }

  async findAll(): Promise<Valuation[]> {
    return await this.valuationRepository.find({
      relations: ['vehicle'],
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Valuation> {
    const valuation = await this.valuationRepository.findOne({
      where: { id },
      relations: ['vehicle']
    });

    if (!valuation) {
      throw new NotFoundException(`Valuation with ID ${id} not found`);
    }

    return valuation;
  }

  async remove(id: string): Promise<void> {
    const valuation = await this.findOne(id);
    await this.valuationRepository.remove(valuation);
    this.logger.log(`Successfully deleted valuation with ID: ${id}`);
  }

  private selectOptimalMethod(vehicle: Vehicle): string {
    // Simple logic to select valuation method
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - vehicle.year;

    if (vehicleAge <= 3) return 'Market Comparison';
    if (vehicleAge <= 7) return 'Depreciation Model';
    return 'Manual Assessment';
  }

  private async performValuation(vehicle: Vehicle, valuation: Valuation): Promise<Partial<Valuation>> {
    // Simulate valuation calculation based on method
    let estimatedValue: number;
    let confidenceScore: number;

    switch (valuation.valuationMethod) {
      case 'Market Comparison':
        estimatedValue = this.calculateMarketValue(vehicle);
        confidenceScore = 85;
        break;
      case 'Depreciation Model':
        estimatedValue = this.calculateDepreciationValue(vehicle);
        confidenceScore = 75;
        break;
      case 'External API':
        estimatedValue = this.calculateExternalAPIValue(vehicle);
        confidenceScore = 90;
        break;
      case 'Machine Learning':
        estimatedValue = this.calculateMLValue(vehicle);
        confidenceScore = 80;
        break;
      default:
        estimatedValue = this.calculateManualValue(vehicle);
        confidenceScore = 70;
    }

    return {
      estimatedValue,
      confidenceScore,
    };
  }

  private calculateMarketValue(vehicle: Vehicle): number {
    // Simplified market comparison calculation
    const baseValue = this.getBaseValue(vehicle.make, vehicle.model, vehicle.year);
    const conditionMultiplier = this.getConditionMultiplier(vehicle.condition);
    const mileageAdjustment = this.getMileageAdjustment(vehicle.mileage, vehicle.year);
    
    return Math.round(baseValue * conditionMultiplier * mileageAdjustment);
  }

  private calculateDepreciationValue(vehicle: Vehicle): number {
    const baseValue = this.getBaseValue(vehicle.make, vehicle.model, vehicle.year);
    const currentYear = new Date().getFullYear();
    const age = currentYear - vehicle.year;
    
    // Standard depreciation: 15% first year, 10% subsequent years
    let depreciationRate = age === 0 ? 0 : 0.15 + (age - 1) * 0.10;
    depreciationRate = Math.min(depreciationRate, 0.80); // Max 80% depreciation
    
    return Math.round(baseValue * (1 - depreciationRate));
  }

  private calculateExternalAPIValue(vehicle: Vehicle): number {
    // Simulate external API call
    return this.calculateMarketValue(vehicle) * 1.05; // Slightly higher confidence
  }

  private calculateMLValue(vehicle: Vehicle): number {
    // Simulate ML model prediction
    const marketValue = this.calculateMarketValue(vehicle);
    const random = Math.random() * 0.2 - 0.1; // ±10% variance
    return Math.round(marketValue * (1 + random));
  }

  private calculateManualValue(vehicle: Vehicle): number {
    // Conservative manual assessment
    return this.calculateDepreciationValue(vehicle) * 0.95;
  }

  private getBaseValue(make: string, model: string, year: number): number {
    // Simplified base value lookup
    const basePrices = {
      'Toyota': { 'Camry': 25000000, 'Corolla': 18000000, 'default': 20000000 },
      'Honda': { 'Accord': 24000000, 'Civic': 17000000, 'default': 19000000 },
      'Nissan': { 'Altima': 22000000, 'Sentra': 16000000, 'default': 18000000 },
      'default': { 'default': 15000000 }
    };

    const makePrices = basePrices[make] || basePrices['default'];
    const basePrice = makePrices[model] || makePrices['default'];
    
    // Adjust for model year (assuming 2024 prices)
    const yearAdjustment = Math.max(0.3, 1 - (2024 - year) * 0.05);
    return basePrice * yearAdjustment;
  }

  private getConditionMultiplier(condition: string): number {
    const multipliers = {
      'Excellent': 1.1,
      'Good': 1.0,
      'Fair': 0.85,
      'Poor': 0.7
    };
    return multipliers[condition] || 1.0;
  }

  private getMileageAdjustment(mileage: number, year: number): number {
    if (!mileage) return 1.0;
    
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    const expectedMileage = age * 15000; // 15k km per year average
    
    if (mileage <= expectedMileage * 0.8) return 1.05; // Low mileage bonus
    if (mileage <= expectedMileage * 1.2) return 1.0; // Average mileage
    return 0.9; // High mileage penalty
  }
}
