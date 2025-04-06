import { BsRobot } from "react-icons/bs"; 
import React, { useEffect, useState } from 'react';
import ContentDisplayArea from "./AIAnalyst/ContentDisplayArea";
import TextArea from "./AIAnalyst/TextArea";
import { handleError } from "../../../notifications/Notification";

const AIAnalyst = ({ totalAmount, totalCheckIn, totalMembers }) => {
    const [message, setMessage] = useState("");
    const [getResponse, setGetResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [preText, setPreText] = useState('');

    const fakeData  = {
        "qa_pairs": [
            {
                "question": "What is your name?",
                "answer": "I'm an AI assistant here to help you!"
            },
            {
                "question": "How are you?",
                "answer": "I'm functioning optimally, thank you for asking!"
            },
            {
                "question": "What time is it?",
                "answer": "I don't have real-time clock access, but you can check your device's time."
            }
        ],
        "default_response": "I'm not sure about that. Could you try asking something else? The word most similar to Trustworthy is Reliable. Reliable means consistently good in quality or performance, and able to be trusted, which aligns closely with the meaning of Trustworthy (deserving of trust or confidence). The other options do not match as closely: Resolute means determined or unwavering. Tenacity means persistence or grit. Relevant means pertinent or applicable. Insolent means rude or disrespectful."
    }

    const handleResponse = async(questions) => {
        try {
            setLoading(true);
            const response = await fakeData.qa_pairs.find((item) => {
                return item.question.toLowerCase() === questions.toLowerCase();
            });
            if (!response) {
                setGetResponse([fakeData.default_response]);
            } else {
                setGetResponse(response.answer);
            }
        } catch (error) {
            handleError(`error status : ${error.message}`);
        }
        finally {
            setLoading(false);
        }
    }

    // useEffect(() => {
    //     handleResponse("What is your name?");
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
                            totalMembers={totalMembers}
                            message={message}
                            preText={preText}
                            loading={loading}
                            getResponse={getResponse}
                            handlePreText={handlePreText}
                        />
                    </div>
                    {/* text area */}
                    <div className="">
                        <TextArea 
                            preText={preText}
                            message={message}
                            setMessage={setMessage}
                            handleResponse={handleResponse}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AIAnalyst;