import { MdNightlightRound } from "react-icons/md"; 
import { WiDaySunny } from "react-icons/wi"; 
import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineLogout } from "react-icons/ai";

const NavbarToggleButton = ({ isShow, setIsShow, handleLogout, handleChangeColor }) => {
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
                    <section>theme</section>
                    <div className="toggle-switch-container">
                        <WiDaySunny 
                            className="toggle-icons"
                            onClick={()=>{
                                handleChangeColor();
                                setIsShow(false);
                            }}
                        />
                        <MdNightlightRound 
                            className="toggle-icons"
                            onClick={()=>{
                                handleChangeColor();
                                setIsShow(false);
                            }}
                        />
                    </div>
                    <p onClick={handleLogout}><AiOutlineLogout /> logout</p>
                </div>
            )}
        </div>
    )
}

export default NavbarToggleButton