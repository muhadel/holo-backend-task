import { ApiProperty } from '@nestjs/swagger';
import { CustomerDataDto } from './customer-data.dto';
import { MetadataDto } from './metadata.dto';

export class FindAllCustomersResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({
    description: 'Customer data with pagination metadata',
    type: () => ({
      results: { type: [CustomerDataDto] },
      metadata: { type: MetadataDto },
    }),
  })
  data: {
    results: CustomerDataDto[];
    metadata: MetadataDto;
  };
}
