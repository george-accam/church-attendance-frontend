import { CgOptions } from "react-icons/cg"; 
import { BiCategory } from "react-icons/bi"; 
import { GiMoneyStack } from "react-icons/gi"; 
import { BsFillPersonLinesFill } from "react-icons/bs"; 
import React from 'react';
import { BsPersonSquare } from 'react-icons/bs';
import { IoMdTimer } from 'react-icons/io';
import capitalizeWords from "../../../reusableComponents/CapitaliseEachLetter";
import member from "../../../assets/no-member.gif";
import TitheAndWelfareLoader from "../../../reusableComponents/TitheAndWelfareLoader";

const All = ({ dues, loading }) => {
    if (loading) {
        return (
            <TitheAndWelfareLoader />
        );
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
        <div className='member-tithe-and-welfare-container'>
                { Object.keys(dues).length > 0 ? (
                    Object.keys(dues).map((date) => (
                        <div key={date} className="">
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
    
                            <div className="card-container">
                                {dues[date].map((due) => (
                                    <div 
                                        class="card"
                                        key={due._id}
                                    >
                                        <div class="card-content">
                                            <div>
                                                <div className="member-info-check member-info-tithe-and-welfare">
                                                    <label htmlFor="name">
                                                        <BsPersonSquare /> Name:
                                                    </label>
                                                    <p>{ capitalizeWords(due.fullName)}</p>
                                                </div>
                                                <div className="member-info-check member-info-tithe-and-welfare">
                                                    <label htmlFor="name">
                                                        <BsFillPersonLinesFill /> Usher name:
                                                    </label>
                                                    <p>{due.userFullName}</p>
                                                </div>
                                                <div className="member-info-check member-info-tithe-and-welfare">
                                                    <label htmlFor="name">
                                                        <BiCategory /> Type:
                                                    </label>
                                                    <p>{due.category}</p>
                                                </div>
                                                <div className="member-info-check member-info-tithe-and-welfare">
                                                    <label htmlFor="name">
                                                        <GiMoneyStack /> Amount:
                                                    </label>
                                                    <p>GH¢ {due.amount}.00</p>
                                                </div>
                                                <div className="member-info-check member-info-tithe-and-welfare">
                                                    <label htmlFor="name">
                                                        <IoMdTimer /> Submitted at:
                                                    </label>
                                                    <p>{new Date(due.dateCreated).toLocaleTimeString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-members">
                        <img src={member} alt="👽" />
                        <p>No check-ins found.</p>
                    </div>
                )}
        </div>
    )
}

export default All;