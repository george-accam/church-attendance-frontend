import { HiMenuAlt1 } from "react-icons/hi"; 
import { AiOutlineLogout } from "react-icons/ai"; 
import { MdOutlineModeStandby } from "react-icons/md"; 
import { MdLogout } from "react-icons/md"; 
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import lightMode from "../assets/light-mode.svg";
import darkMode from "../assets/dark-mode.svg";
import Logout from "../reusableComponents/Logout";
import { handleSuccess } from "../../notifications/Notification";
import NavbarToggleButton from "../reusableComponents/NavbarToggleButton";
import { ToastContainer } from "react-toastify";

const DashboardNavbar = ({ user, handleChangeColor, changeColor, handleSidebarActive }) => {
    const [isShow, setIsShow] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [isTheme, setIsTheme] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    // show the logout container
    const handleShow = ()=>{
        setIsShow(!isShow);
    }

    // open the logout container
    const handleLogout = ()=>{
        setIsLogout(!isLogout);
        setIsShow(false);
    }

    // logout the user
    const handleYes = ()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("is-active")
        localStorage.removeItem('usherLoggedIn')
        setIsLogout(!isLogout);
        handleSuccess("logged out successfully");
        setTimeout(()=>{
            navigate('/login');
        }, 1000);
    }
    
    // change the theme
    const handleTheme = ()=>{
        setIsTheme(!isTheme);
        setIsShow(false);
    }

    // close the theme container when cursor is outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsShow(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={`dashboard-navbar-container ${changeColor ? "dashboard-border-bottom-dark" : "dashboard-border-bottom-light"}`}>
            <h1>
                Dashboard
            </h1>
            <p className={changeColor ? "dark-par" : "light-par"}>
                {user ? user : "Usher"}
            </p>

            <div className="usher-close-container">
                <span className={changeColor ? "dark-icon" : "light-icon"} onClick={handleSidebarActive}>
                    <HiMenuAlt1 />
                </span>
                <h6 className={changeColor ? "dark-par" : "light-par"}>
                    {user ? user : "Usher"}
                </h6>
            </div>
            <div className="logout-container"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
                ref={menuRef}
                >
                <span id="options-menu" onClick={handleShow} aria-expanded={isShow}>
                    <MdLogout />
                </span>
                {/* toggle navbar container */}
                {isShow && (
                    <NavbarToggleButton
                        isShow={isShow}
                        setIsShow={setIsShow}
                        handleShow={handleShow}
                        handleTheme={handleTheme}
                        handleLogout={handleLogout}
                        handleChangeColor={()=> { 
                            handleChangeColor();
                            setIsTheme(false);
                        }}
                    />
                )}
                {/* the logout container */}
                {isLogout &&(
                    <Logout
                        handleYes={handleYes}
                        handleLogout={handleLogout}
                    />
                )}
                <ToastContainer />
            </div>
        </div>
    )
}

export default DashboardNavbar;