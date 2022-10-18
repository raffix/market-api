import { Test } from '@nestjs/testing';
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
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
  });

  describe('CustomerModule (e2e)', () => {
    describe('/GET customers', () => {
      it('return 404 with error not found', () => {
        return request(app.getHttpServer())
          .get('/customers')
          .expect(404)
          .expect({
            statusCode: 404,
            message: 'Cannot GET /customers',
            error: 'Not Found',
          });
      });

      it('return 404 with error message customer does not exist', () => {
        return request(app.getHttpServer())
          .get('/customers/35')
          .expect(404)
          .expect({
            statusCode: 404,
            message: 'customer does not exist',
          });
      });

      it('return 200 with customer', () => {
        return request(app.getHttpServer())
          .get('/customers/1')
          .expect(200)
          .expect({ id: 1, name: 'Liam', age: 33 });
      });
    });
  });

  describe('ProductModule (e2e)', () => {
    describe('/GET products', () => {
      it('return 404 with error not found', () => {
        return request(app.getHttpServer())
          .get('/products')
          .expect(404)
          .expect({
            statusCode: 404,
            message: 'Cannot GET /products',
            error: 'Not Found',
          });
      });

      it('return 404 with error message product does not exist', () => {
        return request(app.getHttpServer())
          .get('/products/35')
          .expect(404)
          .expect({
            statusCode: 404,
            message: 'product does not exist',
          });
      });

      it('return 200 with product', () => {
        return request(app.getHttpServer())
          .get('/products/1')
          .expect(200)
          .expect({ id: 1, name: 'Mustard', price: 3.5 });
      });
    });
  });

  describe('MultipleModule (e2e)', () => {
    describe('/GET multiple', () => {
      it('return 200 with 2 customers and 1 product', () => {
        return request(app.getHttpServer())
          .get(
            '/multiple?liam=/customers/1&olivia=/customers/5&ketchup=/products/2',
          )
          .expect(200)
          .expect({
            liam: { data: { id: 1, name: 'Liam', age: 33 } },
            olivia: { data: { id: 5, name: 'Olivia', age: 31 } },
            ketchup: { data: { id: 2, name: 'Ketchup', price: 4 } },
          });
      });

      it('return 200 with 2 customers, 1 product and a error product does not exist', () => {
        return request(app.getHttpServer())
          .get(
            '/multiple?liam=/customers/1&olivia=/customers/5&ketchup=/products/2&candy=/products/12',
          )
          .expect(200)
          .expect({
            liam: { data: { id: 1, name: 'Liam', age: 33 } },
            olivia: { data: { id: 5, name: 'Olivia', age: 31 } },
            ketchup: { data: { id: 2, name: 'Ketchup', price: 4 } },
            candy: {
              error: { statusCode: 404, message: 'product does not exist' },
            },
          });
      });

      it('return 200 with 8 customers and 2 product, limited to 10 items', () => {
        return request(app.getHttpServer())
          .get(
            '/multiple?consumer1=/customers/1&consumer2=/customers/2&consumer3=/customers/3&consumer4=/customers/4&consumer5=/customers/5&consumer6=/customers/6&consumer7=/customers/7&consumer8=/customers/8&product1=/products/1&product2=/products/2&product3=/products/3&product4=/products/4&product5=/products/5&product6=/products/6&product7=/products/7&product8=/products/8',
          )
          .expect(200)
          .expect({
            consumer1: { data: { id: 1, name: 'Liam', age: 33 } },
            consumer2: { data: { id: 2, name: 'Noah', age: 27 } },
            consumer3: { data: { id: 3, name: 'Oliver', age: 22 } },
            consumer4: { data: { id: 4, name: 'Elijah', age: 29 } },
            consumer5: { data: { id: 5, name: 'Olivia', age: 31 } },
            consumer6: { data: { id: 6, name: 'Emma', age: 45 } },
            consumer7: { data: { id: 7, name: 'Charlotte', age: 47 } },
            consumer8: { data: { id: 8, name: 'Amelia', age: 60 } },
            product1: { data: { id: 1, name: 'Mustard', price: 3.5 } },
            product2: { data: { id: 2, name: 'Ketchup', price: 4 } },
          });
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
