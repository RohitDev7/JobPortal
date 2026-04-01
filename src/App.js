import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext, { AuthProvider } from "./routes/AuthContext";
import Homepage from "./Pages/Homepage";
import ServiceList from "./Pages/Services/ServiceList";
import ServiceDetails from "./Pages/Services/ServiceDetails";
import BookService from "./Pages/Services/BookService";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import DashboardAdmin from "./Pages/Admin/DashboardAdmin";
import Navbar from "./components/Navbar";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import ManageCustomers from "./Pages/Admin/ManageCustomers/ManageCustomers";
import EditCustomers from "./Pages/Admin/ManageCustomers/EditCustomers";
import ManageServices from "./Pages/Admin/ManageServices/ManageServices";
import EditManageServices from "./Pages/Admin/ManageServices/EditManageServices";
import ManageAgencies from "./Pages/Admin/ManageAgencies/ManageAgencies";
// import Approved from "./Pages/Admin/Approved";
import DashboardAgency from "./Pages/Agency/DashboardAgency";
import AgencyManageServices from "./Pages/Agency/AgencyManageServices/AgencyManageServices";
import AgencyEditManageServices from "./Pages/Agency/AgencyManageServices/AgencyEditManageServices";
import AgencyAddManageServices from "./Pages/Agency/AgencyManageServices/AgencyAddManageServices";
import AgencyBookingser from "./Pages/Agency/AgencyBooking/AgencyBookingser";
import ManageBookingsAll from "./Pages/Admin/ManageBookings/ManageBookingsAll";
import AgencyManageServicesDetails from "./Pages/Agency/AgencyManageServicesDetail/AgencyManageServicesDetails";
import AgencyEditManageServicesDetails from "./Pages/Agency/AgencyManageServicesDetail/AgencyEditManageServicesDetails";
import AgencyAddManageServicesDetails from "./Pages/Agency/AgencyManageServicesDetail/AgencyAddManageServicesDetails";
import ManageServicesDetails from "./Pages/Admin/ManageServicesDetail/ManageServicesDetails";
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
      <AuthProvider>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
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
              path="/admin-dashboard"
              element={
                <ProtectedRoute role="admin">
                  <DashboardAdmin
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/manage-customer"
              element={
                <ProtectedRoute role="admin">
                  <ManageCustomers
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-customer/:id"
              element={
                <ProtectedRoute role="admin">
                  <EditCustomers
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/manage-services"
              element={
                <ProtectedRoute role="admin">
                  <ManageServices
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-manage-services/:id"
              element={
                <ProtectedRoute role="admin">
                  <EditManageServices
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/manage-agencies"
              element={
                <ProtectedRoute role="admin">
                  <ManageAgencies
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/manage-bookings"
              element={
                <ProtectedRoute role="admin">
                  <ManageBookingsAll
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                </ProtectedRoute>
              }
            />


            <Route
              path="/manage-services-details"
              element={
                <ProtectedRoute role="admin">
                  <ManageServicesDetails
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                </ProtectedRoute>
              }
            />

            

            {/* <Route
  path="/approved"
  element={
    <ProtectedRoute role="admin">
      <Approved
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </ProtectedRoute>
  }
/> */}

            <Route
              path="/agency-dashboard"
              element={
                <ProtectedRoute role="agency">
                  <DashboardAgency
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/agency-manage-services"
              element={
                <ProtectedRoute role="agency">
                  <AgencyManageServices
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/agency-edit-manage-services/:id"
              element={
                <ProtectedRoute role="agency">
                  <AgencyEditManageServices
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/agency-add-manage-services"
              element={
                <ProtectedRoute role="agency">
                  <AgencyAddManageServices
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/agency-booking"
              element={
                <ProtectedRoute role="agency">
                  <AgencyBookingser
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                </ProtectedRoute>
              }
            />

              <Route
              path="/agency-manage-service-details"
              element={
                <ProtectedRoute role="agency">
                  <AgencyManageServicesDetails
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                </ProtectedRoute>
              }
            />



 <Route
              path="/agency-edit-manage-service-details/:id"
              element={
                <ProtectedRoute role="agency">
                  <AgencyEditManageServicesDetails
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                </ProtectedRoute>
              }
            />


 <Route
              path="/agency-add-manage-service-details"
              element={
                <ProtectedRoute role="agency">
                  <AgencyAddManageServicesDetails
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                </ProtectedRoute>
              }
            />

            
            


          </Routes>


         
        
          
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
