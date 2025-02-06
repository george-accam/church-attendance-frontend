import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = ({ userName, userEmail, sidebarActive, setSidebarActive, handleSidebarActive }) => {
  const [isActive, setIsActive] = useState(null);

  // handle sidebar active
  const handleShowActive = (activeName)=>{
    setIsActive(activeName);
  };


  return (
    <div>
      <div 
      onClick={()=>{
        handleSidebarActive();
        setSidebarActive(false);
      }} 
      className={`sidebar-slide-container ${sidebarActive ? "sidebar-container-open" : "sidebar-container-close"}`}
      >
        <div className={`sidebar-container ${sidebarActive ? "sidebar-container-open" : "sidebar-container-close"}`}>
          <div className="sidebar-top">
            <h1 className="dashboard-sidebar-title">
                Dashboard
            </h1>
          </div>
          <p className="dashboard-sidebar-subtitle">
              Welcome, 
              <span>
                {userName}
              </span> 
          </p>
          <div className="navbar-navigator-container">
            <Link to="/usher-dashboard/all-members"
            onClick={()=> handleShowActive("all-members")} 
            className={`sidebar-navigator ${isActive === "all-members" ? "active" : ""}`}
            >
                All members
            </Link>

            <Link to="/usher-dashboard/personal"
            onClick={()=> handleShowActive("personal")} 
            className={`sidebar-navigator ${isActive === "personal" ? "active" : ""}`}>
                Personal
            </Link>

            <Link to="/usher-dashboard/register-member"
            onClick={()=> handleShowActive("register")} 
            className={`sidebar-navigator ${isActive === "register" ? "active" : ""}`}>
                Register
            </Link>

            <Link to="/usher-dashboard/check-in"
            onClick={()=> handleShowActive("check-in")} 
            className={`sidebar-navigator ${isActive === "check-in" ? "active" : ""}`}>
                Check In
            </Link>
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