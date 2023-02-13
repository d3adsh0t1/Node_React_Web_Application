const assert = require("assert");
const request = require("supertest");
const router = require("../src/routers/book");
const chai = require("chai");
const chaiHttp = require("chai-http");
const Book = require("../src/models/book");

// Use the chai-http plugin
chai.use(chaiHttp);
const expect = chai.expect;

describe("POST /book", () => {
  it("Should add a new book to the database and return the book", async (done) => {
    const authToken = "1234567890000"

    await request(router)
      .post("/book")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        // sample book data
        name: "War and Peace",
        author: "Leo Tolstoy",
        genre: "thrill",
        url: "https://dddfaf"
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.name, "War and Peace");
        assert.equal(res.body.author, "Leo Tolstoy");
        done();
      });
  }, 5000);
});

describe("List all Books", () => {
    beforeEach(async () => {
      // Clear the database before each test
      await Book.deleteMany({});
    });
  
    it("should get all books", async () => {
      // Create some books in the database
      const books = [
        { name: "Book 1", owner: "123", author: "author1", genre: "genre1", url: "url1" },
        { name: "Book 2", owner: "123", author: "author2", genre: "genre2", url: "url2" },
        { name: "Book 3", owner: "456", author: "author3", genre: "genre3", url: "url3" },
      ];
      await Book.insertMany(books);
  
      // Send a GET request to the /books endpoint
      const response = await chai
        .request(app)
        .get("/books")
        .set("Authorization", `Bearer 123`);
  
      // Check that the response has a status code of 200 OK
      expect(response).to.have.status(200);
    });
  
    it("should return an error if the user is not authenticated", async () => {
      // Send a GET request to the /books endpoint without an Authorization header
      const response = await chai.request(app).get("/books");
  
      // Check that the response has a status code of 401 Unauthorized
      expect(response).to.have.status(401);
  
    });
  });
