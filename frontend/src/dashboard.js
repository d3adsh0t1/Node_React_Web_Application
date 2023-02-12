import React, { useEffect, useState } from "react";
import Header from "./header";
import BookCard from "./bookCard";
import axios from "axios";

const Dashboard = () => {
  const [bookDetails, setBookDetails] = useState([]);
  useEffect(() => {
    // console.log("useEffect");
    const fetchData = async () => {
      try {
        const jwtToken = localStorage.getItem("authtoken");
        const response = await axios.get("http://localhost:8000/books", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setBookDetails(response.data);
        console.log(response.data);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, []);
  
  const updatedBookDetails = (data) => {
    setBookDetails(bookDetails.filter(bookDetail => bookDetail._id !== data._id));
  }

  return (
    <div>
      <Header />
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

export default Dashboard;
