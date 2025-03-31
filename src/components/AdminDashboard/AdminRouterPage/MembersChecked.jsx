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
import member from "./../../assets/no-member.gif"

const MembersChecked = ( { changeColor }) => {
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

    const searchCheckedInMember = async()=>{
        try {
            setIsSearching(true);
            const response = await api.get(`search-checked-in-attendee?q=${search}`);
            const { checkIns, totalCheckIns, attendee } = response?.data;

            if (attendee === null || attendee.length === 0) {
                handleError("No members found matching your search");
            }
            setAttendees(attendee)
            setSearchGroupedCheckIns(checkIns);
            setTotalCheckIns(totalCheckIns);
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
    // mount the search checked in members
    useEffect(() => {
        searchCheckedInMember();
    }, [search]);

    // loading state
    if (isLoading) {
        return (
            <CheckInLoader 
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

    // handle search
    const handleSearch = (e)=>{
        setSearch(e.target.value)
    }

    // check for current date
    const isToday = (someDate) => {
        const today = new Date();
        const checkDate = new Date(someDate);

        return(
            checkDate.getDate() === today.getDate() &&
            checkDate.getMonth() === today.getMonth() &&
            checkDate.getFullYear() === today.getFullYear()
        );
    };

    return (
        <div>
            <div className={`all-members-container ${changeColor ? "dashboard-border-bottom-dark" : "dashboard-border-bottom-light"}`}>
                {/* the search container */}
                <div className={`header-search-bar ${changeColor ? "dashboard-border-bottom-dark" : "dashboard-border-bottom-light"}`}>
                    <h1 className='all-members-title'>
                        Check-in History
                    </h1>
                    <div 
                        tabIndex={0}
                        onKeyDown={handleEnter}
                        className="search-container"
                    >
                        <input type="text"
                            placeholder='search member or YY-MM-DD'
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
                                    {isToday(date) ? (  
                                            "Today"
                                        ) : (
                                            new Date(date).toLocaleDateString("en-GB", {
                                                weekday: 'short',
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })
                                        )
                                    }
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
                                            {isToday(date) ? (  
                                                    "Today"
                                                ) : (
                                                new Date(date).toLocaleDateString("en-GB", {
                                                    weekday: 'long',
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })
                                            )
                                            }
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
                                <div className="no-members">
                                    <img src={member} alt="👽" />
                                    <p>No check-ins found.</p>
                                </div>
                            )
                    )
                }
            </div>
            <p className='number-of-members number-of-personal-members'>
                <span className='ping-effect ushers-ping-effect'></span>
                Nº of check-ins for {""}
                <span className={`number-of-members-digits ${changeColor ? "color-digits-red" : "color-digits-green"}`}>
                    {capitalizeWords (search.length > 0  ? 
                        search : "all members"
                    )} 
                </span>
                {""} :
                {" "}
                {isTotalCheckIns ? 
                    isTotalCheckIns : 
                    attendees === null ||
                    attendees.length === 0 ? 0 :  0
                }
            </p>
            <ToastContainer />
        </div>
    )
}

export default MembersChecked;