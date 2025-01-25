import React, { useEffect, useState } from 'react'

const App = () => {
  const [ isChangeColor, setIsChangeColor ] = useState(false);

    //get the changes from the browser
    useEffect(()=>{
      const storeColor = localStorage.getItem("isChangeColor");
      if(storeColor){
        setIsChangeColor(JSON.parse(storeColor))
      }
    },[])

  //set the changes into the browser
  useEffect(()=>{
    localStorage.setItem("isChangeColor", JSON.stringify(isChangeColor))

  }, [isChangeColor])

  const handleChangeColor = ()=> {
    setIsChangeColor(!isChangeColor);

  }

  return (
    <div className={ isChangeColor ? `white-bg` : `dark-bg` }>
      <h1 className="header" onClick={handleChangeColor}>My App</h1>
    </div>
  )
}

export default App;