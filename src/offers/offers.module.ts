import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { Offer } from './entities/offer.entity';
import { Loan } from '../loans/entities/loan.entity';

/**
 * Offers module handling all loan offer functionality
 * Provides loan offer generation, management, and status updates
 */
@Module({
  imports: [TypeOrmModule.forFeature([Offer, Loan])],
  controllers: [OffersController],
  providers: [OffersService],
  exports: [OffersService], // Export for use in other modules if needed
})
export class OffersModule {}
