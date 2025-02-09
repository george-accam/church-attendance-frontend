import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { handleSuccess, handleError } from '../../../notifications/Notification';
import Api from "../../../API/Api";
import { ToastContainer } from 'react-toastify';
import Aos from 'aos';
import 'aos/dist/aos.css';

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
      <div className="container-background usher-register-container">
        <div className="outer-container"
          data-aos="fade-up"
        >
          <div className="inner-container usher-check-in-inner-container">
              <form 
                className='check-in-form'
                onSubmit={handleOnSubmit}
              >
                <h1 className='container-header'>Check In Member</h1>
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
                        {isLoading ? "searching" : "search"}
                    </button>
                    <div className="login-link-container">
                        Want to register member ?
                        <Link to="/usher-dashboard/register-member" className="login-link check-in-register-member">
                          register
                        </Link>
                    </div>
                </div>
              </form>
              {/* members table */}
              <div className="check-in-all-members-content">
                <table className='all-members-content'>
                    {/* table header */}
                    <thead>
                        <tr className='all-members-list-header personal-members-list-header'>
                            <th>Full Name</th>
                            <th>Phone Number</th>
                            <th>check in</th>
                        </tr>
                    </thead>
                    {/* breaks the thead from the tbody */}
                    <br />

                    <tbody>
                      <tr className='all-members-list check-in-all-members-list'>
                          <td className='all-members-list-name'>
                              hello
                          </td>
                          <td className='all-members-list-phone-number'>
                              0215436516
                          </td>
                          <td className='all-members-list-date'>
                              <input type="checkbox" 
                                name=""  
                              />
                          </td>
                      </tr>
                      <tr className='all-members-list check-in-all-members-list'>
                          <td className='all-members-list-name'>
                              hello
                          </td>
                          <td className='all-members-list-phone-number'>
                              0215436516
                          </td>
                          <td className='all-members-list-date'>
                              <input type="checkbox" 
                                name=""  
                              />
                          </td>
                      </tr>
                      <tr className='all-members-list check-in-all-members-list'>
                          <td className='all-members-list-name'>
                              hello
                          </td>
                          <td className='all-members-list-phone-number'>
                              0215436516
                          </td>
                          <td className='all-members-list-date'>
                              <input type="checkbox" 
                                name=""  
                              />
                          </td>
                      </tr>
                      <tr className='all-members-list check-in-all-members-list'>
                          <td className='all-members-list-name'>
                              hello
                          </td>
                          <td className='all-members-list-phone-number'>
                              0215436516
                          </td>
                          <td className='all-members-list-date'>
                              <input type="checkbox" 
                                name=""  
                              />
                          </td>
                      </tr>
                      <tr className='all-members-list check-in-all-members-list'>
                          <td className='all-members-list-name'>
                              hello
                          </td>
                          <td className='all-members-list-phone-number'>
                              0215436516
                          </td>
                          <td className='all-members-list-date'>
                              <input type="checkbox" 
                                name=""  
                              />
                          </td>
                      </tr>
                      <tr className='all-members-list check-in-all-members-list'>
                          <td className='all-members-list-name'>
                              hello
                          </td>
                          <td className='all-members-list-phone-number'>
                              0215436516
                          </td>
                          <td className='all-members-list-date'>
                              <input type="checkbox" 
                                name=""  
                              />
                          </td>
                      </tr>
                      <tr className='all-members-list check-in-all-members-list'>
                          <td className='all-members-list-name'>
                              hello
                          </td>
                          <td className='all-members-list-phone-number'>
                              0215436516
                          </td>
                          <td className='all-members-list-date'>
                              <input type="checkbox" 
                                name=""  
                              />
                          </td>
                      </tr>
                      <tr className='all-members-list check-in-all-members-list'>
                          <td className='all-members-list-name'>
                              hello
                          </td>
                          <td className='all-members-list-phone-number'>
                              0215436516
                          </td>
                          <td className='all-members-list-date'>
                              <input type="checkbox" 
                                name=""  
                              />
                          </td>
                      </tr>
                      <tr className='all-members-list check-in-all-members-list'>
                          <td className='all-members-list-name'>
                              hello
                          </td>
                          <td className='all-members-list-phone-number'>
                              0215436516
                          </td>
                          <td className='all-members-list-date'>
                              <input type="checkbox" 
                                name=""  
                              />
                          </td>
                      </tr>
                      <tr className='all-members-list check-in-all-members-list'>
                          <td className='all-members-list-name'>
                              hello
                          </td>
                          <td className='all-members-list-phone-number'>
                              0215436516
                          </td>
                          <td className='all-members-list-date'>
                              <input type="checkbox" 
                                name=""  
                              />
                          </td>
                      </tr>
                      <tr className='all-members-list check-in-all-members-list'>
                          <td className='all-members-list-name'>
                              hello
                          </td>
                          <td className='all-members-list-phone-number'>
                              0215436516
                          </td>
                          <td className='all-members-list-date'>
                              <input type="checkbox" 
                                name=""  
                              />
                          </td>
                      </tr>
                      <tr className='all-members-list check-in-all-members-list'>
                          <td className='all-members-list-name'>
                              hello
                          </td>
                          <td className='all-members-list-phone-number'>
                              0215436516
                          </td>
                          <td className='all-members-list-date'>
                              <input type="checkbox" 
                                name=""  
                              />
                          </td>
                      </tr>
                      <tr className='all-members-list check-in-all-members-list'>
                          <td className='all-members-list-name'>
                              hello
                          </td>
                          <td className='all-members-list-phone-number'>
                              0215436516
                          </td>
                          <td className='all-members-list-date'>
                              <input type="checkbox" 
                                name=""  
                              />
                          </td>
                      </tr>
                      <tr className='all-members-list check-in-all-members-list'>
                          <td className='all-members-list-name'>
                              hello
                          </td>
                          <td className='all-members-list-phone-number'>
                              0215436516
                          </td>
                          <td className='all-members-list-date'>
                              <input type="checkbox" 
                                name=""  
                              />
                          </td>
                      </tr>
                      <tr className='all-members-list check-in-all-members-list'>
                          <td className='all-members-list-name'>
                              hello
                          </td>
                          <td className='all-members-list-phone-number'>
                              0215436516
                          </td>
                          <td className='all-members-list-date'>
                              <input type="checkbox" 
                                name=""  
                              />
                          </td>
                      </tr>
                      <tr className='all-members-list check-in-all-members-list'>
                          <td className='all-members-list-name'>
                              hello
                          </td>
                          <td className='all-members-list-phone-number'>
                              0215436516
                          </td>
                          <td className='all-members-list-date'>
                              <input type="checkbox" 
                                name=""  
                              />
                          </td>
                      </tr>
                      <tr className='all-members-list check-in-all-members-list'>
                          <td className='all-members-list-name'>
                              hello
                          </td>
                          <td className='all-members-list-phone-number'>
                              0215436516
                          </td>
                          <td className='all-members-list-date'>
                              <input type="checkbox" 
                                name=""  
                              />
                          </td>
                      </tr>
                      <tr className='all-members-list check-in-all-members-list'>
                          <td className='all-members-list-name'>
                              hello
                          </td>
                          <td className='all-members-list-phone-number'>
                              0215436516
                          </td>
                          <td className='all-members-list-date'>
                              <input type="checkbox" 
                                name=""  
                              />
                          </td>
                      </tr>
                      <tr className='all-members-list check-in-all-members-list'>
                          <td className='all-members-list-name'>
                              hello
                          </td>
                          <td className='all-members-list-phone-number'>
                              0215436516
                          </td>
                          <td className='all-members-list-date'>
                              <input type="checkbox" 
                                name=""  
                              />
                          </td>
                      </tr>
                      
                      {/* <tr key={filteredMember._id} className='all-members-list'>
                          <td>
                              {filteredMember.attendeeName}
                          </td>
                          <td className='all-members-list-phone-number'>
                              {filteredMember.attendeePhoneNumber}
                          </td>
                          <td className='all-members-list-date'>
                              { new Date(filteredMember.createdAt).toLocaleDateString()}
                          </td>
                      </tr> */}
                    </tbody>
                </table>
              </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default CheckIn;