import React, { useEffect, useState } from 'react';
import Navbar from '../AdminDashboard/AdminDashboardNavbar';
import Sidebar from "../AdminDashboard/AdminSidebar"
import AdminContainer from '../AdminDashboard/AdminContainer';
import { handleError } from '../../notifications/Notification';
import { ToastContainer } from 'react-toastify';
import MainComponentLoader from '../reusableComponents/MainComponentLoader';


const AdminDashboard = () => {
  const [userAdmin, setUserAdmin] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [changeColor, setChangeColor] = useState(false)
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
    const storedUser = localStorage.getItem("admin");
    try {
      if(storedUser){
        setUserAdmin(JSON.parse(storedUser));
      }
    } catch (error) {
      handleError("Error occurred  : ", error)
    }
  }, [])

  // pick only the first name and display
  useEffect(()=>{
    if(userAdmin){
      const first = userAdmin.fullName;
      setFirstName(first || "");
    }
    else{
      setFirstName("");
    }
  }, [userAdmin]);

  if(!userAdmin){
    return (
      <MainComponentLoader />
    )
  }
  return (
    <div className={`user-dashboard-container ${changeColor ? 'white-bg' : 'dark-bg'}`} >
      {/* navbar */}
      <Navbar 
        user={userAdmin.role}
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
            userEmail={userAdmin.email} 
          />
        </div>
        <div className="dashboard-container">
          {/* admin content */}
          <AdminContainer
            changeColor={changeColor}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AdminDashboard;