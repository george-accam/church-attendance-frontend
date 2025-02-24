import { AiFillEdit } from "react-icons/ai"; 
import { SlOptionsVertical } from "react-icons/sl"; 
import { CgSearch } from "react-icons/cg"; 
import React, { useState, useEffect } from 'react';
import api from "../../../API/Api.js";
import { handleError, handleSuccess } from '../../../notifications/Notification';
import { ToastContainer } from 'react-toastify';
import member from './../../assets/no-member.gif';
import PersonalComponentLoader from "../../reusableComponents/PersonalComponentLoader.jsx";
import Edit from "../../reusableComponents/Edit.jsx";
import Delete from "../../reusableComponents/Delete.jsx";
import capitalizedEachWord from "./../../reusableComponents/CapitaliseEachLetter.js"
import Rename from "../../reusableComponents/Rename.jsx";

const Ushers = ({ changeColor }) => {
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

  // handle search
  const handleSearch = (e)=>{
    setSearch(e.target.value)
  }

  const searchPersonalMember = async()=>{
      try {
        if (search.trim() === "") {
          setIsSearching(false);
        }
        setIsSearching(true);
        const response = await api.get(`search-users?q=${search}`);
        const { allUsers } = response.data;
        if (allUsers === null || allUsers.length === 0) {
          handleError("member not found");
        }
        setFilteredMembers(allUsers);
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
        setIsSearching(false);
      }
    };
    // mount the search personal members
      useEffect(() => {
        searchPersonalMember([]);
      }, [search]);

  // retrieve the data
  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`users`);
      const { allUsers } = response.data;
      const ushers = allUsers.filter((user) => user.role === "Usher");

      setMembers(ushers);
    } 
    catch (error) {
      if (error.response.data) {
        handleError(error.response.data);
      } else if (error.request) {
        handleError("Error connecting to the server. Please check your internet connection", + error.request);
      } else {
        handleError("An error occurred. Please try again");
      }
    } 
    finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchMembers();
  }, []);

    // loading state
  if (isLoading) {
    return (
        <PersonalComponentLoader 
          header={"Ushers Registered"}
          bgColor={"rgb(0, 153, 255)"}
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
            const response =  await api.delete(`delete-user/${id}`);
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
            const response = await api.put(`update-user/${id}`, { fullName, phoneNumber });
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
            <h1 className='all-members-title'>Ushers Registered</h1>
            <div className="search-container">
              <input type="text"
              placeholder='search ushers'
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
                      <tr className='all-members-list-header ushers-members-list-header'>
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
                                searching.......
                            </td>
                        </tr>
                    )}
                    {search.length > 0 || filteredMembers > 0 ? (
                        filteredMembers.map((filteredMember) => (
                          <tr key={filteredMember._id} 
                            className={`all-members-list ${isRename === filteredMember._id ? 'update-table' : isDelete === filteredMember._id ? 'delete-table' : ''}`}
                          >
                              <td>
                                  {filteredMember.fullName}
                              </td>
                              <td className='all-members-list-phone-number'>
                                  {filteredMember.phoneNumber}
                              </td>
                              <td className='all-members-list-date'>
                                  { new Date(filteredMember.createdAt).toLocaleDateString("en-GB")}
                              </td>
                              {/* edit table data */}
                              <td className='all-members-list-date edit-button'>
                                    <div 
                                        key={filteredMember._id}
                                        // ref={menuRef}
                                        role="menu"
                                        className={`edit-parent-container ${isShow === filteredMember._id ? "edit-button-color" : ""}`}
                                    >
                                      <SlOptionsVertical
                                          className="edit-button"
                                          onClick={()=> handleShowEdit(filteredMember._id)}
                                      />
                                        { isShow === filteredMember._id && (
                                            <div 
                                                className="" 
                                                role="none"
                                            >
                                              <Edit
                                                  member={filteredMember}
                                                  handleRename={()=> {
                                                      handleRename(filteredMember._id);
                                                      handleShowEdit(filteredMember._id);
                                                  }}
                                                  handleDelete={()=> {
                                                      handleDelete(filteredMember._id);
                                                      handleShowEdit(filteredMember.id);
                                                  }}
                                              />
                                            </div>
                                        )}
                                        { isRename === filteredMember._id && ( 
                                            <Rename 
                                              memberId={filteredMember._id}
                                              memberName={filteredMember.fullName}
                                              memberPhoneNumber={filteredMember.phoneNumber}
                                              isRenaming={isRenaming}
                                              handleCloseRename={handleCloseRename}
                                              handleRenameData={handleRenameData}
                                            />
                                        )}
                                        {isDelete === filteredMember._id && (
                                            <Delete 
                                                member={filteredMember}
                                                isDeleting={isDeleting}
                                                handleCloseDelete={handleCloseDelete}
                                                handleDeletedData={()=> {
                                                    handleDeletedData(filteredMember._id);
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
                                      {capitalizedEachWord(member.fullName)}
                                  </td>
                                  <td className='all-members-list-phone-number'>
                                      {member.phoneNumber}
                                  </td>
                                  <td className='all-members-list-date'>
                                      { new Date(member.createdAt).toLocaleDateString("en-GB")}
                                  </td>
                                  {/* edit table data */}
                                  <td className='all-members-list-date edit-button'>
                                    <div 
                                        key={member._id}
                                        // ref={menuRef}
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
                                              memberName={member.fullName}
                                              memberPhoneNumber={member.phoneNumber}
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
                              <p>No ushers available yet</p>
                            </td>
                          </tr>
                      )
                      )}
                  </tbody>
              </table>
          </div>
      </div>
      <p className='number-of-members number-of-personal-members'>
          <span className='ping-effect ushers-ping-effect'></span>
          Number of ushers registered : {members && members.length > 0 ? members.length : 0}
      </p>
      <ToastContainer />
    </div>
  )
}

export default Ushers;