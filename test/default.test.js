const chai = require("chai");
const { expect } = chai;
const chatHttp = require("chai-http");

const server = require("../server");

chai.use(chatHttp);

const test = async (pathname) => chai.request(server).get(`/api/${pathname}`);

describe("Status check : /quotes", () => {
  it("should return status 200", async () => {
    const res = await test("/quotes");
    expect(res).to.have.status(200);
  });
});

describe("Character match", () => {
  it("should match returning quotes with the data.json file", async () => {
    const { body } = await test("/quotes");
    expect(body).to.eql(require("./data/quotes.json"));
  });
});
