import { BiMessageRoundedDetail } from "react-icons/bi"; 
import { AiFillMessage } from "react-icons/ai"; 
import { RiSendPlane2Fill } from "react-icons/ri"; 
import React, { useEffect, useRef } from 'react';

const TextArea = ({ changeColor, message, preText,  setMessage, setGetMessage, handleResponse, handleSaveResponse, }) => {


    const handleSubmit = (e)=>{
        e.preventDefault();
        handleResponse(message ? message : preText);
        setGetMessage(message ? message : preText);
    }

    const handleSave = (e) => {
        e.preventDefault();
        handleSaveResponse({
            userId: JSON.parse(localStorage.getItem('admin'))._id,
            session: JSON.parse(sessionStorage.getItem('conversation'))
        })
    }

    const handleEnterKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { 
            e.preventDefault();
            handleResponse(message ? message : preText);
            setGetMessage(message ? message : preText);
        }
    }

    return (
        <div  className="text-area-container-outer"
            onKeyDown={handleEnterKey}
        >
                <form onSubmit={handleSubmit}>
                    <div className="text-area-container">
                        <div className={`text-area-container-inner ${changeColor ? "text-area-black" : "text-area-white"}`}>
                            <div 
                                className="new-chat-icon-container"
                                onClick={handleSave}
                            >
                                <p>
                                    <BiMessageRoundedDetail />
                                </p>
                            </div>
                            <textarea
                                value={message || preText}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder='message me here....'
                            >
                            </textarea>
                                <div className="text-area-icon-container">
                                    <button 
                                        type="submit"
                                        disabled={message.length > 0  || preText.length > 0 ? false : true}
                                    >
                                            <RiSendPlane2Fill 
                                                className={`text-area-container-icon ${message.length > 0  || preText.length > 0 ? "" : "text-area-disabled-icon"}`} 
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