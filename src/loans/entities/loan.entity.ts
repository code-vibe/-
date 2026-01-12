import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';

@Entity('loans')
export class Loan {
  @ApiProperty({ 
    description: 'Unique loan identifier',
    example: '550e8400-e29b-41d4-a716-446655440000' 
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ 
    description: 'Vehicle ID for the loan',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @Column()
  vehicleId: string;

  @ApiProperty({ 
    description: 'Loan application number',
    example: 'LN20240112001'
  })
  @Column({ unique: true })
  applicationNumber: string;

  @ApiProperty({ 
    description: 'Requested loan amount',
    example: 10000000
  })
  @Column('decimal', { precision: 12, scale: 2 })
  requestedAmount: number;

  @ApiProperty({ 
    description: 'Requested loan term in months',
    example: 36
  })
  @Column()
  requestedTermMonths: number;

  @ApiProperty({ 
    description: 'Applicant first name',
    example: 'John'
  })
  @Column({ length: 100 })
  applicantFirstName: string;

  @ApiProperty({ 
    description: 'Applicant last name',
    example: 'Doe'
  })
  @Column({ length: 100 })
  applicantLastName: string;

  @ApiProperty({ 
    description: 'Applicant email address',
    example: 'john.doe@example.com'
  })
  @Column({ length: 150 })
  applicantEmail: string;

  @ApiProperty({ 
    description: 'Applicant phone number',
    example: '+2348123456789'
  })
  @Column({ length: 20 })
  applicantPhone: string;

  @ApiProperty({ 
    description: 'Monthly income in local currency',
    example: 500000
  })
  @Column('decimal', { precision: 12, scale: 2 })
  monthlyIncome: number;

  @ApiProperty({ 
    description: 'Employment status',
    example: 'Employed',
    enum: ['Employed', 'Self Employed', 'Unemployed', 'Student', 'Retired']
  })
  @Column({ length: 20 })
  employmentStatus: string;

  @ApiProperty({ 
    description: 'Loan application status',
    example: 'Under Review',
    enum: ['Submitted', 'Under Review', 'Approved', 'Rejected', 'Cancelled', 'Disbursed', 'Defaulted']
  })
  @Column({ default: 'Submitted' })
  status: string;

  @ApiProperty({ 
    description: 'Eligibility status',
    example: 'Eligible',
    enum: ['Eligible', 'Not Eligible', 'Conditionally Eligible', 'Pending Review']
  })
  @Column({ default: 'Pending Review' })
  eligibilityStatus: string;

  @ApiProperty({ 
    description: 'Risk score (0-100)',
    example: 25
  })
  @Column({ default: 50 })
  riskScore: number;

  @ApiProperty({ 
    description: 'Additional notes',
    required: false
  })
  @Column('text', { nullable: true })
  notes?: string;

  @ApiProperty({ 
    description: 'Record creation timestamp',
    example: '2024-01-12T10:00:00Z'
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ 
    description: 'Record last update timestamp',
    example: '2024-01-12T15:30:00Z'
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Vehicle)
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;
}
