import { BsFingerprint } from "react-icons/bs"; 
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { handleSuccess, handleError } from '../../../notifications/Notification';
import Api from "../../../API/Api";
import { ToastContainer } from 'react-toastify';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useSocket } from '../../Socket.io/Socket';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async(e) => {
    try {
      e.preventDefault();
      if (formData.phoneNumber.length !== 10) {
        handleError("Phone number should be 10 digits");
        return;
      }
      // passing the user id to the form data
      const user  = localStorage.getItem("usher");
      if (!user) {
        handleError("Please login to register member");
        return;
      }
      const passUser = JSON.parse(user);
      const userId = passUser._id; //user id from local storage
      const userFullName = passUser.fullName; //user full name from local storage
      // validate user id
      const isValidateUserId = /^[0-9a-fA-F]{24}$/.test(userId);
      if (!isValidateUserId) {
        handleError("Invalid User ID format");
        return;
      }

      // submit form data
      const submitData = {
        userId: userId,
        userFullName: userFullName,
        ...formData,
      };
      // set loading to true
      setIsLoading(true);
      const response = await Api.post("/attendee", submitData);
      const { message } = response.data;
      handleSuccess(message);
      setFormData({
        fullName: "",
        phoneNumber: "",
      });

    } catch (error) {
      if (error.response.data.message) {
        handleError(`Registration failed: ${error.response.data.message} `)
      }else if (error.request) {
        handleError("Error connecting to the server. Please check your internet connection", + error.request);
      }else{
        handleError("An error occurred. Please try again");
      }
    }finally{
      // set loading to false
      setIsLoading(false);
    }
  }

  // animate the form
  useEffect(()=>{
    Aos.init({
      duration: 300,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }, [])

  // initialize socket connection and listen for messages
  const { socket, message, connected } = useSocket();
  console.log("Socket message:", message || "no message received");
  console.log("Socket connected:", connected);
  

  return (
    <div>
      <div className="container-background usher-register-container">
        <div className="outer-container "
        data-aos="fade-up"
        >
          <div className="inner-container usher-register-inner-container">
              <form className='usher-register-form' onSubmit={handleOnSubmit}>
                <h1 className='container-header'>Register Member</h1>
                <div className="form-group">
                    <label htmlFor="fullName">
                        Full name
                    </label>
                    <input type="text" 
                        name="fullName" 
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="enter full name" 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fullName">
                      Phone number
                    </label>
                    <input type="text" 
                        name="phoneNumber" 
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        placeholder="enter phone number" 
                    />
                </div>
                <div className="fingerprint-group">
                    <label htmlFor="fingerprintID">
                      Fingerprint
                    </label>
                    {message ? (
                      <p className="fingerprintID-success">
                        <BsFingerprint />
                      </p>
                    ) :(
                      <p className="fingerprintID-fail">
                        <BsFingerprint />
                      </p>
                    )}
                </div>
                <div className="button-container">
                    <button type="submit"
                        disabled={isLoading}
                        className={`submit-button ${isLoading ? "button-loading" : ""}`}
                    >
                        {isLoading ? "submitting" : "submit"}
                    </button>
                    <div className="login-link-container">
                        Want to check in member ?
                        <Link to="/usher-dashboard/check-in" className="login-link check-in-register-member">
                          check in
                        </Link>
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

export default Register;