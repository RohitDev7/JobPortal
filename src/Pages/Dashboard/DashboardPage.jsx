import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'

export default function DashboardPage({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className={sidebarOpen ? "dashboard-container sidebar-open" : "dashboard-container"}>
        <h2 className="dashboard-title">Admin Dashboard</h2>
      </div>
    </>
  );
}
