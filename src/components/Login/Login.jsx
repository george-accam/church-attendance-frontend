import { RxEyeOpen } from "react-icons/rx"; 
import { RxEyeClosed } from "react-icons/rx"; 
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BgImage from "../assets/christ-embassy.png"
import { handleError, handleSuccess } from "../../notifications/Notification";
import { ToastContainer } from "react-toastify";
import Api from "../../API/Api.js";

const initialState = {
    email: '', 
    phoneNumber: "", 
    password: "",
}
const Login = () => {
    const [formData, setFormData] = useState(initialState);
    const [openPassword, setOpenPassword] = useState(false);
    const [isSwitch, setIsSwitch] = useState(null);
    const [isLoading, setIsLoading] = useState(null)
    const navigate = useNavigate();
    const [user, setUser] = useState(null);


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
      setIsSwitch(!isSwitch)
    }

    // retrieve the role of the user from the local storage
    useEffect(()=>{
      const storedUser = localStorage.getItem("user");
      if(storedUser){
        setUser(JSON.parse(storedUser));
      }
    },[])

    // handles the form submission
    const handleSubmit = async(e) => {
      e.preventDefault();
      const { email, phoneNumber, password } = formData;
      try {
        if(!email && !phoneNumber){
          return handleError("Please fill either email or phone number");
        }
        else if(phoneNumber.trim() && phoneNumber.length !== 10){
          return handleError("Phone number should be 10 digits");
        }
        else if(!password){
          return handleError("Password is required");
        }


        setIsLoading(true);

        const response = await Api.post("/login", formData);
        const { message, token } = response.data;

        if (message) {
          handleSuccess(message || "Login successful");
          setTimeout(()=>{
            if(user.role === "usher"){
              navigate(`/usher-dashboard/${user._id}`);
            }
            else if(user.role === "admin"){
              navigate(`/admin-dashboard/${user._id}`)
            }
          }, 3000);
        }
        if(token){
          localStorage.setItem("token", token);
        }


      } catch (error) {
        if(error.response.data.message){
          handleError(`Error status : ${error.response.data.message}`);
        }
        else if(error.request){
          handleError("Network error, please check network connection and  try again");
        }
        else{
          handleError(`Error occurred : ${error.message}`);
        }

      }finally{
        setIsLoading(false)
      }
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
                    <form onSubmit={handleSubmit}>
                      <div className="">
                        <div  className="email-phone-container">
                          <label onClick={handleIsSwitch} htmlFor="email" className={`email-phone ${ isSwitch? "email-phone-switch" : ""}`}>
                            Email
                          </label>
                          <label onClick={handleIsSwitch} htmlFor="phone" className={`email-phone ${ !isSwitch? "email-phone-switch" : ""}`}>
                            Phone
                          </label>
                        </div>
                        { isSwitch ? (
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
                              disabled={isLoading}
                              className='submit-button'
                            >
                                {isLoading ? "logging in" : "login"}
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
        <ToastContainer />
    </div>
)
}

export default Login;