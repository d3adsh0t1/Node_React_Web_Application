import React from "react";
import axios from "axios";
import CardDetails from "../components/cardDetails";
import { useNavigate } from "react-router";

// AddCard component for creating a new book card
const AddCard = () => {
  // hook for programmatically navigating to different routes
  const navigate = useNavigate();

  // function for adding a new book card
  const AddBookDetails = async (data) => {
    try {
        // get the JWT token from local storage
        const jwtToken = localStorage.getItem("authtoken");

        // make a POST request to add a new book card
        await axios.post("http://localhost:8000/book", data, {
          headers: {
            Authorization: `Bearer ${jwtToken}`, // include the JWT token in the request headers
          },
        });
        
        // navigate to the dashboard page after adding a new book card
        navigate("/dashboard");
      } catch (error) {
        // show an error message in case of a failed request
        alert(error.message);
      }
  }
  return (
    // render the CardDetails component with the AddBookDetails function as a prop
    <CardDetails
        name=""
        author=""
        genre=""
        url=""
        id=""
        onFormSubmit={AddBookDetails}
        type="Add"
    />
  );
};

export default AddCard;
