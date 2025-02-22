import React from 'react'
import { CgSearch } from "react-icons/cg"; 

const CheckInLoader = () => {
    return (
        <div>
            <div className="all-members-container">
                {/* the search container */}
                <div className="header-search-bar">
                    <h1 className='all-members-title'>
                        Check-in History
                    </h1>
                    <div className="search-container">
                        <input type="text"
                        placeholder='search members'
                        />
                        <CgSearch className="search-icon"
                        />
                    </div>
                </div>
                <div className="grouped-checked-members">
                    <div className="grouped-checked-members-header-loader">
                        <h1></h1>
                    </div>
                    <div class="grid-container">
                        {/* grid  info */}
                        <div class="grid-item">
                            <div className="grid-container-inner">
                                <div className="">
                                    <div className="member-info-check-loader">
                                        <label htmlFor="name"></label>
                                        <p></p>
                                    </div>
                                    <div className="member-info-check-loader">
                                        <label htmlFor="name"></label>
                                        <p></p>
                                    </div>
                                    <div className="member-info-check-loader">
                                        <label htmlFor="name"></label>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* grid  info */}
                        <div class="grid-item">
                            <div className="grid-container-inner">
                                <div className="">
                                    <div className="member-info-check-loader">
                                        <label htmlFor="name"></label>
                                        <p></p>
                                    </div>
                                    <div className="member-info-check-loader">
                                        <label htmlFor="name"></label>
                                        <p></p>
                                    </div>
                                    <div className="member-info-check-loader">
                                        <label htmlFor="name"></label>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* grid  info */}
                        <div class="grid-item">
                            <div className="grid-container-inner">
                                <div className="">
                                    <div className="member-info-check-loader">
                                        <label htmlFor="name"></label>
                                        <p></p>
                                    </div>
                                    <div className="member-info-check-loader">
                                        <label htmlFor="name"></label>
                                        <p></p>
                                    </div>
                                    <div className="member-info-check-loader">
                                        <label htmlFor="name"></label>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="number-of-check-ins-loader">
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CheckInLoader