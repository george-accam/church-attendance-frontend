import { RiLogoutCircleLine } from "react-icons/ri"; 
import { MdEmail } from "react-icons/md"; 
import { BsFillCalendarCheckFill } from "react-icons/bs"; 
import { FaRegistered } from "react-icons/fa"; 
import { BsFillPersonFill } from "react-icons/bs"; 
import { IoIosPeople } from "react-icons/io"; 
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logout from '../reusableComponents/Logout';
import { handleSuccess } from '../../notifications/Notification';
import welcome  from "../assets/welcome.gif"

const Sidebar = ({ userName, userEmail, sidebarActive, setSidebarActive, handleSidebarActive }) => {
  const [isActive, setIsActive] = useState(localStorage.getItem("is-active") || 'members-checked');
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  

  // handle sidebar active
  const handleShowActive = (activeName)=>{
    setIsActive(activeName);
    localStorage.setItem("is-active", activeName);
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
              <div className="sidebar-navigator-list">
              <IoIosPeople className="navigator-icon" />
                All members
              </div>
            </Link>

            <Link to="/usher-dashboard/personal"
            onClick={()=> handleShowActive("personal")} 
            className={`sidebar-navigator ${isActive === "personal" ? "active" : ""}`}
            >
              <div className="sidebar-navigator-list">
              <BsFillPersonFill className="navigator-icon" />
                Personal
              </div>
            </Link>

            <Link to="/usher-dashboard/register-member"
            onClick={()=> handleShowActive("register")} 
            className={`sidebar-navigator ${isActive === "register" ? "active" : ""}`}
            >
              <div className="sidebar-navigator-list">
              <FaRegistered className="navigator-icon" />
                Register
              </div>
            </Link>

            <Link to="/usher-dashboard/check-in"
            onClick={()=> handleShowActive("check-in")} 
            className={`sidebar-navigator ${isActive === "check-in" ? "active" : ""}`}
            >
              <div className="sidebar-navigator-list">
              <BsFillCalendarCheckFill className="navigator-icon" />
                Check In
              </div>
            </Link>
          </div>
          <div className="sidebar-bottom">
            <p className="sidebar-email">
            <div className="sidebar-navigator-list">
              <MdEmail className="email-icon" />:  
              <span>{ userEmail }</span>
            </div>
            </p>
            <p onClick={handleLogout} className="sidebar-logout">
              <div className="sidebar-navigator-list">
                <RiLogoutCircleLine className="logout-sidebar-icon" />
                Logout
              </div>
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