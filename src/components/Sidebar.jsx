import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faUser, faCog } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({ open, setOpen }) {
      const user = JSON.parse(localStorage.getItem("user"));
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
          <li>
            <Link to="/admin-dashboard">
              <FontAwesomeIcon icon={faTachometerAlt} /> <span>Dashboard</span>
            </Link>
          </li>
         )}

         {user.role === "agency" && (
          <li>
            <Link to="/admin-dashboard">
              <FontAwesomeIcon icon={faTachometerAlt} /> <span>Agency Dashboard</span>
            </Link>
          </li>
         )}

       
          <li>
            <Link to="/manage-customer">
              <FontAwesomeIcon icon={faTachometerAlt} /> <span>Manage Customers</span>
            </Link>
          </li>

           <li>
            <Link to="/manage-services">
              <FontAwesomeIcon icon={faTachometerAlt} /> <span>Manage Services</span>
            </Link>
          </li>

           <li>
            <Link to="/manage-agencies">
              <FontAwesomeIcon icon={faTachometerAlt} /> <span>Manage Agencies</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}