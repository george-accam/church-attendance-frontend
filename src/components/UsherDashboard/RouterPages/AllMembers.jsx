import { CgSearch } from "react-icons/cg"; 
import React, { useEffect, useState } from 'react';
import api from "../../../API/Api.js";
import { ToastContainer } from 'react-toastify';
import { handleError } from '../../../notifications/Notification.js';
import member from './../../assets/no-member.gif';
import SubComponentLoader from "../../reusableComponents/SubComponentLoader.jsx";
import CheckedInSearch from "../../reusableComponents/CheckedInSearch.jsx";
import capitalizeWords from "../../reusableComponents/CapitaliseEachLetter.js";


const AllMembers = ({ changeColor }) => {
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false)
    const [filteredMembers, setFilteredMembers] = useState([]);
    const storedUsher = localStorage.getItem('usher');
    const usherDetails = JSON.parse(storedUsher);

    // search members
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };


    // search members function
    const searchMembers = async() => {
        try {
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
            const filteredAttendance = attendance.filter((attendees) => attendees.userFullName !== usherDetails.fullName);
            console.log(`members : ${JSON.stringify(filteredAttendance)}`);
            
            // set members
            setMembers(filteredAttendance);

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
                            </tr>
                        </thead>
                        {/* breaks the thead from the tbody */}
                        <br />
                        {/* table body */}
                        <tbody>
                            {isSearching&&(
                                <tr className='search-all-members-list'>
                                    <td colSpan={4}>
                                        <CheckedInSearch />
                                    </td>
                                </tr>
                            )}
                            {search.length > 0 && filteredMembers.length > 0 ? (
                                filteredMembers.map(filteredMember =>(
                                    <tr 
                                        key={filteredMember._id} 
                                        className='all-members-list'
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
                                    </tr>
                                ))
                            ) : ( 
                                members && members.length > 0 ?  ( members.map((member) => (
                                    <tr 
                                        key={member._id} 
                                        className='all-members-list'
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
                                    </tr>
                                ))
                            ): (
                                <tr className='no-members'>
                                    <td colSpan={3}>
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