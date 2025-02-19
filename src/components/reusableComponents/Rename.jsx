import { AiOutlineCloseCircle } from "react-icons/ai"; 
import React, { useState } from 'react';

const Rename = ({ member, handleCloseRename }) => {
    const [newName, setNewName] = useState(member.fullName);
    const [newPhoneNumber, setNewPhoneNumber] = useState(member.phoneNumber);

    return (
        <div
            key={member._id}
            className='rename-container-outer'
        >
            <div className="rename-container-inner">
                <div className="rename-container-header">
                    <p>Rename</p>
                    <span onClick={handleCloseRename}>
                        <AiOutlineCloseCircle />
                    </span>
                </div>
                <form action="">
                    <div className="rename-input-container">
                        <label htmlFor="full-name">Full name</label>
                        <input 
                            type="text" 
                            placeholder="Enter new name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </div> 
                    <div className="rename-input-container">
                        <label htmlFor="phone-number">Phone number</label>
                        <input 
                            type="text" 
                            placeholder="Enter new phone number"
                            value={newPhoneNumber}
                            onChange={(e)=> setNewPhoneNumber(e.target.value)}
                        />
                    </div>
                    <button
                    className="rename-button"
                        type="submit"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Rename;