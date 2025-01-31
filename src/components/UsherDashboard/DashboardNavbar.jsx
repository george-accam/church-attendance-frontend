import { AiOutlineLogout } from "react-icons/ai"; 
import { MdOutlineModeStandby } from "react-icons/md"; 
import { MdLogout } from "react-icons/md"; 
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import lightMode from "../assets/light-mode.svg";
import darkMode from "../assets/dark-mode.svg";

const DashboardNavbar = ({ user, }) => {
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
        <div className={'dashboard-navbar-container'}>
            <h1>
                Dashboard
            </h1>
            <p>{user ? user : "Usher"}</p>
            <div className="logout-container"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
                ref={menuRef}
            >
                <span id="options-menu" onClick={handleShow} aria-expanded={isShow}>
                    <MdLogout />
                </span>
                {isShow && (
                    <div className="logout-inner-container" role="none">
                        <section>options</section>
                        <h6 onClick={handleTheme}><MdOutlineModeStandby /> theme</h6>
                        <p onClick={handleLogout}><AiOutlineLogout /> logout</p>
                    </div>
                )}

                {isTheme && (
                    <div className="dark-background">
                        <div className="logout-decision-holder">
                            <div className="logout-holder theme-holder-container">
                                <h2>Theme Preference</h2>
                                <p>Choose your preferred theme</p>
                                <div className="theme-holder">
                                    <div onClick={()=> handleSelectedMode("light")} 
                                        className={`${selectedMode === "light" ? "mode-selected" : "theme-mode-choice-container"}`}
                                    >
                                        <img src={lightMode} alt="light mode" />
                                        <p>light mode</p>
                                    </div>
                                    <div onClick={()=> handleSelectedMode("dark")} 
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
                )}

                {isLogout &&(
                    <div className="dark-background">
                        <div className="logout-decision-holder">
                            <div className="logout-holder">
                                <h2>Logout Confirmation</h2>
                                <p>Are you sure you want to logout ?</p>
                                <div className="decision">
                                    <button className="yes" onClick={handleYes}>Yes</button>
                                    <button className="no" onClick={handleLogout}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DashboardNavbar;