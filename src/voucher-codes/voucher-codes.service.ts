import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GenerateVoucherCodeDto } from './dto/generate-voucher-code.dto';
import { RedeemVoucherCodeDto } from './dto/redeem-voucher-code.dto';
import { generateRandomString } from '../common/utils/generateRandomString.util';
import { Prisma } from '@prisma/client';

@Injectable()
export class VoucherCodesService {
  constructor(private readonly prisma: PrismaService) {}

  async generate(data: GenerateVoucherCodeDto) {
    // Check if the special offer exists
    const specialOffer = await this.prisma.specialOffer.findUnique({
      where: { id: data.specialOfferId },
    });

    if (!specialOffer) {
      throw new NotFoundException(`Offer with ID ${data.specialOfferId} not found`);
    }

    // Check if the customer exists (if provided)
    if (data.customerId) {
      const customer = await this.prisma.customer.findUnique({ where: { id: data.customerId } });

      if (!customer) {
        throw new NotFoundException(`Customer with ID ${data.customerId} not found`);
      }
    }

    // Create the voucher
    return this.prisma.voucher.create({
      data: {
        code: generateRandomString(8),
        expirationDate: data.expirationDate,
        specialOffer: { connect: { id: data.specialOfferId } },
        ...(data.customerId ? { customer: { connect: { id: data.customerId } } } : {}),
      },
    });
  }

  async redeem(data: RedeemVoucherCodeDto) {
    // Check if the voucher exists and is still valid
    const voucher = await this.prisma.voucher.findUnique({
      where: { code: data.voucherCode, customer: { email: data.email } },
    });

    // Check if the voucher is found
    if (!voucher) {
      throw new BadRequestException(`Invalid voucher with code ${data.voucherCode}`);
    }

    // Check if the voucher is already used
    if (voucher.usedAt) {
      throw new BadRequestException(`Voucher ${data.voucherCode} has already been redeemed`);
    }

    // Check if the voucher is expired
    if (voucher.expirationDate < new Date()) {
      throw new BadRequestException(`Voucher ${data.voucherCode} has expired`);
    }

    // Mark the voucher as used
    return this.prisma.voucher.update({
      where: { code: data.voucherCode },
      data: { usedAt: new Date() },
      include: { specialOffer: true },
    });
  }

  findOne(where: Prisma.VoucherWhereInput, include?: Prisma.VoucherInclude) {
    return this.prisma.voucher.findFirst({ where, include });
  }

  findAll() {
    return this.prisma.voucher.findMany({ include: { specialOffer: true, customer: true } });
  }

  findValidVoucherCodesByEmail(email: string) {
    return this.prisma.voucher.findMany({
      where: { customer: { email }, usedAt: null, expirationDate: { gt: new Date() } },
      include: { specialOffer: true },
    });
  }
}
