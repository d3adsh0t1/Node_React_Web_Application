const express = require("express");

// Import the mongoose module to connect to the database
require("./db/mongoose");

// Import the cors module to handle CORS errors
const cors = require("cors");

// Import the routers for handling book and user routes
const bookRouter = require("./routers/book");
const userRouter = require("./routers/user");

// Create an instance of express
const app = express();

// Set the port to either the environment variable or default to 8000
const port = process.env.PORT || 8000;

// Use the cors middleware to handle CORS errors
app.use(cors());

// Use the express.json() middleware to parse incoming JSON data
app.use(express.json());

// Use the book and user routers to handle their respective routes
app.use(bookRouter);
app.use(userRouter);

// Start the server and log a message to the console when it is up
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
