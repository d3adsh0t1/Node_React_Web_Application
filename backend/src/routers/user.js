const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const auth = require("../middleware/auth");

// User signup route
router.post("/user/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    // Save the user to the database
    await user.save();
    // Generate the auth token for the user
    const token = await user.generateAuthToken();
    // Send the response with the user and token
    res.status(201).send({ user, token });
  } catch (e) {
    // If there is an error, send a response with a status code of 400 and the error message
    res.status(400).send(e);
  }
});

// User login route
router.post("/user/login", async (req, res) => {
  try {
    // Find the user by their email and password
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    // Generate the auth token for the user
    const token = await user.generateAuthToken();
    // Send the response with the user and token
    res.send({ user, token });
  } catch (e) {
    // If there is an error, send a response with a status code of 400
    res.status(400).send();
  }
});

// User logout route
router.post("/user/logout", auth, async (req, res) => {
  try {
    // Filter out the token that is being used to logout
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    // Save the updated tokens array to the database
    await req.user.save();
    console.log("Logout Successfully.");
    // Send the response with the message
    res.send("Logout Successfully.");
  } catch (e) {
    // If there is an error, send a response with a status code of 500
    res.status(500).send();
  }
});

module.exports = router;
