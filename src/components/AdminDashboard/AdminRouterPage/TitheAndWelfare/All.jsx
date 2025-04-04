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
import Edit from "../../../reusableComponents/Edit";
import Delete from "../../../reusableComponents/Delete";
import Dues from "../../../reusableComponents/Dues";
import CheckedInSearch from "../../../reusableComponents/CheckedInSearch";

const All = ({ dues, isTotalAmount, searchTotalAmountByDate, isTotalAmountByDate, searchResults, searchTotalAmount, isSearching, loading, handleRenameData, handleDeletedData, isSaving }) => {
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
        <div>
            <div className='member-tithe-and-welfare-container'>
                { Object.keys(searchResults).length > 0 ? (
                    Object.keys(searchResults).map((date) => (
                        <div key={date} className="">
                            {/* date header */}
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
                                {searchResults[date].map((searchResult) => (
                                    <div 
                                        class="card"
                                        key={searchResult._id}
                                        onDoubleClick={() => handleEdit(searchResult._id)}
                                    >
                                            {/* show edit container */}
                                            {showEdit === searchResult._id && (
                                                <Edit 
                                                    memberId={searchResult._id}
                                                    handleRename={() => {
                                                        handleRename(searchResult._id);
                                                        handleEdit(searchResult._id);
                                                    }}
                                                    handleDelete={() => {
                                                        handleDelete(searchResult._id);
                                                        handleEdit(searchResult._id);
                                                    }}
                                                />
                                            )}

                                            {/* show delete container */}
                                            {showDelete === searchResult._id && (
                                                <Delete 
                                                    member={searchResult}

                                                    isDeleting={isSaving}
                                                    handleCloseDelete={() => handleDelete(searchResult._id)}
                                                    handleDeletedData={()=> handleDeletedData({ 
                                                        id: searchResult._id, 
                                                        close: ()=> { setTimeout(() => { handleClose() }, 300) }}
                                                    )}
                                                />
                                            )}

                                            {/* show rename container */}
                                            {showRename === searchResult._id && (
                                                <Dues 
                                                    memberId={searchResult._id}
                                                    title={searchResult.category}
                                                    userFullName={searchResult.fullName}
                                                    saving={isSaving}
                                                    amount={searchResult.amount}
                                                    handleRenameData={handleRenameData}
                                                    handleClose={() => handleRename(searchResult._id)}
                                                />
                                            )}
                                        <div class="card-content">
                                            <div>
                                                <div className="member-info-check member-info-tithe-and-welfare">
                                                    <label htmlFor="name">
                                                        <BsPersonSquare /> Name:
                                                    </label>
                                                    <p>{ capitalizeWords(searchResult.fullName)}</p>
                                                </div>
                                                <div className="member-info-check member-info-tithe-and-welfare">
                                                    <label htmlFor="name">
                                                        <BsFillPersonLinesFill /> Usher name:
                                                    </label>
                                                    <p>{capitalizeWords(searchResult.userFullName)}</p>
                                                </div>
                                                <div className="member-info-check member-info-tithe-and-welfare">
                                                    <label htmlFor="name">
                                                        <BiCategory /> Type:
                                                    </label>
                                                    <p>{searchResult.category}</p>
                                                </div>
                                                <div className="member-info-check member-info-tithe-and-welfare">
                                                    <label htmlFor="name">
                                                        <GiMoneyStack /> Amount:
                                                    </label>
                                                    <p>GH¢ {searchResult.amount}.00</p>
                                                </div>
                                                <div className="member-info-check member-info-tithe-and-welfare">
                                                    <label htmlFor="name">
                                                        <IoMdTimer /> Submitted at:
                                                    </label>
                                                    <p>{new Date(searchResult.dateCreated).toLocaleTimeString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                ))}
                            </div>

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
                                } : GH¢ {searchTotalAmountByDate[date]}.00
                            </p>
                        </div>
                    ))
                ) : 
                    Object.keys(dues).length > 0 ? (
                        Object.keys(dues).map((date) => (
                            <div key={date} className="">
                                {/* date header */}
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
                                    {dues[date].map((due) => (
                                        <div 
                                            class="card"
                                            key={due._id}
                                            onDoubleClick={() => handleEdit(due._id)}
                                        >
                                                {/* show edit container */}
                                                {showEdit === due._id && (
                                                    <Edit 
                                                        memberId={due._id}
                                                        handleRename={() => {
                                                            handleRename(due._id);
                                                            handleEdit(due._id);
                                                        }}
                                                        handleDelete={() => {
                                                            handleDelete(due._id);
                                                            handleEdit(due._id);
                                                        }}
                                                    />
                                                )}

                                                {/* show delete container */}
                                                {showDelete === due._id && (
                                                    <Delete 
                                                        member={due}

                                                        isDeleting={isSaving}
                                                        handleCloseDelete={() => handleDelete(due._id)}
                                                        handleDeletedData={()=> handleDeletedData({ 
                                                            id: due._id, 
                                                            close: ()=> { setTimeout(() => { handleClose() }, 300) }}
                                                        )}
                                                    />
                                                )}

                                                {/* show rename container */}
                                                {showRename === due._id && (
                                                    <Dues 
                                                        memberId={due._id}
                                                        title={due.category}
                                                        userFullName={due.fullName}
                                                        saving={isSaving}
                                                        amount={due.amount}
                                                        handleRenameData={handleRenameData}
                                                        handleClose={() => handleRename(due._id)}
                                                    />
                                                )}
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
                                    } : GH¢ {isTotalAmountByDate[date]}.00
                                </p>
                            </div>
                        ))
                    ): (
                    <div className="no-members">
                        <img src={member} alt="👽" />
                        <p>No dues found.</p>
                    </div>
                )}
            </div>

            {/* total amount */}
            <div className="total-amount">
                <p>
                    Total amount : GH¢ {
                        typeof searchTotalAmount === "number" || searchTotalAmount.length > 0
                        ? searchTotalAmount :
                        typeof isTotalAmount === "number" || isTotalAmount.length > 0 ? 
                        isTotalAmount 
                        : 0 
                    }.00
                </p>
            </div>
        </div>
    )
}

export default All;