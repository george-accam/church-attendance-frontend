import { CgOptions } from "react-icons/cg"; 
import { BiCategory } from "react-icons/bi"; 
import { GiMoneyStack } from "react-icons/gi"; 
import { BsFillPersonLinesFill } from "react-icons/bs"; 
import React, { useState } from 'react';
import { BsPersonSquare } from 'react-icons/bs';
import { IoMdTimer } from 'react-icons/io';
import member from "../../../assets/empty.png";
import capitalizeWords from "../../../reusableComponents/CapitaliseEachLetter";
import TitheAndWelfareLoader from "../../../reusableComponents/TitheAndWelfareLoader";

const Welfare = ({ welfareOnly, loading, welfareSearchResults, welfareAmount, welfareAmountByDate, searchWelfareTotalAmount, searchWelfareTotalAmountByDate }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showRename, setShowRename] = useState(false);

    // handle show edit 
    const handleEdit = (id) => {
        setShowEdit(showEdit === id ? true : id);
    };

    // handle show delete 
    const handleDelete = (id) => {
        setShowDelete(showDelete === id ? true : id);
    };

    // handle show rename 
    const handleRename = (id) => {
        setShowRename(showRename === id ? true : id);
    };


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

    if(loading){
        return(
            <TitheAndWelfareLoader />
        )
    }

    // time format to 12 hours
    const timeFormat = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }
    
    return (
        <div>
            <div className='member-tithe-and-welfare-container'>
                {Object.keys(welfareSearchResults).length > 0 ? (
                        Object.keys(welfareSearchResults).map((date) => (
                            <div key={date} className="">
                                {/* content header */}
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

                                {/* content card */}
                                <div className="card-container">
                                    {welfareSearchResults[date].map((due) => (
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
                                                        <p>{capitalizeWords(due.fullName)}</p>
                                                    </div>
                                                    <div className="member-info-check member-info-tithe-and-welfare">
                                                        <label htmlFor="name">
                                                            <BsFillPersonLinesFill /> Usher name:
                                                        </label>
                                                        <p>{capitalizeWords(due.userFullName)}</p>
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
                                                        <p>{new Date(due.dateCreated).toLocaleTimeString("en-GB", timeFormat)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* total amount by date */}
                                <p className="total-amount-by-date">
                                        Total amount for {isToday(date) ? (  
                                                    "today"
                                                ) : (
                                                    new Date(date).toLocaleDateString("en-GB", {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })
                                                )
                                        } : GH¢ {searchWelfareTotalAmountByDate[date]}.00
                                </p>
                            </div>
                        ))

                    ) : (
                        Object.keys(welfareOnly).length > 0 ? (
                            Object.keys(welfareOnly).map((date) => (
                                <div key={date} className="">
                                    {/* content header */}
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
    
                                    {/* content card */}
                                    <div className="card-container">
                                        {welfareOnly[date].map((due) => (
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
                                                            <p>{capitalizeWords(due.fullName)}</p>
                                                        </div>
                                                        <div className="member-info-check member-info-tithe-and-welfare">
                                                            <label htmlFor="name">
                                                                <BsFillPersonLinesFill /> Usher name:
                                                            </label>
                                                            <p>{capitalizeWords(due.userFullName)}</p>
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
                                                            <p>{new Date(due.dateCreated).toLocaleTimeString("en-GB", timeFormat)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
    
                                    {/* total amount by date */}
                                    <p className="total-amount-by-date">
                                            Total amount for {isToday(date) ? (  
                                                        "today"
                                                    ) : (
                                                        new Date(date).toLocaleDateString("en-GB", {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        })
                                                    )
                                            } : GH¢ {welfareAmountByDate[date]}.00
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="no-members">
                                <img src={member} alt="👽" />
                                <p>No dues found.</p>
                            </div>
                        )
                    )}
            </div>

            {/* total amount */}
            <div className="total-amount">
                <p>
                    Total amount : GH¢ {
                        typeof searchWelfareTotalAmount === "number" ? searchWelfareTotalAmount :
                        typeof welfareAmount === "number" ? welfareAmount : 0
                    }.00
                </p>
            </div>
        </div>
    )
}

export default Welfare;