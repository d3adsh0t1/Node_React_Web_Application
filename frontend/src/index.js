import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import LoginPage from "./login/loginPage";
import Dashboard from "./Dashboard/dashboard";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import EditCard from "./Dashboard/editCard";
import AddCard from "./Dashboard/addCard";

// create the root element for rendering the React app
const root = ReactDOM.createRoot(document.getElementById("root"));

// render the React app inside the root element
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        {/* Route for the login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route for the dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Route for the add card page */}
        <Route path="/addcard" element={<AddCard />} />

        {/* Route for the edit card page */}
        <Route path="/editcard/:id" element={<EditCard />} />

        {/* Default route for all other paths */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
