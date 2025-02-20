import { AiOutlineCloseCircle } from "react-icons/ai"; 
import React, { useState } from 'react';

const Rename = ({ memberId, memberName, memberPhoneNumber, isRenaming, handleRenameData, handleCloseRename }) => {
    const [newName, setNewName] = useState(memberName);
    const [newPhoneNumber, setNewPhoneNumber] = useState(memberPhoneNumber);

    const handleSavedRenameData = (e) => {
        e.preventDefault();
        handleRenameData({
        id: memberId,
        fullName: newName, 
        phoneNumber: newPhoneNumber
    });
    }

    return (
        <div
            key={memberId}
            className='rename-container-outer'
        >
            <div className="rename-container-inner">
                <div className="rename-container-header">
                    <p>Rename</p>
                    <span onClick={handleCloseRename}>
                        <AiOutlineCloseCircle />
                    </span>
                </div>
                <form onSubmit={handleSavedRenameData}>
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
                    <div className="delete-button-container">
                        <button
                            className="rename-button"
                            type="submit"
                        >
                            { isRenaming ? "renaming" : "save"}
                        </button>

                        <button
                            className="delete-button"
                            type="button"
                            onClick={handleCloseRename}
                        >
                            cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Rename;