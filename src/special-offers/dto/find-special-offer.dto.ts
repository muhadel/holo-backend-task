import { ApiProperty } from '@nestjs/swagger';
import { SpecialOfferDataDto } from './special-offer-data.dto';
import { MetadataDto } from './metadata.dto';

export class FindAllSpecialOffersResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({
    description: 'Offers data with pagination metadata',
    type: () => ({
      results: { type: [SpecialOfferDataDto] },
      metadata: { type: MetadataDto },
    }),
  })
  data: {
    results: SpecialOfferDataDto[];
    metadata: MetadataDto;
  };
}
