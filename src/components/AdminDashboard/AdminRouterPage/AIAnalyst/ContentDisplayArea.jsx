import React from 'react';

const ContentDisplayArea = () => {
    return (
        <div className="content-display-area">
            <div className='display-content-container'>
                <div className="">
                    {/* display header */}
                    <h1 className='display-content-header'>
                        Hello 👋, what do you want to analyze today ?
                    </h1>

                    {/* display content */}
                        <div className="display-content-card-container">
                            {/* dues data */}
                            <div className="display-content-card">
                                <p>
                                    Analyze the revenue
                                    for the service based on the 
                                    membership fees for this month
                                    (Gh¢ 200.00) and how can we improve it?
                                </p>
                            </div>
                            {/* check-in data */}
                            <div className="display-content-card">
                                <p>
                                    Determine the attendance rate for 
                                    the service based on the check-ins 
                                    today (10) and how can we improve it?
                                </p>
                            </div>
                            {/* members data */}
                            <div className="display-content-card">
                                <p>
                                    Evaluate the number of members
                                    for the platform based on the user 
                                    registration this quarter 
                                    (50) and how can we improve it?
                                </p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default ContentDisplayArea;