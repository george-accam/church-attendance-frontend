import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <div className='not-found-outer-container'>
            <div className="not-found-container">
                <h1 className='not-found-header'>Oops!</h1>
                <h2 className='not-found-header-2'>404: Page Not Found</h2>
                <p className='not-found-message'>Sorry, the page you're looking for does not exist.</p>
                <Link className='not-found-link' to="/">Back to Log In Page</Link>
            </div>
        </div>
    )
}

export default NotFound;