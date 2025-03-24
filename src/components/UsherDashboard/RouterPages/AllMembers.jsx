import { CgOptions } from "react-icons/cg"; 
import { FaDonate } from "react-icons/fa"; 
import { CgSearch } from "react-icons/cg"; 
import React, { useEffect, useRef, useState } from 'react';
import api from "../../../API/Api.js";
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../../notifications/Notification.js';
import member from './../../assets/no-member.gif';
import SubComponentLoader from "../../reusableComponents/SubComponentLoader.jsx";
import CheckedInSearch from "../../reusableComponents/CheckedInSearch.jsx";
import capitalizeWords from "../../reusableComponents/CapitaliseEachLetter.js";
import Dues from "../../reusableComponents/Dues.jsx";
import DuesOption from "../../reusableComponents/DuesOption.jsx";
import Api from "../../../API/Api.js";


const AllMembers = ({ changeColor }) => {
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false)
    const [filteredMembers, setFilteredMembers] = useState([]);
    const storedUsher = localStorage.getItem('usher');
    const usherDetails = JSON.parse(storedUsher);
    const [isShow, setIsShow] = useState(null);
    const [showTithe, setShowTithe] = useState(null);
    const [showWelfare, setShowWelfare] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const menuRef = useRef({})


    // show tithe modal
    const handleShowTithe = (id)=>{
        setShowTithe(id === showTithe ? true : id);
    }

    // show welfare modal
    const handleShowWelfare = (id)=>{
        setShowWelfare(id === showWelfare ? true : id);
    }
    // show edit dues
    const handleShowEdit = (id) => {
        setIsShow(id === isShow ? null : id);
    };

    // search members
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };


    // search members function
    const searchMembers = async() => {
        try {
            if(search === ""){
                return "";
            }
            setIsSearching(true);
            const response = await api.get(`search-attendee?q=${search}`);
            const { attendee } = response.data;
            if (attendee === null || attendee.length === 0) {
                handleError("member not found");
            }
            setFilteredMembers(attendee);

        } catch (error) {
            if (error.response.data.message) {
                handleError(error.response.data.message);
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
            const filteredAttendance = attendance.filter((attendees) => attendees.userFullName !== usherDetails.fullName);
            
            // set members
            setMembers(filteredAttendance);

        } catch (error) {
            if (error.response.data.message) {
                handleError(error.response.data.message);
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

    useEffect(()=>{
        const handleClickOutside = (e) => {
            if (isShow !== null && menuRef.current[isShow]) {
                if (!menuRef.current[isShow].contains(e.target)) {
                    setIsShow(false);
                }
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    },[isShow])

    // fetch all members on component mount
    useEffect(() => {
        fetchAllMembers();
        searchMembers();
    }, [search]);
    
    // loading state
    if (isLoading) {
        return (
            <SubComponentLoader
                changes={"Date"}
                className={`${changeColor ? "dashboard-border-bottom-dark" : "dashboard-border-bottom-light"}`}
            />
        )
        
    }

    const handleKeyDown = async(e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            searchMembers();
        }
    };

    // submit dues amount
    const handleAmount = async({ userId, userFullName, fullName, amount, category }) => {
        try {
            if(!amount){
                handleError("please enter amount");
                return;
            }
            
            setIsSaving(true);
            const payload = {
                userId, 
                userFullName, 
                fullName, 
                amount,
                category
            }
            const response = await Api.post("tithe-welfare", payload);
            const { message } = response.data;
            if (message) {
                handleSuccess(message);

            };
            setTimeout(()=>{
                setShowTithe(null);
                setShowWelfare(null);
            }, 1000)
        } catch (error) {
            if(error.response.data.message){
                handleError(error.response.data.message);
            }
            else if(error.request){
                handleError("Network error" + error.request);
            }
            else {
                handleError("An error occurred, please try again");
            }
        }
        finally{
            setIsSaving(false);
        }
        
    };
        

    return (
        <div>
            <div className={`all-members-container ${changeColor ? "dashboard-border-bottom-dark" : "dashboard-border-bottom-light"}`}>
                <div className={`header-search-bar ${changeColor ? "dashboard-border-bottom-dark" : "dashboard-border-bottom-light"}`}>
                    <h1 className='all-members-title'>All Members</h1>
                    <div
                        tabIndex={0}
                        onKeyDown={handleKeyDown}
                        role="button"
                        className="search-container">
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
                                <th>Date</th>
                                <th><FaDonate /></th>
                            </tr>
                        </thead>
                        {/* breaks the thead from the tbody */}
                        <br />
                        {/* table body */}
                        <tbody>
                            {/* the search text */}
                            {isSearching&&(
                                <tr className='search-all-members-list'>
                                    <td colSpan={4}>
                                        <CheckedInSearch />
                                    </td>
                                </tr>
                            )}
                            {search.length > 0 && filteredMembers.length > 0 ? (
                                filteredMembers.map(filteredMember => (
                                    <tr 
                                        key={filteredMember._id} 
                                        className={`all-members-list ${showTithe === filteredMember._id ? 'update-table' : showWelfare === filteredMember._id ? 'welfare-table' : ''}`}
                                    >
                                        <td className='all-members-list-name'>
                                            {capitalizeWords(filteredMember.fullName)}
                                        </td>
                                        
                                        <td className='all-members-list-phone-number'>
                                            {filteredMember.phoneNumber}
                                        </td>
                                        <td className='all-members-list-date'>
                                            { new Date(filteredMember.createdAt).toLocaleDateString("en-GB") }
                                        </td>
                                        <td className='all-members-list-date'>
                                            <div 
                                                key={filteredMember._id}
                                                role="menu"
                                                className={`edit-parent-container ${isShow === filteredMember._id ? "edit-button-color" : ""}`}
                                                >
                                                <CgOptions 
                                                    className="edit-button"
                                                    onClick={()=> handleShowEdit(filteredMember._id)}
                                                />
                                                { isShow === filteredMember._id && (
                                                    <div 
                                                        ref={(el) => (menuRef.current[filteredMember._id] = el)}
                                                        className="" 
                                                        role="none"
                                                    >
                                                        <DuesOption
                                                            memberId={filteredMember._id}
                                                            optionOne = {"tithe"} 
                                                            optionTwo = {"welfare"} 
                                                            handleTithe = {()=> { 
                                                                handleShowTithe(filteredMember._id);
                                                                setIsShow(null);
                                                            }} 
                                                            handleWelfare = {()=> { 
                                                                handleShowWelfare(filteredMember._id);
                                                                setIsShow(null);
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            {showTithe === filteredMember._id && (
                                                <Dues 
                                                    memberId={filteredMember._id}
                                                    title = {"Tithe"} 
                                                    userFullName={filteredMember.fullName}
                                                    handleAmount={handleAmount}
                                                    saving={isSaving}
                                                    handleClose={()=> handleShowTithe(filteredMember._id)}   
                                                />
                                            )}
                                            {showWelfare === filteredMember._id && (
                                                <Dues 
                                                    memberId={filteredMember._id}
                                                    title = {"Welfare"} 
                                                    userFullName={filteredMember.fullName}
                                                    handleAmount={handleAmount}
                                                    saving={isSaving}
                                                    handleClose={()=> handleShowWelfare(filteredMember._id)}   
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : ( 
                                members && members.length > 0 ?  ( members.map((member) => (
                                    <tr 
                                        key={member._id} 
                                        className={`all-members-list ${showTithe === member._id ? 'update-table' : showWelfare === member._id ? 'welfare-table' : ''}`}
                                    >
                                        <td className='all-members-list-name'>
                                            {capitalizeWords(member.fullName)}
                                        </td>
                                        
                                        <td className='all-members-list-phone-number'>
                                            {member.phoneNumber}
                                        </td>
                                        <td className='all-members-list-date'>
                                        { new Date(member.createdAt).toLocaleDateString("en-GB") }
                                        </td>
                                        <td className='all-members-list-date'>
                                            <div 
                                                key={member._id}
                                                role="menu"
                                                className={`edit-parent-container ${isShow === member._id ? "edit-button-color" : ""}`}
                                                >
                                                <CgOptions 
                                                    className="edit-button"
                                                    onClick={()=> handleShowEdit(member._id)}
                                                />
                                                { isShow === member._id && (
                                                    <div 
                                                        ref={(el) => (menuRef.current[member._id] = el)}
                                                        className="" 
                                                        role="none"
                                                    >
                                                        <DuesOption
                                                            memberId={member._id}
                                                            optionOne = {"tithe"} 
                                                            optionTwo = {"welfare"} 
                                                            handleTithe = {()=> { 
                                                                handleShowTithe(member._id);
                                                                setIsShow(null);
                                                            }} 
                                                            handleWelfare = {()=> { 
                                                                handleShowWelfare(member._id);
                                                                setIsShow(null);
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            {showTithe === member._id && (
                                                <Dues 
                                                    memberId={member._id}
                                                    title = {"Tithe"} 
                                                    userFullName={member.fullName}
                                                    handleAmount={handleAmount}
                                                    saving={isSaving}
                                                    handleClose={()=> handleShowTithe(member._id)}   
                                                />
                                            )}
                                            {showWelfare === member._id && (
                                                <Dues 
                                                    memberId={member._id}
                                                    title = {"Welfare"} 
                                                    userFullName={member.fullName}
                                                    handleAmount={handleAmount}
                                                    saving={isSaving}
                                                    handleClose={()=> handleShowWelfare(member._id)}   
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
                    Nº of members registered : {members && members.length > 0 ? members.length : 0}
                </p>
            <ToastContainer />
        </div>
    )
}

export default AllMembers;