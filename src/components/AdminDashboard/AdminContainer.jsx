import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminMembersChecked from './AdminRouterPage/MembersChecked';
import AdminAllMembers from "./AdminRouterPage/AllMembers"
import AdminPersonal from "./AdminRouterPage/Personal"
import AdminRegister from "./AdminRouterPage/Register"
import AdminCheckIn from "./AdminRouterPage/CheckIn"
import AdminUshers from "./AdminRouterPage/Ushers"

const AdminContainer = ({changeColor }) => {
  return (
    <div>
      <div className="user-content-container">
        <div className="user-content">
          <Routes>
            <Route path="/" element={<Navigate to="members-checked" replace />} />
            <Route path="members-checked" element={
              <AdminMembersChecked 
                changeColor={changeColor}
                />
              } />
            <Route path="ushers" element={
              <AdminUshers 
                changeColor={changeColor}
              />
            } />
            <Route path="all-members" element={
              <AdminAllMembers
                changeColor={changeColor}
              />
            } />
            <Route path="personal" element={
              <AdminPersonal
                changeColor={changeColor}
              />
            } />
            <Route path="register-member" element={
              <AdminRegister
                changeColor={changeColor}
              />
            } />
            <Route path="check-in" element={
              <AdminCheckIn
                changeColor={changeColor}
              />
            } />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default AdminContainer;