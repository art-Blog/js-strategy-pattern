var Validator = require("../src/Validator.js");
var strategies = require("../src/ValidatorStrategy.js");
var chai = require("chai");
chai.should();
var data = {
  firstName: "Super",
  lastName: "Man",
  age: "unknown",
  userName: "o_O"
};
var config = {
  firstName: "isNonEmpty",
  age: "isNumber",
  userName: "isAlphaNum"
};

var sut;

before(() => {
  sut = new Validator(strategies);
});

describe("Validator Test", () => {
  it("RULE:isNonEmpty:Fail", () => {
    data.firstName = "";
    sut.config = { firstName: "isNonEmpty" };

    let actual = sut.validate(data);

    actual.should.be.eql(true);
  });

  it("RULE:isNonEmpty:Fail:Message Is Match", () => {
    data.firstName = "";
    sut.config = { firstName: "isNonEmpty" };
    let expected = ["Invalid value for *firstName*, the value cannot be empty"];

    sut.validate(data);
    let actual = sut.messages;

    actual.should.be.eql(expected);
  });
  it("RULE:isNonEmpty:Pass", () => {
    data.firstName = "art";
    sut.config = { firstName: "isNonEmpty" };

    let actual = sut.validate(data);

    actual.should.be.eql(false);
  });

  it("RULE:isNonEmpty:Pass:Message Is Empty", () => {
    data.firstName = "art";
    sut.config = { firstName: "isNonEmpty" };
    let expected = [];

    sut.validate(data);
    let actual = sut.messages;

    actual.should.be.eql(expected);
  });

  it("RULE:isNumber:Pass", () => {
    data.age = 18;
    sut.config = { age: "isNumber" };

    let actual = sut.validate(data);

    actual.should.be.equal(false);
  });
  it("RULE:isNumber:Pass:Message Is Empty", () => {
    data.age = 18;
    sut.config = { age: "isNumber" };
    let expected = [];
    sut.validate(data);
    let actual = sut.messages;

    actual.should.be.eql(expected);
  });
  it("RULE:isNumber:Fail", () => {
    data.age = "unKnown";
    sut.config = { age: "isNumber" };

    let actual = sut.validate(data);

    actual.should.be.equal(true);
  });
  it("RULE:isNumber:Fail:Message Is Match", () => {
    data.age = "unKnown";
    sut.config = { age: "isNumber" };
    let expected = [
      "Invalid value for *age*, the value can only be a valid number, e.g. 1, 3.14 or 201"
    ];
    sut.validate(data);
    let actual = sut.messages;
    actual.should.be.eql(expected);
  });
});
