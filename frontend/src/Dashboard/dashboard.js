import React, { useEffect, useState } from "react";
import Header from "../components/header";
import BookCard from "./bookCard";
import axios from "axios";

// Dashboard Page Component
const Dashboard = () => {
  // State to store the book details
  const [bookDetails, setBookDetails] = useState([]);

  // Use effect to fetch the book details from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the JWT token from local storage
        const jwtToken = localStorage.getItem("authtoken");

        // Make a GET request to the API to get the book details
        const response = await axios.get("http://localhost:8000/books", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        
        // Update the state with the received book details
        setBookDetails(response.data);
      } catch (error) {
        // Alert the error message
        alert(error.message);
      }
    };
    fetchData();
  }, []);

  // Function to update the book details after a book has been deleted
  const updatedBookDetails = (data) => {
    // Filter the book details state to remove the deleted book
    setBookDetails(bookDetails.filter(bookDetail => bookDetail._id !== data._id));
  }

  return (
    <div>
      {/* Header Component */}
      <Header />
      {/* Loop through the book details and render the BookCard component */}
      {bookDetails.map((item) => {
        return <BookCard
          key={item._id}
          name={item.name}
          author={item.author}
          genre={item.genre}
          url={item.url}
          id={item._id}
          onDeleteFunction={updatedBookDetails}
        />;
      })}
    </div>
  );
};

// Export the Dashboard component
export default Dashboard;
