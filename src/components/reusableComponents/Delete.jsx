import React from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai"; 

const Delete = ({ member, handleCloseDelete, handleDeletedData }) => {
    return (
        <div 
            key={member._id}
            className='rename-container-outer'
        >
            <div className="delete-container-inner">
                <div className="rename-container-header">
                    <p>Delete confirmation</p>
                    <span onClick={handleCloseDelete}>
                        <AiOutlineCloseCircle />
                    </span>
                </div>
                <p className='delete-container-sub-header'>
                    Are you sure you want to delete the data ? 
                    This action cannot be undone.
                </p>
                <div className="delete-button-container-outer">
                    <div className="delete-button-container">
                        <button
                            onClick={handleDeletedData}
                            className="delete-button"
                        >
                            Yes
                        </button>
                        <button
                            onClick={handleCloseDelete}
                            className="rename-button"
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Delete;