import React, { useEffect, useState } from 'react';
import api from "../../../API/Api.js";
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../../notifications/Notification.js';
import member from './../../assets/member.svg';


const AllMembers = () => {
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // fetch all members
    const fetchAllMembers = async () => {
        try {
            const response = await api.get('/attendees');
            setIsLoading(true);
            const { attendance } = response.data;
            // set members
            setMembers(attendance);

        } catch (error) {
            if (error.response) {
                handleError(error.response.data.error);
            }
            else if (error.request) {
                handleError("Error connecting to the server. Please check your internet connection");
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
    
    // loading state
    if (isLoading) {
        return (
            <div className="member-loading-container">
               <div className="all-members-container">
                <h1 className='all-members-title'>All Members</h1>
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
            </div>
        )
        
    }


    return (
        <div>
            <div className="all-members-container">
                <h1 className='all-members-title'>All Members</h1>
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
                        {/* table body */}
                        <tbody>
                                {members && members.length > 0 ?  ( members.map((member) => (
                                    <tr key={member._id} className='all-members-list'>
                                        <td>
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
                                <div className='no-members'>
                                    <img src={member} alt="" />
                                    <p>No members available yet</p>
                                </div>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AllMembers;