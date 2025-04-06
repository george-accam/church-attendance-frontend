import { RiSendPlane2Fill } from "react-icons/ri"; 
import React from 'react';

const TextArea = ({ message, preText, setMessage, handleResponse }) => {
    const handleSubmit = (e)=>{
        e.preventDefault();
        handleResponse(preText || message);
    }

    return (
        <div  className="text-area-container-outer">
                <form onSubmit={handleSubmit}>
                    <div className="text-area-container">
                        <div className="text-area-container-inner">
                            <textarea
                                value={message || preText}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder='message me here....'
                            >
                            </textarea>
                                <div className="text-area-icon-container">
                                    <button type="submit">
                                            <RiSendPlane2Fill 
                                                className="text-area-container-icon" 
                                            />
                                    </button>
                                </div>
                        </div>
                    </div>
                </form>
        </div>
    )
}

export default TextArea;