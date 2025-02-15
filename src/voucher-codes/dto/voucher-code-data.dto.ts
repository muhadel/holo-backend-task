import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { SpecialOfferDataDto } from '../../special-offers/dto';
import { CustomerDataDto } from '../../customers/dto';

export class VoucherCodeDataDto {
  @ApiProperty({
    example: '7c609ad0-e3b1-4f69-a37f-9e5ebed444d3',
    description: 'Unique ID of the voucher code',
  })
  id: string;

  @ApiProperty({ example: 'T5MPRYKT', description: 'Generated voucher code' })
  code: string;

  @ApiProperty({
    example: '2026-01-01T00:00:00.000Z',
    description: 'Expiration date of the voucher code',
  })
  expirationDate: string;

  @ApiPropertyOptional({
    example: null,
    description: 'Timestamp when the voucher was used (null if unused)',
  })
  usedAt: string | null;

  @ApiPropertyOptional({
    example: 'fae3e008-16a7-4de3-a4ca-7efbfe784b76',
    description: 'ID of the customer who owns the voucher (null if not assigned)',
  })
  customerId: string | null;

  @ApiProperty({
    example: '838d63c5-7306-4c8b-b301-e064f35aa476',
    description: 'ID of the associated special offer',
  })
  specialOfferId: string;

  @ApiProperty({
    example: '2025-02-14T18:59:33.422Z',
    description: 'Timestamp when the voucher code was created',
  })
  createdAt: string;

  @ApiProperty({
    example: '2025-02-14T18:59:33.422Z',
    description: 'Timestamp when the voucher code was last updated',
  })
  updatedAt: string;

  @ApiProperty({
    type: SpecialOfferDataDto,
    description: 'Details of the associated special offer',
  })
  specialOffer: SpecialOfferDataDto;

  @ApiPropertyOptional({
    type: CustomerDataDto,
    description: 'Details of the assigned customer (null if not assigned)',
  })
  customer: CustomerDataDto | null;
}

export class FindAllVoucherCodesOkResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({ description: 'List of vouchers', type: [VoucherCodeDataDto] })
  data: VoucherCodeDataDto[];
}

export class VoucherCodeDataWithoutCustomerDto extends OmitType(VoucherCodeDataDto, [
  'customer',
] as const) {}

export class FindAllVoucherCodesByEmailOkResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({
    type: [VoucherCodeDataWithoutCustomerDto],
    description: 'List of vouchers associated with the user email',
  })
  data: VoucherCodeDataWithoutCustomerDto[];
}
