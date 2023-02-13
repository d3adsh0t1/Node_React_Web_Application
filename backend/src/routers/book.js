const Book = require("../models/book");
const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

// Define endpoint to add a new book to the database
router.post("/book", auth, async (req, res) => {
  try {
    // Create a new book instance with the data from the request body and the user ID as the owner
    const book = new Book({
      ...req.body,
      owner: req.user._id,
    });

    // Save the book to the database
    await book.save();

    // Send the saved book as the response
    res.send(book);
  } catch (error) {
    // If there's an error, return a 400 Bad Request response
    res.status(400).send(error);
  }
});

// Define endpoint to list all books created in the database
router.get("/books", auth, async (req, res) => {
  try {
    // Get the page and limit values from the query parameters, or default to 1 and 20 respectively
    const { page = 1, limit = 20 } = req.query;

    // Find all books owned by the authenticated user and limit the results based on the page and limit values
    const books = await Book.find({ owner: req.user._id })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Return the books as the response
    res.status(200).send(books);
  } catch (error) {
    // If there's an error, return a 500 Internal Server Error response
    res.status(500).send(error);
  }
});

// Define endpoint to list a book with a particular ID
router.get("/book/:id", auth, async (req, res) => {
  try {
    // Get the book ID from the request parameters
    const _id = req.params.id;

    // Find the book with the specified ID and owned by the authenticated user
    const book = await Book.findOne({ _id, owner: req.user._id });

    // If the book is not found, return a 404 Not Found response
    if (!book) return res.status(404).send();

    // Return the book as the response
    res.send(book);
  } catch (error) {
    // If there's an error, return a 500 Internal Server Error response
    res.status(500).send();
  }
});

// Define endpoint to edit a book with a particular ID
router.put("/book/:id", auth, async (req, res) => {
  // Get the book ID from the request parameters
  const id = req.params.id;

  // Get the updates from the request body and only allow updating the name, author, genre, and URL fields
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "author", "genre", "url"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  // If the update is not a valid operation, return a bad request response with an error message
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    // Find the book by its id and the owner
    const book = await Book.findOne({ _id: id, owner: req.user._id });

    // If the book is not found, return a not found response
    if (!book) return res.status(404).send();

    // Update the properties of the book with the updates in the request body
    updates.forEach((update) => {
      book[update] = req.body[update];
    });
    await book.save();
    res.send(book);
  } catch (e) {
    // If an error occurs, return a bad request response with the error
    res.status(400).send(e);
  }
});

// Define endpoint to delete a book with a particular ID
router.delete("/book/:id", auth, async (req, res) => {
  // Get the book ID from the request parameters
  const id = req.params.id;
  try {
    const book = await Book.findOne({ _id: id, owner: req.user._id });
    if (!book) {
      res.status(404).send();
    }
    // Delete the book from the database
    await Book.deleteOne({ _id: id, owner: req.user._id });
    res.status(200).send(book);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
