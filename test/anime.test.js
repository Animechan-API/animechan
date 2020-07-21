const chai = require("chai");
const { expect } = chai;
const chatHttp = require("chai-http");

const server = require("../server");

chai.use(chatHttp);

const test = async (pathname) => chai.request(server).get(`/api/${pathname}`);

describe("Status check : /quotes?anime", () => {
  it("should return status 200", async () => {
    const res = await test("/quotes?anime=Naruto");
    expect(res).to.have.status(200);
  });
});

describe("Character match", () => {
  it("should return 10 quotes specfied anime Naruto", async () => {
    const { body } = await test("/quotes?anime=naruto");
    let arr = body.filter((quote) => quote.anime === "Naruto");
    expect(arr).to.have.lengthOf(10);
  });
});
