import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faUser, faCog } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({ open, setOpen }) {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  return (
    <>
      <div className={open ? "sidebar active" : "sidebar"}>
        <div className="sidebar-card p-4">
          <button className="toggleBtn" onClick={() => setOpen(!open)}>
            ☰
          </button>
        </div>

        <ul>
          {user.role === "admin" && (
            <>
              <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
              <li><Link to="/manage-customer">Manage Customers</Link></li>
              <li><Link to="/manage-services">Manage Services</Link></li>
              <li><Link to="/manage-agencies">Manage Agencies</Link></li>
              <li><Link to="/manage-bookings">Manage Bookings</Link></li>
            </>
          )}

          {user.role === "agency" && (
            <>
              <li><Link to="/agency-dashboard">Agency Dashboard</Link></li>
              <li><Link to="/agency-manage-services">Agency Manage Services</Link></li>
              <li><Link to="/agency-booking">Agency Booking</Link></li>
            </>
          )}

          {user.role === "customer" && (
            <li><Link to="/user-dashboard">User Dashboard</Link></li>
          )}



        </ul>
      </div>
    </>
  );
}