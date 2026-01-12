import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';

/**
 * DTO for updating offer status (acceptance/rejection)
 * Allows customers to respond to loan offers
 */
export class UpdateOfferStatusDto {
  @ApiProperty({ 
    description: 'Updated offer status',
    example: 'Accepted',
    enum: ['Draft', 'Active', 'Accepted', 'Rejected', 'Expired', 'Withdrawn', 'Cancelled']
  })
  @IsEnum(['Draft', 'Active', 'Accepted', 'Rejected', 'Expired', 'Withdrawn', 'Cancelled'])
  status: 'Draft' | 'Active' | 'Accepted' | 'Rejected' | 'Expired' | 'Withdrawn' | 'Cancelled';

  @ApiProperty({ 
    description: 'Customer rejection reason (if applicable)',
    example: 'Interest rate too high',
    required: false
  })
  @IsOptional()
  @IsString()
  rejectionReason?: string;

  @ApiProperty({ 
    description: 'Additional notes about the status update',
    example: 'Customer accepted offer, proceeding with disbursement',
    required: false
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
