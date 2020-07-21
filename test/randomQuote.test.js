const chai = require("chai");
const { expect } = chai;
const chaiHttp = require("chai-http");

const server = require("../server");

chai.use(chaiHttp);

const test = async () => chai.request(server).get("/api/quotes/random");

describe("Status check : /quotes/random", () => {
  it("should return status 200", async () => {
    const res = await test();
    expect(res).to.have.status(200);
  });
});

describe("/quotes/random", () => {
  it("should return one random quote", async () => {
    const { body } = await test();
    expect(body).to.have.lengthOf(1);
  });
});
