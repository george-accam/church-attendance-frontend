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
                    <section>menu</section>
                    <div className="toggle-switch-container">
                            <label className="ui-switch">
                                <input type="checkbox" 
                                    onChange={handleChangeColor}
                                />
                                <div className="slider">
                                    <div className="circle"></div>
                                </div>
                            </label>
                    </div>
                    <p onClick={handleLogout}><AiOutlineLogout /> logout</p>
                </div>
            )}
        </div>
    )
}

export default NavbarToggleButton