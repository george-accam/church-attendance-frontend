import { BsFillSunFill } from "react-icons/bs"; 
import { MdNightlightRound } from "react-icons/md"; 
import { WiDaySunny } from "react-icons/wi"; 
import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineLogout } from "react-icons/ai";

const NavbarToggleButton = ({ isShow, setIsShow, handleLogout, handleChangeColor, changeColor }) => {
    const menuRef = useRef(null);

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
        <div>
            {isShow && (
                <div className="logout-inner-container" role="none">
                    <section>Theme</section>
                    <div className="toggle-switch-container">
                        {!changeColor ? (
                            <div 
                                className="light-mode"
                                onClick={()=>{
                                    handleChangeColor();
                                }}
                            >
                                <BsFillSunFill 
                                    className="toggle-icons"
                                />
                                <div className="light-text">Light</div>
                            </div>
                        ) : (
                            <div 
                                className="light-mode"
                                onClick={()=>{
                                    handleChangeColor();
                                }}
                            >
                                <MdNightlightRound 
                                    className="toggle-icons"
                                />
                                <div className="light-text">Dark</div>
                            </div>
                        )}
                    </div>
                    <p onClick={handleLogout}><AiOutlineLogout /> logout</p>
                </div>
            )}
        </div>
    )
}

export default NavbarToggleButton