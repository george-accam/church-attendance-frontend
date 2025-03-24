import { AiFillEdit } from "react-icons/ai"; 
import { SlOptionsVertical } from "react-icons/sl"; 
import { CgSearch } from "react-icons/cg"; 
import React, { useState, useEffect, useRef } from 'react';
import api from "../../../API/Api.js";
import { handleError, handleSuccess } from '../../../notifications/Notification';
import { ToastContainer } from 'react-toastify';
import member from './../../assets/no-member.gif';
import PersonalComponentLoader from "../../reusableComponents/PersonalComponentLoader.jsx";
import Edit from "../../reusableComponents/Edit.jsx";
import Delete from "../../reusableComponents/Delete.jsx";
import Rename from "../../reusableComponents/Rename.jsx";
import capitalizedEachWord from "./../../reusableComponents/CapitaliseEachLetter.js"
import CheckedInSearch from "../../reusableComponents/CheckedInSearch.jsx";

const Personal = ({ changeColor }) => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isDelete, setIsDelete]= useState(null);
  const [isRename, setIsRename] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const menuRefs = useRef({});
  
  // getting user data from localStorage
  const user = localStorage.getItem('admin');
  
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
      if (search.trim() === "") {
        setIsSearching(false);
      }
      setIsSearching(true);
      const response = await api.get(`search-personal-attendance/${userId}?q=${search}`);
      const { personalAttendance } = response.data;
      if (personalAttendance === null || personalAttendance.length === 0) {
        handleError("member not found");
      }
      setFilteredMembers(personalAttendance);
    } catch (error) {
      if (error.response.data.message) {
        handleError(error.response.data.message)
      }
      else if (error.request) {
        handleError(`Issue connecting to the internet ${error.request}`);
      }else{
        handleError("Search failed, please try again");
      }
    }finally{
      setIsSearching(false);
    }
  };
  // mount the personal members
  const fetchMembers = async () => {
    try {
      if (!user) {
        handleError("User not found. Please login again");
        return;
      }

      const response = await api.get(`personal-attendee/${userId}`);
      const { personalAttendance } = response.data;
      setIsLoading(true);
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

  // mount the search personal members
  useEffect(() => {
    searchPersonalMember([]);
  }, [search]);

  //  handle the click outside the edit container
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isShow !== null && menuRefs.current[isShow]) {
        if (!menuRefs.current[isShow].contains(e.target)) {
          setIsShow(false);
        }
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isShow]);

  // loading state
  if (isLoading) {
    return (
      <PersonalComponentLoader 
        header={"Personal Members"}
        className ={`${changeColor ? "dashboard-border-bottom-dark" : "dashboard-border-bottom-light"}`}
      />
  );
  }

   // handle show edit container
      const handleShowEdit = (id)=>{
          setIsShow(isShow === id ? true : id);
      } 
  
      // open the rename component
      const handleRename = (id)=>{
          setIsRename(isRename === id ? true : id);
      }
  
      // closes the rename component
      const handleCloseRename = ()=>{
          setIsRename(null);
      }
  
      // open the delete component
      const handleDelete = (id)=>{
          setIsDelete(isDelete === id ? true : id);
      }
  
      // close the delete component
      const handleCloseDelete = ()=>{
          setIsDelete(null);
      }
  
      // handle the deleted data
      const handleDeletedData = async(id)=>{
          try {
              setIsDeleting(true)
              const response =  await api.delete(`delete-personal-attendee/${id}`);
              const { message  } = response.data;
              if(message){
                  handleSuccess(message || "member deleted successfully")
              }
              setTimeout(()=>{
                fetchMembers();
                searchPersonalMember([]);
              }, 2000);
  
          } catch (error) {
              if(error.response.data){
                  handleError(error.response.data)
              }
              else if(error.request){
                  handleError(`Network error : ${error.request}`)
              }
              else{
                  handleError("Error occurred, please ty again");
              }
          }
          finally{
              setIsDeleting(false);
          }
      }
  
      // handle rename data
      const handleRenameData = async({ id, fullName, phoneNumber })=>{
          try {
              setIsRenaming(true)
              const response = await api.put(`update-personal-attendee/${id}`, { userId, attendeeName: fullName, attendeePhoneNumber: phoneNumber });
              const { message } = response.data;
              if(message){
                  handleSuccess(message || "member updated successfully")
                  setIsRename(null);
              }
              setTimeout(()=>{
                fetchMembers();
                searchPersonalMember([]);
              }, 2000);
          } 
          catch (error) {
              if (error.response.data) {
                  handleError(error.response.data)
              }
              else if(error.request) {
                  handleError(`Network error : ${error.request}`);
              }
              else {
                  handleError("An unexpected error occurred, please try again");
              }
          }
          finally{
              setIsRenaming(false);
          }
      };
      

  return (
    <div>
      <div className={`all-members-container ${changeColor ? "dashboard-border-bottom-dark" : "dashboard-border-bottom-light"}`}>
          {/* search bar */}
          <div className={`header-search-bar ${changeColor ? "dashboard-border-bottom-dark" : "dashboard-border-bottom-light"}`}>
            <h1 className='all-members-title'>Personal Members</h1>
            <div className="search-container">
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
                          <th><AiFillEdit /></th>
                      </tr>
                  </thead>
                  {/* breaks the thead from the tbody */}
                  <br />
                  {/* table body */}
                  <tbody>
                    {isSearching && (
                        <tr className='search-all-members-list'>
                            <td colSpan={4}>
                                <CheckedInSearch />
                            </td>
                        </tr>
                    )}
                    {search.length > 0 || filteredMembers > 0 ? (
                        filteredMembers.map((filteredMember) => (
                          <tr key={filteredMember._id} 
                            className={`all-members-list personal-members-list ${isRename === member._id ? 'update-table' : isDelete === member._id ? 'delete-table' : ''}`}
                            >
                                  <td>
                                      {filteredMember.attendeeName}
                                  </td>
                                  <td className='all-members-list-phone-number'>
                                      {filteredMember.attendeePhoneNumber}
                                  </td>
                                  <td className='all-members-list-date'>
                                      { new Date(filteredMember.createdAt).toLocaleDateString("en-GB")}
                                  </td>
                                  {/* edit table data */}
                                  <td className='all-members-list-date edit-button'>
                                    <div 
                                        key={member._id}
                                        ref={(el) => (menuRefs.current[member._id] = el)}
                                        role="menu"
                                        className={`edit-parent-container ${isShow === member._id ? "edit-button-color" : ""}`}
                                    >
                                      <SlOptionsVertical
                                          className="edit-button"
                                          onClick={()=> handleShowEdit(member._id)}
                                      />
                                        { isShow === member._id && (
                                            <div 
                                                className="" 
                                                role="none"
                                            >
                                              <Edit
                                                  member={member}
                                                  handleRename={()=> {
                                                      handleRename(member._id);
                                                      handleShowEdit(member._id);
                                                  }}
                                                  handleDelete={()=> {
                                                      handleDelete(member._id);
                                                      handleShowEdit(member.id);
                                                  }}
                                              />
                                            </div>
                                        )}
                                        { isRename === member._id && ( 
                                            <Rename 
                                              memberId={filteredMember._id}
                                              memberName={filteredMember.attendeeName}
                                              memberPhoneNumber={filteredMember.attendeePhoneNumber}
                                              isRenaming={isRenaming}
                                              handleCloseRename={handleCloseRename}
                                              handleRenameData={handleRenameData}
                                            />
                                        )}
                                        {isDelete === member._id && (
                                            <Delete 
                                                member={member}
                                                isDeleting={isDeleting}
                                                handleCloseDelete={handleCloseDelete}
                                                handleDeletedData={()=> {
                                                    handleDeletedData(member._id);
                                                }}
                                            />
                                        )}
                                    </div>
                                </td>
                          </tr>
                        ))
                      ) : (
                          members.length > 0 ?  ( members.map((member) => (
                              <tr key={member._id} 
                              className={`all-members-list ${isRename === member._id ? 'update-table' : isDelete === member._id ? 'delete-table' : ''}`}
                              >
                                  <td>
                                      {capitalizedEachWord(member.attendeeName)}
                                  </td>
                                  <td className='all-members-list-phone-number'>
                                      {member.attendeePhoneNumber}
                                  </td>
                                  <td className='all-members-list-date'>
                                      { new Date(member.createdAt).toLocaleDateString("en-GB")}
                                  </td>
                                  {/* edit table data */}
                                  <td className='all-members-list-date edit-button'>
                                    <div 
                                        key={member._id}
                                        ref={(el) => (menuRefs.current[member._id] = el)}
                                        role="menu"
                                        className={`edit-parent-container ${isShow === member._id ? "edit-button-color" : ""}`}
                                    >
                                      <SlOptionsVertical
                                          className="edit-button"
                                          onClick={()=> handleShowEdit(member._id)}
                                      />
                                        { isShow === member._id && (
                                            <div 
                                                className="" 
                                                role="none"
                                            >
                                              <Edit
                                                  member={member}
                                                  handleRename={()=> {
                                                      handleRename(member._id);
                                                      handleShowEdit(member._id);
                                                  }}
                                                  handleDelete={()=> {
                                                      handleDelete(member._id);
                                                      handleShowEdit(member.id);
                                                  }}
                                              />
                                            </div>
                                        )}
                                        { isRename === member._id && ( 
                                            <Rename 
                                              memberId={member._id}
                                              memberName={member.attendeeName}
                                              memberPhoneNumber={member.attendeePhoneNumber}
                                              isRenaming={isRenaming}
                                              handleCloseRename={handleCloseRename}
                                              handleRenameData={handleRenameData}
                                            />
                                        )}
                                        {isDelete === member._id && (
                                            <Delete 
                                                member={member}
                                                isDeleting={isDeleting}
                                                handleCloseDelete={handleCloseDelete}
                                                handleDeletedData={()=> {
                                                    handleDeletedData(member._id);
                                                }}
                                            />
                                        )}
                                    </div>
                                </td>
                              </tr>
                          ))
                      ): (
                          <tr className='no-members'>
                            <td colSpan={4}>
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