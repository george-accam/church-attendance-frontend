import { BsRobot } from "react-icons/bs";
import React, { useEffect, useState, useRef } from 'react';
import hello from '../../../assets/hello.gif';
import capitalizeWords from '../../../reusableComponents/CapitaliseEachLetter';

const ContentDisplayArea = ({ 
  handlePreText, 
  totalAmount,
  isTotalAmountByDate, 
  totalCheckIn,
  totalCheckInByDate, 
  totalMembers, 
  loading, 
  getMessage, 
  conversation,
  refreshPage,
}) => {
  const adminStored = JSON.parse(localStorage.getItem('admin'));
  const firsName = adminStored ? adminStored.fullName.split(' ')[0] : 'Admin';
  const messagesEndRef = useRef(null);
  const date = new Date().toISOString().split('T')[0];

  // State for formatted conversation with typing animation
  const [formattedConversation, setFormattedConversation] = useState([]);

  // Format text and mark lines ending with colon as bold
  const formatText = (text) => {
    if (!text) return [];
    
    // Remove all asterisks first
    const textWithoutAsterisks = text.replace(/\*/g, '');
    // Split by new lines
    const lines = textWithoutAsterisks.split('\n').filter(line => line.trim() !== '');
    
    return lines.map(line => {
      const trimmed = line.trim();
      return {
        text: trimmed,
        bold: trimmed.endsWith(':')
      };
    });
  };

  // Format text for prompt messages
  // function getLocalISODate() {
  //   const d = new Date();
  //   return d.toISOString().split('T')[0];
  // }
  
  // Scroll to bottom whenever conversation updates
  useEffect(() => {
    scrollToBottom();
  }, [formattedConversation, loading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Initialize or update conversation when prop changes
  useEffect(() => {
    if (conversation.length > formattedConversation.length) {
      const newEntry = conversation[conversation.length - 1];
      const formattedResponse = formatText(newEntry.response);
      
      setFormattedConversation(prev => [
        ...prev,
        {
          prompt: newEntry.prompt,
          response: formattedResponse,
          displayedResponse: [],
          isTyping: true
        }
      ]);

      startTypingAnimation(conversation.length - 1, formattedResponse);
    }
  }, [conversation]);

  const startTypingAnimation = (index, lines) => {
    let currentLine = 0;
    let currentPos = 0;
    let displayedText = [];
    
    const typingInterval = setInterval(() => {
      if (currentLine < lines.length) {
        const line = lines[currentLine];
        
        if (currentPos <= line.text.length) {
          displayedText[currentLine] = {
            text: line.text.substring(0, currentPos),
            bold: line.bold
          };
          
          setFormattedConversation(prev => {
            const updated = [...prev];
            updated[index] = {
              ...updated[index],
              displayedResponse: [...displayedText]
            };
            return updated;
          });
          
          currentPos++;
        } else {
          currentLine++;
          currentPos = 0;
        }
      } else {
        setFormattedConversation(prev => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            isTyping: false
          };
          return updated;
        });
        clearInterval(typingInterval);
      }
    }, 5);
  };

  const FormattedText = ({ lines }) => {
    if (!lines || lines.length === 0) return null;
    
    if (typeof lines === 'string') {
      return <p>{lines}</p>;
    }
    
    return (
      <>
        {lines.map((line, i) => (
          <React.Fragment key={i}>
            {line.bold ? (
              <strong>{line.text}</strong>
            ) : (
              <span>{line.text}</span>
            )}
            <br />
          </React.Fragment>
        ))}
      </>
    );
  };

  const formatPromptText = (text) => {
    if (!text) return '';
    // Remove all asterisks
    const textWithoutAsterisks = text.replace(/\*/g, '');
    // Split by new lines
    const lines = textWithoutAsterisks.split('\n').filter(line => line.trim() !== '');
    
    return lines.map((line, i) => {
      const trimmed = line.trim();
      return (
        <React.Fragment key={i}>
          {trimmed.endsWith(':') ? (
            <strong>{trimmed}</strong>
          ) : (
            <span>{trimmed}</span>
          )}
          <br />
        </React.Fragment>
      );
    });
  };

  if(refreshPage){
    return (
      <div className="content-display-area">
        {/* Initial empty state */}
        <div className='display-content-container'>
        <div className="">
            <h1 className='display-content-header'>
              Hello {capitalizeWords(firsName)}
              <img src={hello} className='display-content-hello' alt='hello' />
              , <span>what's next to analyze?</span>
            </h1>

            <div className="display-content-card-container">
            <div 
                className="display-content-card"
                onClick={() => {
                handlePreText(`Analyze the dues for the church service based on the membership fees for this today (Gh¢ ${isTotalAmountByDate[date]? isTotalAmountByDate[date] : "0"}.00 / Gh¢ ${totalAmount ? totalAmount : "0"}.00) and how can we improve it?`)
                }}
            >
                <p>
                Analyze the revenue
                for the church service based on the 
                membership fees for this today
                (Gh¢ {isTotalAmountByDate[date]? isTotalAmountByDate[date] : "0"}.00 / Gh¢ {totalAmount ? totalAmount : "0"}.00) and how can we improve it?
                </p>
            </div>
            <div 
                className="display-content-card"
                onClick={() => {
                handlePreText(`Determine the church attendance rate for the service based on the check-ins today (${totalCheckInByDate[date] ? totalCheckInByDate[date].length : "0"} / ${totalCheckIn ? totalCheckIn : "0"}) and how can we improve it?`)
                }}
            >
                <p>
                Determine the church attendance rate for 
                the service based on the check-ins 
                today ({totalCheckInByDate[date] ? totalCheckInByDate[date].length : "0"} / {totalCheckIn ? totalCheckIn : "0"}) and how can we improve it?
                </p>
            </div>
            <div 
                className="display-content-card"
                onClick={() => {
                handlePreText(`Evaluate the number of members for the church attendance platform based on the user registration this quarter (${totalMembers ? totalMembers : "0"}) and how can we improve it?`)
                }}
            >
                <p>
                Evaluate the number of members
                for the church attendance platform based on the user 
                registration this quarter 
                ({totalMembers ? totalMembers : "0"}) and how can we improve it?
                </p>
            </div>
            </div>
        </div>
        </div>
      </div>
    )
  }

  return (
    <div className="content-display-area">
      {/* Conversation history */}
        <div className="conversation-history">
            {formattedConversation.map((item, index) => (
            <React.Fragment key={index}>
                <div className="prompt-message-container">
                <p>{formatPromptText(item.prompt)}</p>
                </div>
                <div className="prompt-response-and-icon-container">
                    <div className="">
                        <BsRobot className="prompt-response-icon" />
                    </div>
                <div className="prompt-response-container">
                    {item.isTyping ? (
                    <p><FormattedText lines={item.displayedResponse} /></p>
                    ) : (
                    <p><FormattedText lines={item.response} /></p>
                    )}
                </div>
                </div>
            </React.Fragment>
            ))}
            
            {/* Loading state */}
            {loading && (
            <div className="prompt-message-and-response-container">
                <div className="prompt-message-container">
                <p>{formatPromptText(getMessage)}</p>
                </div>
                <div className="prompt-response-and-icon-container">
                <BsRobot className="prompt-response-icon" />
                <div className="prompt-response-container">
                    <div className="loader"><span>thinking...</span></div>
                </div>
                </div>
            </div>
            )}
            
            <div ref={messagesEndRef} />
        </div>

      {/* Initial empty state */}
        {!loading && conversation.length === 0 && (
            <div className='display-content-container'>
            <div className="">
                <h1 className='display-content-header'>
                  <span className="display-content-user-name">Hello {capitalizeWords(firsName)} </span>
                  <img src={hello} className='display-content-hello' alt='hello' />
                  , <span>what's next to analyze?</span>
                </h1>

                <div className="display-content-card-container">
                <div 
                    className="display-content-card"
                    onClick={() => {
                    handlePreText(`Analyze the dues for the church service based on the membership fees for this today (Gh¢ ${isTotalAmountByDate[date]? isTotalAmountByDate[date] : "0"}.00 / Gh¢ ${totalAmount ? totalAmount : "0"}.00) and how can we improve it?`)
                    }}
                >
                    <p>
                    Analyze the revenue
                    for the church service based on the 
                    membership fees for this today
                    (Gh¢ {isTotalAmountByDate[date]? isTotalAmountByDate[date] : "0"}.00 / Gh¢ {totalAmount ? totalAmount : "0"}.00) and how can we improve it?
                    </p>
                </div>
                <div 
                    className="display-content-card"
                    onClick={() => {
                    handlePreText(`Analyse the church attendance rate for the service based on the check-ins today (${totalCheckInByDate[date] ? totalCheckInByDate[date].length : "0"} / ${totalCheckIn ? totalCheckIn : "0"}) and how can we improve it?`)
                    }}
                >
                    <p>
                    Analyse the church attendance rate for 
                    the service based on the check-ins 
                    today ({totalCheckInByDate[date] ? totalCheckInByDate[date].length : "0"} / {totalCheckIn ? totalCheckIn : "0"}) and how can we improve it?
                    </p>
                </div>
                <div 
                    className="display-content-card"
                    onClick={() => {
                    handlePreText(`Evaluate the number of members for the church attendance platform based on the user registration this quarter (${totalMembers ? totalMembers : "0"}) and how can we improve it?`)
                    }}
                >
                    <p>
                    Evaluate the number of members
                    for the church attendance platform based on the user 
                    registration this quarter 
                    ({totalMembers ? totalMembers : "0"}) and how can we improve it?
                    </p>
                </div>
                </div>
            </div>
            </div>
        )}
    </div>
  );
};

export default ContentDisplayArea;