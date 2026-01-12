import { PartialType } from '@nestjs/swagger';
import { CreateValuationDto } from './create-valuation.dto';

/**
 * DTO for updating an existing valuation record
 * All fields are optional, allowing partial updates
 */
export class UpdateValuationDto extends PartialType(CreateValuationDto) {}
