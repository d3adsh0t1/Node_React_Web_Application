const assert = require("assert");
const expect = require("chai").expect;
const request = require("supertest");
const router = require('../src/routers/user')

describe("POST /user/signup", () => {
  it("Should create a new user and return the user and token", async () => {
    const response = await request(router)
      .post("/user/signup")
      .send({
        // sample user data
        firstname: "John",
        lastname: "Doe",
        email: "johndoe@example.com",
        password: "12345678"
      });
    
    expect(response.statusCode).to.equal(201);
    expect(response.body.user.firstname).to.equal("John");
    expect(response.body.user.email).to.equal("johndoe@example.com");
    expect(response.body.token).to.not.be.undefined;
  });
});

describe("POST /user/login", () => {
    it("Should return the user and token if the email and password are correct", async (done) => {
      // First, you need to create a user that you can use to test the login endpoint
      await request(router)
        .post("/user/signup")
        .send({
          // sample user data
          firstname: "John",
          lastname: "Doe",
          email: "johndoe@example.com",
          password: "12345678"
        })
        .expect(201);
  
      // Next, you can test the login endpoint
      await request(router)
        .post("/user/login")
        .send({
          email: "johndoe@example.com",
          password: "12345678"
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.user.email, "johndoe@example.com");
          assert.notEqual(res.body.token, undefined);
          done();
        });
    }, 5000);
  
    it("Should return a 400 error if the email and password are incorrect", async (done) => {
      await request(router)
        .post("/user/login")
        .send({
          email: "johndoe@example.com",
          password: "wrongpass"
        })
        .expect(400)
        .end(done);
    }, 5000);
  });