import React from 'react';
import { Link } from 'react-router-dom';

const CheckIn = () => {
  return (
    <div>
      <div className="container-background usher-register-container">
        <div className="outer-container ">
          <div className="inner-container usher-register-inner-container">
              <h1 className='container-header'>Check In Member</h1>
              <form >
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
                        {/* {isLoading ? "checking in" : "check in"} */}
                        check in
                    </button>
                    <div className="login-link-container">
                        Want to register member ?
                        <Link to="/usher-dashboard/register-member" className="login-link check-in-register-member">
                          register
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

export default CheckIn;