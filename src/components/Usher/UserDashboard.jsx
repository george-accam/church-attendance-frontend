import React, { useEffect, useState } from 'react';
import Navbar from '../UsherDashboard/DashboardNavbar';
import Sidebar from "../UsherDashboard/Sidebar"
import { handleError } from '../../notifications/Notification';
import { ToastContainer } from 'react-toastify';
import UsherContainer from '../UsherDashboard/UsherContainer';
import MainComponentLoader from '../reusableComponents/MainComponentLoader';


const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [changeColor, setChangeColor] = useState(false)
  const [sidebarActive, setSidebarActive] = useState(false);

  const handleSidebarActive = ()=>{
    setSidebarActive((prev)=> !prev);
  };

  // handle change background color
  const handleChangeColor = ()=>{
    setChangeColor((prev)=>{
      const newColor = !prev;
      localStorage.setItem("is-changeColor", JSON.stringify(newColor));
      return newColor;
    })
  }

  // change color of the background
  useEffect(()=>{
    const isChangeColor = localStorage.getItem("is-changeColor");
    if(isChangeColor !== null){
      setChangeColor(JSON.parse(isChangeColor));
    }
  }, []);

  // get the stored user data
  useEffect(()=>{
    const storedUser = localStorage.getItem("usher");
    try {
      if(storedUser){
        setUser(JSON.parse(storedUser));
      }
      
    } catch (error) {
      handleError("Error occurred fetching user data");
    }
  }, [])

  // render the first name of the user
  useEffect(()=>{
    if(user){
      const first = user.fullName;
      setFirstName(first || "");
    }
    else{
      setFirstName("");
    }
  }, [user]);

  if(!user){
    return (
      <MainComponentLoader />
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
        handleChangeColor={()=> handleChangeColor()}
        changeColor={changeColor}
      />
      <div className="sidebar-user-dashboard">
        <div className={`dashboard-sidebar`}>
          {/* sidebar container */}
          <Sidebar
            sidebarActive={sidebarActive}
            handleSidebarActive={handleSidebarActive}
            userName={firstName} 
            userEmail={user.email} 
          />
        </div>
        <div className="dashboard-container">
          {/* user content */}
          <UsherContainer
            changeColor={changeColor}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default UserDashboard;