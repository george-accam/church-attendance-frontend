import React, { useState, useEffect } from 'react';
import { handleError, handleSuccess } from '../notifications/Notification';
import { ToastContainer } from 'react-toastify';
import Aos from 'aos';
import 'aos/dist/aos.css';
import api from '../API/Api';

const VerifyCode = () => {
    const [code, setCode] = useState(new Array(4).fill(""));
    const [isLoading, setIsLoading] = useState(false);
    const adminDetails = JSON.parse(localStorage.getItem("admin"));
    const [counter, setCounter] = useState(30);


    // handles the verification code
    const handleSubmit = async () => {
        setIsLoading(true);
        const verificationCode = code.join("");
        console.log(verificationCode);

        if (verificationCode.length === 0) {
            setIsLoading(false);
            return;
        }
        
        if (verificationCode.length < 4) {
            setIsLoading(true);
            return;
        }
        try {
            const response = await api.post("verify-user", 
                { 
                    userId: adminDetails._id,
                    verificationCode 
                });
            const { message } = response.data;
            if (message) {
                handleSuccess("Verification successful!");
                // Redirect to the next step or perform any other action
                setTimeout(() => {
                    window.location.href = "/admin-dashboard";
                }, 2000);
            } else {
                handleError("Verification failed. Please try again.");
            }
        } catch (error) {
            if (error.response.data.message) {
                handleError(error.response.data.message);
            }else if(error.request){
                handleError(`network error: ${error.request}`);
            }else{
                handleError("An error occurred. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    // handles the resend code
    const handleResendCode = async () => {
        setIsLoading(true);
        try {
            const response = await api.post("send-verification-code", { userId: adminDetails._id });
            const { message } = response.data;
            if (message) {
                handleSuccess(message);
                setCounter(30);
            } else {
                handleError("Failed to resend code. Please try again.");
            }
        } catch (error) {
            setIsLoading(false);
            if (error.response.data.message) {
                handleError(error.response.data.message);
            }else if(error.request){
                handleError(`network error: ${error.request}`);
            }else{
                handleError("An error occurred. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleSubmit();
    }, [code]);

    useEffect(() => {
        if (counter === 0) {
            return;
        }
        const timer = setTimeout(() => {
            if(counter > 0){
                setCounter(prev => prev - 1);
            }
            else{
                setCounter(30);
            }
        }, 1000);

        return () => clearTimeout(timer); 
    }, [counter]);

    useEffect(()=>{
        Aos.init({
        duration: 300,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        });
    }, [])

    return (
        <div>
            <div className="container-background">
                <div className="outer-container">
                    <div className="inner-container"
                        data-aos="fade-up"
                    >
                        <form className='usher-register-form verify-code-form'>
                            <h1 className='container-header'>Enter Verification Code</h1>
                            <p className='container-sub-header'>
                                Please enter the verification code sent to <span>{adminDetails.email}</span>
                            </p>
                            <div className="password">
                                <div className="code-container">
                                    {code.map((digit, index) => {
                                        return (
                                            <input
                                                type="text"
                                                name="code"
                                                maxLength="1"
                                                key={index}
                                                value={digit}
                                                onChange={(e) => {
                                                    const newCode = [...code];
                                                    newCode[index] = e.target.value;
                                                    setCode(newCode);
                                                    if (e.target.value && index < code.length - 1) {
                                                        document.getElementsByName("code")[index + 1].focus();
                                                    }
                                                }}
                                                className='code-input'
                                                onFocus={(e) => e.target.select()}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="resend-code-container">
                                {counter > 0 ? (
                                    <p 
                                        className="resend-code-counter"
                                    >
                                        Resend code in {counter} seconds
                                    </p>
                                ) : (
                                    <p 
                                        className="submit-button resend-code"
                                        onClick={handleResendCode}
                                    >
                                        Resend code
                                    </p>
                                )}
                                <div className="">
                                    {isLoading && (
                                        <div class="code-loader"></div>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default VerifyCode;