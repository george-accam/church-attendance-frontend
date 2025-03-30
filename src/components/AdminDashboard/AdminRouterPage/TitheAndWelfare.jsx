import { CgSearch } from "react-icons/cg"; 
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const TitheAndWelfare = ({ changeColor }) => {
    const [isNavigate, setIsNavigate] = useState("all");

    const handleNavigate = (isActive) => {
        setIsNavigate(isActive);
    };


    return (
        <div>
            <div className="admin-content-tithe-and-welfare-container">
                 {/* the search container */}
                <div className={`header-search-bar ${changeColor ? "dashboard-border-bottom-dark" : "dashboard-border-bottom-light"}`}>
                    <h1 className='all-members-title'>Tithe and Welfare</h1>
                    <div 
                        // tabIndex={0}
                        // onKeyDown={handleEnter}
                        className="search-container"
                    >
                        <input type="text"
                            placeholder='search members'
                            // value={search}
                            // onChange={handleSearch}
                        />
                        <CgSearch className="search-icon"
                            // onClick={searchMembers}
                        />
                    </div>
                </div>

                {/* filter */}
                <div className="filter-container">  
                    {/* all */}
                    <Link 
                        to="/admin-dashboard/tithe-and-welfare/all" 
                        onClick={() => handleNavigate("all")}
                        className={`filter-link ${isNavigate === "all" ? "filter-color active" : ""} ${changeColor ? "filter-text-dark" : "filter-text-white"}`}
                    >
                        All
                    </Link>
                    {/* tithe */}
                    <Link 
                        to="/admin-dashboard/tithe-and-welfare/tithe" 
                        onClick={() => handleNavigate("tithe")}
                        className={`filter-link ${isNavigate === "tithe" ? "filter-color active" : ""} ${changeColor ? "filter-text-dark" : "filter-text-white"}`}
                    >
                        Tithe
                    </Link>
                    {/* welfare */}
                    <Link 
                        to="/admin-dashboard/tithe-and-welfare/welfare" 
                        onClick={() => handleNavigate("welfare")}
                        className={`filter-link ${isNavigate === "welfare" ? "filter-color active" : ""} ${changeColor ? "filter-text-dark" : "filter-text-white"}`}
                    >
                        Welfare
                    </Link>
                </div>

                {/* the tithe and welfare child components */}
                <div className="tithe-and-welfare-content-container">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default TitheAndWelfare;