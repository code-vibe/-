import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';

/**
 * DTO for updating loan application status
 * Allows authorized users to update loan processing stages and status
 */
export class UpdateLoanStatusDto {
  @ApiProperty({
    description: 'Updated loan application status',
    example: 'Approved',
    enum: ['Submitted', 'Under Review', 'Approved', 'Rejected', 'Cancelled', 'Disbursed', 'Defaulted']
  })
  @IsEnum(['Submitted', 'Under Review', 'Approved', 'Rejected', 'Cancelled', 'Disbursed', 'Defaulted'])
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Cancelled' | 'Disbursed' | 'Defaulted';

  @ApiProperty({
    description: 'Updated processing stage',
    example: 'Final Approval',
    enum: ['Initial Review', 'Document Verification', 'Credit Check', 'Risk Assessment', 'Final Approval', 'Disbursement'],
    required: false
  })
  @IsOptional()
  @IsEnum(['Initial Review', 'Document Verification', 'Credit Check', 'Risk Assessment', 'Final Approval', 'Disbursement'])
  processingStage?: 'Initial Review' | 'Document Verification' | 'Credit Check' | 'Risk Assessment' | 'Final Approval' | 'Disbursement';

  @ApiProperty({
    description: 'Reason for rejection (if applicable)',
    example: 'Insufficient income documentation',
    required: false
  })
  @IsOptional()
  @IsString()
  rejectionReason?: string;

  @ApiProperty({
    description: 'Additional notes about the status update',
    example: 'Approved pending final document verification',
    required: false
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'Assigned loan officer',
    example: 'officer@autochek.com',
    required: false
  })
  @IsOptional()
  @IsString()
  assignedOfficer?: string;
}
