import React, { useEffect, useState } from 'react';
import {  Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import AdminDashboard from "./components/Admin/AdminDashboard";
import UsherDashboard from "./components/Usher/UserDashboard";
import NotFound from './components/NotFound';
import LandingPage from './components/LandingPage/LandingPage';
import MainComponentLoader from './components/reusableComponents/MainComponentLoader';

const App = () => {
  const [usher, setUsher] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      
      //  Check if usher is logged in
      const storedUsher = localStorage.getItem('usher');
      if (storedUsher) {
        setUsher(JSON.parse(storedUsher));
      }
      
      //  Check if admin is logged in
      const storedAdmin = localStorage.getItem('admin');
      if (storedAdmin) {
        setAdmin(JSON.parse(storedAdmin));
      }
      //  If usher or admin is not logged in, navigate to the landing page
      navigate("/")
    } catch (error) {
      console.error("Error retrieving user from localStorage:", error);
    }
    setIsLoading(false);
  }, []);

  useEffect(()=>{
    if(isLoading){
      const timer = (()=>{
        navigate("/")
      }, 1);
      return () => clearTimeout(timer);
    }
  },[isLoading, navigate]);

  // Display a loading state while user data is being fetched
  if (isLoading) {
    return (
      <MainComponentLoader />
    )
  }

  return (
    <div className='app-container'>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
          {/* usher protective route */}
          {usher && usher.role === "Usher" && (
                <Route path="usher-dashboard/*" element={<UsherDashboard />} />
          )}
          {/* admin protective route */}
          {admin && admin.role === "Admin" && (
                <Route path="admin-dashboard/*" element={<AdminDashboard />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
};

export default App;
