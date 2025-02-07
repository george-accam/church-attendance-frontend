import React, { useState } from 'react';
import { Link } from "react-router-dom"

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div className="container-background usher-register-container">
        <div className="outer-container ">
          <div className="inner-container usher-register-inner-container">
              <h1 className='container-header'>Register Member</h1>
              <form >
                <div className="form-group">
                    <label htmlFor="fullName">
                        Full name
                    </label>
                    <input type="text" 
                        name="fullName" 
                        required
                        placeholder="enter full name" 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fullName">
                      Phone number
                    </label>
                    <input type="text" 
                        name="phoneNumber" 
                        required
                        placeholder="enter phone number" 
                    />
                </div>
                <div className="button-container">
                    <button type="submit"
                        // disabled={isLoading}
                        className='submit-button'
                    >
                        {/* {isLoading ? "submitting" : "submit"} */}
                        submit
                    </button>
                    <div className="login-link-container">
                        Want to check in member ?
                        <Link to="/usher-dashboard/check-in" className="login-link check-in-register-member">
                          check in
                        </Link>
                    </div>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;