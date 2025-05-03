import { RxEyeOpen } from "react-icons/rx"; 
import { RxEyeClosed } from "react-icons/rx"; 
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BgImage from "../assets/christ-embassy.png"
import { handleError, handleSuccess } from "../../notifications/Notification";
import { ToastContainer } from "react-toastify";
import Aos from 'aos';
import 'aos/dist/aos.css';
import Api from "../../API/Api.js";
import SubmissionLoader from "../reusableComponents/SubmissionLoader.jsx";

const initialState = {
    email: '', 
    phoneNumber: "", 
    password: "",
}
const Login = () => {
    const [formData, setFormData] = useState(initialState);
    const [openPassword, setOpenPassword] = useState(false);
    const [isSwitch, setIsSwitch] = useState( localStorage.getItem("switch") || null);
    const [isLoading, setIsLoading] = useState(null)
    const navigate = useNavigate();


    // handles the input values
    const handleInputChange = (e)=>{
      const { name, value } = e.target;
      if (name === "phoneNumber") {
          setFormData({ 
              ...formData, [name]: value.replace(/\s+/g, "")
          });
      } else if (name === "email"){
          setFormData({
              ...formData, [name]: value.replace(/\s+/g, "")
          });
      } else {
          setFormData({ ...formData, [name]: value });
      }
    }
    // show and close the password
    const handleOpenPassword = () => {
      setOpenPassword(!openPassword);
    }
    // switches the email and phone number input
    const handleIsSwitch = ()=>{
      setIsSwitch(!isSwitch)
      localStorage.setItem("switch", isSwitch)
    }


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
        const { message, user, token } = response.data;

        // store the user data in local storage
        if(user.role === "Usher"){
            localStorage.setItem("usher", JSON.stringify(user));
            localStorage.setItem("usherLoggedIn", JSON.stringify(true));
        }
        else if(user.role === "Admin"){
          localStorage.setItem("admin", JSON.stringify(user));
        }
        // show success message
        if (message) {
          handleSuccess(message);
          setTimeout(()=>{
            if(user.role === "Usher"){
              window.location.href = "/usher-dashboard";
            }
            else if(user.role === "Admin"){
              // window.location.href = "/admin-dashboard";
              navigate("/verify");
            }
          }, 2000);
        }
        // store the token in local storage
        if(token){
          localStorage.setItem("token", token);
        }


      } catch (error) {
        if(error.response.status === 429){
          handleError("Too many failed attempt to login, please try again after 10 minutes");
        }

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

    useEffect(()=>{
      Aos.init({
        duration: 300,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
      });
    }, [])
    

return (
    <div>
        <div className="container-background">
            {/* <div className="image-container">
                <img src={BgImage} 
                className='background-image'
                alt="background-image"
                />
            </div> */}
            <div className="outer-container">
                <div className="inner-container"
                  data-aos="fade-up"
                >
                    <form className='usher-register-form' onSubmit={handleSubmit}>
                      <h1 className='container-header'>Login</h1>
                      <div className="">
                        <div  className="email-phone-container">
                          <label onClick={handleIsSwitch} htmlFor="email" className={`email-phone email-label ${ !isSwitch? "email-phone-switch" : ""}`}>
                            Email
                          </label>
                          <label onClick={handleIsSwitch} htmlFor="phone" className={`email-phone ${ isSwitch? "email-phone-switch" : ""}`}>
                            Phone
                          </label>
                        </div>
                        { isSwitch ? (
                          <div className="form-group">
                              <input type="text" 
                                  name="phoneNumber" 
                                  value={formData.phoneNumber}
                                  onChange={handleInputChange}
                                  placeholder="enter your phone number" 
                              />
                          </div>
                        ): (
                          <div className="form-group">
                              <input type="email" 
                                  name="email" 
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  placeholder="enter your email" 
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
                              className={`submit-button ${isLoading ? "submit-button-loading" : ""}`}
                            >
                                {isLoading ? (
                                  <div className="login-button-content-container">
                                    <div className="login-button-content">
                                      <SubmissionLoader />
                                      <p>logging in</p>
                                    </div>
                                  </div>
                                ) 
                                : "login"
                                }
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