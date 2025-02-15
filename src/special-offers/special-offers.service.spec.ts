import { Test, TestingModule } from '@nestjs/testing';
import { SpecialOffersService } from './special-offers.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('SpecialOffersService', () => {
  let service: SpecialOffersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [SpecialOffersService],
    }).compile();

    service = module.get<SpecialOffersService>(SpecialOffersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
