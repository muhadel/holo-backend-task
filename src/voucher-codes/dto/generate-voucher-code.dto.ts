import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsDate, MinDate, IsOptional, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class GenerateVoucherCodeDto {
  @ApiProperty({
    example: '2026-01-01T00:00:00.000Z',
    description: 'Expiration date of the voucher',
    type: String,
    format: 'date-time',
  })
  @IsDate({ message: 'Expiration date must be a valid Date instance' })
  @Type(() => Date)
  @MinDate(new Date(), { message: 'Expiration date must be in the future' })
  @IsNotEmpty()
  expirationDate: Date;

  @ApiProperty({
    example: '838d63c5-7306-4c8b-b301-e064f35aa476',
    description: 'ID of the special offer associated with the voucher',
  })
  @IsUUID()
  @IsNotEmpty()
  specialOfferId: string;

  @ApiPropertyOptional({
    example: 'fae3e008-16a7-4de3-a4ca-7efbfe784b76',
    description: 'ID of the customer (optional)',
  })
  @IsUUID()
  @IsOptional()
  customerId?: string;
}

export class GenerateVoucherCodeOkResponseDto {
  @ApiProperty({ example: 201, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({
    example: {
      id: '9292b8d8-dd14-450b-b4b9-28b5f023476a',
      code: '3M5PUUOC',
      expirationDate: '2026-01-01T00:00:00.000Z',
      usedAt: null,
      customerId: '09e4364f-fcf3-491f-bf1a-083bc6e4e444',
      specialOfferId: '838d63c5-7306-4c8b-b301-e064f35aa476',
      createdAt: '2025-02-14T20:20:04.372Z',
      updatedAt: '2025-02-14T20:20:04.372Z',
    },
    description: 'Generated voucher code data',
  })
  data: {
    id: string;
    code: string;
    expirationDate: string;
    usedAt: string | null;
    customerId?: string;
    specialOfferId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export class GenerateVoucherCodeNotFoundDto {
  @ApiProperty({ example: 404, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({ example: null, description: 'No data returned', nullable: true })
  data: any;

  @ApiProperty({
    example: 'Offer/Customer with ID 838d63c5-7306-4c8b-b301-e064f35aa474 not found',
    description: 'Error message describing the reason for failure',
  })
  error: string;
}
