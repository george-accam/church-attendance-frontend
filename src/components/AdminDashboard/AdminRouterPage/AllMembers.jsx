import { AiFillEdit } from "react-icons/ai"; 
import { SlOptionsVertical } from "react-icons/sl"; 
import { CgSearch } from "react-icons/cg"; 
import React, { useEffect, useRef, useState } from 'react';
import api from "../../../API/Api.js";
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../../notifications/Notification.js';
import member from './../../assets/no-member.gif';
import SubComponentLoader from "../../reusableComponents/SubComponentLoader.jsx";
import Edit from "../../reusableComponents/Edit.jsx";
import CapitaliseEachLetter from "../../reusableComponents/CapitaliseEachLetter.js"
import Rename from "../../reusableComponents/Rename.jsx";
import Delete from "../../reusableComponents/Delete.jsx";
import CheckedInSearch from "../../reusableComponents/CheckedInSearch.jsx";
import capitalizeWords from "../../reusableComponents/CapitaliseEachLetter.js";


const AllMembers = ({ changeColor }) => {
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [search, setSearch] = useState("");
    const [isShow, setIsShow] = useState(false);
    const [isDelete, setIsDelete]= useState(null);
    const [isRename, setIsRename] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false);
    const menuRefs = useRef({});

    // search members input
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };


    // search members function
    const searchMembers = async() => {
        try {
            if(search.trim() === ""){
                setFilteredMembers([]);
                return;
            }

            setIsSearching(true);
            const response = await api.get(`search-attendee?q=${search}`);
            const { attendee } = response.data;
            if (attendee === null || attendee.length === 0) {
                handleError("member not found");
            }
            setFilteredMembers(attendee);

        } catch (error) {
            if (error.response.data) {
                handleError(error.response.data);
            } else if (error.request) {
                handleError("Error connecting to the server. Please check your internet connection", + error.request);
            } else {
                handleError("An error occurred. Please try again");
            }
        } finally {
            setIsSearching(false);
        }
    };

    // fetch all members
    const fetchAllMembers = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/attendees');
            const { attendance } = response.data;
            // set members
            setMembers(attendance);

        } catch (error) {
            if (error.response.data) {
                handleError(error.response.data);
            }
            else if (error.request) {
                handleError("Error connecting to the server. Please check your internet connection", + error.request);
            }
            else {
                handleError("An error occurred. Please try again");
            }
        }finally{
            setIsLoading(false);
        }
    };

    // fetch all members on component mount
    useEffect(() => {
        fetchAllMembers();
    }, []);
    
    // fetch search members on component mount
    useEffect(() => {
        searchMembers();
    }, [search]);

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
            <SubComponentLoader 
                changes={"Registrars"}
                className ={`${changeColor ? "dashboard-border-bottom-dark" : "dashboard-border-bottom-light"}`}
            />
        )
        
    }

    // handle the enter key press
    const handleEnter = (e)=>{
        if(e.key === "Enter"){
            e.preventDefault();
            searchMembers();
        }
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
            const response =  await api.delete(`delete-attendance/${id}`);
            const { message  } = response.data;
            if(message){
                handleSuccess(message || "member deleted successfully")
            }
            setTimeout(()=>{
                fetchAllMembers();
                searchMembers();
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
            const response = await api.put(`update-attendance/${id}`, {fullName, phoneNumber});
            const { message } = response.data;
            if(message){
                handleSuccess(message || "member updated successfully")
                setIsRename(null);
            }
            setTimeout(()=>{
                fetchAllMembers();
                searchMembers();
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
                {/* the search container */}
                <div className={`header-search-bar ${changeColor ? "dashboard-border-bottom-dark" : "dashboard-border-bottom-light"}`}>
                    <h1 className='all-members-title'>All Members</h1>
                    <div 
                        tabIndex={0}
                        onKeyDown={handleEnter}
                        className="search-container"
                    >
                        <input type="text"
                            placeholder='search members'
                            value={search}
                            onChange={handleSearch}
                        />
                        <CgSearch className="search-icon"
                            onClick={searchMembers}
                        />
                    </div>
                </div>
                <div className="">
                    <table className='all-members-content'>
                        {/* table header */}
                        <thead>
                            <tr className='all-members-list-header'>
                                <th>Full Name</th>
                                <th>Phone Number</th>
                                <th>Registrars</th>
                                <th><AiFillEdit /></th>
                            </tr>
                        </thead>
                        {/* breaks the thead from the tbody */}
                        <br />
                        {/* table body */}
                        <tbody>
                            {/* search container */}
                            {isSearching && (
                                <tr className='search-all-members-list'>
                                    <td colSpan={4}>
                                        <CheckedInSearch />
                                    </td>
                                </tr>
                            )}
                            {search.length > 0 && filteredMembers.length > 0 ? (
                                filteredMembers.map(filteredMember =>(
                                    <tr key={filteredMember._id} 
                                        className={`all-members-list ${isRename === filteredMember._id ? 'update-table' : isDelete === filteredMember._id ? 'delete-table' : ''}`}
                                    >
                                        <td className='all-members-list-name'>
                                            {CapitaliseEachLetter(filteredMember.fullName)}
                                        </td>
                                        
                                        <td className='all-members-list-phone-number'>
                                            {filteredMember.phoneNumber}
                                        </td>
                                        <td className='all-members-list-date'>
                                            {capitalizeWords(filteredMember.userFullName) }
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
                                members && members.length > 0 ?  ( members.map((member) => (
                                    <tr key={member._id} 
                                        className={`all-members-list ${isRename === member._id ? 'update-table' : isDelete === member._id ? 'delete-table' : ''}`}
                                    >
                                        <td className='all-members-list-name'>
                                            {CapitaliseEachLetter(member.fullName)}
                                        </td>
                                        
                                        <td className='all-members-list-phone-number'>
                                            {member.phoneNumber}
                                        </td>
                                        <td className='all-members-list-date'>
                                            { capitalizeWords(member.userFullName) }
                                        </td>
                                        {/* edit table data */}
                                        <td className='all-members-list-date edit-button'>
                                            <div 
                                                key={member._id}
                                                role="menu"
                                                className={`edit-parent-container ${isShow === member._id ? "edit-button-color" : ""}`}
                                                >
                                            <SlOptionsVertical
                                                className="edit-button"
                                                onClick={()=> handleShowEdit(member._id)}
                                                />
                                                { isShow === member._id && (
                                                    <div 
                                                        ref={(el) => (menuRefs.current[member._id] = el)}
                                                        className="" 
                                                        role="none"
                                                    >
                                                        <Edit
                                                            memberId={member._id}
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
                                            </div>
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
                                        </td>
                                    </tr>
                                ))
                            ): (
                                <tr className='no-members'>
                                    <td colSpan={4}>
                                    <img src={member} alt="👽" />
                                        <p>No members available yet</p>
                                    </td>
                                </tr>
                            )
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
                <p className='number-of-members'>
                    <span className='ping-effect'></span>
                    Nº of members registered : 
                    {
                        members &&
                        members.length > 0 ?
                        members.length : 0 
                    }
                </p>
            <ToastContainer />
        </div>
    )
}

export default AllMembers;