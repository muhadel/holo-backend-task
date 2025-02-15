import { ApiProperty } from '@nestjs/swagger';

export class SpecialOfferDataDto {
  @ApiProperty({
    example: '838d63c5-7306-4c8b-b301-e064f35aa476',
    description: 'Unique ID of the special offer',
  })
  id: string;

  @ApiProperty({ example: 'SPECIAL_OFFER_20', description: 'Name of the special offer' })
  name: string;

  @ApiProperty({
    example: 20,
    description: 'Discount percentage of the special offer',
  })
  discountPercentage: number;

  @ApiProperty({
    example: '2025-02-14T18:17:32.595Z',
    description: 'Timestamp when the special offer was created',
  })
  createdAt: string;

  @ApiProperty({
    example: '2025-02-14T18:17:32.595Z',
    description: 'Timestamp when the special offer was last updated',
  })
  updatedAt: string;
}
