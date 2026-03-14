import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Update from "./pages/Update";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
      <ToastContainer/>
    </>
  );
};

export default App;
