import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValuationsService } from './valuations.service';
import { ValuationsController } from './valuations.controller';
import { Valuation } from './entities/valuation.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Valuation, Vehicle])],
  controllers: [ValuationsController],
  providers: [ValuationsService],
  exports: [ValuationsService],
})
export class ValuationsModule {}
