import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('CustomersController (e2e)', () => {
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
  });

  afterAll(async () => {
    await prisma.customer.deleteMany();
    await app.close();
  });

  describe('POST /customers', () => {
    it('should create a new customer', async () => {
      const customerData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
      };

      const response = await request(app.getHttpServer())
        .post('/customers')
        .send(customerData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(customerData.name);
      expect(response.body.email).toBe(customerData.email);
    });

    it('should return 409 Conflict if customer already exists', async () => {
      const customerData = {
        name: 'Jane Doe',
        email: 'johndoe2@example.com',
      };

      // Create first customer
      await request(app.getHttpServer()).post('/customers').send(customerData).expect(201);

      // Attempt to create again with same email
      const response = await request(app.getHttpServer())
        .post('/customers')
        .send(customerData)
        .expect(409);

      expect(response.body.message).toBe('Customer with this email already exists');
    });

    it('should return 400 Bad Request for invalid data', async () => {
      const invalidCustomerData = { name: '', email: 'invalid-email' };

      const response = await request(app.getHttpServer())
        .post('/customers')
        .send(invalidCustomerData)
        .expect(400);

      expect(response.body.message).toContain('email must be an email');
      expect(response.body.message).toContain('name should not be empty');
    });
  });

  describe('GET /customers', () => {
    it('should return all customers', async () => {
      const response = await request(app.getHttpServer())
        .get('/customers?page=1&limit=10')
        .expect(200);

      expect(Array.isArray(response.body.results)).toBe(true);
      expect(response.body.results.length).toBeGreaterThanOrEqual(1);
    });
  });
});
