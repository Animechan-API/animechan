require('dotenv').config();
const supertest = require('supertest');
const database = require('../config/mongo');
const { app } = require('../config/server');

let server;
let request;

beforeAll(async () => {
  await database.connect();
  server = app.listen();
  request = supertest(server);
});

afterAll(async () => {
  await database.disconnect();
  server.close();
});

describe('GET /status', () => {
  it('it should return 200', async (done) => {
    const res = await request.get('/status');
    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/i);
    expect(typeof res.body).toBe('object');
    expect(res.body.active).toBe(true);
    done();
  });
});

describe('Handle 404', () => {
  it('should return 404', async (done) => {
    const res = await request.get('/foo');
    expect(res.status).toBe(404);
    expect(res.type).toMatch(/text/i);
    done();
  });
});
