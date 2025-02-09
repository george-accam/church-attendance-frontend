import { CgSearch } from "react-icons/cg"; 
import React, { useEffect, useState } from 'react';
import api from "../../../API/Api.js";
import { ToastContainer } from 'react-toastify';
import { handleError } from '../../../notifications/Notification.js';
import member from './../../assets/member.svg';


const AllMembers = () => {
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filteredMembers, setFilteredMembers] = useState([]);

    // search members
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };


    // search members function
    const searchMembers = async() => {
        try {
            const response = await api.get(`search-attendee?q=${search}`);
            setIsLoading(true);
            const { attendee } = response.data;
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
            setIsLoading(false);
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
    }, []);
    
    // loading state
    if (isLoading) {
        return (
            <div className="member-loading-container">
               <div className="all-members-container">
                <div className="header-search-bar">
                    <h1 className='all-members-title'>All Members</h1>
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
        )
        
    }


    return (
        <div>
            <div className="all-members-container">
                <div className="header-search-bar">
                    <h1 className='all-members-title'>All Members</h1>
                    <div className="search-container">
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
                            {search.length > 0 && filteredMembers.length > 0 ? (
                                filteredMembers.map(filteredMember =>(
                                    <tr key={filteredMember._id} className='all-members-list'>
                                        <td className='all-members-list-name'>
                                            {filteredMember.fullName}
                                        </td>
                                        
                                        <td className='all-members-list-phone-number'>
                                            {filteredMember.phoneNumber}
                                        </td>
                                        <td className='all-members-list-date'>
                                            { new Date(filteredMember.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : ( 
                                members && members.length > 0 ?  ( members.map((member) => (
                                    <tr key={member._id} className='all-members-list'>
                                        <td className='all-members-list-name'>
                                            {member.fullName}
                                        </td>
                                        
                                        <td className='all-members-list-phone-number'>
                                            {member.phoneNumber}
                                        </td>
                                        <td className='all-members-list-date'>
                                            { new Date(member.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ): (
                                <tr className='no-members'>
                                    <td colSpan={3}>
                                        <img src={member} alt="" />
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
                    Number of members registered : {members && members.length > 0 ? members.length : 0}
                </p>
            <ToastContainer />
        </div>
    )
}

export default AllMembers;