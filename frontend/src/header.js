import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const onLogout = async () => {
      try {
        const jwtToken = localStorage.getItem("authtoken");
        const response = await axios.post("http://localhost:8000/user/logout", { data: 'some data' }, {
          headers: {
            "Authorization": `Bearer ${jwtToken}`
          }
        });
        console.log(response);
        navigate("/login");
      } catch (error) {
        alert(error.message)
      }
    }
    const navigate = useNavigate();
  return (
    <header style={headerStyle}>
      <div style={headerContainer}>
        <button style={leftButtonStyle}>Add Book</button>
        <h1 style={headerTitle}>Book List</h1>
        <button onClick={onLogout} style={rightButtonStyle}>Logout</button>
      </div>
    </header>
  );
};

const headerStyle = {
  backgroundColor: "lightgray",
  padding: "20px",
  display: "flex",
  justifyContent: "center"
};

const headerContainer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "80%",
  margin: "0 auto"
};

const headerTitle = {
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center"
};

const leftButtonStyle = {
  backgroundColor: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer"
};

const rightButtonStyle = {
  backgroundColor: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer"
};

export default Header;
