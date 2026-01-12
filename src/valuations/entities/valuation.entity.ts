import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';

@Entity('valuations')
export class Valuation {
  @ApiProperty({ 
    description: 'Unique valuation identifier',
    example: '550e8400-e29b-41d4-a716-446655440000' 
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ 
    description: 'Vehicle ID being valued',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @Column()
  vehicleId: string;

  @ApiProperty({ 
    description: 'Estimated vehicle value',
    example: 8500000
  })
  @Column('decimal', { precision: 12, scale: 2 })
  estimatedValue: number;

  @ApiProperty({ 
    description: 'Currency code',
    example: 'NGN'
  })
  @Column({ length: 3, default: 'NGN' })
  currency: string;

  @ApiProperty({ 
    description: 'Valuation method used',
    example: 'Market Comparison',
    enum: ['External API', 'Manual Assessment', 'Market Comparison', 'Machine Learning', 'Depreciation Model']
  })
  @Column({ length: 30 })
  valuationMethod: string;

  @ApiProperty({ 
    description: 'Confidence score (0-100)',
    example: 85
  })
  @Column({ default: 50 })
  confidenceScore: number;

  @ApiProperty({ 
    description: 'Valuation status',
    example: 'Completed',
    enum: ['In Progress', 'Completed', 'Failed']
  })
  @Column({ default: 'In Progress' })
  status: string;

  @ApiProperty({ 
    description: 'Who requested the valuation',
    example: 'user@example.com'
  })
  @Column({ length: 100 })
  requestedBy: string;

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
