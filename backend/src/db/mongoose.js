require("dotenv").config();
const mongoose = require("mongoose");

// Connect to MongoDB database using the MONGODB_URL environment variable
mongoose.connect(
  process.env.MONGODB_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      // Log the error if the connection fails
      console.log(err);
    } else {
      // Log a success message if the connection is successful
      console.log("Database Successfully Connected.");
    }
  }
);
