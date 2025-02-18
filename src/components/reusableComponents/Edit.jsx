import { FiEdit } from "react-icons/fi"; 
import { FaRegEdit } from "react-icons/fa"; 
import { RiDeleteBin6Line } from "react-icons/ri"; 
import { MdDeleteOutline } from "react-icons/md"; 
import { MdDelete } from "react-icons/md"; 
import { CiEdit } from "react-icons/ci"; 
import React, { useEffect, useRef } from 'react';

const Edit = ({ member }) => {
    
    return (
        <>
            <div
                key={member._id}
                role='menuItems'
                className='edit-container'
            >
                <p className="edit-container-menu">
                    -- option --
                </p>
                <div className="edit-container-rename">
                    <FiEdit 
                        className="edit-icon"
                    />
                    <p>Rename</p>
                </div>

                <div className="edit-container-delete">
                    <RiDeleteBin6Line 
                        className="edit-icon"
                    />
                    <p>Delete</p>
                </div>
            </div>
        </>
    )
}

export default Edit;