import { BsRobot } from "react-icons/bs"; 
import React from 'react';
import hello from '../../../assets/hello.gif';
import capitalizeWords from '../../../reusableComponents/CapitaliseEachLetter';

const ContentDisplayArea = ({ handlePreText, totalAmount, totalCheckIn, totalMembers, getResponse, preText, message }) => {
    const adminStored = JSON.parse(localStorage.getItem('admin'));
    const firsName = adminStored ? adminStored.fullName.split(' ')[0] : 'Admin';

    return (
        <div className="content-display-area">
            {/* content display area */}
            {getResponse && getResponse.length > 0 ? (
                <div className="prompt-message-and-response-container">
                    {/* prompt */}
                    <div className="prompt-message-container">
                        <p>
                            {preText ? preText : message}
                        </p>
                    </div>
                    {/* response */}
                    <div className="prompt-response-and-icon-container">
                        <div className="">
                            <BsRobot className="prompt-response-icon" />
                        </div>
                        <div className="prompt-response-container">
                            {getResponse}
                        </div>
                    </div>
                </div>
            ) : (
                <div className='display-content-container'>
                    <div className="">
                        {/* display header */}
                        <h1 className='display-content-header'>
                            Hello {capitalizeWords(firsName)}
                            <img src={hello} className='display-content-hello'  alt='hello' />
                            , <span>what's next to analyze ?</span>
                        </h1>

                        {/* display content */}
                        <div className="display-content-card-container">
                            {/* dues data */}
                            <div 
                                className="display-content-card"
                                onClick={() => {
                                    handlePreText(`Analyze the dues for the service based on the membership fees for this month (Gh¢ ${totalAmount ? totalAmount : "0"}.00) and how can we improve it?`)
                                }}
                            >
                                <p>
                                    Analyze the revenue
                                    for the service based on the 
                                    membership fees for this month
                                    (Gh¢ {totalAmount ? totalAmount : "0"}.00) and how can we improve it?
                                </p>
                            </div>
                            {/* check-in data */}
                            <div 
                                className="display-content-card"
                                onClick={() => {
                                    handlePreText(`Determine the attendance rate for the service based on the check-ins today (${totalCheckIn ? totalCheckIn : "0"}) and how can we improve it? and how can we improve it?`)
                                }}
                            >
                                <p>
                                    Determine the attendance rate for 
                                    the service based on the check-ins 
                                    today ({totalCheckIn ? totalCheckIn : "0"}) and how can we improve it?
                                </p>
                            </div>
                            {/* members data */}
                            <div 
                                className="display-content-card"
                                onClick={() => {
                                    handlePreText(`Evaluate the number of members for the platform based on the user registration this quarter (${totalMembers ? totalMembers : "0"}) and how can we improve it?`)
                                }}
                            >
                                <p>
                                    Evaluate the number of members
                                    for the platform based on the user 
                                    registration this quarter 
                                    ({totalMembers ? totalMembers : "0"}) and how can we improve it?
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default ContentDisplayArea;