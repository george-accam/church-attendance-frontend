import React, { useEffect, useState } from 'react';
import Navbar from '../UsherDashboard/DashboardNavbar';
import Sidebar from "../UsherDashboard/Sidebar"
import { handleError } from '../../notifications/Notification';
import { ToastContainer } from 'react-toastify';
import UsherContainer from '../UsherDashboard/UsherContainer';


const UserDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const storedUser = localStorage.getItem("user");
    try {
      if(storedUser){
        setUser(JSON.parse(storedUser));
      }
      
    } catch (error) {
      handleError("Error occurred  : ", error)
    }
  }, [])

  if(!user){
    return (
      <div className="loading-container">
        <p>loading....</p>
      </div>
    )
  }
  return (
    <div className='user-dashboard-container'>
      <Navbar 
        user={user.role}
      />
      <div className="sidebar-user-dashboard">
        <div className="dashboard-sidebar">
          <Sidebar 
            user={user.email} 
          />
        </div>
        <div className="dashboard-container">
          <UsherContainer 
            user={user} 
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default UserDashboard;