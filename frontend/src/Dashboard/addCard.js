import React from "react";
import axios from "axios";
import CardDetails from "../components/cardDetails";
import { useNavigate } from "react-router";

// Create Book card functionality
const AddCard = () => {
  const navigate = useNavigate();

  const AddBookDetails = async (data) => {
    try {
        console.log(data);
        const jwtToken = localStorage.getItem("authtoken");
        await axios.post("http://localhost:8000/book",data, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        navigate("/dashboard");
        // console.log("editbookdetils",response.data);
      } catch (error) {
        alert(error.message);
      }
  }
  return (
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
