const supertest = require('supertest');
const server = require('../config/server');

const request = supertest(server);

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
