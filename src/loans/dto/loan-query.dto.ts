import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEnum, Min, Max } from 'class-validator';

/**
 * DTO for querying loans with various filters
 * Allows flexible searching and filtering of loan records
 */
export class LoanQueryDto {
  @ApiProperty({ 
    description: 'Filter by loan status',
    example: 'Under Review',
    enum: ['Submitted', 'Under Review', 'Approved', 'Rejected', 'Cancelled', 'Disbursed', 'Defaulted'],
    required: false
  })
  @IsOptional()
  @IsEnum(['Submitted', 'Under Review', 'Approved', 'Rejected', 'Cancelled', 'Disbursed', 'Defaulted'])
  status?: 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Cancelled' | 'Disbursed' | 'Defaulted';

  @ApiProperty({ 
    description: 'Filter by eligibility status',
    example: 'Eligible',
    enum: ['Eligible', 'Not Eligible', 'Conditionally Eligible', 'Pending Review'],
    required: false
  })
  @IsOptional()
  @IsEnum(['Eligible', 'Not Eligible', 'Conditionally Eligible', 'Pending Review'])
  eligibilityStatus?: 'Eligible' | 'Not Eligible' | 'Conditionally Eligible' | 'Pending Review';

  @ApiProperty({ 
    description: 'Filter by processing stage',
    example: 'Document Verification',
    enum: ['Initial Review', 'Document Verification', 'Credit Check', 'Risk Assessment', 'Final Approval', 'Disbursement'],
    required: false
  })
  @IsOptional()
  @IsEnum(['Initial Review', 'Document Verification', 'Credit Check', 'Risk Assessment', 'Final Approval', 'Disbursement'])
  processingStage?: 'Initial Review' | 'Document Verification' | 'Credit Check' | 'Risk Assessment' | 'Final Approval' | 'Disbursement';

  @ApiProperty({ 
    description: 'Filter by employment status',
    example: 'Employed',
    enum: ['Employed', 'Self Employed', 'Unemployed', 'Student', 'Retired'],
    required: false
  })
  @IsOptional()
  @IsEnum(['Employed', 'Self Employed', 'Unemployed', 'Student', 'Retired'])
  employmentStatus?: 'Employed' | 'Self Employed' | 'Unemployed' | 'Student' | 'Retired';

  @ApiProperty({ 
    description: 'Filter by minimum requested amount',
    example: 5000000,
    minimum: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minRequestedAmount?: number;

  @ApiProperty({ 
    description: 'Filter by maximum requested amount',
    example: 20000000,
    minimum: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxRequestedAmount?: number;

  @ApiProperty({ 
    description: 'Filter by minimum monthly income',
    example: 200000,
    minimum: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minMonthlyIncome?: number;

  @ApiProperty({ 
    description: 'Filter by risk category',
    example: 'Medium',
    enum: ['Low', 'Medium', 'High', 'Very High'],
    required: false
  })
  @IsOptional()
  @IsEnum(['Low', 'Medium', 'High', 'Very High'])
  riskCategory?: 'Low' | 'Medium' | 'High' | 'Very High';

  @ApiProperty({ 
    description: 'Filter by assigned loan officer',
    example: 'officer@autochek.com',
    required: false
  })
  @IsOptional()
  @IsString()
  assignedOfficer?: string;

  @ApiProperty({ 
    description: 'Filter by applicant email',
    example: 'john.doe@example.com',
    required: false
  })
  @IsOptional()
  @IsString()
  applicantEmail?: string;

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
    enum: ['createdAt', 'requestedAmount', 'monthlyIncome', 'submittedAt', 'processedAt'],
    required: false
  })
  @IsOptional()
  @IsEnum(['createdAt', 'requestedAmount', 'monthlyIncome', 'submittedAt', 'processedAt'])
  sortBy?: 'createdAt' | 'requestedAmount' | 'monthlyIncome' | 'submittedAt' | 'processedAt';

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
