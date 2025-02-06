import React, { useEffect, useState } from 'react';
import Navbar from '../UsherDashboard/DashboardNavbar';
import Sidebar from "../UsherDashboard/Sidebar"
import { handleError } from '../../notifications/Notification';
import { ToastContainer } from 'react-toastify';
import UsherContainer from '../UsherDashboard/UsherContainer';


const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [changeColor, setChangeColor] = useState(true)
  const [sidebarActive, setSidebarActive] = useState(false);

  const handleSidebarActive = ()=>{
    setSidebarActive((prev)=> !prev);
  };

  useEffect(()=>{
    const isChangeColor = localStorage.getItem("changeColor");
    if(isChangeColor !== null){
      setChangeColor(JSON.parse(isChangeColor));
    }
  }, []);

  const handleChangeColor = ()=>{
    setChangeColor((prev)=>{
      const newColor = !prev;
      localStorage.setItem("changeColor", JSON.stringify(newColor));
      return newColor;
    })
  }

  // get the stored user data
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
    <div className={`user-dashboard-container ${changeColor ? 'white-bg' : 'dark-bg'}`} >
      {/* navbar */}
      <Navbar 
        user={user.role}
        sidebarActive={sidebarActive}
        setSidebarActive={setSidebarActive}
        handleSidebarActive={handleSidebarActive}
        handleChangeColor={handleChangeColor}
        changeColor={changeColor}
      />
      <div className="sidebar-user-dashboard">
        <div className={`dashboard-sidebar`}>
          {/* sidebar container */}
          <Sidebar
            sidebarActive={sidebarActive}
            handleSidebarActive={handleSidebarActive}
            userName={user.fullName} 
            userEmail={user.email} 
          />
        </div>
        <div className="dashboard-container">
          {/* user content */}
          <UsherContainer
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default UserDashboard;