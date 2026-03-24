import React, { useState } from "react";
import { Routes, Route ,Navigate} from "react-router-dom";

import Homepage from "./Pages/Homepage";
import ServiceList from "./Pages/Services/ServiceList";
import ServiceDetails from "./Pages/Services/ServiceDetails";
import BookService from "./Pages/Services/BookService";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import Navbar from "./components/Navbar";

import ProtectedRoute from "./routes/ProtectedRoute"
import PublicRoute from "./routes/PublicRoute"
import Footer from "./components/Footer";
function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
      <div>
        <Routes>


                 <Route path="/" element={<Navigate to="/index" />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/index"
            element={
              <PublicRoute>
                <Homepage />
              </PublicRoute>
            }
          />

          <Route
            path="/service"
            element={
              <PublicRoute>
                <ServiceList />
              </PublicRoute>
            }
          />

          <Route
            path="/service-details/:id"
            element={
              <PublicRoute>
                <ServiceDetails />
              </PublicRoute>
            }
          />

          <Route
            path="/book/:id"
            element={
              <PublicRoute>
                <BookService />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage
                sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
                />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App;