import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class RedeemVoucherCodeDto {
  @ApiProperty({
    example: '3M5PUUOC',
    description: 'The unique voucher code to redeem',
  })
  @IsString()
  @IsNotEmpty()
  voucherCode: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email associated with the voucher',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class RedeemVoucherCodeOkResponseDto {
  @ApiProperty({ example: 201, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({
    example: {
      id: '45b25c5c-654f-48eb-9dde-4ba3ec56cb83',
      code: 'TW6ANCAI',
      expirationDate: '2026-01-01T00:00:00.000Z',
      usedAt: '2025-02-14T18:57:19.714Z',
      customerId: 'fae3e008-16a7-4de3-a4ca-7efbfe784b76',
      specialOfferId: '838d63c5-7306-4c8b-b301-e064f35aa476',
      createdAt: '2025-02-14T18:25:47.860Z',
      updatedAt: '2025-02-14T18:57:19.751Z',
    },
    description: 'Details of the redeemed voucher',
  })
  data: {
    id: string;
    code: string;
    expirationDate: string;
    usedAt: string | null;
    customerId: string;
    specialOfferId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export class RedeemVoucherCodeBadResponseDto {
  @ApiProperty({ example: 400, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({ example: null, description: 'No data returned', nullable: true })
  data: any;

  @ApiProperty({
    example: 'Invalid voucher with code 3M5PUUOC',
    description: 'Error message describing the reason for failure',
  })
  error: string;
}
