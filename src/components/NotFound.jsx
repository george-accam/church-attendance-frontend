import React from 'react';
import { Link } from 'react-router';
import NotFoundImg from "./assets/404-not-found.svg"

const NotFound = () => {
    return (
        <div className='not-found-outer-container'>
            <div className="not-found-container">
                <div className="not-found-content">
                    <h1 className='not-found-header'>Oops!</h1>
                    <img src={NotFoundImg} alt="not fond" />
                    <p>Sorry, the page you're looking for does not exist.</p>
                    <Link className='not-found-link' to="/">Back to Home Page</Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound;