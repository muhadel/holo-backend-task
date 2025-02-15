import { ApiProperty } from '@nestjs/swagger';

export class CustomerDataDto {
  @ApiProperty({
    example: '09e4364f-fcf3-491f-bf1a-083bc6e4e444',
    description: 'Unique ID of the customer',
  })
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'Full name of the customer' })
  name: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Email of the customer',
  })
  email: string;

  @ApiProperty({
    example: '2025-02-14T19:40:41.769Z',
    description: 'Timestamp when the customer was created',
  })
  createdAt: string;

  @ApiProperty({
    example: '2025-02-14T19:40:41.769Z',
    description: 'Timestamp when the customer was last updated',
  })
  updatedAt: string;
}
