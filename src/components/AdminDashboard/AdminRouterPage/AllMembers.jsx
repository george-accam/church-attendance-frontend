import { SlOptionsVertical } from "react-icons/sl"; 
import { AiTwotoneEdit } from "react-icons/ai"; 
import { CgSearch } from "react-icons/cg"; 
import React, { useEffect, useRef, useState } from 'react';
import api from "../../../API/Api.js";
import { ToastContainer } from 'react-toastify';
import { handleError } from '../../../notifications/Notification.js';
import member from './../../assets/no-member.gif';
import SubComponentLoader from "../../reusableComponents/SubComponentLoader.jsx";
import Edit from "../../reusableComponents/Edit.jsx";
import CapitaliseEachLetter from "../../reusableComponents/CapitaliseEachLetter.js"
import Rename from "../../reusableComponents/Rename.jsx";


const AllMembers = () => {
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [search, setSearch] = useState("");
    const [isShow, setIsShow] = useState(false);
    const [isDelete, setIsDelete]= useState(null);
    const [isRename, setIsRename] = useState(null);
    const menuRef = useRef(null);

    // search members
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
            const response = await api.get('/attendees');
            setIsLoading(true);
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
        searchMembers();
    }, [search]);
    
    // loading state
    if (isLoading) {
        return (
            <SubComponentLoader 
            changes={"Registrars"}
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

    useEffect(()=>{
        const handleClickOutside = (e)=>{
            if(menuRef.current && 
                !menuRef.current.contains(e.target) && 
            !e.target.closest('.rename-container-outer')){
                setIsShow(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    // handle the rename member
    const handleRename = (id)=>{
        setIsRename(id);
        console.log(id);
        
    }
    const handleCloseRename = ()=>{
        setIsRename(null);
    }

    return (
        <div>
            <div className="all-members-container">
                {/* the search container */}
                <div className="header-search-bar">
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
                                <th><AiTwotoneEdit /></th>
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
                                        searching.......
                                    </td>
                                </tr>
                            )}
                            {search.length > 0 && filteredMembers.length > 0 ? (
                                filteredMembers.map(filteredMember =>(
                                    <tr key={filteredMember._id} className='all-members-list'>
                                        <td className='all-members-list-name'>
                                            {CapitaliseEachLetter(filteredMember.fullName)}
                                        </td>
                                        
                                        <td className='all-members-list-phone-number'>
                                            {filteredMember.phoneNumber}
                                        </td>
                                        <td className='all-members-list-date'>
                                            { filteredMember.userFullName }
                                        </td>
                                    </tr>
                                ))
                            ) : ( 
                                members && members.length > 0 ?  ( members.map((member) => (
                                    <tr key={member._id} className='all-members-list'>
                                        <td className='all-members-list-name'>
                                            {CapitaliseEachLetter(member.fullName)}
                                        </td>
                                        
                                        <td className='all-members-list-phone-number'>
                                            {member.phoneNumber}
                                        </td>
                                        <td className='all-members-list-date'>
                                            { member.userFullName }
                                        </td>
                                        {/* edit table data */}
                                        <td className='all-members-list-date edit-button edit-parent-container'>
                                            <div 
                                                ref={menuRef}
                                                aria-label="Options menu"
                                                aria-haspopup="true"
                                                aria-expanded={isShow}
                                                className={`${isShow === member._id ? "edit-button-color" : ""}`}
                                            >
                                            <SlOptionsVertical
                                                className="edit-button"
                                                onClick={()=> handleShowEdit(member._id)}
                                            />
                                                { isShow === member._id && (
                                                    <Edit
                                                        member={member}
                                                        // handleRename={()=> handleRename(member._id)}
                                                    />
                                                )}
                                            </div>

                                            {/* { isRename === member._id && ( 
                                                <Rename 
                                                    member={member}
                                                    handleCloseRename={handleCloseRename}
                                                />
                                            )} */}
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
                    Number of members registered : 
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