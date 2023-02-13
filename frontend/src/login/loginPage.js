import React, { useState } from "react";
import "../css/loginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { Input, FormLabel, FormControl, FormErrorMessage, Button } from '@chakra-ui/react';

// LoginPage component
const LoginPage = () => {
  // State variables to store user input
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle user submit action
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
        const userDetails = { email: username, password: password };
        let response = [];

        // Determine whether user wants to sign up or sign in
        if (isSignUp) {
          // sign up, include firstname and lastname in the request
          userDetails.firstname = firstname;
          userDetails.lastname = lastname;
          response = await axios.post("http://localhost:8000/user/signup", userDetails);
        } else {
          // If sign in, only include email and password in the request
          response = await axios.post("http://localhost:8000/user/login", userDetails);
        }

        // Store the received token in local storage
        localStorage.setItem("authtoken",response.data.user.tokens[0].token)

        // Navigate to the dashboard
        navigate("/dashboard");
    }
    catch(err) {
        alert("Please Check your Credentials");
    }
    finally {
        setIsLoading(false);
    }
  };

  // Navigate hook from react-router-dom
  const navigate = useNavigate();

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
        {isSignUp && (
          <div>
            <FormControl isRequired className="form-group">
              <FormLabel>First name:</FormLabel>
              <Input
                type="text"
                id="firstname"
                value={firstname}
                onChange={(event) => setFirstname(event.target.value)}
              />
            </FormControl>
            <FormControl isRequired className="form-group">
              <FormLabel>Last name:</FormLabel>
              <Input
                type="text"
                id="lastname"
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
              />
            </FormControl>
          </div>
        )}
        <FormControl isRequired isInvalid={username && !validator.isEmail(username)} className="form-group">
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormControl>
        <FormControl isInvalid={password && !validator.isLength(password,7,50)} isRequired className="form-group">
          <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <FormErrorMessage>Password should be in between 7-50 characters.</FormErrorMessage>
        </FormControl>
        <Button colorScheme="green" mr="1" isDisabled={isSignUp?!(firstname!=="" && lastname!=="" && validator.isEmail(username) && validator.isLength(password,7,50)):!(validator.isEmail(username) && validator.isLength(password,7,50))} isLoading={isLoading}
          onClick={(e) => {
            handleSubmit(e);
          }}
          type="submit"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
        <Button colorScheme="green" onClick={() => {setIsSignUp(!isSignUp); setUsername(""); setPassword("");} }>
          {isSignUp ? "Already have an account? Sign in" : "Need to sign up?"}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
