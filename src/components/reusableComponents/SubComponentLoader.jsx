import React from 'react';

const SubComponentLoader = ({ changes }) => {
    return (
        <div>
            <div className="member-loading-container">
                <div className="all-members-container">
                    <div className="header-search-bar">
                        <h1 className='all-members-title'>All Members</h1>
                    </div>
                    <div className="">
                        <table className='all-members-content'>
                            {/* table header */}
                            <thead>
                                <tr className='all-members-list-header'>
                                    <th>Full Name</th>
                                    <th>Phone Number</th>
                                    <th>{changes}</th>
                                </tr>
                            </thead>
                            {/* breaks the thead from the tbody */}
                                <br />
                            <tr className='loading-members member-card'>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr className='loading-members member-card'>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr className='loading-members member-card'>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <p className='number-of-members loading-number-of-members'>
                    <span className='ping-effect'></span>
                    <p></p>
                </p>
            </div>
        </div>
    )
}

export default SubComponentLoader;