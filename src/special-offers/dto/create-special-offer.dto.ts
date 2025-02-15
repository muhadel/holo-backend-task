import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max } from 'class-validator';
import { SpecialOfferDataDto } from './special-offer-data.dto';

@ApiTags('Special Offers')
export class CreateSpecialOfferDto {
  @ApiProperty({ example: 'SPECIAL_OFFER_20', description: 'Name of the special offer' })
  @IsString()
  name: string;

  @ApiProperty({ example: 20, description: 'Discount percentage (0-100)' })
  @IsNumber()
  @Min(0)
  @Max(100)
  discountPercentage: number;
}

export class CreateSpecialOfferOkResponseDto {
  @ApiProperty({ example: 201, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({ type: SpecialOfferDataDto, description: 'Offer data object' })
  data: SpecialOfferDataDto;
}

export class CreateSpecialOfferConflictResponseDto {
  @ApiProperty({ example: 409, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({ example: null, description: 'Data is null' })
  data: any;

  @ApiProperty({
    example: 'Offer with this name already exists',
    description: 'Additional details',
  })
  error: string;
}
