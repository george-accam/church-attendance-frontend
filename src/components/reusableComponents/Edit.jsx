import { FiEdit } from "react-icons/fi"; 
import { RiDeleteBin6Line } from "react-icons/ri"; 
import React, { useEffect, useRef } from 'react';

const Edit = ({ member, setPropagation, handleRename, handleDelete }) => {
    
    return (
        <>
            <div
                onClick={setPropagation}
                key={member._id}
                role='menuItems'
                className='edit-container'
            >
                <p className="edit-container-menu">
                    -- option --
                </p>
                {/* rename container */}
                <div
                    onClick={()=> handleRename(member._id)}
                    className="edit-container-rename"
                >
                    <FiEdit 
                        className="edit-icon"
                    />
                    <p>Rename</p>
                </div>
                {/* delete container */}
                <div
                    // onClick={handleDelete(member._id)}
                    className="edit-container-delete"
                >
                    <RiDeleteBin6Line 
                        className="delete-icon"
                    />
                    <p>Delete</p>
                </div>
            </div>
        </>
    )
}

export default Edit;