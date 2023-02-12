import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoginPage from "./loginPage";
import Dashboard from "./dashboard";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import EditCard from "./editCard";
import AddCard from "./addCard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addcard" element={<AddCard />} />
        <Route path="/editcard/:id" element={<EditCard />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
