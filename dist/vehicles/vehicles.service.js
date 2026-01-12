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
var VehiclesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
const vehicle_entity_1 = require("./entities/vehicle.entity");
let VehiclesService = VehiclesService_1 = class VehiclesService {
    constructor(vehicleRepository, configService) {
        this.vehicleRepository = vehicleRepository;
        this.configService = configService;
        this.logger = new common_1.Logger(VehiclesService_1.name);
    }
    async create(createVehicleDto) {
        this.logger.log(`Creating new vehicle with VIN: ${createVehicleDto.vin}`);
        const existingVehicle = await this.vehicleRepository.findOne({
            where: { vin: createVehicleDto.vin }
        });
        if (existingVehicle) {
            throw new common_1.ConflictException(`Vehicle with VIN ${createVehicleDto.vin} already exists`);
        }
        if (!this.isValidVin(createVehicleDto.vin)) {
            throw new common_1.BadRequestException('Invalid VIN format');
        }
        const vehicleData = { ...createVehicleDto };
        if (vehicleData.features && Array.isArray(vehicleData.features)) {
            vehicleData.features = JSON.stringify(vehicleData.features);
        }
        try {
            const externalData = await this.lookupVinData(createVehicleDto.vin);
            if (externalData) {
                Object.assign(vehicleData, {
                    make: vehicleData.make || externalData.make,
                    model: vehicleData.model || externalData.model,
                    year: vehicleData.year || externalData.year,
                    engineSize: vehicleData.engineSize || externalData.engineSize,
                    fuelType: vehicleData.fuelType || externalData.fuelType,
                    transmission: vehicleData.transmission || externalData.transmission,
                    bodyType: vehicleData.bodyType || externalData.bodyType,
                    externalData: JSON.stringify(externalData),
                    verificationStatus: 'Verified',
                });
                this.logger.log(`Enriched vehicle data with external VIN lookup for: ${createVehicleDto.vin}`);
            }
        }
        catch (error) {
            this.logger.warn(`Failed to lookup VIN data for ${createVehicleDto.vin}: ${error.message}`);
        }
        const vehicle = this.vehicleRepository.create(vehicleData);
        const savedVehicle = await this.vehicleRepository.save(vehicle);
        this.logger.log(`Successfully created vehicle with ID: ${savedVehicle.id}`);
        return savedVehicle;
    }
    async findAll(queryDto) {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC', ...filters } = queryDto;
        this.logger.log(`Fetching vehicles with filters: ${JSON.stringify(filters)}`);
        const queryBuilder = this.vehicleRepository.createQueryBuilder('vehicle');
        this.applyFilters(queryBuilder, filters);
        queryBuilder.orderBy(`vehicle.${sortBy}`, sortOrder);
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);
        const [vehicles, total] = await queryBuilder.getManyAndCount();
        const processedVehicles = vehicles.map(vehicle => ({
            ...vehicle,
            features: vehicle.features ? JSON.parse(vehicle.features) : null,
        }));
        const totalPages = Math.ceil(total / limit);
        this.logger.log(`Found ${total} vehicles, returning page ${page} of ${totalPages}`);
        return {
            data: processedVehicles,
            total,
            page,
            limit,
            totalPages,
        };
    }
    async findOne(id) {
        this.logger.log(`Fetching vehicle with ID: ${id}`);
        const vehicle = await this.vehicleRepository.findOne({
            where: { id },
            relations: ['valuations', 'loans'],
        });
        if (!vehicle) {
            throw new common_1.NotFoundException(`Vehicle with ID ${id} not found`);
        }
        if (vehicle.features) {
            try {
                vehicle.features = JSON.parse(vehicle.features);
            }
            catch (error) {
                this.logger.warn(`Failed to parse features for vehicle ${id}: ${error.message}`);
            }
        }
        return vehicle;
    }
    async findByVin(vin) {
        this.logger.log(`Fetching vehicle with VIN: ${vin}`);
        const vehicle = await this.vehicleRepository.findOne({
            where: { vin },
            relations: ['valuations', 'loans'],
        });
        if (!vehicle) {
            throw new common_1.NotFoundException(`Vehicle with VIN ${vin} not found`);
        }
        if (vehicle.features) {
            try {
                vehicle.features = JSON.parse(vehicle.features);
            }
            catch (error) {
                this.logger.warn(`Failed to parse features for vehicle ${vin}: ${error.message}`);
            }
        }
        return vehicle;
    }
    async update(id, updateVehicleDto) {
        this.logger.log(`Updating vehicle with ID: ${id}`);
        const vehicle = await this.findOne(id);
        const updateData = { ...updateVehicleDto };
        if (updateData.features && Array.isArray(updateData.features)) {
            updateData.features = JSON.stringify(updateData.features);
        }
        if (updateData.vin && updateData.vin !== vehicle.vin) {
            const existingVehicle = await this.vehicleRepository.findOne({
                where: { vin: updateData.vin }
            });
            if (existingVehicle) {
                throw new common_1.ConflictException(`Vehicle with VIN ${updateData.vin} already exists`);
            }
        }
        Object.assign(vehicle, updateData);
        const savedVehicle = await this.vehicleRepository.save(vehicle);
        this.logger.log(`Successfully updated vehicle with ID: ${id}`);
        return savedVehicle;
    }
    async remove(id) {
        this.logger.log(`Deleting vehicle with ID: ${id}`);
        const vehicle = await this.findOne(id);
        await this.vehicleRepository.remove(vehicle);
        this.logger.log(`Successfully deleted vehicle with ID: ${id}`);
    }
    async getStats() {
        this.logger.log('Fetching vehicle statistics');
        const totalVehicles = await this.vehicleRepository.count();
        const conditionStats = await this.vehicleRepository
            .createQueryBuilder('vehicle')
            .select('vehicle.condition', 'condition')
            .addSelect('COUNT(*)', 'count')
            .groupBy('vehicle.condition')
            .getRawMany();
        const fuelTypeStats = await this.vehicleRepository
            .createQueryBuilder('vehicle')
            .select('vehicle.fuelType', 'fuelType')
            .addSelect('COUNT(*)', 'count')
            .where('vehicle.fuelType IS NOT NULL')
            .groupBy('vehicle.fuelType')
            .getRawMany();
        const yearStats = await this.vehicleRepository
            .createQueryBuilder('vehicle')
            .select('vehicle.year', 'year')
            .addSelect('COUNT(*)', 'count')
            .groupBy('vehicle.year')
            .orderBy('vehicle.year', 'DESC')
            .getRawMany();
        const averageStats = await this.vehicleRepository
            .createQueryBuilder('vehicle')
            .select('AVG(vehicle.year)', 'avgYear')
            .addSelect('AVG(vehicle.mileage)', 'avgMileage')
            .getRawOne();
        return {
            totalVehicles,
            byCondition: conditionStats.reduce((acc, stat) => {
                acc[stat.condition] = parseInt(stat.count);
                return acc;
            }, {}),
            byFuelType: fuelTypeStats.reduce((acc, stat) => {
                acc[stat.fuelType] = parseInt(stat.count);
                return acc;
            }, {}),
            byYear: yearStats.reduce((acc, stat) => {
                acc[stat.year] = parseInt(stat.count);
                return acc;
            }, {}),
            averageYear: parseFloat(averageStats.avgYear) || 0,
            averageMileage: parseFloat(averageStats.avgMileage) || 0,
        };
    }
    isValidVin(vin) {
        if (!vin || vin.length !== 17) {
            return false;
        }
        const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
        if (!vinRegex.test(vin)) {
            return false;
        }
        return true;
    }
    async lookupVinData(vin) {
        const apiKey = this.configService.get('RAPIDAPI_KEY');
        const apiHost = this.configService.get('RAPIDAPI_HOST');
        if (!apiKey || !apiHost) {
            throw new Error('RapidAPI configuration not available');
        }
        const options = {
            method: 'GET',
            url: `https://${apiHost}/vin-lookup`,
            params: { vin },
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': apiHost,
            },
            timeout: 5000,
        };
        const response = await axios_1.default.request(options);
        if (response.data && response.data.success) {
            const data = response.data.data;
            return {
                make: data.make,
                model: data.model,
                year: parseInt(data.year),
                engineSize: data.engine_size ? parseFloat(data.engine_size) : null,
                fuelType: data.fuel_type,
                transmission: data.transmission,
                bodyType: data.body_type,
                source: 'RapidAPI VIN Lookup',
                retrievedAt: new Date().toISOString(),
                rawData: data,
            };
        }
        return null;
    }
    applyFilters(queryBuilder, filters) {
        if (filters.make) {
            queryBuilder.andWhere('LOWER(vehicle.make) LIKE LOWER(:make)', {
                make: `%${filters.make}%`
            });
        }
        if (filters.model) {
            queryBuilder.andWhere('LOWER(vehicle.model) LIKE LOWER(:model)', {
                model: `%${filters.model}%`
            });
        }
        if (filters.minYear) {
            queryBuilder.andWhere('vehicle.year >= :minYear', { minYear: filters.minYear });
        }
        if (filters.maxYear) {
            queryBuilder.andWhere('vehicle.year <= :maxYear', { maxYear: filters.maxYear });
        }
        if (filters.maxMileage) {
            queryBuilder.andWhere('vehicle.mileage <= :maxMileage', { maxMileage: filters.maxMileage });
        }
        if (filters.condition) {
            queryBuilder.andWhere('vehicle.condition = :condition', { condition: filters.condition });
        }
        if (filters.fuelType) {
            queryBuilder.andWhere('vehicle.fuelType = :fuelType', { fuelType: filters.fuelType });
        }
        if (filters.transmission) {
            queryBuilder.andWhere('vehicle.transmission = :transmission', {
                transmission: filters.transmission
            });
        }
        if (filters.bodyType) {
            queryBuilder.andWhere('vehicle.bodyType = :bodyType', { bodyType: filters.bodyType });
        }
        if (filters.location) {
            queryBuilder.andWhere('LOWER(vehicle.location) LIKE LOWER(:location)', {
                location: `%${filters.location}%`
            });
        }
        if (filters.verificationStatus) {
            queryBuilder.andWhere('vehicle.verificationStatus = :verificationStatus', {
                verificationStatus: filters.verificationStatus
            });
        }
    }
};
exports.VehiclesService = VehiclesService;
exports.VehiclesService = VehiclesService = VehiclesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], VehiclesService);
//# sourceMappingURL=vehicles.service.js.map