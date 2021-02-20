require('dotenv').config();
const supertest = require('supertest');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
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

describe('GET /api/quotes', () => {
  it('it should return 200', async (done) => {
    const res = await request.get('/api/quotes');
    expect(res.status).toBe(200);
    expect(res.ok).toBe(true);
    expect(res.type).toMatch(/json/i);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(50);
    done();
  });
});

describe('GET /api/quotes/random', () => {
  it('it should return 200', async (done) => {
    const res = await request.get('/api/quotes/random');
    expect(res.status).toBe(200);
    expect(res.ok).toBe(true);
    expect(res.type).toMatch(/json/i);
    expect(typeof res.body).toBe('object');
    expect(res.body).toHaveProperty('anime');
    expect(res.body).toHaveProperty('character');
    expect(res.body).toHaveProperty('quote');
    done();
  });
});

describe('GET /api/quotes/anime?title=<anime-title>', () => {
  it('it should return 400 when title is not provided /anime', async (done) => {
    const res = await request.get('/api/quotes/anime');
    expect(res.status).toBe(400);
    expect(res.ok).toBe(false);
    expect(res.type).toMatch(/json/i);
    expect(res.body.error).toBe(getReasonPhrase(StatusCodes.BAD_REQUEST));
    done();
  });

  it('it should return 400 when title is has no value /anime?title', async (done) => {
    const res = await request.get('/api/quotes/anime?title');
    expect(res.status).toBe(400);
    expect(res.ok).toBe(false);
    expect(res.type).toMatch(/json/i);
    expect(res.body.error).toBe(getReasonPhrase(StatusCodes.BAD_REQUEST));
    done();
  });

  it('it should return 400 when title has no value /anime?title=', async (done) => {
    const res = await request.get('/api/quotes/anime?title=');
    expect(res.status).toBe(400);
    expect(res.ok).toBe(false);
    expect(res.type).toMatch(/json/i);
    expect(res.body.error).toBe(getReasonPhrase(StatusCodes.BAD_REQUEST));
    done();
  });

  it('it should return 404 when no matching anime is found /anime?title=foobar', async (done) => {
    const res = await request.get('/api/quotes/anime?title=foobar');
    expect(res.status).toBe(404);
    expect(res.ok).toBe(false);
    expect(res.type).toMatch(/json/i);
    expect(res.body.error).toBe(getReasonPhrase(StatusCodes.NOT_FOUND));
    done();
  });

  it('it should return 200 when matching anime is found anime?title=naruto', async (done) => {
    const res = await request.get('/api/quotes/anime?title=naruto');
    expect(res.status).toBe(200);
    expect(res.ok).toBe(true);
    expect(res.type).toMatch(/json/i);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body.length).toBeLessThanOrEqual(50);
    done();
  });
});

describe('GET /api/quotes/character?name=<character-name>', () => {
  it('it should return 400 when title is not provided /character', async (done) => {
    const res = await request.get('/api/quotes/character');
    expect(res.status).toBe(400);
    expect(res.ok).toBe(false);
    expect(res.type).toMatch(/json/i);
    expect(res.body.error).toBe(getReasonPhrase(StatusCodes.BAD_REQUEST));
    done();
  });

  it('it should return 400 when title is has no value /character?name', async (done) => {
    const res = await request.get('/api/quotes/character?name');
    expect(res.status).toBe(400);
    expect(res.ok).toBe(false);
    expect(res.type).toMatch(/json/i);
    expect(res.body.error).toBe(getReasonPhrase(StatusCodes.BAD_REQUEST));
    done();
  });

  it('it should return 400 when title has no value /character?name=', async (done) => {
    const res = await request.get('/api/quotes/character?name=');
    expect(res.status).toBe(400);
    expect(res.ok).toBe(false);
    expect(res.type).toMatch(/json/i);
    expect(res.body.error).toBe(getReasonPhrase(StatusCodes.BAD_REQUEST));
    done();
  });

  it('it should return 404 when no matching character is found /character?name=foobar', async (done) => {
    const res = await request.get('/api/quotes/character?name=foobar');
    expect(res.status).toBe(404);
    expect(res.ok).toBe(false);
    expect(res.type).toMatch(/json/i);
    expect(res.body.error).toBe(getReasonPhrase(StatusCodes.NOT_FOUND));
    done();
  });

  it('it should return 200 when matching character is found /character?name=naruto', async (done) => {
    const res = await request.get('/api/quotes/character?name=naruto');
    expect(res.status).toBe(200);
    expect(res.ok).toBe(true);
    expect(res.type).toMatch(/json/i);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body.length).toBeLessThanOrEqual(50);
    done();
  });
});
