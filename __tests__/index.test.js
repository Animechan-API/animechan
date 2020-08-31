const app = require("../config/express");
const supertest = require("supertest");
const request = supertest(app);

describe("/api endpoints", () => {
  it("/status", async (done) => {
    const res = await request.get("/api/status");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("OK");
    expect(res.body.active).toBe(true);
    done();
  });
});
