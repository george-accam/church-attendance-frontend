import { IoMdTimer } from "react-icons/io"; 
import { SlPhone } from "react-icons/sl"; 
import { CgSearch } from "react-icons/cg"; 
import { BsPersonSquare } from "react-icons/bs"; 
import React, { useEffect, useState } from 'react';
import api from "../../../API/Api";
import { handleError, handleSuccess } from "../../../notifications/Notification";
import { ToastContainer } from "react-toastify";
import CheckInLoader from "../../reusableComponents/CheckInLoader";
import capitalizeWords from "../../reusableComponents/CapitaliseEachLetter";
import CheckedInSearch from "../../reusableComponents/CheckedInSearch";

const MembersChecked = () => {
    const [groupedCheckIns, setGroupedCheckIns] = useState({});
    const [searchGroupedCheckIns, setSearchGroupedCheckIns] = useState({});
    const [isTotalCheckIns, setTotalCheckIns] = useState(0);
    const [attendees, setAttendees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [search, setSearch] = useState("");

    const fetchCheckedMember = async()=>{
        try {
            setIsLoading(true);
            const response = await api.get("all-check-ins?page=1&limit=10");
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

    const searchCheckedInMember = async()=>{
        try {
            setIsSearching(true);
            const response = await api.get(`search-checked-in-attendee?q=${search}`);
            const { checkIns, totalCheckIns, attendee } = response.data;

            if (attendee === null || attendee.length === 0) {
                handleError("No members found matching your search");
            }
            setAttendees(attendee)
            setSearchGroupedCheckIns(checkIns);
            setTotalCheckIns(totalCheckIns);
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
    // mount the search checked in members
    useEffect(() => {
        searchCheckedInMember([]);
    }, [search]);

    // loading state
    if (isLoading) {
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

    // handle search
    const handleSearch = (e)=>{
        setSearch(e.target.value)
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
                        onKeyDown={handleEnter}
                        className="search-container"
                    >
                        <input type="text"
                            placeholder='search members'
                            value={search}
                            onChange={handleSearch}
                        />
                        <CgSearch className="search-icon"
                            onClick={searchCheckedInMember}
                        />
                    </div>
                </div>
                {isSearching && (
                    <div className="">
                        <CheckedInSearch />
                    </div>
                )}
                {Object.keys(searchGroupedCheckIns).length > 0 ? (
                        Object.keys(searchGroupedCheckIns).map((date) => (
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
                                    {searchGroupedCheckIns[date].map((checkIn) => (
                                        <div key={checkIn._id} className="grid-item">
                                            <div className="grid-container-inner">
                                                <div>
                                                <div className="member-info-check">
                                                    <label htmlFor="name">
                                                    <BsPersonSquare /> Name:
                                                    </label>
                                                    <p>{capitalizeWords(checkIn.attendeeFullName)}</p>
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
                                        `Number of check-ins: ${searchGroupedCheckIns[date].length}` 
                                        : 0
                                    }
                                </p>
                            </div>
                        ))
                    ) : (
                        Object.keys(groupedCheckIns).length > 0 ? (
                            Object.keys(groupedCheckIns).map((date) => (
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
                                                        <p>{capitalizeWords(checkIn.attendeeFullName)}</p>
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
                                            `Number of check-ins: ${groupedCheckIns[date].length}` 
                                            : 0
                                        }
                                    </p>
                                </div>
                            )) ) : (
                                <p>No check-ins found.</p>
                            )
                    )
                }
            </div>
            <p className='number-of-members number-of-personal-members'>
                <span className='ping-effect ushers-ping-effect'></span>
                {`Nº of check-ins for 
                    ${search.length > 0  ? search : "all members"} : 
                    ${isTotalCheckIns ? isTotalCheckIns : attendees === null || attendees.length === 0 ? 0 :  0}
                `}
            </p>
            <ToastContainer />
        </div>
    )
}

export default MembersChecked;