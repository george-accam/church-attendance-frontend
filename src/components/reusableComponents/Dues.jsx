import { AiOutlineCloseCircle } from "react-icons/ai"; 
import React, { useState } from 'react';

const Dues = ({ memberId, title , userFullName, amount, handleAmount, saving, handleClose }) => {
    const [newName, setNewName] = useState(userFullName);
    const [newAmount, setNewAmount] = useState(amount);
    const storedUsher = localStorage.getItem("usher"); // get stored user data
    const usherDetails = JSON.parse(storedUsher); // parse user data
    const [usher, setUsher] = useState(usherDetails);
    

    const handleSendAmount = (e)=>{
        e.preventDefault();
        handleAmount({
            userId: usher._id, 
            userFullName: usher.fullName, 
            fullName: newName, 
            amount: newAmount, 
            category: title,
        });
    }
    

    return (
        <div
            key={memberId}
            className='rename-container-outer'
        >
            <div className="rename-container-inner">
                <div className="rename-container-header">
                    <p>{title}</p>
                    <span onClick={handleClose}>
                        <AiOutlineCloseCircle />
                    </span>
                </div>
                <form onSubmit={handleSendAmount}>
                    <div className="rename-input-container">
                        <label htmlFor="full-name">Full name</label>
                        <input 
                            type="text" 
                            placeholder="Enter new name"
                            disabled
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </div> 
                    <div className="rename-input-container">
                        <label htmlFor="phone-number">Amount (GH¢)</label>
                        <input 
                            type="number" 
                            placeholder="Enter amount"
                            value={newAmount}
                            min={1}
                            onChange={(e)=> setNewAmount(e.target.value)}
                        />
                    </div>
                    <div className="delete-button-container">
                        <button
                            className={`rename-button ${saving ? "saving-button" : ""}`}
                            type="submit"
                            disabled={saving}
                        >
                            {saving ? "saving" : "save"}
                        </button>

                        <button
                            className="delete-button"
                            type="button"
                            onClick={handleClose}
                        >
                            cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Dues;