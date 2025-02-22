import { IoMdTimer } from "react-icons/io"; 
import { SlPhone } from "react-icons/sl"; 
import { CgSearch } from "react-icons/cg"; 
import { BsPersonSquare } from "react-icons/bs"; 
import React, { useEffect, useState } from 'react';
import api from "../../../API/Api";
import { handleError, handleSuccess } from "../../../notifications/Notification";
import { ToastContainer } from "react-toastify";
import CheckInLoader from "../../reusableComponents/CheckInLoader";

const MembersChecked = () => {
    const [groupedCheckIns, setGroupedCheckIns] = useState({});
    const [isLoading, setIsLoading] = useState(false)

    const fetchCheckedMember = async()=>{
        try {
            setIsLoading(true);
            const response = await api.get("all-check-ins");
            const { checkIns } = response.data;
            setGroupedCheckIns(checkIns);
        } 
        catch (error) {
            if(error.response.data){
                handleError(error.response.data);
            }
            else if(error.request){
                handleError(`Network error : ${error.request}`);
            }
            else{
                handleError("Unexpected error occurred, please try again");
            }
        }
        finally{
            setIsLoading(false);
        }
    };

    // mount the checked members
    useEffect(()=>{
        fetchCheckedMember()
    }, []);

    // loading state
    if (!isLoading) {
        return (
            <CheckInLoader />
        )
    }

    // handle the enter key press
    const handleEnter = (e)=>{
        if(e.key === "Enter"){
            e.preventDefault();
            searchMembers();
        }
    }

    return (
        <div>
            <div className="all-members-container">
                {/* the search container */}
                <div className="header-search-bar">
                    <h1 className='all-members-title'>
                        Check-in History
                    </h1>
                    <div 
                        tabIndex={0}
                        // onKeyDown={handleEnter}
                        className="search-container"
                    >
                        <input type="text"
                        placeholder='search members'
                        // value={search}
                        // onChange={handleSearch}
                        />
                        <CgSearch className="search-icon"
                            // onClick={searchMembers}
                        />
                    </div>
                </div>
                {/* set 1 */}
                {Object.keys(groupedCheckIns).map((date) => (
                    <div key={date} className="grouped-checked-members">
                        <div className="grouped-checked-members-header">
                            <h1>
                                {new Date(date).toLocaleDateString("en-GB", {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </h1>
                        </div>
                        <div className="grid-container">
                            {/* Render check-ins for each date */}
                            {groupedCheckIns[date].map((checkIn) => (
                                <div key={checkIn._id} className="grid-item">
                                    <div className="grid-container-inner">
                                        <div>
                                        <div className="member-info-check">
                                            <label htmlFor="name">
                                            <BsPersonSquare /> Name:
                                            </label>
                                            <p>{checkIn.attendeeFullName}</p>
                                        </div>
                                        <div className="member-info-check">
                                            <label htmlFor="name">
                                            <SlPhone /> Phone number:
                                            </label>
                                            <p>{checkIn.attendeePhoneNumber}</p>
                                        </div>
                                        <div className="member-info-check">
                                            <label htmlFor="name">
                                            <IoMdTimer /> Checked in at:
                                            </label>
                                            <p>{new Date(checkIn.checkInTime).toLocaleTimeString()}</p>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="number-of-check-ins">
                            {groupedCheckIns[date] ? 
                                `Total number of check-ins: ${groupedCheckIns[date].length}` 
                                : 0
                            }
                        </p>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    )
}

export default MembersChecked;