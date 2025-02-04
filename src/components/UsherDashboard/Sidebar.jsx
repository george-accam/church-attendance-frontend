import { AiOutlineCloseCircle } from "react-icons/ai"; 
import React from 'react';

const Sidebar = ({ userName, userEmail, sidebarActive }) => {
  return (
    <div>
      <div className="">
        <div className={`sidebar-container ${sidebarActive ? "dashboard-sidebar-open" : "dashboard-sidebar-close"}`}>
          <div className="sidebar-top">
            <h1 className="dashboard-sidebar-title">
                Dashboard
            </h1>
            <AiOutlineCloseCircle className="sidebar-close-icon"  />
          </div>
          <p className="dashboard-sidebar-subtitle">
              Welcome, 
              <span>
                {userName}
              </span> 
          </p>
          <div className="navbar-navigator-container">
            <p className="sidebar-navigator">
                All members
            </p>
            <p className="sidebar-navigator">
                Personal
            </p>
            <p className="sidebar-navigator">
                Register
            </p>
            <p className="sidebar-navigator">
                Check In
            </p>
          </div>
          <div className="sidebar-bottom">
            <p className="sidebar-email">
              email:  <span>{ userEmail }</span>
            </p>
            <p className="sidebar-logout">
                Logout
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;