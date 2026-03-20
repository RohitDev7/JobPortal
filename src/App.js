// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "./Pages/Homepage";
import ServiceList from "./Pages/Services/ServiceList";
import ServiceDetails from "./Pages/Services/ServiceDetails";
import BookService from "./Pages/Services/BookService";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/service" element={<ServiceList />} />
          <Route path="/service-details/:id" element={<ServiceDetails />} />
          <Route path="/book/:id" element={<BookService />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;