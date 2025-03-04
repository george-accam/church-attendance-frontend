import { RxEyeClosed } from "react-icons/rx"; 
import { RxEyeOpen } from "react-icons/rx"; 
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BgImage from "../assets/christ-embassy.png"
import { handleSuccess, handleError } from "../../notifications/Notification"
import { ToastContainer } from "react-toastify";
import Aos from 'aos';
import 'aos/dist/aos.css';
import Api from "../../API/Api.js";
import SubmissionLoader from "../reusableComponents/SubmissionLoader.jsx";

// input fields values
const initialState = {
    fullName: "", 
    email: '', 
    phoneNumber: "", 
    password: "", 
    confirmPassword: ""
}

const Signup = () => {
    const [formData, setFormData] = useState(initialState);
    const[openPassword, setOpenPassword] =  useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // handles the input values
    const handleInputChange = (e)=>{
        const { name, value } = e.target;
        if (name === "phoneNumber") {
            setFormData({ 
                ...formData, [name]: value.replace(/\s+/g, "")
            });
        } 
        else if (name === "email"){
            setFormData({
                ...formData, [name]: value.replace(/\s+/g, "")
            });
        }
        else {
            setFormData({ ...formData, [name]: value });
        }
    }
    // handles the password visibility
    const handleOpenPassword = ()=>{
        setOpenPassword(!openPassword);
    }

    // validate password
    const validatePassword = (password)=> {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        if (!regex.test(password)) {
            handleError("Password should contain at least one uppercase letter, one lowercase letter, one number and one special character");
            return;
        };
    };
    

    // password strength
    const getPasswordStrength = (score)=>{
        switch(score){
            case 1:
                return "Password is very weak";
            case 2:
                return "Password is very weak";
            case 3:
                return "Password is very weak";
            case 4:
                return "Password is weak";
            case 5:
                return "Password is weak";
            case 6:
                return "Password is medium";
            case 7:
                return "Password is medium";
            case 8:
                return "Password is strong";
            default:
                return "Password is very strong";
        }
    };
    const handleOnSubmit = async(e)=>{
        e.preventDefault();
        const { phoneNumber, password, confirmPassword } = formData;
        try {
            // validate password
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
            if (!regex.test(password)) {
                handleError("Password should contain at least one uppercase letter, one lowercase letter, one number and one special character");
                return;
            };
            
            if(phoneNumber.length !== 10){
                handleError(" Phone number should be 10 digits");
                return;
            }
            else if (password !== confirmPassword) {
                handleError("Passwords do not match");
                return;
            }
            else if(password.length < 8){
                handleError(`Password should be at least 8 characters long`);
                return;
            }

            setIsLoading(true);
            const response = await Api.post("/register", formData);
            const { message, user } = response.data;
            handleSuccess(message);
            setFormData(initialState);
            setTimeout(()=>{
                navigate("/login")

            }, 2000);

        } catch (error) {
            if (error.response) {
                handleError(`Registration failed: ${error.response.data.message} `)
            }
            else if (error.request) {
                handleError(" Registration failed: Request failed with status code " + error.request.status)
            }
            else{
                handleError(`Error occurred : ${error.message}`);
            }
        }finally{
            setIsLoading(false);
        }

    }

    useEffect(()=>{
        Aos.init({
            duration: 300,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
        });
    }, [formData.password]);

return (
    <div>
        <div className="container-background">
            <div className="image-container">
                <img src={BgImage} 
                className='background-image'
                alt="background-image"
                />
            </div>
            <div className="outer-container">
                <div className="inner-container"
                data-aos="fade-up"
                >
                    <form className="usher-register-form" onSubmit={handleOnSubmit}>
                        <h1 className='container-header'>Register</h1>
                        <div className="form-group">
                            <label htmlFor="fullName">
                                Full name
                            </label>
                            <input type="text" 
                                name="fullName" 
                                required
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="enter your full name" 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">
                                Email
                            </label>
                            <input type="email" 
                                name="email" 
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="enter your email" 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">
                                Phone number
                            </label>
                            <input type="text" 
                                name="phoneNumber" 
                                required
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="enter your phone number" 
                            />
                        </div>
                        <div className="password">
                            <label htmlFor="password">
                                Password
                            </label>
                            <div className="password-container">
                                <input type={openPassword ? "text" : "password" }
                                    name="password" 
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="enter your password" 
                                />
                                <div onClick={handleOpenPassword} className="">
                                        { openPassword ? <RxEyeOpen className="password-icon" /> : <RxEyeClosed className="password-icon" />}
                                </div>
                            </div>
                        </div>
                        {/* password strength */}
                        {formData.password && (
                            <div className="password-strength">
                                <p>
                                    {getPasswordStrength(formData.password.length)}
                                </p>
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                                <input type={openPassword ? "text" : "password" }
                                    name="confirmPassword" 
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="confirm your password" 
                                />
                        </div>
                        <div className="button-container">
                            <button type="submit"
                                disabled={isLoading}
                                className={`submit-button ${isLoading ? "submit-button-loading" : ""}`}
                            >
                                {isLoading ? (
                                    <div className="login-button-content-container">
                                        <div className="login-button-content">
                                            <SubmissionLoader />
                                            <p>submitting</p>
                                        </div>
                                    </div>
                                )
                                : "submit"
                                }
                            </button>
                            <div className="login-link-container">
                                Already have an account? 
                                <Link to="/login" className="login-link">login</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <ToastContainer />
    </div>
)
}

export default Signup;