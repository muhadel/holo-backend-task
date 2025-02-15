import { Test, TestingModule } from '@nestjs/testing';
import { VoucherCodesController } from './voucher-codes.controller';
import { VoucherCodesService } from './voucher-codes.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('VoucherCodesController', () => {
  let controller: VoucherCodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [VoucherCodesController],
      providers: [VoucherCodesService],
    }).compile();

    controller = module.get<VoucherCodesController>(VoucherCodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
