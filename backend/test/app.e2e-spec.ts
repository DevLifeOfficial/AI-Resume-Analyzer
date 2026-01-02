import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserResolver (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 30000);

  afterAll(async () => {
    await app.close();
  }, 10000);


  it('registers a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            register(input: { 
            name: "TestUser",
            email: "test@example.com",
            password: "testPassword"
            }) {
              token
              user {
                id
                email
                name
                role
              }
            }
          }
        `,
      })
      .expect(200);

     expect(response.body.data.register.user.id).toBeDefined();
      expect(response.body.data.register.user.email).toBeDefined();
      expect(response.body.data.register.user.name).toBeDefined();
      expect(response.body.data.register.user.role).toBe('USER');
    expect(response.body.data.register.token).toBeDefined();
    accessToken = response.body.data.register.token;
  });

  it('logs in an existing user', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
          mutation {
            login(input: { 
            email: "test@example.com",
            password: "testPassword" })
             {
              token
              user {
                id
                email
                name
                role
              }
            }
          }
        `,
      })
      .expect(200);

    expect(response.body.data.login.token).toBeDefined();
    accessToken = response.body.data.login.token;
  });

});