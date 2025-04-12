import { BiBarChartAlt2 } from "react-icons/bi"; 
import { GiCash } from "react-icons/gi"; 
import { BsRobot } from "react-icons/bs"; 
import { AiOutlineMail } from "react-icons/ai"; 
import { RiLogoutCircleLine } from "react-icons/ri"; 
import { MdEmail } from "react-icons/md"; 
import { BsListCheck } from "react-icons/bs"; 
import { BsPeopleFill } from "react-icons/bs"; 
import { BsFillCalendarCheckFill } from "react-icons/bs"; 
import { FaRegistered } from "react-icons/fa"; 
import { BsFillPersonFill } from "react-icons/bs"; 
import { IoIosPeople } from "react-icons/io"; 
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logout from '../reusableComponents/Logout';
import { handleSuccess } from '../../notifications/Notification';
import welcome  from "../assets/welcome.gif"
import QrCodeButton from "../reusableComponents/QrCodeButton";

const AdminSidebar = ({ userName, userEmail, sidebarActive, setSidebarActive, handleSidebarActive }) => {
  const [isActive, setIsActive] = useState(localStorage.getItem("active") || "members-checked");
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  

  // handle sidebar active menu
  const handleShowActive = (activeName)=>{
    setIsActive(activeName);
    localStorage.setItem("active", activeName);
  };

  // logout the user
  const handleYes = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    localStorage.removeItem("active")
    sessionStorage.removeItem('conversation');
    handleSuccess("logged out successfully");
    setTimeout(()=>{
      navigate('/login');
    }, 1000);
  }

  // close or open logout modal
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
              {userName}
            </div> 
            <img src={welcome} alt="🤗" />
          </div>
          
          <div className="admin-navbar-navigator-container">
            {/* members-checked */}
            <Link to="/admin-dashboard/members-checked"
              onClick={()=> handleShowActive("members-checked")} 
              className={`sidebar-navigator admin-sidebar-navigator ${isActive === "members-checked" ? "active" : ""}`}
            >
              <div className="sidebar-navigator-list">
                <BsListCheck className="navigator-icon" />
                Members checked
              </div>
            </Link>

            {/* tithe-and-welfare */}
            <Link to={`/admin-dashboard/tithe-and-welfare/${localStorage.getItem("tithe-and-welfare") || "all"}`}
              onClick={()=> handleShowActive("tithe-and-welfare")} 
              className={`sidebar-navigator admin-sidebar-navigator ${isActive === "tithe-and-welfare" ? "active" : ""}`}
            >
              <div className="sidebar-navigator-list">
                <GiCash className="navigator-icon" />
                Tithe and Welfare
              </div>
            </Link>

            {/* ushers */}
            <Link to="/admin-dashboard/ushers"
              onClick={()=> handleShowActive("ushers")} 
              className={`sidebar-navigator admin-sidebar-navigator ${isActive === "ushers" ? "active" : ""}`}
            >
              <div className="sidebar-navigator-list">
                <BsPeopleFill className="navigator-icon" />
                Ushers
              </div>
            </Link>

            {/* all-members */}
            <Link to="/admin-dashboard/all-members"
              onClick={()=> handleShowActive("all-members")} 
              className={`sidebar-navigator admin-sidebar-navigator ${isActive === "all-members" ? "active" : ""}`}
            >
              <div className="sidebar-navigator-list">
                <IoIosPeople className="navigator-icon" />
                All members
              </div>
            </Link>

            {/* personal */}
            <Link to="/admin-dashboard/personal"
              onClick={()=> handleShowActive("personal")} 
              className={`sidebar-navigator admin-sidebar-navigator ${isActive === "personal" ? "active" : ""}`}
              >
                <div className="sidebar-navigator-list">
                  <BsFillPersonFill className="navigator-icon" />
                  Personal
                </div>
            </Link>

            {/* register-member */}
            <Link to="/admin-dashboard/register-member"
              onClick={()=> handleShowActive("register")} 
              className={`sidebar-navigator admin-sidebar-navigator ${isActive === "register" ? "active" : ""}`}
            >
              <div className="sidebar-navigator-list">
                <FaRegistered className="navigator-icon" />
                Register
              </div>
            </Link>

            {/* check-in */}
            <Link to="/admin-dashboard/check-in"
              onClick={()=> handleShowActive("check-in")} 
              className={`sidebar-navigator admin-sidebar-navigator ${isActive === "check-in" ? "active" : ""}`}
            >
              <div className="sidebar-navigator-list">
                <BsFillCalendarCheckFill className="navigator-icon" />
                Check In
              </div>
            </Link>

            {/* ai-analyst */}
            <Link to="/admin-dashboard/ai-analyst"
              onClick={()=> handleShowActive("ai-analyst")} 
              className={`sidebar-navigator admin-sidebar-navigator ${isActive === "ai-analyst" ? "active" : ""}`}
            >
              <div className="sidebar-navigator-list">
                <BsRobot className="navigator-icon" />
                AI analyst
              </div>
            </Link>

            {/* chart */}
            <Link to={`/admin-dashboard/chart/${localStorage.getItem("bar-chart") || "revenue"}`}
              onClick={()=> handleShowActive("chart")} 
              className={`sidebar-navigator admin-sidebar-navigator ${isActive === "chart" ? "active" : ""}`}
            >
              <div className="sidebar-navigator-list">
                <BiBarChartAlt2 className="navigator-icon" />
                Chart
              </div>
            </Link>
          </div>

          <div className="admin-sidebar-bottom">
            {/* mobile view container */}
            <div className="">
              <QrCodeButton />
            </div>
            {/* email container */}
            <p className="sidebar-email">
              <div className="sidebar-navigator-list">
                <AiOutlineMail className="email-icon" />:  
                <div className="user-email">
                  <span>{ userEmail }</span>
                </div>  
              </div>
            </p>
            {/* logout container */}
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

export default AdminSidebar;