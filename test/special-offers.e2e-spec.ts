import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('SpecialOffersController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

    await app.init();

    prisma = app.get(PrismaService);

    // Ensure database is clean before tests
    await prisma.customer.deleteMany();
    await prisma.voucher.deleteMany();
    await prisma.specialOffer.deleteMany();
  });

  afterAll(async () => {
    await prisma.customer.deleteMany();
    await prisma.voucher.deleteMany();
    await prisma.specialOffer.deleteMany();
    await app.close();
  });

  describe('POST /special-offers', () => {
    it('should create a new special offer', async () => {
      const offerData = {
        name: 'New Year Discount 20%',
        discountPercentage: 20,
      };

      const response = await request(app.getHttpServer())
        .post('/special-offers')
        .send(offerData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(offerData.name);
      expect(response.body.discountPercentage).toBe(offerData.discountPercentage);
    });

    it('should return 409 Conflict if the offer already exists', async () => {
      const offerData = {
        name: 'Summer Sale 15%',
        discountPercentage: 15,
      };

      // Create first offer
      await request(app.getHttpServer()).post('/special-offers').send(offerData).expect(201);

      // Attempt to create again with the same name
      const response = await request(app.getHttpServer())
        .post('/special-offers')
        .send(offerData)
        .expect(409);

      expect(response.body.message).toBe('Offer with this name already exists');
    });

    it('should return 400 Bad Request for invalid data', async () => {
      const invalidOfferData = {
        name: '',
        discountPercentage: -10,
      };

      const response = await request(app.getHttpServer())
        .post('/special-offers')
        .send(invalidOfferData)
        .expect(400);

      expect(
        response.body.message.some((msg: string) =>
          msg.includes('discountPercentage must not be less than 0')
        )
      ).toBe(true);
    });
  });

  describe('GET /special-offers', () => {
    it('should return all special offers', async () => {
      const response = await request(app.getHttpServer())
        .get('/special-offers?page=1&limit=10')
        .expect(200);

      expect(Array.isArray(response.body.results)).toBe(true);
      expect(response.body.results.length).toBeGreaterThanOrEqual(1);
    });
  });
});
