import { ApiProperty } from '@nestjs/swagger';

export class MetadataDto {
  @ApiProperty({ example: 1, description: 'Total number of resource' })
  total: number;

  @ApiProperty({ example: 1, description: 'Current page number' })
  page: number;

  @ApiProperty({ example: 100, description: 'Number of resource per page' })
  limit: number;

  @ApiProperty({ example: 1, description: 'Total number of pages' })
  totalPages: number;
}
