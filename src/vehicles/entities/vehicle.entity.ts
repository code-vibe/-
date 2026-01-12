import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('vehicles')
export class Vehicle {
  @ApiProperty({
    description: 'Unique vehicle identifier',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Vehicle Identification Number (VIN)',
    example: '1HGCM82633A123456'
  })
  @Column({ unique: true, length: 17 })
  vin: string;

  @ApiProperty({
    description: 'Vehicle manufacturer',
    example: 'Toyota'
  })
  @Column({ length: 100 })
  make: string;

  @ApiProperty({
    description: 'Vehicle model',
    example: 'Camry'
  })
  @Column({ length: 100 })
  model: string;

  @ApiProperty({
    description: 'Manufacturing year',
    example: 2020
  })
  @Column()
  year: number;

  @ApiProperty({
    description: 'Vehicle mileage in kilometers',
    example: 45000
  })
  @Column({ default: 0 })
  mileage: number;

  @ApiProperty({
    description: 'Vehicle condition',
    example: 'Good',
    enum: ['Excellent', 'Good', 'Fair', 'Poor']
  })
  @Column({
    type: 'varchar',
    length: 20,
    default: 'Good'
  })
  condition: string;

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
}
