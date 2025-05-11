import { BsCashStack } from "react-icons/bs"; 
import { BsCashCoin } from "react-icons/bs"; 
import React from 'react';

const DuesOption = ({ memberId, optionOne, optionTwo, handleTithe, handleWelfare }) => {
    return (
        <div
            key={memberId}
            role='menuItems'
            className='edit-container'
            onClick={(e)=> e.stopPropagation()}
        >
            <p className="edit-container-menu">
                — Option —
            </p>
            {/* option one container */}
            <div
                onClick={handleTithe}
                className="edit-container-rename tithe-container"
            >
                <BsCashCoin 
                    className="tithe-icon"
                />
                <p>{optionOne}</p>
            </div>
            {/* option two container */}
            <div
                onClick={handleWelfare}
                className="edit-container-delete welfare-container"
            >
                <BsCashStack
                    className="welfare-icon"
                />
                <p>{optionTwo}</p>
            </div>
        </div>
    )
}

export default DuesOption;