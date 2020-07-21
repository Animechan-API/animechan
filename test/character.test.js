const chai = require("chai");
const { expect } = chai;
const chaiHttp = require("chai-http");

const server = require("../server");

chai.use(chaiHttp);

const test = async (pathname) => chai.request(server).get(`/api/${pathname}`);

describe("Status check : /quotes?char", () => {
  it("should return status 200", async () => {
    const res = await test("/quotes?char=madara uchiha");
    expect(res).to.have.status(200);
  });
});

describe("Character match", () => {
  it("should return 10 quotes by character madara uchiha", async () => {
    const { body } = await test("/quotes?char=madara uchiha");
    let arr = body.filter((quote) => quote.character === "Madara Uchiha");
    expect(arr).to.have.lengthOf(10);
  });
});
