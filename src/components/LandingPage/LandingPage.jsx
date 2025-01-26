import React from 'react'
import Navbar from "../Navbar";
import LandImg1 from "../assets/land-img1.jpeg"
import LandImg2 from "../assets/land-img2.jpeg"
import LandImg3 from "../assets/land-img3.jpeg"
import LandImg4 from "../assets/land-img4.jpeg"
import LandImg6 from "../assets/land-img6.jpeg"

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
                                <marquee behavior="scroll" direction="left">
                                    Effortless attendance tracking and member management at your fingertips.
                                </marquee>
                            </h2>
                            <div className="landing-page-sub-image">
                                <div className="sub-image-container1 sub-image-top">
                                    <img src={LandImg1} alt="" />
                                    <span>Hello</span>
                                </div>
                                <div className="sub-image-container1">
                                    <img src={LandImg2} alt="" />
                                    <span>Hello</span>
                                </div>
                                <div className="sub-image-container1 sub-image-top">
                                    <img src={LandImg3} alt="" />
                                    <span>Hello</span>
                                </div>
                                <div className="sub-image-container1">
                                    <img src={LandImg4} alt="" />
                                    <span>Hello</span>
                                </div>
                                <div className="sub-image-container1 sub-image-top">
                                    <img src={LandImg6} alt="" />
                                    <span>Hello</span>
                                </div>
                            </div>
                                <div className="landing-page-bottom">
                                    <h3>Get Started Today!</h3>
                                    <p>
                                        Sign up now and experience the convenience of modern church management.
                                    </p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;