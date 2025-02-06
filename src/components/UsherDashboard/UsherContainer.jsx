import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AllMembers from "./RouterPages/AllMembers"
import CheckIn from "./RouterPages/CheckIn"
import Personal from "./RouterPages/Personal"
import Register from "./RouterPages/Register"

const UsherContainer = () => {
  return (
    <div>
      <div className="user-content-container">
        <div className="user-content">
          <h1>Usher Container</h1>
          <Routes>
            <Route path="/" element={<Navigate to="all-members" />} />
            <Route path="all-members" element={<AllMembers />} />
            <Route path="personal" element={<Personal />} />
            <Route path="register-member" element={<Register />} />
            <Route path="check-in" element={<CheckIn />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default UsherContainer;