import { AiOutlineLogout } from "react-icons/ai"; 
import { MdOutlineModeStandby } from "react-icons/md"; 
import { MdLogout } from "react-icons/md"; 
import React, { useRef, useState, useEffect } from 'react';

const DashboardNavbar = ({ user, }) => {
    const [isShow, setIsShow] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [isTheme, setIsTheme] = useState(false);
    const menuRef = useRef(null);

    // show the logout container
    const handleShow = ()=>{
        setIsShow(!isShow);
    }

    const handleLogout = ()=>{
        setIsLogout(!isLogout);
        setIsShow(false);
    }

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
        <div className='dashboard-navbar-container'>
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
                        <h6><MdOutlineModeStandby /> theme</h6>
                        <p onClick={handleLogout}><AiOutlineLogout /> logout</p>
                    </div>
                )}

                {isLogout &&(
                    <div className="logout-decision-holder">
                        <div className="logout-holder">
                            <h2>Logout Confirmation</h2>
                            <p>Are you sure you want to logout?</p>
                            <div className="decision">
                                <button className="yes">Yes</button>
                                <button className="no" onClick={handleLogout}>No</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DashboardNavbar;