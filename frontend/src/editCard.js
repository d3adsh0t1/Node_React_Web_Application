import React, { useEffect, useState } from "react";
import axios from "axios";
import CardDetails from "./cardDetails";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

const EditCard = () => {
  const [bookDetails, setBookDetails] = useState([]);
  let {id} = useParams();
  const navigate = useNavigate();
//   console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = localStorage.getItem("authtoken");
        const response = await axios.get(`http://localhost:8000/book/${id}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setBookDetails(response.data);
        // console.log("response",response.data)
        // console.log("fetch",bookDetails);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, []);

  const editBookDetails = async (data) => {
    try {
        console.log(data);
        const jwtToken = localStorage.getItem("authtoken");
        const response = await axios.put(`http://localhost:8000/book/${id}`,data, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setBookDetails(response.data);
        navigate("/dashboard");
        // console.log("editbookdetils",response.data);
      } catch (error) {
        alert(error.message);
      }
  }
  return (
    <CardDetails
        key={bookDetails._id}
        name={bookDetails.name}
        author={bookDetails.author}
        genre={bookDetails.genre}
        url={bookDetails.url}
        id={bookDetails._id}
        onFormSubmit={editBookDetails}
        type="Edit"
    />
  );
};

export default EditCard;
