import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEnum, Length, Min, Max } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({
    description: 'Vehicle Identification Number (VIN) - must be exactly 17 characters',
    example: '1HGCM82633A123456'
  })
  @IsString()
  @Length(17, 17, { message: 'VIN must be exactly 17 characters long' })
  vin: string;

  @ApiProperty({
    description: 'Vehicle manufacturer',
    example: 'Toyota'
  })
  @IsString()
  @Length(1, 100)
  make: string;

  @ApiProperty({
    description: 'Vehicle model',
    example: 'Camry'
  })
  @IsString()
  @Length(1, 100)
  model: string;

  @ApiProperty({
    description: 'Manufacturing year',
    example: 2020
  })
  @IsNumber()
  @Min(1900, { message: 'Year must be 1900 or later' })
  @Max(new Date().getFullYear() + 1, { message: 'Year cannot be in the future beyond next year' })
  year: number;

  @ApiProperty({
    description: 'Vehicle mileage in kilometers',
    example: 45000,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Mileage cannot be negative' })
  mileage?: number;

  @ApiProperty({
    description: 'Vehicle condition',
    example: 'Good',
    enum: ['Excellent', 'Good', 'Fair', 'Poor'],
    required: false
  })
  @IsOptional()
  @IsEnum(['Excellent', 'Good', 'Fair', 'Poor'])
  condition?: string;
}
