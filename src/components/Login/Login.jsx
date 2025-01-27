import { RxEyeOpen } from "react-icons/rx"; 
import { RxEyeClosed } from "react-icons/rx"; 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BgImage from "../assets/christ-embassy.png"

const initialState = {
    fullName: "", 
    email: '', 
    phoneNumber: "", 
    password: "", 
    confirmPassword: ""
}
const Login = () => {
    const [formData, setFormData] = useState(initialState);
    const [openPassword, setOpenPassword] = useState(false);
    const [isSwitch, setIsSwitch] = useState(null);

    // handles the input values
    const handleInputChange = (e)=>{
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    // show and close the password
    const handleOpenPassword = () => {
      setOpenPassword(!openPassword);
    }
    // switches the email and phone number input
    const handleIsSwitch = ()=>{
      setIsSwitch(isSwitch === "email" ? "phone" : "email")
    }


return (
    <div>
        <div className="container-background">
            <div className="image-container">
                <img src={BgImage} 
                className='background-image'
                alt="background-image"
                />
            </div>
            <div className="outer-container">
                <div className="inner-container">
                    <h1 className='container-header'>Login</h1>
                    <form >
                      <div className="">
                        <div  className="email-phone-container">
                          <label onClick={handleIsSwitch} htmlFor="email" className={`email-phone ${ isSwitch === "email" ? "email-phone-switch" : ""}`}>
                            Email
                          </label>
                          <label onClick={handleIsSwitch} htmlFor="phone" className={`email-phone ${ isSwitch === "phone" ? "email-phone-switch" : ""}`}>
                            Phone
                          </label>
                        </div>
                        { isSwitch === "email" ? (
                          <div className="form-group">
                              <input type="email" 
                                  name="email" 
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  placeholder="enter your email" 
                              />
                          </div>
                        ): (
                          <div className="form-group">
                              <input type="text" 
                                  name="phoneNumber" 
                                  value={formData.phoneNumber}
                                  onChange={handleInputChange}
                                  placeholder="enter your phone number" 
                              />
                          </div>
                        )}
                      </div>
                        <div className="password">
                            <label htmlFor="password">
                                Password
                            </label>
                            <div className={`password-container`}>
                            <input type={openPassword ? "text": "password"} 
                                name="password" 
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="enter your password" 
                            />
                            <div onClick={handleOpenPassword} className="">
                              { openPassword ? <RxEyeOpen className="password-icon" /> : <RxEyeClosed className="password-icon" />}
                            </div>
                            </div>
                        </div>
                        <div className="button-container">
                            <button type="submit"
                                className='submit-button'
                            >
                                login
                            </button>
                            <div className="login-link-container">
                                Don't have an account? 
                                <Link to="/register" className="login-link">register</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
)
}

export default Login;