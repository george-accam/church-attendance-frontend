import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const BarChart = ({ changeColor}) => {
    const [isNavigate, setIsNavigate] = useState(localStorage.getItem("bar-chart") || "revenue");
    
        const handleNavigate = (isActive) => {
            setIsNavigate(isActive);
            localStorage.setItem("bar-chart", isActive);
        };

    const navigators = [
        { path: '/admin-dashboard/chart/revenue', label: 'Revenue', active: "revenue" },
        { path: '/admin-dashboard/chart/attendance', label: 'Attendance', active: "attendance" }
        ];

    return (
    <div>
        <div className="filter-container">
            {navigators.map((navigator, index) => (
                <Link 
                    key={index} 
                    to={navigator.path} 
                    onClick={() => handleNavigate(navigator.active)}
                    className={`filter-link ${isNavigate === navigator.active ? "filter-color active" : ""} ${changeColor ? "filter-text-dark" : "filter-text-white"}`}
                >
                    {navigator.label}
                </Link>
            ))}
        </div>

        <div className="bar-chart-components">
            <Outlet />
        </div>
    </div>
    )
}

export default BarChart;