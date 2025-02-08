import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleSuccess, handleError } from '../../../notifications/Notification';
import Api from "../../../API/Api";
import { ToastContainer } from 'react-toastify';

const CheckIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setPhoneNumber(e.target.value);
  }

  const handleOnSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await Api.post("/check-in", { phoneNumber });
      const { message } = response.data;
      setIsLoading(true);
      handleSuccess(message);
      setPhoneNumber("");
      
    } catch (error) {
      if (error.response.data) {
        handleError(`Check in failed: ${error.response.data.message} `)
      } else if (error.request) {
        handleError("Error connecting to the server. Please check your internet connection", + error.request);
      }else {
        handleError("An error occurred. Please try again");
      }
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="container-background usher-register-container">
        <div className="outer-container ">
          <div className="inner-container usher-register-inner-container">
              <h1 className='container-header'>Check In Member</h1>
              <form onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">
                      Phone number
                    </label>
                    <input type="text" 
                        name="phoneNumber" 
                        value={phoneNumber}
                        onChange={handleInputChange}
                        required
                        placeholder="enter phone number" 
                    />
                </div>
                <div className="button-container">
                    <button type="submit"
                        disabled={isLoading}
                        className={`submit-button ${isLoading ? "button-loading" : ""}`}
                    >
                        {isLoading ? "checking in" : "check in"}
                    </button>
                    <div className="login-link-container">
                        Want to register member ?
                        <Link to="/usher-dashboard/register-member" className="login-link check-in-register-member">
                          register
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

export default CheckIn;