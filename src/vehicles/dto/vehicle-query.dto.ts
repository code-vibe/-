import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsNumber, Min, Max } from 'class-validator';

/**
 * DTO for querying vehicles with various filters
 * Allows flexible searching and filtering of vehicle records
 */
export class VehicleQueryDto {
  @ApiProperty({
    description: 'Filter by vehicle make',
    example: 'Toyota',
    required: false
  })
  @IsOptional()
  @IsString()
  make?: string;

  @ApiProperty({
    description: 'Filter by vehicle model',
    example: 'Camry',
    required: false
  })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty({
    description: 'Filter by minimum year',
    example: 2015,
    minimum: 1900,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(1900)
  minYear?: number;

  @ApiProperty({
    description: 'Filter by maximum year',
    example: 2023,
    minimum: 1900,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  maxYear?: number;

  @ApiProperty({
    description: 'Filter by maximum mileage',
    example: 50000,
    minimum: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxMileage?: number;

  @ApiProperty({
    description: 'Filter by vehicle condition',
    example: 'Good',
    enum: ['Excellent', 'Good', 'Fair', 'Poor'],
    required: false
  })
  @IsOptional()
  @IsEnum(['Excellent', 'Good', 'Fair', 'Poor'])
  condition?: 'Excellent' | 'Good' | 'Fair' | 'Poor';

  @ApiProperty({
    description: 'Filter by fuel type',
    example: 'Gasoline',
    enum: ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'CNG', 'LPG'],
    required: false
  })
  @IsOptional()
  @IsEnum(['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'CNG', 'LPG'])
  fuelType?: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG' | 'LPG';

  @ApiProperty({
    description: 'Filter by transmission type',
    example: 'Automatic',
    enum: ['Manual', 'Automatic', 'CVT'],
    required: false
  })
  @IsOptional()
  @IsEnum(['Manual', 'Automatic', 'CVT'])
  transmission?: 'Manual' | 'Automatic' | 'CVT';

  @ApiProperty({
    description: 'Filter by body type',
    example: 'Sedan',
    enum: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Truck', 'Van'],
    required: false
  })
  @IsOptional()
  @IsEnum(['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Truck', 'Van'])
  bodyType?: 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Convertible' | 'Wagon' | 'Truck' | 'Van';

  @ApiProperty({
    description: 'Filter by location',
    example: 'Lagos',
    required: false
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: 'Filter by verification status',
    example: 'Verified',
    enum: ['Verified', 'Pending', 'Rejected', 'Not Verified'],
    required: false
  })
  @IsOptional()
  @IsEnum(['Verified', 'Pending', 'Rejected', 'Not Verified'])
  verificationStatus?: 'Verified' | 'Pending' | 'Rejected' | 'Not Verified';

  @ApiProperty({
    description: 'Page number for pagination (1-based)',
    example: 1,
    minimum: 1,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiProperty({
    description: 'Number of records per page',
    example: 10,
    minimum: 1,
    maximum: 100,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiProperty({
    description: 'Sort field',
    example: 'createdAt',
    enum: ['createdAt', 'year', 'mileage', 'make', 'model'],
    required: false
  })
  @IsOptional()
  @IsEnum(['createdAt', 'year', 'mileage', 'make', 'model'])
  sortBy?: 'createdAt' | 'year' | 'mileage' | 'make' | 'model';

  @ApiProperty({
    description: 'Sort order',
    example: 'DESC',
    enum: ['ASC', 'DESC'],
    required: false
  })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}
