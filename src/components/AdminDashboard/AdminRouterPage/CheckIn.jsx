import { CgClose } from "react-icons/cg"; 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { handleSuccess, handleError } from '../../../notifications/Notification';
import Api from "../../../API/Api";
import { ToastContainer } from 'react-toastify';
import Aos from 'aos';
import 'aos/dist/aos.css';
import capitalizeWords from '../../reusableComponents/CapitaliseEachLetter';
import SubmissionLoader from '../../reusableComponents/SubmissionLoader';

const CheckIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [checkedMembers, setCheckedMembers] = useState([]);

  // handles the check changes
  const handleChecked = (e, memberId)=>{
    const isChecked = e.target.checked;
    setCheckedMembers((prev) => 
      isChecked
        ? [...prev, memberId]
        : prev.filter((id) => id !== memberId)
    );
  };

  // handle the input value
  const handleInputChange = (e) => {
    setPhoneNumber(e.target.value.replace(/\s+/g, ""));
  };

  // submit the check in data
  const handleOnSubmit = async(telephoneNumber, memberId) => {
    try {
      const response = await Api.post("check-in", { phoneNumber: telephoneNumber});
      const { message } = response.data;
      if (message) {
        handleSuccess(message);
        setPhoneNumber("");
      }
      
    } catch (error) {
      setCheckedMembers([])
      if (error.response.data.message) {
        handleError(`Check in failed: ${error.response.data.message} `)
      } else if (error.request) {
        handleError("Error connecting to the server. Please check your internet connection", + error.request);
      }else {
        handleError("An error occurred. Please try again");
      }
      
    }
  };


  // handle the search members
  const handleFetchSearch = async(e)=>{
    e.preventDefault();
    try {
      if(phoneNumber.length !== 10) {
        handleError("Phone number must be exactly 10 digits long.");
        return;
      }
      // set loading to true
      setIsSearching(true)
      const response = await Api.get(`search-attendee?q=${phoneNumber}`)
      const { message, attendee } = response.data;
      if (attendee === null || attendee.length === 0) {
        handleError("member not found");
        return;
      }

      if (message) {
        setFilteredMembers(attendee);
      }

    } catch (error) {
      if (error.response.data.message) {
        handleError(error.response.data.message);

      }else if(error.request){
        handleError("Error connecting to the server. Please check your internet connection", + error.request);

      }else{
        handleError("An error occurred. Please try again");

      }
    }finally{
      // set loading to false
      setIsSearching(false);
    }
  };

  // the aos effect
  useEffect(()=>{
    Aos.init({
      duration: 300,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
    handleFetchSearch();
  }, []);

  const handleClear = ()=>{
    setPhoneNumber("")
  }

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
                <form onSubmit={handleFetchSearch}>
                  <div 
                    // tabIndex={0}
                    // onKeyDown={handleEnter}
                    className="form-group"
                  >
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
                    {phoneNumber.length > 0 && (
                      <div 
                        className="clear-text-container"
                        onClick={handleClear}
                      >
                        <CgClose className="clear-text" />
                      </div>
                    )}
                  </div>
                  <div className="button-container">
                      <button 
                        type="submit"
                        // onClick={handleFetchSearch}
                        disabled={isSearching}
                        className={`submit-button ${isSearching ? "button-loading" : ""}`}
                      >
                        {isSearching ? (
                          <div className="login-button-content-container">
                            <div className="login-button-content">
                                <SubmissionLoader />
                                <p>searching</p>
                            </div>
                          </div>
                        )
                        : "search"
                        }
                      </button>
                      <div className="login-link-container">
                          Want to register member ?
                          <Link to="/admin-dashboard/register-member" className="login-link check-in-register-member">
                            register
                          </Link>
                      </div>
                  </div>
                </form>
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

                    <tbody>
                      {filteredMembers === null || filteredMembers.length === 0 ? (
                        <tr 
                          data-aos="fade-up"
                          className='check-in-all-members-list check-in-search-no-members'
                        >
                          <td colSpan="3">No member found</td>
                        </tr>
                      ) : (
                        filteredMembers.map((filteredMember)=> (
                          <tr 
                            key={filteredMember._id} 
                            data-aos="fade-up"
                            className='all-members-list check-in-all-members-list'
                          >
                              <td className='all-members-list-name'>
                                  { capitalizeWords(filteredMember.fullName)}
                              </td>
                              <td className='all-members-list-phone-number'>
                                  {filteredMember.phoneNumber}
                              </td>
                              <td className='all-members-list-date'>
                                <input 
                                  class={`checkbox ${checkedMembers.includes(filteredMember._id) ? "is-checked": ""}`}
                                  type="checkbox"
                                  checked={checkedMembers.includes(filteredMember._id)}
                                  disabled={checkedMembers.includes(filteredMember._id)}
                                  onChange={(e)=> handleChecked(e, filteredMember._id)}
                                  onClick={()=> handleOnSubmit(filteredMember.phoneNumber, filteredMember._id)} 
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