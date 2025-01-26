import React from 'react'
import Navbar from "../Navbar";

const LandingPage = () => {
    return (
        <div className='landing-page-container'>
            <div className="landing-page-filter">
                <Navbar />
                <div className='landing-page-content'>
                    <div className="landing-page-inner">
                        <div className="">
                            <h1 className='landing-page-title'>
                                Welcome to the Church Attendance System!
                            </h1>
                            <h2 className='landing-page-title2'>
                                Effortless attendance tracking and member management at your fingertips.
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;