import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNumber, IsEmail, IsPhoneNumber, IsEnum, Min, Max, IsOptional } from 'class-validator';

export class CreateLoanDto {
  @ApiProperty({ 
    description: 'Vehicle ID for the loan',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @IsUUID()
  vehicleId: string;

  @ApiProperty({ 
    description: 'Requested loan amount in local currency',
    example: 10000000
  })
  @IsNumber()
  @Min(100000, { message: 'Minimum loan amount is 100,000' })
  @Max(100000000, { message: 'Maximum loan amount is 100,000,000' })
  requestedAmount: number;

  @ApiProperty({ 
    description: 'Requested loan term in months',
    example: 36
  })
  @IsNumber()
  @Min(6, { message: 'Minimum loan term is 6 months' })
  @Max(84, { message: 'Maximum loan term is 84 months' })
  requestedTermMonths: number;

  @ApiProperty({ 
    description: 'Applicant first name',
    example: 'John'
  })
  @IsString()
  applicantFirstName: string;

  @ApiProperty({ 
    description: 'Applicant last name',
    example: 'Doe'
  })
  @IsString()
  applicantLastName: string;

  @ApiProperty({ 
    description: 'Applicant email address',
    example: 'john.doe@example.com'
  })
  @IsEmail()
  applicantEmail: string;

  @ApiProperty({ 
    description: 'Applicant phone number',
    example: '+2348123456789'
  })
  @IsString()
  applicantPhone: string;

  @ApiProperty({ 
    description: 'Monthly income in local currency',
    example: 500000
  })
  @IsNumber()
  @Min(50000, { message: 'Minimum monthly income requirement is 50,000' })
  monthlyIncome: number;

  @ApiProperty({ 
    description: 'Employment status',
    example: 'Employed',
    enum: ['Employed', 'Self Employed', 'Unemployed', 'Student', 'Retired']
  })
  @IsEnum(['Employed', 'Self Employed', 'Unemployed', 'Student', 'Retired'])
  employmentStatus: string;

  @ApiProperty({ 
    description: 'Additional notes or comments',
    example: 'Urgent loan application for business use',
    required: false
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
