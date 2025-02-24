import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AllMembers from "./RouterPages/AllMembers"
import CheckIn from "./RouterPages/CheckIn"
import Personal from "./RouterPages/Personal"
import Register from "./RouterPages/Register"

const UsherContainer = ({ changeColor }) => {
  return (
    <div>
      <div className="user-content-container">
        <div className="user-content">
          <Routes>
            <Route path="/" element={<Navigate to="all-members" replace />} />
            <Route path="all-members" element={
              <AllMembers
                changeColor={changeColor}
              />} 
            />
            <Route path="personal" element={
              <Personal
                changeColor={changeColor}
              />} 
            />
            <Route path="register-member" element={
              <Register
                changeColor={changeColor}
              />} 
            />
            <Route path="check-in" element={
              <CheckIn
                changeColor={changeColor}
              />} 
            />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default UsherContainer;