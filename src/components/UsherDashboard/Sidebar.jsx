import React, { useState } from 'react';

const Sidebar = ({ userName, userEmail, sidebarActive, setSidebarActive, handleSidebarActive }) => {
  const [isActive, setIsActive] = useState(null);

  // handle sidebar active
  const handleShowActive = (activeName)=>{
    setIsActive(activeName);
  };


  return (
    <div>
      <div className="">
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
            <p onClick={()=> handleShowActive("all-members")} 
            className={`sidebar-navigator ${isActive === "all-members" ? "active" : ""}`}
            >
                All members
            </p>
            <p 
            onClick={()=> handleShowActive("personal")} 
            className={`sidebar-navigator ${isActive === "personal" ? "active" : ""}`}>
                Personal
            </p>
            <p 
            onClick={()=> handleShowActive("register")} 
            className={`sidebar-navigator ${isActive === "register" ? "active" : ""}`}>
                Register
            </p>
            <p 
            onClick={()=> handleShowActive("check-in")} 
            className={`sidebar-navigator ${isActive === "check-in" ? "active" : ""}`}>
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