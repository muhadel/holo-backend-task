import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { VoucherCodesService } from './voucher-codes.service';

import {
  GenerateVoucherCodeDto,
  RedeemVoucherCodeDto,
  FindAllVoucherCodesOkResponseDto,
  FindAllVoucherCodesByEmailOkResponseDto,
  GenerateVoucherCodeOkResponseDto,
  GenerateVoucherCodeNotFoundDto,
  RedeemVoucherCodeOkResponseDto,
  RedeemVoucherCodeBadResponseDto,
} from './dto';

@Controller('voucher-codes')
@ApiTags('voucher-codes')
export class VoucherCodesController {
  constructor(private readonly voucherCodesService: VoucherCodesService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate a new voucher code for a customer.' })
  @ApiOkResponse({ type: GenerateVoucherCodeOkResponseDto })
  @ApiNotFoundResponse({ type: GenerateVoucherCodeNotFoundDto })
  generate(@Body() generateVoucherCodeDto: GenerateVoucherCodeDto) {
    return this.voucherCodesService.generate(generateVoucherCodeDto);
  }

  @Post('redeem')
  @ApiOperation({ summary: 'Redeem an existing voucher code.' })
  @ApiOkResponse({ type: RedeemVoucherCodeOkResponseDto })
  @ApiBadRequestResponse({ type: RedeemVoucherCodeBadResponseDto })
  redeem(@Body() redeemVoucherCodeDto: RedeemVoucherCodeDto) {
    return this.voucherCodesService.redeem(redeemVoucherCodeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all voucher codes.' })
  @ApiOkResponse({ type: FindAllVoucherCodesOkResponseDto })
  findAll() {
    return this.voucherCodesService.findAll();
  }

  @Get('/customer/:email')
  @ApiOperation({
    summary: 'Retrieve all voucher codes associated with a specific customer email.',
  })
  @ApiOkResponse({ type: FindAllVoucherCodesByEmailOkResponseDto })
  findValidVoucherCodesByEmail(@Param('email') email: string) {
    return this.voucherCodesService.findValidVoucherCodesByEmail(email);
  }
}
