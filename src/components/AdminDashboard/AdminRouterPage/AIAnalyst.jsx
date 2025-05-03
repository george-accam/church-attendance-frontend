import { BsRobot } from "react-icons/bs"; 
import React, { useEffect, useState } from 'react';
import ContentDisplayArea from "./AIAnalyst/ContentDisplayArea";
import TextArea from "./AIAnalyst/TextArea";
import { handleError, handleSuccess } from "../../../notifications/Notification";
import api from "../../../API/Api";

const AIAnalyst = ({ changeColor, totalAmount, totalCheckIn, totalCheckInByDate, totalMembers, isTotalAmountByDate }) => {
    const [message, setMessage] = useState("");
    const [getMessage, setGetMessage] = useState([]);
    const [getResponse, setGetResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [preText, setPreText] = useState('');
    const [refreshPage, setRefreshPage] = useState(false);

    const [conversation, setConversation] = useState([]);
    const storedConversation = JSON.parse(sessionStorage.getItem('conversation'));

    const handleResponse = async(feedback) => {
        try {
            setLoading(true);
            const response = await api.post('ai-analyst', { prompt: feedback });
            const { message, information } = response.data;

            if (message) {
                setMessage('');
                setPreText('');
                setGetResponse(information);
            }

            setConversation([
                ...conversation,
                { prompt: feedback, response: information }
            ]);
            sessionStorage.setItem('conversation', JSON.stringify([
                ...conversation,
                { prompt: feedback, response: information }
            ]));
            
        } catch (error) {
            if (error.response.data.message) {
                handleError(`error status : ${error.response.data.message}`);
            }
            else if (error.request) {
            handleError(`network error : ${error.request}`);
            }
            else {
                handleError(`error occurred : ${error.message}`);
            }
        }
        finally {
            setLoading(false);
        }
    }

    const  handleSaveResponse = async({ userId, session }) => {
        try {
            if(!userId || !session) {
                return "";
            }
            // setLoading(true);
            // setRefreshPage(true);
            const response = await api.post('save-ai-analyst-response', { userId, session });
            const { message } = response.data;
            
            if (message) {
                setConversation([]);
                sessionStorage.removeItem('conversation');
                window.location.reload();
            }
        } catch (error) {
            if (error.response.data.message) {
                handleError(`error status : ${error.response.data.message}`);
            }
            else if (error.request) {
                handleError(`network error : ${error.request}`);
            }
            else {
                handleError(`error occurred : ${error.message}`);
            }
        }
        finally {
             // setLoading(false);
            // setRefreshPage(false);
        }
    };
    

    // useEffect(()=>{
    //     setConversation([]);
    // }, []);

    const handlePreText = (text) => {
        setPreText(text ? text : '');
    }

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
                        <ContentDisplayArea 
                            totalAmount={totalAmount}
                            totalCheckIn={totalCheckIn}
                            totalCheckInByDate={totalCheckInByDate}
                            isTotalAmountByDate={isTotalAmountByDate}
                            totalMembers={totalMembers}
                            conversation={conversation}
                            getMessage={getMessage}
                            loading={loading}
                            refreshPage={refreshPage}
                            handlePreText={handlePreText}
                        />
                    </div>
                    {/* text area */}
                    <div className="">
                        <TextArea 
                            preText={preText}
                            message={message}
                            setGetMessage={setGetMessage}
                            setMessage={setMessage}
                            changeColor={changeColor}
                            handleResponse={handleResponse}
                            handleSaveResponse={handleSaveResponse}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AIAnalyst;