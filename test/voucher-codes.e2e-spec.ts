import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('VoucherCodesController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let customerId: string;
  let specialOfferId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();

    prisma = app.get(PrismaService);

    await prisma.voucher.deleteMany();
    await prisma.specialOffer.deleteMany();
    await prisma.customer.deleteMany();

    // Create a customer
    const customer = await prisma.customer.create({
      data: { name: 'Test Customer', email: 'test@example.com' },
    });
    customerId = customer.id;

    // Create a special offer
    const specialOffer = await prisma.specialOffer.create({
      data: { name: 'Test Offer', discountPercentage: 10 },
    });
    specialOfferId = specialOffer.id;
  });

  afterAll(async () => {
    await prisma.voucher.deleteMany();
    await prisma.specialOffer.deleteMany();
    await prisma.customer.deleteMany();
    await app.close();
  });

  describe('POST /voucher-codes/generate', () => {
    it('should create a new voucher code', async () => {
      const voucherData = {
        expirationDate: '2026-01-01T00:00:00.000Z',
        specialOfferId,
        customerId,
      };

      const response = await request(app.getHttpServer())
        .post('/voucher-codes/generate')
        .send(voucherData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
    });

    it('should return 400 Bad Request for invalid data', async () => {
      const invalidVoucherData = {
        expirationDate: 'invalid-date', // Invalid date format
        specialOfferId: '', // Missing ID
        customerId: '',
      };

      const response = await request(app.getHttpServer())
        .post('/voucher-codes/generate')
        .send(invalidVoucherData)
        .expect(400);

      expect(response.body.message.length).toBeGreaterThan(0);
    });
  });

  describe('GET /voucher-codes', () => {
    it('should return all voucher codes', async () => {
      const response = await request(app.getHttpServer()).get('/voucher-codes').expect(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
