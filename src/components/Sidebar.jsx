import React from "react";
import { Link, Links } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {

  return (
    <>
      <div className={open ? "sidebar active" : "sidebar"}>
        <div className="sidebar-card p-4">
          <button className="toggleBtn" onClick={() => setOpen(!open)}>
            ☰
          </button>
        </div>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

      </div>
    </>
  );
}