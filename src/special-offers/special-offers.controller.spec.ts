import { Test, TestingModule } from '@nestjs/testing';
import { SpecialOffersController } from './special-offers.controller';
import { SpecialOffersService } from './special-offers.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('SpecialOffersController', () => {
  let controller: SpecialOffersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [SpecialOffersController],
      providers: [SpecialOffersService],
    }).compile();

    controller = module.get<SpecialOffersController>(SpecialOffersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
