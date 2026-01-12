import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ValuationsModule } from './valuations/valuations.module';
import { Vehicle } from './vehicles/entities/vehicle.entity';
import { Valuation } from './valuations/entities/valuation.entity';
import { Loan } from './loans/entities/loan.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Vehicle, Valuation, Loan],
      synchronize: true,
      logging: false,
    }),
    VehiclesModule,
    ValuationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
