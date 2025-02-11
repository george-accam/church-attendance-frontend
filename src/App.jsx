import React, { useEffect, useState } from 'react';
import {  Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import AdminDashboard from "./components/Admin/AdminDashboard";
import UsherDashboard from "./components/Usher/UserDashboard";
import NotFound from './components/NotFound';
import LandingPage from './components/LandingPage/LandingPage';

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }else{
        navigate("/")
      }
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
  
  if (isLoading) {
    // Display a loading state while user data is being fetched
    return (
      <div className="loading-container">
        <div class="container">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p>a moment please... 😊😊</p>
      </div>
    );
  }

  return (
    <div className='app-container'>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
          {user && (
            <>
                <Route path="usher-dashboard/*" element={<UsherDashboard />} />
                <Route path="admin-dashboard/*" element={<AdminDashboard />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
};

export default App;
