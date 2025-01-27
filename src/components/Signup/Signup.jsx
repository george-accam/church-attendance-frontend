import React, { useState } from 'react';
import BgImage from "../assets/christ-embassy.png"

const initialState = {
    fullName: "", 
    email: '', 
    phoneNumber: "", 
    password: "", 
    confirmPassword: ""
}
const Signup = () => {
    const [formData, setFormData] = useState(initialState);

    // handles the input values
    const handleInputChange = (e)=>{
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

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
                <div className="inner-container">
                    <h1 className='container-header'>Register</h1>
                    <form >
                        <div className="form-group">
                            <label htmlFor="fullName">
                                Full name
                            </label>
                            <input type="text" 
                                name="fullName" 
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
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="enter your phone number" 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">
                                Password
                            </label>
                            <input type="password" 
                                name="password" 
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="enter your password" 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input type="password" 
                                name="confirmPassword" 
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="confirm your password" 
                            />
                        </div>
                        <button type="submit"
                            className='submit-button'
                        >
                            complete register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
)
}

export default Signup;