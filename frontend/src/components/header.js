import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/header.css';

// The `Header` component is responsible for rendering the header of the dashboard
const Header = () => {
  // `handleLogout` is called when the user clicks the "Logout" button
  const handleLogout = async () => {
    try {
      // Retrieve the JWT token from local storage
      const jwtToken = localStorage.getItem("authtoken");

      // Make a post request to the `/user/logout` endpoint with the JWT token in the headers
      await axios.post("http://localhost:8000/user/logout", { data: 'some data' }, {
        headers: {
          "Authorization": `Bearer ${jwtToken}`
        }
      });

      // Navigate to the "/login" page
      navigate("/login");
    } catch (error) {
      // Display an error message if the logout fails
      alert(error.message)
    }
  }

  // Get the `navigate` function from the `useNavigate` hook
  const navigate = useNavigate();

  // Render the header
  return (
    <header className="header">
      <div className="header-container">
        {/* The "Add Book" button */}
        <button onClick={() => { navigate("/addcard") }} className="left-button">Add Book</button>
        {/* The header title */}
        <h1 className="header-title">Book List</h1>
        {/* The "Logout" button */}
        <button onClick={handleLogout} className="right-button">Logout</button>
      </div>
    </header>
  );
};

export default Header;
