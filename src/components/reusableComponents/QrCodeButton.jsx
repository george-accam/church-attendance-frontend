import { CiMobile3 } from "react-icons/ci"; 
import React, { useState, useEffect, useRef } from 'react';
import Scan from "../assets/scan.png"

const QrCodeButton = () => {
    const [showQrCode, setShowQrCode] = useState(false);
    const menuRef = useRef(null)

    const handleShowQrCode = ()=> {
        setShowQrCode(!showQrCode);
    };

    useEffect(()=>{
        const handleClickOutside = (e)=>{
            if(menuRef.current && !menuRef.current.contains(e.target)){
                setShowQrCode(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    return (
        <div
            className="code-button-container"
            onClick={handleShowQrCode}
        >
            {showQrCode && (
                <div 
                    ref={menuRef}
                    className={`${showQrCode ? "code-image-open" : "code-image-open"}`}
                >
                    <div className={`code-image-inner`}>
                        <img src={Scan} alt="qr-code" />
                    </div>
                </div>
            )}
            <div 
                className="code-button-container-inner"
                >
                <CiMobile3 className="mobile-icon" />
                <p> Get mobile view</p>
            </div>
        </div>
    )
}

export default QrCodeButton;