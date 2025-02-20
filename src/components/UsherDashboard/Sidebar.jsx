import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logout from '../reusableComponents/Logout';
import { handleSuccess } from '../../notifications/Notification';
import welcome  from "../assets/welcome.gif"

const Sidebar = ({ userName, userEmail, sidebarActive, setSidebarActive, handleSidebarActive }) => {
  const [isActive, setIsActive] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  

  // handle sidebar active
  const handleShowActive = (activeName)=>{
    setIsActive(activeName);
  };

  // logout the user
  const handleYes = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    handleSuccess("logged out successfully");
    setTimeout(()=>{
      navigate('/login');
    }, 1000);
  }

  const handleLogout = ()=>{
    setShowLogout(!showLogout);
  }

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
          <div className="dashboard-sidebar-subtitle">
              Welcome, 
              <div className='subtitle'>
                { userName }
              </div> 
              <img src={ welcome } alt="🤗" />
          </div>
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
            <p onClick={handleLogout} className="sidebar-logout">
                Logout
            </p>
          </div>
        </div>
      </div>
      {showLogout && (
        <Logout 
          handleYes={handleYes}
          handleLogout={handleLogout}
        />
      )}
    </div>
  )
}

export default Sidebar;