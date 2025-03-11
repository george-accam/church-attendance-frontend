import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { handleSuccess, handleError } from '../../../notifications/Notification';
import Api from "../../../API/Api";
import { ToastContainer } from 'react-toastify';
import Aos from 'aos';
import 'aos/dist/aos.css';
import capitalizeWords from '../../reusableComponents/CapitaliseEachLetter';

const CheckIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [checkedMembers, setCheckedMembers] = useState([]);

  // Handle checkbox changes
  const handleChecked = (e, memberId) => {
    const isChecked = e.target.checked;

    setCheckedMembers((prev) =>
      isChecked
        ? [...prev, memberId] // Add memberId to the list
        : prev.filter((id) => id !== memberId) // Remove memberId from the list
    );
  };

  // Handle input value
  const handleInputChange = (e) => {
    setPhoneNumber(e.target.value.replace(/\s+/g, ""));
  };

  // Submit check-in data
  const handleOnSubmit = async (telephoneNumber, memberId) => {
    try {
      const response = await Api.post("check-in", { phoneNumber: telephoneNumber });
      const { message } = response.data;
      if (message) {
        handleSuccess(message);
      }
      setPhoneNumber("");

      // Remove the member from checkedMembers after successful submission
      setCheckedMembers((prev) => prev.filter((id) => id !== memberId));
    } catch (error) {
      if (error.response.data) {
        handleError(`Check in failed: ${error.response.data.message}`);
      } else if (error.request) {
        handleError("Error connecting to the server. Please check your internet connection");
      } else {
        handleError("An error occurred. Please try again");
      }
    }
  };

  // Handle search members
  const handleFetchSearch = async (e) => {
    e.preventDefault();
    try {
      setIsSearching(true);
      const response = await Api.get(`search-attendee?q=${phoneNumber}`);
      const { message, attendee } = response.data;
      if (attendee === null || attendee.length === 0) {
        handleError("Member not found");
        return;
      }

      if (attendee !== null || attendee.length !== 0) {
        handleSuccess(message);
        setFilteredMembers(attendee);
      }
    } catch (error) {
      if (error.response.data) {
        handleError(error.response.data);
      } else if (error.request) {
        handleError("Error connecting to the server. Please check your internet connection");
      } else {
        handleError("An error occurred. Please try again");
      }
    } finally {
      setIsSearching(false);
    }
  };

  // Initialize AOS
  useEffect(() => {
    Aos.init({
      duration: 300,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
    handleFetchSearch();
  }, []);

  return (
    <div>
      <div className="container-background usher-register-container">
        <div className="outer-container" data-aos="fade-up">
          <div className="inner-container usher-check-in-inner-container">
            <div className='check-in-form'>
              <h1 className='container-header'>Check In Member</h1>
              <div className="form-group">
                <label htmlFor="fullName">Phone number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter phone number"
                />
              </div>
              <div className="button-container">
                <button
                  type="submit"
                  onClick={handleFetchSearch}
                  disabled={isSearching}
                  className={`submit-button ${isSearching ? "button-loading" : ""}`}
                >
                  {isSearching ? "Searching" : "Search"}
                </button>
                <div className="login-link-container">
                  Want to register member?
                  <Link to="/usher-dashboard/register-member" className="login-link check-in-register-member">
                    Register
                  </Link>
                </div>
              </div>
            </div>
            {/* Members table */}
            <div className="check-in-all-members-content">
              <table className='all-members-content'>
                {/* Table header */}
                <thead>
                  <tr className='all-members-list-header personal-members-list-header'>
                    <th>Full Name</th>
                    <th>Phone Number</th>
                    <th>Check In</th>
                  </tr>
                </thead>
                {/* Breaks the thead from the tbody */}
                <br />
                <tbody>
                  {filteredMembers === null || filteredMembers.length === 0 ? (
                    <tr data-aos="fade-up" className='check-in-all-members-list check-in-search-no-members'>
                      <td colSpan="3">No member found</td>
                    </tr>
                  ) : (
                    filteredMembers.map((filteredMember) => (
                      <tr
                        key={filteredMember._id}
                        data-aos="fade-up"
                        className='all-members-list check-in-all-members-list'
                      >
                        <td className='all-members-list-name'>
                          {capitalizeWords(filteredMember.fullName)}
                        </td>
                        <td className='all-members-list-phone-number'>
                          {filteredMember.phoneNumber}
                        </td>
                        <td className='all-members-list-date'>
                          <input
                            className={`checkbox ${checkedMembers.includes(filteredMember._id) ? "is-checked" : ""}`}
                            type="checkbox"
                            checked={checkedMembers.includes(filteredMember._id)}
                            disabled={checkedMembers.includes(filteredMember._id)}
                            onChange={(e) => handleChecked(e, filteredMember._id)}
                            onClick={() => handleOnSubmit(filteredMember.phoneNumber, filteredMember._id)}
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
  );
};

export default CheckIn;