import { RiSendPlane2Fill } from "react-icons/ri"; 
import React from 'react';

const TextArea = () => {
    return (
        <div  className="text-area-container-outer">
            <div className="text-area-container">
                <div className="text-area-container-inner">
                    <textarea name="" id="" placeholder='message me here....'>
                    </textarea>
                    <div className="text-area-icon-container">
                        <RiSendPlane2Fill 
                            className="text-area-container-icon" 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TextArea;