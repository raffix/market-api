import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(3000);
  });

  describe('CustomerModule (e2e)', () => {
    it(`/GET customers 404`, () => {
      return request(app.getHttpServer())
        .get('/customers')
        .expect(404)
        .expect({
          statusCode: 404,
          message: 'Cannot GET /customers',
          error: 'Not Found'
        });
    });
  
    it(`/GET customers Liam`, () => {
      return request(app.getHttpServer())
        .get('/customers/1')
        .expect(200)
        .expect({id: 1, name: 'Liam', age: 33});
    });  
  });
  

  describe('ProductModule (e2e)', () => {
    it(`/GET products 404`, () => {
      return request(app.getHttpServer())
        .get('/products')
        .expect(404)
        .expect({
          statusCode: 404,
          message: 'Cannot GET /products',
          error: 'Not Found'
        });
    });
  
    it(`/GET products mustard`, () => {
      return request(app.getHttpServer())
        .get('/products/1')
        .expect(200)
        .expect({id: 1, name: 'Mustard', price: 3.50});
    });
  });

  describe('MultipleModule (e2e)', () => {
    it(`/GET multiple two items`, () => {
      return request(app.getHttpServer())
      .get('/multiple?liam=/customers/1&olivia=/customers/5&ketchup=/products/2')
      .expect(200)
      .expect({
        liam: { id: 1, name: 'Liam', age: 33 },
        olivia: { id: 5, name: 'Olivia', age: 31 },
        ketchup: { id: 2, name: 'Ketchup', price: 4 }
      });
    })
  });

  afterAll(async () => {
    await app.close();
  });
});
