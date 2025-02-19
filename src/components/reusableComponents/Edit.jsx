import { FiEdit } from "react-icons/fi"; 
import { RiDeleteBin6Line } from "react-icons/ri"; 
import React, { useEffect, useState, useRef } from 'react';
import Rename from "./Rename";

const Edit = ({ member, handleRename, handleDelete }) => {
    const [isDelete, setIsDelete]= useState(null);

    return (
        <>
            <div
                key={member._id}
                role='menuItems'
                className='edit-container'
                onClick={(e)=> e.stopPropagation()}
            >
                <p className="edit-container-menu">
                    -- option --
                </p>
                {/* rename container */}
                <div
                    onClick={handleRename}
                    className="edit-container-rename"
                >
                    <FiEdit 
                        className="edit-icon"
                    />
                    <p>Rename</p>
                </div>
                {/* delete container */}
                <div
                    onClick={handleDelete}
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