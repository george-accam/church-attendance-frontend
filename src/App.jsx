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
      }, 10);
      return () => clearTimeout(timer);
    }
  },[isLoading, navigate]);
  if (isLoading) {
    // Display a loading state while user data is being fetched
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='app-container'>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          {user.role === "Admin" && (
              <Route path={`/admin-dashboard/${user._id}`} element={<AdminDashboard />} />
          )}
          {user.role === "Usher" && (
              <Route path={`/usher-dashboard/${user._id}`} element={<UsherDashboard />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
};

export default App;
