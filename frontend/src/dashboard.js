import React, { useEffect, useState } from "react";
import Header from "./header";
import BookCard from "./bookCard";
import axios from "axios";

const Dashboard = () => {
  const [bookDetails, setBookDetails] = useState([]);
  useEffect(() => {
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
  return (
    <div>
      <Header />
      {bookDetails.map((item) => {
        return <BookCard
          key={item._id}
          name={item.name}
          author={item.author}
          genre={item.genre}
        />;
      })}
    </div>
  );
};

export default Dashboard;
