import { CgOptions } from "react-icons/cg"; 
import { BiCategory } from "react-icons/bi"; 
import { GiMoneyStack } from "react-icons/gi"; 
import { BsFillPersonLinesFill } from "react-icons/bs"; 
import React, { useState } from 'react';
import { BsPersonSquare } from 'react-icons/bs';
import { IoMdTimer } from 'react-icons/io';
import capitalizeWords from "../../../reusableComponents/CapitaliseEachLetter";
import member from "../../../assets/no-member.gif";
import TitheAndWelfareLoader from "../../../reusableComponents/TitheAndWelfareLoader";

const Tithe = ({ titheOnly, loading, titheAmount, searchTitheTotalAmount, searchTitheTotalAmountByDate, titheSearchResults, titheAmountByDate }) => {
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

    if (loading) {
        return (
            <TitheAndWelfareLoader />
        );
    }
    
    return (
        <div>
            <div className='member-tithe-and-welfare-container'>
                {Object.keys(titheSearchResults).length > 0 ? (
                        Object.keys(titheSearchResults).map((date) => (
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
                                    {titheSearchResults[date].map((due) => (
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
                                                        <p>{new Date(due.dateCreated).toLocaleTimeString()}</p>
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
                                        } : GH¢ {searchTitheTotalAmountByDate[date]}.00
                                </p>
                            </div>
                        ))
                    ) : (
                        Object.keys(titheOnly).length > 0 ? (
                            Object.keys(titheOnly).map((date) => (
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
                                        {titheOnly[date].map((due) => (
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
                                                            <p>{new Date(due.dateCreated).toLocaleTimeString()}</p>
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
                                            } : GH¢ {titheAmountByDate[date]}.00
                                    </p>
                                </div>
                            )) 
                        ): (
                            <div className="no-members">
                                <img src={member} alt="👽" />
                                <p>No dues found.</p>
                            </div>
                        )
                    )
                    }
            </div>

            {/* total amount */}
            <div className="total-amount">
                <p>Total amount : GH¢ {
                    typeof searchTitheTotalAmount === "number" || searchTitheTotalAmount.length > 0 ? searchTitheTotalAmount :
                    typeof titheAmount === "number" || titheAmount.length > 0 ? titheAmount : 0
                }.00</p>
            </div>
        </div>
    )
}

export default Tithe;