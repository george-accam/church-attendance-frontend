import { HiMenuAlt1 } from "react-icons/hi"; 
import { AiOutlineLogout } from "react-icons/ai"; 
import { MdOutlineModeStandby } from "react-icons/md"; 
import { MdLogout } from "react-icons/md"; 
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import lightMode from "../assets/light-mode.svg";
import darkMode from "../assets/dark-mode.svg";
import Logout from "../reusableComponents/Logout";
import NavbarToggleButton from "../reusableComponents/NavbarToggleButton";

const DashboardNavbar = ({ user, handleChangeColor, changeColor, handleSidebarActive }) => {
    const [isShow, setIsShow] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [isTheme, setIsTheme] = useState(false);
    const [selectedMode, setSelectedMode] = useState(localStorage.getItem("theme") || "light");
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
        setIsLogout(!isLogout);
        navigate("/login");
    }
    
    // change the theme
    const handleTheme = ()=>{
        setIsTheme(!isTheme);
        setIsShow(false);
    }

    // cancel the mode container
    const handleCancel = ()=>{
        setIsTheme(false);
    };

    // change the theme mode
    const handleSelectedMode = (mode)=>{
        setSelectedMode(mode);
        localStorage.setItem("theme", mode);
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

            {/* toggle navbar container */}
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
                {/* the theme container */}
                {/* {isTheme && (
                    <div className="dark-background">
                        <div className="logout-decision-holder">
                            <div className="logout-holder theme-holder-container">
                                <h2>Theme Preference</h2>
                                <p>Choose your preferred theme</p>
                                <div className="theme-holder">
                                    <div onClick={()=> { 
                                        handleSelectedMode("light");
                                        handleChangeColor();
                                        setIsTheme(false);
                                    }} 
                                        className={`${selectedMode === "light" ? "mode-selected" : "theme-mode-choice-container"}`}
                                    >
                                        <img src={lightMode} alt="light mode" />
                                        <p>light mode</p>
                                    </div>
                                    <div onClick={()=> {
                                        handleSelectedMode("dark");
                                        handleChangeColor();
                                        setIsTheme(false);
                                    }} 
                                        className={`${selectedMode === "dark" ? "mode-selected" : "theme-mode-choice-container"}`}
                                    >
                                        <img src={darkMode} alt="dark mode" />
                                        <p>dark mode</p>
                                    </div>
                                </div>
                                <button className="theme-button" onClick={handleCancel}>cancel</button>
                            </div>
                        </div>
                    </div>
                )} */}
                {/* the logout container */}
                {isLogout &&(
                    <Logout
                        handleYes={handleYes}
                        handleLogout={handleLogout}
                    />
                )}
        </div>
    )
}

export default DashboardNavbar;