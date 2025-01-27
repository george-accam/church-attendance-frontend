import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BgImage from "../assets/christ-embassy.png"

const initialState = {
    fullName: "", 
    email: '', 
    phoneNumber: "", 
    password: "", 
    confirmPassword: ""
}
const Login = () => {
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
                    <h1 className='container-header'>Login</h1>
                    <form >
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
                        <div className="button-container">
                            <button type="submit"
                                className='submit-button'
                            >
                                login
                            </button>
                            <div className="login-link-container">
                                Don't have an account? 
                                <Link to="/register" className="login-link">register</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
)
}

export default Login;