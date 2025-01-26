import React from 'react';
import { Link } from 'react-router-dom';
import NavImage from "./assets/navbar-image.png"

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <div className="navbar-content">
        <div className="nav-image">
          <Link to="/register">
            <img src={NavImage} alt='logo' />
          </Link>
          <p className='image-text'>Christ Embassy</p>
        </div>
        <div className="nav-item">
          <Link className='navbar-button' to="/login">login</Link>
          <Link className='navbar-button navbar-button2' to="/register">register</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar;