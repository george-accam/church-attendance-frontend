import React, { useState, useEffect, createContext, useContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext(null);

//URL of  Socket.io server
const SOCKET_SERVER_URL = 'https://church-attendance-server.onrender.com';
// const SOCKET_SERVER_URL = 'http://localhost:3002';

export const Socket = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const newSocket = io(SOCKET_SERVER_URL);

        setSocket(newSocket);

        newSocket.on('connect', () => {
            setConnected(true);
            console.log('Connected to socket server');
        }); 

        newSocket.on('disconnect', () => {
            setConnected(false);
            console.log('Disconnected from socket server');
        });
        newSocket.on('message', (msg) => {
            setMessage(msg);
        });
        return () => {
            newSocket.disconnect();
            console.log('Socket disconnected');
        };
    }
    , []);

    return (
        <SocketContext.Provider value={{ socket, connected, message }}> 
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () =>{ return useContext(SocketContext)};
