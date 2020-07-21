const chai = require("chai");
const { expect } = chai;
const chatHttp = require("chai-http");

const server = require("../server");

chai.use(chatHttp);

const test = async (pathname) => chai.request(server).get(`/api/${pathname}`);
const paginationNumber = Math.floor(Math.random() * 10);

describe("Status check : /quotes?page=n  (n>=00&&n<=10)", () => {
  it("should return status 200", async () => {
    const res = await test(`/quotes?page=${paginationNumber}`);
    expect(res).to.have.status(200);
  });
});

describe("Pagination Check", () => {
  it("should generate 10 different quotes on any random pagination", async () => {
    const { body } = await test(`/quotes?page=${paginationNumber}`);
    expect(body).to.have.lengthOf(10);
  });
});
