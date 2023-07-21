import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaClient, User } from '@prisma/client';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { UserService } from '../src/modules/user/user.service';
import * as request from 'supertest';

const gql = '/graphql';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;
  let userService: UserService;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = app.get(PrismaService);
    userService = app.get(UserService);
    await app.init();
  });
  beforeEach(async () => {});

  describe('search query', () => {
    it('should successfully query the database and get some data', async () => {
      const query = 'country';
      const filters = { category: 'jobs' };
      const pagination = {
        perPage: 10,
        page: 1,
      };

      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          query search($query: String!, $filters: SearchFilters!, $pagination: PaginationInput!) {
            search(query: $query, filters: $filters, pagination: $pagination) {
              url
              description
              title
              id
            }
          }
        `,
          variables: {
            query: query,
            filters: filters,
            pagination: pagination,
          },
        });

      expect(response.status).toBe(200);
    });
  });

  describe('get search result query', () => {
    it('should successfully query the database and get some data', async () => {
      const id = 1;
      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          query {
            getSearchResult(id : ${id} ) {
                id
                title
                description
                url
                rating
                location
                category
                price
            }
          }
        `,
        });

      expect(response.status).toBe(200);
    });

    it('should  query the database and return error ', async () => {
      const invalidId = 999;
      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          query {
            getSearchResult(id : ${invalidId} ) {
                id
                title
                description
                url
                rating
                location
                category
                price
            }
          }
        `,
        });
      expect(response.status).toBe(200);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].extensions.code).toBe('BAD_REQUEST');
    });
  });

  describe('get user search history query', () => {
    it('should successfully query the database and get some search history of user', async () => {
      const id = 1;
      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          query {
            getUserSearchHistory(userId : ${id} ) {
              id
              query
              createdAt
              userId
            }
          }
        `,
        });

      expect(response.status).toBe(200);
    });

    it('should successfully query the database and return error', async () => {
      const invalidId = 999;
      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          query {
            getUserSearchHistory(userId : ${invalidId} ) {
              id
              query
              createdAt
              userId
            }
          }
        `,
        });
      expect(response.status).toBe(200);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].extensions.code).toBe('BAD_REQUEST');
    });
  });

  describe('get popular searches', () => {
    it('should successfully get popular searches', async () => {
      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          query {
            getPopularSearch{
              id
              title
              description
              url
              rating
              location
              category
              price
            }
          }
        `,
        });
      expect(response.status).toBe(200);
    });
  });

  describe('creating user search history', () => {
    it('should successfully create user search history', async () => {
      const id = 1;
      const query = 'jobs';
      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            createUserSearchHistory(userId : ${id} , query : "${query}") {
                id
                query
                createdAt
                userId
            }
          }
        `,
        });
      expect(response.status).toBe(200);
    });

    it('should throw if user id is invalid', async () => {
      const invalidId = 999;
      const query = 'random';
      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            createUserSearchHistory(userId : ${invalidId} , query : "${query}") {
                id
                query
                createdAt
                userId
            }
          }
        `,
        });
      expect(response.status).toBe(200);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].extensions.code).toBe('BAD_REQUEST');
    });
  });

  describe('clearing user search history', () => {
    it('should successfully clear user search history', async () => {
      const id = 1;
      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            clearUserSearchHistory(userId : ${id})
          }
        `,
        });
      console.log('response: ', response.error);
      expect(response.status).toBe(200);
    });

    it('should not clear and throws a false if id is invalid', async () => {
      const invalidId = 999;
      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            clearUserSearchHistory(userId : ${invalidId})
          }
        `,
        });
      expect(response.status).toBe(200);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].extensions.code).toBe('BAD_REQUEST');
    });
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });
});
