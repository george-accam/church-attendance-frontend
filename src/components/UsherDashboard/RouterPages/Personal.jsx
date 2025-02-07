import React, { useState, useEffect } from 'react';
import api from "../../../API/Api.js";
import { handleError } from '../../../notifications/Notification';
import { ToastContainer } from 'react-toastify';
import member from './../../assets/member.svg';

const Personal = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      const user = localStorage.getItem('user');
      if (!user) {
        handleError("User not found. Please login again");
        return;
      }
      const passedUser = JSON.parse(user);
      const userId = passedUser._id ;

      // validate user id
      const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(userId);
      if (!isValidObjectId) {
        handleError("Invalid User ID format");
        return;
      }

      const response = await api.get(`personal-attendee/${userId}`);
      setIsLoading(true);
      const { personalAttendance } = response.data;
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
  }, []);

  // loading state
  if (isLoading) {
    return (
      <div className="member-loading-container">
        <div className="all-members-container">
          <h1 className='all-members-title'>Personal Members</h1>
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
                  <tr className='loading-members member-card'>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr className='loading-members member-card'>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr className='loading-members member-card'>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
              </table>
          </div>
        </div>
        <p className='number-of-members loading-number-of-members'>
          <span className='ping-effect'></span>
          <p></p>
        </p>
      </div>
  );
  }

  return (
    <div>
      <div className="all-members-container">
          <h1 className='all-members-title'>Personal Members</h1>
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
                  {/* table body */}
                  <tbody>
                          {members && members.length > 0 ?  ( members.map((member) => (
                              <tr key={member._id} className='all-members-list'>
                                  <td>
                                      {member.attendeeName}
                                  </td>
                                  <td className='all-members-list-phone-number'>
                                      {member.attendeePhoneNumber}
                                  </td>
                                  <td className='all-members-list-date'>
                                      { new Date(member.createdAt).toLocaleDateString()}
                                  </td>
                              </tr>
                          ))
                      ): (
                          <tr className='no-members'>
                            <td>
                              <img src={member} alt="" />
                              <p>No members available yet</p>
                            </td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>
      </div>
      <p className='number-of-members number-of-personal-members'>
          <span className='ping-effect personal-ping-effect'></span>
          Number of members you registered : {members && members.length > 0 ? members.length : 0}
      </p>
      <ToastContainer />
    </div>
  )
}

export default Personal;