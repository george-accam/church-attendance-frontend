import { CiMobile3 } from "react-icons/ci"; 
import React, { useState, useEffect } from 'react';
import Scan from "../assets/scan.png"

const QrCodeButton = () => {
    const [showQrCode, setShowQrCode] = useState(false);

    const handleShowQrCode = ()=> {
        setShowQrCode(!showQrCode);
    };

    return (
        <div
            className="code-button-container"
            onClick={handleShowQrCode}
        >
            {showQrCode && (
                <div className={`${showQrCode ? "code-image-open" : "code-image-open"}`}>
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