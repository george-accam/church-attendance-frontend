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
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [member, setMember] = useState([]);


  // handle the input value
  const handleInputChange = (e) => {
    setPhoneNumber(e.target.value);
  }

  // submit the check in data
  const handleOnSubmit = async(telephoneNumber) => {
    try {
      const response = await Api.post("check-in", { phoneNumber: telephoneNumber});
      const { message } = response.data;
      if (message) {
        setIsLoading(true);
        handleSuccess(message);
      }
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


  // handle the search members
  const handleFetchSearch = async()=>{
    try {
      const response = await Api.get(`search-attendee?q=${phoneNumber}`)
      const { attendee } = response.data;
      setIsLoading(true)
      setFilteredMembers(attendee);

    } catch (error) {
      if (error.response.data) {
        handleError(error.response.data);

      }else if(error.request){
        handleError("Error connecting to the server. Please check your internet connection", + error.request);

      }else{
        handleError("An error occurred. Please try again");

      }
    }finally{
      setIsLoading(false);
    }
  }

  // get all members
  const getMembers = async () => {
    try {
      const response = await Api.get("/members");
      const { data } = response.data;
      setMember(data);
      setFilteredMember(data);
      } catch (error) {
        handleError("Error fetching members");
    }
  };
  useEffect(()=>{
    Aos.init({
      duration: 300,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
    handleFetchSearch();
  }, [])


  return (
    <div>
      <div className="container-background usher-register-container">
        <div className="outer-container"
          data-aos="fade-up"
        >
          <div className="inner-container usher-check-in-inner-container">
              <div 
                className='check-in-form'
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
                    onClick={handleFetchSearch}
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
              </div>
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
                    <br />

                    <tbody>
                      {filteredMembers === null || filteredMembers.length === 0 ? (
                        <tr className='check-in-all-members-list check-in-search-no-members'>
                          <td colSpan="3">No members found yet</td>
                        </tr>
                      ) : (
                        filteredMembers.map((filteredMember)=> (
                          <tr key={filteredMember._id} className='all-members-list check-in-all-members-list'>
                              <td className='all-members-list-name'>
                                  {filteredMember.fullName}
                              </td>
                              <td className='all-members-list-phone-number'>
                                  {filteredMember.phoneNumber}
                              </td>
                              <td className='all-members-list-date'>
                                  <input 
                                    class="checkbox" 
                                    type="checkbox"
                                    onClick={()=> handleOnSubmit(filteredMember.phoneNumber)} 
                                  />
                              </td>
                          </tr>
                        ))
                      )}
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