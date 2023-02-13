import React, { useEffect, useState } from "react";
import axios from "axios";
import CardDetails from "../components/cardDetails";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

// Edit Button functionality component
const EditCard = () => {
  // state to store the book details to be edited
  const [bookDetails, setBookDetails] = useState({});
  
  // extract the id from the URL
  let {id} = useParams();
  
  // hook to navigate between pages
  const navigate = useNavigate();

  // useEffect hook to fetch the book details from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // get the JWT token from local storage
        const jwtToken = localStorage.getItem("authtoken");
        
        // make a GET request to the API to retrieve the book details
        const response = await axios.get(`http://localhost:8000/book/${id}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`, // send the JWT token in the Authorization header
          },
        });
        
        // update the bookDetails state with the response data
        setBookDetails(response.data);
      } catch (error) {
        // handle the error by showing an alert
        alert(error.message);
      }
    };
    fetchData();
  }, []);

  // function to handle the form submit and make a PUT request to the API to update the book details
  const editBookDetails = async (data) => {
    try {
        // get the JWT token from local storage
        const jwtToken = localStorage.getItem("authtoken");
        
        // make a PUT request to the API to update the book details
        const response = await axios.put(`http://localhost:8000/book/${id}`, data, {
          headers: {
            Authorization: `Bearer ${jwtToken}`, // send the JWT token in the Authorization header
          },
        });
        
        // if the response data is truthy, navigate to the dashboard page
        if(response.data) {
          navigate("/dashboard");
        }
      } catch (error) {
        // handle the error by showing an alert
        alert(error.message);
      }
  };

  // render the CardDetails component and pass the book details, the form submit handler, and the type of button ("Save")
  return (
    <CardDetails
        key={bookDetails._id}
        name={bookDetails.name}
        author={bookDetails.author}
        genre={bookDetails.genre}
        url={bookDetails.url}
        id={bookDetails._id}
        onFormSubmit={editBookDetails}
        type="Save"
    />
  );
};

export default EditCard;
