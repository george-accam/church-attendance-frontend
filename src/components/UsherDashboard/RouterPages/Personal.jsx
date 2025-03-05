import { CgSearch } from "react-icons/cg"; 
import React, { useState, useEffect } from 'react';
import api from "../../../API/Api.js";
import { handleError, handleSuccess } from '../../../notifications/Notification';
import { ToastContainer } from 'react-toastify';
import member from './../../assets/no-member.gif';
import PersonalComponentLoader from "../../reusableComponents/PersonalComponentLoader.jsx";
import capitalizeWords from "../../reusableComponents/CapitaliseEachLetter.js";

const Personal = ({ changeColor }) => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  
  // getting user data from localStorage
  const user = localStorage.getItem('usher');
  
  const passedUser = JSON.parse(user);
  const userId = passedUser._id ;
  // validate user id
  const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(userId);
  if (!isValidObjectId) {
    handleError("Invalid User ID format");
    return;
  }

  // handle onchange
  const handleSearch = (e)=>{
    setSearch(e.target.value)
  }

  const searchPersonalMember = async()=>{
    try {
      const response = await api.get(`search-personal-attendance/${userId}?q=${search}`);
      setIsLoading(true);
      const { personalAttendance } = response.data;
      if (personalAttendance === null || personalAttendance.length === 0) {
        handleError("member not found");
      }
      setFilteredMembers(personalAttendance);

    } catch (error) {
      if (error.response.data) {
        handleError(error.response.data)
      }
      else if (error.request) {
        handleError(`Issue connecting to the internet ${error.request}`);
      }else{
        handleError("Search failed, please try again");
      }
    }finally{
      setIsLoading(false);
    }
  };
  // retrieve the data
  const fetchMembers = async () => {
    try {
      if (!user) {
        handleError("User not found. Please login again");
        return;
      }

      const response = await api.get(`personal-attendee/${userId}`);
      setIsLoading(true);
      const { personalAttendance } = response.data;
      if (personalAttendance === null || personalAttendance.length === 0) {
        handleError("member not found");
      }
      setMembers(personalAttendance);
    } catch (error) {
      if (error.response.data) {
        handleError(error.response.data);
      } else if (error.request) {
        handleError("Error connecting to the server. Please check your internet connection", + error.request);
      } else {
        handleError("An error occurred. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchMembers();
    searchPersonalMember([]);
  }, [search]);

  // loading state
  if (isLoading) {
    return (
      <PersonalComponentLoader 
      header={"Personal Members"}
      className ={`${changeColor ? "dashboard-border-bottom-dark" : "dashboard-border-bottom-light"}`}
      />
  );
  }

  // allows the enter key
  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchPersonalMember();
    }
  }

  return (
    <div>
      <div className={`all-members-container ${changeColor ? "dashboard-border-bottom-dark" : "dashboard-border-bottom-light"}`}>
          {/* search bar */}
          <div className={`header-search-bar ${changeColor ? "dashboard-border-bottom-dark" : "dashboard-border-bottom-light"}`}>
            <h1 className='all-members-title'>Personal Members</h1>
            <div 
              tabIndex={0}
              onKeyDown={handleKeydown}
              role="button"
              className="search-container">
              <input type="text"
              placeholder='search members'
              value={search}
              onChange={handleSearch}
              />
              <CgSearch className="search-icon"
                onClick={searchPersonalMember}
              />
            </div>
          </div>
          <div className="">
              <table className='all-members-content'>
                  {/* table header */}
                  <thead>
                      <tr className='all-members-list-header personal-members-list-header'>
                          <th>Full Name</th>
                          <th>Phone Number</th>
                          <th>Date</th>
                      </tr>
                  </thead>
                  {/* breaks the thead from the tbody */}
                  <br />
                  {/* table body */}
                  <tbody>
                    {search.length > 0 || filteredMembers > 0 ? (
                        filteredMembers.map((filteredMember) => (
                          <tr key={filteredMember._id} className='all-members-list'>
                                  <td>
                                      {capitalizeWords(filteredMember.attendeeName)}
                                  </td>
                                  <td className='all-members-list-phone-number'>
                                      {filteredMember.attendeePhoneNumber}
                                  </td>
                                  <td className='all-members-list-date'>
                                  { new Date(filteredMember.createdAt).toLocaleDateString("en-GB") }
                                  </td>
                          </tr>
                        ))
                      ) : (
                          members.length > 0 ?  ( members.map((member) => (
                              <tr key={member._id} className='all-members-list'>
                                  <td>
                                      {capitalizeWords(member.attendeeName)}
                                  </td>
                                  <td className='all-members-list-phone-number'>
                                      {member.attendeePhoneNumber}
                                  </td>
                                  <td className='all-members-list-date'>
                                  { new Date(member.createdAt).toLocaleDateString("en-GB") }
                                  </td>
                              </tr>
                          ))
                      ): (
                          <tr className='no-members'>
                            <td colSpan={3}>
                              <img src={member} alt="👽" />
                              <p>No members registered yet</p>
                            </td>
                          </tr>
                      )
                      )}
                  </tbody>
              </table>
          </div>
      </div>
      <p className='number-of-members number-of-personal-members'>
          <span className='ping-effect personal-ping-effect'></span>
          Nº of members you registered : {members && members.length > 0 ? members.length : 0}
      </p>
      <ToastContainer />
    </div>
  )
}

export default Personal;