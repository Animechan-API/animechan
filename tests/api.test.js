require('dotenv').config();
const supertest = require('supertest');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const _ = require('lodash');
const database = require('../config/mongo');
const { app } = require('../config/server');
const seedDatabase = require('./seeds/seeder');
const db = require('./seeds/quote.json');
const Quote = require('../model/quote');

const request = supertest(app.callback());

beforeAll(async () => {
  await database.connect();
  await seedDatabase(Quote, db);
});

afterAll(async () => {
  await Quote.removeCollection();
  await database.disconnect();
});

describe('GET /api/quotes', () => {
  it('it should return 200', async (done) => {
    const res = await request.get('/api/quotes');
    expect(res.status).toBe(200);
    expect(res.ok).toBe(true);
    expect(res.type).toMatch(/json/i);
    expect(_.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(50);
    expect(res.body[_.random(49)]).not.toHaveProperty(['_id', ' created_At', 'updatedAt', '__v']);
    done();
  });
});

describe('GET /api/quotes/random', () => {
  it('it should return 200', async (done) => {
    const res = await request.get('/api/quotes/random');
    expect(res.status).toBe(200);
    expect(res.ok).toBe(true);
    expect(res.type).toMatch(/json/i);
    expect(_.isObject(res.body)).toBe(true);
    expect(res.body).toHaveProperty('anime');
    expect(res.body).toHaveProperty('character');
    expect(res.body).toHaveProperty('quote');
    expect(res.body).not.toHaveProperty(['_id', ' created_At', 'updatedAt', '__v']);
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
    const bodyLength = res.body.length;
    expect(res.status).toBe(200);
    expect(res.ok).toBe(true);
    expect(res.type).toMatch(/json/i);
    expect(_.isArray(res.body)).toBe(true);
    expect(bodyLength).toBeGreaterThanOrEqual(1);
    expect(bodyLength).toBeLessThanOrEqual(50);
    expect(res.body[_.random(bodyLength - 1)]).not.toHaveProperty(['_id', ' created_At', 'updatedAt', '__v']);
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
    const bodyLength = res.body.length;
    expect(res.status).toBe(200);
    expect(res.ok).toBe(true);
    expect(res.type).toMatch(/json/i);
    expect(_.isArray(res.body)).toBe(true);
    expect(bodyLength).toBeGreaterThanOrEqual(1);
    expect(bodyLength).toBeLessThanOrEqual(50);
    expect(res.body[_.random(bodyLength - 1)]).not.toHaveProperty(['_id', ' created_At', 'updatedAt', '__v']);
    done();
  });
});
