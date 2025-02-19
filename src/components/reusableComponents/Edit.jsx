import { FiEdit } from "react-icons/fi"; 
import { RiDeleteBin6Line } from "react-icons/ri"; 
import React, { useEffect, useState, useRef } from 'react';
import Rename from "./Rename";

const Edit = ({ member, handleRenameClick, handleDelete }) => {
    const [isDelete, setIsDelete]= useState(null);
    // const [isRename, setIsRename] = useState(null);
    // const menuRef = useRef(null);

    // // handle the rename member
    // const handleRename = (id)=>{
    //     setIsRename(isRename === id ? true : id);
    //     console.log(id);
        
    // }
    // const handleCloseRename = ()=>{
    //     setIsRename(null);
    // }
    // const handleRenameClick = (e)=>{
    //     e.stopPropagation();
    //     handleRename(member._id);
    // }

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
                    onClick={handleRenameClick}
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