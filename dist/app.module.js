"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const vehicles_module_1 = require("./vehicles/vehicles.module");
const valuations_module_1 = require("./valuations/valuations.module");
const loans_module_1 = require("./loans/loans.module");
const offers_module_1 = require("./offers/offers.module");
const vehicle_entity_1 = require("./vehicles/entities/vehicle.entity");
const valuation_entity_1 = require("./valuations/entities/valuation.entity");
const loan_entity_1 = require("./loans/entities/loan.entity");
const offer_entity_1 = require("./offers/entities/offer.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [vehicle_entity_1.Vehicle, valuation_entity_1.Valuation, loan_entity_1.Loan, offer_entity_1.Offer],
                    synchronize: true,
                    logging: configService.get('NODE_ENV') === 'development',
                }),
                inject: [config_1.ConfigService],
            }),
            vehicles_module_1.VehiclesModule,
            valuations_module_1.ValuationsModule,
            loans_module_1.LoansModule,
            offers_module_1.OffersModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map