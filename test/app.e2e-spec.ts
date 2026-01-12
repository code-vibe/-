import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Health Check', () => {
    it('/ (GET) should return application info', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toContain('Autochek');
          expect(res.body.version).toBe('1.0.0');
        });
    });

    it('/health (GET) should return health status', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toBe('healthy');
          expect(res.body.services).toBeDefined();
        });
    });
  });

  describe('API Endpoints', () => {
    it('/api/v1/vehicles (GET) should return vehicles list', () => {
      return request(app.getHttpServer())
        .get('/api/v1/vehicles')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('total');
          expect(res.body).toHaveProperty('page');
        });
    });

    it('/api/v1/vehicles/stats (GET) should return vehicle statistics', () => {
      return request(app.getHttpServer())
        .get('/api/v1/vehicles/stats')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('totalVehicles');
          expect(res.body).toHaveProperty('byCondition');
          expect(res.body).toHaveProperty('averageYear');
        });
    });

    it('/api/v1/valuations (GET) should return valuations list', () => {
      return request(app.getHttpServer())
        .get('/api/v1/valuations')
        .expect(200)
        .expect(Array.isArray);
    });

    it('/api/v1/loans (GET) should return loans list', () => {
      return request(app.getHttpServer())
        .get('/api/v1/loans')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('total');
        });
    });

    it('/api/v1/offers (GET) should return offers list', () => {
      return request(app.getHttpServer())
        .get('/api/v1/offers')
        .expect(200)
        .expect(Array.isArray);
    });
  });

  describe('Vehicle Ingestion', () => {
    const sampleVehicle = {
      vin: '1HGCM82633A999999',
      make: 'Honda',
      model: 'Accord',
      year: 2022,
      mileage: 15000,
      condition: 'Excellent'
    };

    it('should create a new vehicle', () => {
      return request(app.getHttpServer())
        .post('/api/v1/vehicles')
        .send(sampleVehicle)
        .expect(201)
        .expect((res) => {
          expect(res.body.vin).toBe(sampleVehicle.vin);
          expect(res.body.make).toBe(sampleVehicle.make);
          expect(res.body.id).toBeDefined();
        });
    });

    it('should reject invalid VIN format', () => {
      const invalidVehicle = { ...sampleVehicle, vin: 'INVALID' };

      return request(app.getHttpServer())
        .post('/api/v1/vehicles')
        .send(invalidVehicle)
        .expect(400);
    });

    it('should reject duplicate VIN', async () => {
      // First create
      await request(app.getHttpServer())
        .post('/api/v1/vehicles')
        .send({ ...sampleVehicle, vin: '1HGCM82633A888888' });

      // Try to create duplicate
      return request(app.getHttpServer())
        .post('/api/v1/vehicles')
        .send({ ...sampleVehicle, vin: '1HGCM82633A888888' })
        .expect(409);
    });
  });
});
