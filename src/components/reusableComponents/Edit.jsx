import { ImBin } from "react-icons/im"; 
import { FiEdit } from "react-icons/fi"; 
import { RiDeleteBin6Line } from "react-icons/ri"; 
import React, { useEffect, useState, useRef } from 'react';

const Edit = ({ memberId, handleRename, handleDelete }) => {

    return (
        <>
            <div
                key={memberId}
                role='menuItems'
                className='edit-container'
                onClick={(e)=> e.stopPropagation()}
            >
                <p className="edit-container-menu">
                    -- Option --
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
                    <ImBin 
                        className="delete-icon"
                    />
                    <p>Delete</p>
                </div>
            </div>
        </>
    )
}

export default Edit;