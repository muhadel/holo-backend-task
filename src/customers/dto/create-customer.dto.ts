import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { CustomerDataDto } from './customer-data.dto';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'The name of the customer',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email of the customer',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class CreateCustomerOkResponseDto {
  @ApiResponseProperty({ example: 201 })
  statusCode: number;

  @ApiResponseProperty({ type: CustomerDataDto })
  data: CustomerDataDto;
}

export class CreateCustomerConflictResponseDto {
  @ApiProperty({ example: 409, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({ example: null, description: 'Data is null' })
  data: any;

  @ApiProperty({
    example: 'Customer with this email already exists',
    description: 'Additional details',
  })
  error: string;
}
