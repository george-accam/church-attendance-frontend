import { AiOutlineCloseCircle } from "react-icons/ai"; 
import React from 'react';

const Rename = () => {
    return (
        <div className='rename-container-outer'>
            <div className="rename-container-inner">
                <div className="rename-container-header">
                    <p>Rename</p>
                    <span><AiOutlineCloseCircle /></span>
                </div>
                <div className="rename-input-container">
                    <label htmlFor="full-name">Full name</label>
                    <input type="text" placeholder="Enter new name"/>
                </div> 
                <input type="text" placeholder="Enter new phone number"/>
                <button>Save</button>
            </div>
        </div>
    )
}

export default Rename;