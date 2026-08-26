// frontend/src/pages/Chat.jsx
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const Chat = ({ user, provider, conversationId: initialConversationId }) => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [typing, setTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);
    
    newSocket.emit('join', user.id);
    
    newSocket.on('receive_message', (data) => {
      if (currentConversation && data.conversationId === currentConversation._id) {
        setMessages(prev => [...prev, data.message]);
      }
    });
    
    newSocket.on('user_typing', (data) => {
      if (currentConversation && data.conversationId === currentConversation._id) {
        setUserTyping(data.isTyping);
      }
    });
    
    return () => newSocket.close();
  }, [user.id]);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (currentConversation) {
      fetchMessages(currentConversation._id);
    }
  }, [currentConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/chat/conversations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConversations(response.data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/chat/messages/${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentConversation) return;
    
    const messageData = {
      conversationId: currentConversation._id,
      senderId: user.id,
      receiverId: currentConversation.participants.find(p => p._id !== user.id)._id,
      message: newMessage
    };
    
    socket.emit('send_message', messageData);
    setNewMessage('');
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    
    if (!typing) {
      setTyping(true);
      socket.emit('typing', {
        receiverId: currentConversation.participants.find(p => p._id !== user.id)._id,
        conversationId: currentConversation._id,
        isTyping: true
      });
    }
    
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setTyping(false);
      socket.emit('typing', {
        receiverId: currentConversation.participants.find(p => p._id !== user.id)._id,
        conversationId: currentConversation._id,
        isTyping: false
      });
    }, 1000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Conversations Sidebar */}
      <div className="w-1/3 border-r bg-gray-50">
        <div className="p-4 border-b bg-white">
          <h3 className="font-semibold text-lg">Messages</h3>
        </div>
        <div className="overflow-y-auto h-[calc(600px-73px)]">
          {conversations.map(conv => (
            <div
              key={conv._id}
              onClick={() => setCurrentConversation(conv)}
              className={`p-4 cursor-pointer hover:bg-gray-100 transition ${
                currentConversation?._id === conv._id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={conv.provider?.profilePhoto || 'https://via.placeholder.com/50'}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold">
                    {conv.provider?.fullName || conv.participants.find(p => p._id !== user.id)?.name}
                  </p>
                  <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(conv.lastMessageTime).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {currentConversation ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b bg-white">
            <div className="flex items-center space-x-3">
              <img
                src={currentConversation.provider?.profilePhoto || 'https://via.placeholder.com/50'}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">
                  {currentConversation.provider?.fullName || 
                   currentConversation.participants.find(p => p._id !== user.id)?.name}
                </p>
                {userTyping && <p className="text-xs text-green-600">Typing...</p>}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(msg => (
              <div
                key={msg._id}
                className={`flex ${msg.sender === user.id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.sender === user.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p>{msg.message}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === user.id ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={sendMessage} className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={handleTyping}
                placeholder="Type a message..."
                className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a conversation to start chatting
        </div>
      )}
    </div>
  );
};

export default Chat;