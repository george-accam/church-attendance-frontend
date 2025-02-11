import React from 'react'

const Logout = ({ handleYes, handleLogout }) => {
    return (
    <div>
        <div className="dark-background">
                <div className="logout-decision-holder">
                    <div className="logout-holder">
                        <h2>Logout Confirmation</h2>
                        <p>Are you sure you want to logout ?</p>
                        <div className="decision">
                            <button className="yes" onClick={handleYes}>Yes</button>
                            <button className="no" onClick={handleLogout}>No</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default Logout