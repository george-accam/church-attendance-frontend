import React, { useState, useEffect, useRef } from 'react';

const NavbarToggleButton = ({ isShow, setIsShow, handleShow, handleTheme, handleLogout, handleChangeColor}) => {
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
                        <div onClick={()=> handleChangeColor()} className="toggle-switch-container">
                            <label class="ui-switch">
                                <input type="checkbox" />
                                <div class="slider">
                                    <div class="circle"></div>
                                </div>
                            </label>
                        </div>
                        <h6 onClick={handleTheme}><MdOutlineModeStandby /> theme</h6>
                        <p onClick={handleLogout}><AiOutlineLogout /> logout</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NavbarToggleButton