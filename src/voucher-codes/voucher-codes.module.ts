import { Module } from '@nestjs/common';
import { VoucherCodesService } from './voucher-codes.service';
import { VoucherCodesController } from './voucher-codes.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VoucherCodesController],
  providers: [VoucherCodesService],
})
export class VoucherCodesModule {}
