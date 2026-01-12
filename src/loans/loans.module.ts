import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { Loan } from './entities/loan.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';

/**
 * Loan module handling all loan application functionality
 * Provides loan application submission, eligibility checks, and status management
 */
@Module({
  imports: [TypeOrmModule.forFeature([Loan, Vehicle])],
  controllers: [LoansController],
  providers: [LoansService],
  exports: [LoansService], // Export for use in other modules (like offers)
})
export class LoansModule {}
