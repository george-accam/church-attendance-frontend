import { BsRobot } from "react-icons/bs"; 
import React, { useState } from 'react';
import ContentDisplayArea from "./AIAnalyst/ContentDisplayArea";
import TextArea from "./AIAnalyst/TextArea";

const AIAnalyst = () => {
    return (
        <div>
            <div className="ai-analyst-container">
                {/* ai-analyst header */}
                <div className="ai-analyst-title-container">
                    <div className='ai-analyst-title'>
                        <div className="ai-analyst-title-inner">
                            <BsRobot className="ai-analyst-title-icon" />
                            <h1>
                                AI Analyst
                            </h1>
                        </div>
                    </div>
                </div>

                {/* content area and text area */}
                <div className="content-area-and-text-area-container">
                    {/* content display area */}
                    <div className="">
                        <ContentDisplayArea />
                    </div>
                    {/* text area */}
                    <div className="">
                        <TextArea />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AIAnalyst;