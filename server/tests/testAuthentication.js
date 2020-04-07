var expect = require("chai").expect;
var request = require("supertest");
var mongoose = require("mongoose");

//Data being sent to login route.
const userCredentials = {
  email: "Greg.tucker1@hotmail.ca",
  password: "cookie123",
};

describe("My API Tests", function () {
  //POST the userCredentials to /api/login, and expect a response of status 200.
  var server = require("../index");
  var app = request.agent(server);
  var token = null;

  //Before running tests, login user and get JWT for testing.
  before(function (done) {
    app
      .post("/api/login")
      .send(userCredentials)
      .end(function (err, response) {
        token = res.data.token;
        expect(response.statusCode).to.equal(200);
        done();
      });
  });

  it("Should return a list of followers"),
    function (done) {
      request
        .get("http://localhost:8000/api/follow")
        .set({ token: sessionStorage.getItem("jwt") })
        .end((err, res) => {
          res.statusCode.should.equal(200);
          res.data.following.should.be.instanceOf(Array);
        });
      done();
    };

  it("should return a 401 response if the credentials are invalid", function (done) {
    app.get("http://localhost:8000/api/login", function (err, response, body) {
      response.statusCode.should.equal(401);
    });
    done();
  });
  after(function (done) {
    server.close(function () {
      mongoose.connection.close(done);
    });
    process.exit(0);
  });
});
