import React from 'react';
import { Link } from 'react-router-dom';
import NavImage from "./assets/navbar-image.png"

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <div className="navbar-content">
          <Link to="/register" className='nav-image-container'>
            <div className="nav-image">
              <img src={NavImage} alt='logo' />
              <p className='image-text'>Christ Embassy</p>
            </div>
          </Link>
        <div className="nav-item">
          <Link className='navbar-button' to="/login">Login</Link>
          <Link className='navbar-button navbar-button2' to="/register">Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar;