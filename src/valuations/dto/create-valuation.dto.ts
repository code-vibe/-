import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsEnum } from 'class-validator';

export class CreateValuationDto {
  @ApiProperty({ 
    description: 'Vehicle ID to be valued',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @IsUUID()
  vehicleId: string;

  @ApiProperty({ 
    description: 'Preferred valuation method',
    example: 'Market Comparison',
    enum: ['External API', 'Manual Assessment', 'Market Comparison', 'Machine Learning', 'Depreciation Model'],
    required: false
  })
  @IsOptional()
  @IsEnum(['External API', 'Manual Assessment', 'Market Comparison', 'Machine Learning', 'Depreciation Model'])
  valuationMethod?: string;

  @ApiProperty({ 
    description: 'Who is requesting the valuation',
    example: 'user@example.com'
  })
  @IsString()
  requestedBy: string;

  @ApiProperty({ 
    description: 'Additional notes or requirements',
    example: 'Need urgent valuation for loan application',
    required: false
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
