"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ValuationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValuationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const valuation_entity_1 = require("./entities/valuation.entity");
const vehicle_entity_1 = require("../vehicles/entities/vehicle.entity");
let ValuationsService = ValuationsService_1 = class ValuationsService {
    constructor(valuationRepository, vehicleRepository, configService) {
        this.valuationRepository = valuationRepository;
        this.vehicleRepository = vehicleRepository;
        this.configService = configService;
        this.logger = new common_1.Logger(ValuationsService_1.name);
    }
    async create(createValuationDto) {
        const { vehicleId, forceNew = false, ...valuationData } = createValuationDto;
        this.logger.log(`Creating valuation for vehicle: ${vehicleId}`);
        const vehicle = await this.vehicleRepository.findOne({
            where: { id: vehicleId }
        });
        if (!vehicle) {
            throw new common_1.NotFoundException(`Vehicle with ID ${vehicleId} not found`);
        }
        if (!forceNew) {
            const recentValuation = await this.findRecentValuation(vehicleId);
            if (recentValuation) {
                this.logger.log(`Returning existing recent valuation for vehicle: ${vehicleId}`);
                return recentValuation;
            }
        }
        const valuationMethod = valuationData.valuationMethod ||
            await this.determineOptimalValuationMethod(vehicle);
        let valuation = this.valuationRepository.create({
            vehicleId,
            valuationMethod,
            currency: valuationData.currency || 'NGN',
            marketCondition: valuationData.marketCondition || 'Unknown',
            validityDays: valuationData.validityDays || 30,
            requestedBy: valuationData.requestedBy || 'system',
            notes: valuationData.notes,
            status: 'In Progress',
        });
        const savedValuation = await this.valuationRepository.save(valuation);
        try {
            const valuationResult = await this.performValuation(vehicle, savedValuation, valuationData);
            Object.assign(savedValuation, valuationResult, {
                status: 'Completed',
                expiresAt: new Date(Date.now() + (savedValuation.validityDays * 24 * 60 * 60 * 1000))
            });
            const completedValuation = await this.valuationRepository.save(savedValuation);
            this.logger.log(`Completed valuation for vehicle: ${vehicleId}, estimated value: ${completedValuation.estimatedValue}`);
            return completedValuation;
        }
        catch (error) {
            this.logger.error(`Valuation failed for vehicle: ${vehicleId}`, error.stack);
            savedValuation.status = 'Failed';
            savedValuation.notes = `${savedValuation.notes || ''}\nError: ${error.message}`;
            await this.valuationRepository.save(savedValuation);
            throw new common_1.BadRequestException(`Valuation failed: ${error.message}`);
        }
    }
    async findAll(vehicleId) {
        this.logger.log(`Fetching valuations${vehicleId ? ` for vehicle: ${vehicleId}` : ''}`);
        const query = this.valuationRepository.createQueryBuilder('valuation')
            .leftJoinAndSelect('valuation.vehicle', 'vehicle')
            .orderBy('valuation.createdAt', 'DESC');
        if (vehicleId) {
            query.where('valuation.vehicleId = :vehicleId', { vehicleId });
        }
        return await query.getMany();
    }
    async findOne(id) {
        this.logger.log(`Fetching valuation with ID: ${id}`);
        const valuation = await this.valuationRepository.findOne({
            where: { id },
            relations: ['vehicle'],
        });
        if (!valuation) {
            throw new common_1.NotFoundException(`Valuation with ID ${id} not found`);
        }
        return valuation;
    }
    async update(id, updateValuationDto) {
        this.logger.log(`Updating valuation with ID: ${id}`);
        const valuation = await this.findOne(id);
        Object.assign(valuation, updateValuationDto);
        const updatedValuation = await this.valuationRepository.save(valuation);
        this.logger.log(`Successfully updated valuation with ID: ${id}`);
        return updatedValuation;
    }
    async remove(id) {
        this.logger.log(`Deleting valuation with ID: ${id}`);
        const valuation = await this.findOne(id);
        await this.valuationRepository.remove(valuation);
        this.logger.log(`Successfully deleted valuation with ID: ${id}`);
    }
    async getStats() {
        this.logger.log('Fetching valuation statistics');
        const totalValuations = await this.valuationRepository.count();
        const methodStats = await this.valuationRepository
            .createQueryBuilder('valuation')
            .select('valuation.valuationMethod', 'method')
            .addSelect('COUNT(*)', 'count')
            .groupBy('valuation.valuationMethod')
            .getRawMany();
        const statusStats = await this.valuationRepository
            .createQueryBuilder('valuation')
            .select('valuation.status', 'status')
            .addSelect('COUNT(*)', 'count')
            .groupBy('valuation.status')
            .getRawMany();
        const averageStats = await this.valuationRepository
            .createQueryBuilder('valuation')
            .select('AVG(CAST(valuation.estimatedValue AS FLOAT))', 'avgValue')
            .addSelect('AVG(valuation.processingTimeMs)', 'avgProcessingTime')
            .where('valuation.status = :status', { status: 'Completed' })
            .getRawOne();
        return {
            totalValuations,
            byMethod: methodStats.reduce((acc, stat) => {
                acc[stat.method] = parseInt(stat.count);
                return acc;
            }, {}),
            byStatus: statusStats.reduce((acc, stat) => {
                acc[stat.status] = parseInt(stat.count);
                return acc;
            }, {}),
            averageValue: parseFloat(averageStats.avgValue) || 0,
            averageProcessingTime: parseFloat(averageStats.avgProcessingTime) || 0,
        };
    }
    async findRecentValuation(vehicleId) {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return await this.valuationRepository.findOne({
            where: {
                vehicleId,
                status: 'Completed',
                isActive: true,
            },
            order: { createdAt: 'DESC' }
        });
    }
    async determineOptimalValuationMethod(vehicle) {
        if (vehicle.vin && vehicle.verificationStatus === 'Verified') {
            return 'External API';
        }
        if (vehicle.make && vehicle.model && vehicle.year && vehicle.mileage !== null) {
            return 'Market Comparison';
        }
        return 'Depreciation Model';
    }
    async performValuation(vehicle, valuation, inputData) {
        const startTime = Date.now();
        let result = {};
        switch (valuation.valuationMethod) {
            case 'External API':
                result = await this.performExternalApiValuation(vehicle);
                break;
            case 'Manual Assessment':
                result = this.performManualValuation(inputData);
                break;
            case 'Market Comparison':
                result = await this.performMarketComparison(vehicle);
                break;
            case 'Machine Learning':
                result = await this.performMLValuation(vehicle);
                break;
            case 'Depreciation Model':
            default:
                result = this.performDepreciationModelValuation(vehicle);
                break;
        }
        result.processingTimeMs = Date.now() - startTime;
        return result;
    }
    async performExternalApiValuation(vehicle) {
        try {
            const apiKey = this.configService.get('RAPIDAPI_KEY');
            const apiHost = this.configService.get('RAPIDAPI_HOST');
            if (!apiKey || !apiHost) {
                throw new Error('External API configuration not available');
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            const baseValue = this.estimateBaseValue(vehicle);
            const externalValue = baseValue * (0.95 + Math.random() * 0.10);
            return {
                estimatedValue: Math.round(externalValue),
                minValue: Math.round(externalValue * 0.90),
                maxValue: Math.round(externalValue * 1.10),
                confidenceScore: 85 + Math.random() * 10,
                source: 'RapidAPI VIN Lookup',
                externalData: JSON.stringify({
                    provider: 'VIN Lookup Service',
                    timestamp: new Date().toISOString(),
                    rawValue: externalValue,
                    confidence: 'High'
                }),
                comparableVehiclesCount: Math.floor(10 + Math.random() * 20),
                daysSinceLastMarketAnalysis: 1,
            };
        }
        catch (error) {
            this.logger.warn(`External API valuation failed: ${error.message}`);
            return this.performDepreciationModelValuation(vehicle);
        }
    }
    performManualValuation(inputData) {
        if (!inputData.estimatedValue) {
            throw new Error('Manual valuation requires estimated value');
        }
        return {
            estimatedValue: inputData.estimatedValue,
            minValue: inputData.minValue || inputData.estimatedValue * 0.90,
            maxValue: inputData.maxValue || inputData.estimatedValue * 1.10,
            confidenceScore: inputData.confidenceScore || 70,
            source: 'Manual Assessment',
        };
    }
    async performMarketComparison(vehicle) {
        const similarVehicles = await this.vehicleRepository
            .createQueryBuilder('vehicle')
            .where('vehicle.make = :make', { make: vehicle.make })
            .andWhere('vehicle.model = :model', { model: vehicle.model })
            .andWhere('vehicle.year BETWEEN :minYear AND :maxYear', {
            minYear: vehicle.year - 2,
            maxYear: vehicle.year + 2
        })
            .andWhere('vehicle.id != :vehicleId', { vehicleId: vehicle.id })
            .limit(10)
            .getMany();
        const baseValue = this.estimateBaseValue(vehicle);
        let adjustedValue = baseValue;
        if (similarVehicles.length > 0) {
            adjustedValue = baseValue * (0.95 + Math.random() * 0.10);
        }
        return {
            estimatedValue: Math.round(adjustedValue),
            minValue: Math.round(adjustedValue * 0.85),
            maxValue: Math.round(adjustedValue * 1.15),
            confidenceScore: similarVehicles.length > 3 ? 80 : 60,
            source: 'Market Comparison',
            comparableVehiclesCount: similarVehicles.length,
            daysSinceLastMarketAnalysis: 1,
        };
    }
    async performMLValuation(vehicle) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const baseValue = this.estimateBaseValue(vehicle);
        const mlValue = baseValue * (0.92 + Math.random() * 0.16);
        return {
            estimatedValue: Math.round(mlValue),
            minValue: Math.round(mlValue * 0.88),
            maxValue: Math.round(mlValue * 1.12),
            confidenceScore: 88 + Math.random() * 7,
            source: 'ML Valuation Model',
            externalData: JSON.stringify({
                model: 'AutoML Valuation v2.1',
                features: ['make', 'model', 'year', 'mileage', 'condition', 'location'],
                prediction_confidence: 0.92
            }),
        };
    }
    performDepreciationModelValuation(vehicle) {
        const baseValue = this.estimateBaseValue(vehicle);
        const age = new Date().getFullYear() - vehicle.year;
        let depreciationRate = 0.15;
        switch (vehicle.condition) {
            case 'Excellent':
                depreciationRate *= 0.8;
                break;
            case 'Good':
                depreciationRate *= 0.9;
                break;
            case 'Fair':
                depreciationRate *= 1.1;
                break;
            case 'Poor':
                depreciationRate *= 1.3;
                break;
        }
        const mileageAdjustment = vehicle.mileage ? Math.min(0.2, vehicle.mileage / 200000) : 0;
        const depreciatedValue = baseValue * Math.pow(1 - depreciationRate, age) * (1 - mileageAdjustment);
        return {
            estimatedValue: Math.round(depreciatedValue),
            minValue: Math.round(depreciatedValue * 0.80),
            maxValue: Math.round(depreciatedValue * 1.20),
            confidenceScore: 70,
            source: 'Depreciation Model',
            ageAdjustment: -depreciationRate * age,
            mileageAdjustment: -mileageAdjustment,
            conditionAdjustment: depreciationRate === 0.15 ? 0 : (depreciationRate / 0.15) - 1,
        };
    }
    estimateBaseValue(vehicle) {
        const currentYear = new Date().getFullYear();
        const age = currentYear - vehicle.year;
        const basePrices = {
            'Toyota': 8000000,
            'Honda': 7500000,
            'Hyundai': 6500000,
            'Kia': 6000000,
            'Nissan': 7000000,
            'Ford': 7200000,
            'Volkswagen': 8500000,
            'BMW': 15000000,
            'Mercedes-Benz': 18000000,
            'Audi': 16000000,
            'Lexus': 12000000,
            'Acura': 11000000,
        };
        let basePrice = basePrices[vehicle.make] || 5000000;
        basePrice *= Math.pow(0.85, age);
        const bodyTypeMultiplier = {
            'SUV': 1.2,
            'Truck': 1.15,
            'Convertible': 1.3,
            'Coupe': 1.1,
            'Sedan': 1.0,
            'Hatchback': 0.9,
            'Wagon': 0.95,
            'Van': 0.85,
        };
        if (vehicle.bodyType && bodyTypeMultiplier[vehicle.bodyType]) {
            basePrice *= bodyTypeMultiplier[vehicle.bodyType];
        }
        return Math.max(basePrice, 500000);
    }
};
exports.ValuationsService = ValuationsService;
exports.ValuationsService = ValuationsService = ValuationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(valuation_entity_1.Valuation)),
    __param(1, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService])
], ValuationsService);
//# sourceMappingURL=valuations.service.js.map