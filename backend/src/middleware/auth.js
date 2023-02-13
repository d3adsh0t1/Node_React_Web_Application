const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Middleware function to authenticate the user using JSON Web Tokens
const auth = async (req, res, next) => {
  try {
    // Extract the token from the header
    const token = req.header("Authorization").replace("Bearer ", "");
    // Verify the token to get the user information
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    // If no user found, throw an error
    if (!user) {
      throw new Error();
    }

    // Attach the token to the request for later use
    req.token = token;

    // Attach the user to the request
    req.user = user;

    // Continue to the next middleware
    next();
  } catch (e) {
    // If an error occurs, return a 401 Unauthorized response
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
