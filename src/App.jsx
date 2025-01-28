import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import AdminDashboard from "./components/Admin/AdminDashboard";
import UsherDashboard from "./components/Usher/UserDashboard";
import NotFound from './components/NotFound';
import LandingPage from './components/LandingPage/LandingPage';

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    const storedUser = localStorage.getItem('user');
    if(storedUser){
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false)
  },[])

  if (isLoading) {
    return <div className="">Loading......</div>
  }

  return (
    <div className='app-container'>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={user ? <Navigate to={user.role  === "admin" ? `/admin-dashboard/${user._id}}` : user.role === 'usher' ? `/usher-dashboard/${user._id}}` : `/`} /> : <Login />} />
          <Route path="/register" element={<Signup />} />
          {user && (
            <>
              <Route path={`/admin-dashboard/${user._id}`} element={<AdminDashboard />} />
              <Route path={`/usher-dashboard/${user._id}`} element={<UsherDashboard />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;