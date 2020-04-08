//Data being sent to login route.
const userCredentials = {
  email: "Greg.tucker1@hotmail.ca",
  password: "cookie123",
};
var server = require("../index");
var token = null;
let chai = require("chai");
let chaiHttp = require("chai-http");
global.should = require("chai").should();
chai.use(chaiHttp);
var token = null;

describe("Api Tests", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("http://localhost:8000/api/login")
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        should.exist(res.data);
        token = res.data.token;
      });
  });
  describe("/currentUser", () => {
    it("it should GET user information", (done) => {
      chai
        .request(server)
        .get("http://localhost:8000/api/currentuser")
        .end((err, res) => {
          res.should.have.status(200);
          should.exist(res.body);
          res.body.should.be.a("array");
          done();
        });
    });
  });
  describe("/following", () => {
    it("it should GET users that you follow", (done) => {
      chai
        .request(server)
        .post("http://localhost:8000/api/follow")
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          should.exist(res.body);
          res.body.should.be.a("array");
          res.body.should.be.a("object");
          done();
        });
    });
    it("it should POST a new follow", (done) => {
      const newfollow = {
        username: "greg34910",
      };
      chai
        .request(server)
        .post("http://localhost:8000/api/follow/new")
        .send(newfollow)
        .end((err, res) => {
          res.should.have.status(200);
          should.exist(res.body);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
