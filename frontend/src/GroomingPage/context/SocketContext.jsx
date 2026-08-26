// frontend/src/context/SocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children, userId }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (userId) {
      const newSocket = io('http://localhost:5000', {
        transports: ['websocket'],
        withCredentials: true
      });
      
      newSocket.on('connect', () => {
        console.log('Socket connected');
        setIsConnected(true);
        newSocket.emit('join', userId);
      });
      
      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
        setIsConnected(false);
      });
      
      setSocket(newSocket);
      
      return () => {
        newSocket.close();
      };
    }
  }, [userId]);

  const value = {
    socket,
    isConnected
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};