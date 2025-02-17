import React, { useEffect, useRef } from 'react';

const Edit = ({ member, isShow, setIsShow }) => {
    const menuRef = useRef(null);

    // close the the container when the cursor is outside
    // useEffect(()=>{
    //     const handleClickOutside = (e)=>{
    //         if(menuRef.current && !menuRef.current.contains(e.target)){
    //             setIsShow(false);
    //         }
    //     }

    //     document.addEventListener("mousedown", handleClickOutside);
        
    //     return ()=>{
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     }
    // }, []);
    
    return (
        <>
            <div
                key={member._id}
                role='menuItems'
                className='edit-container'
            >
                Edit
            </div>
        </>
    )
}

export default Edit;