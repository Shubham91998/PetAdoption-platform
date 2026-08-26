// frontend/src/components/ChatWindow.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Smile, MoreVertical } from 'lucide-react';

const ChatWindow = ({ conversation, messages, onSendMessage, currentUser, onTyping }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    onSendMessage(newMessage);
    setNewMessage('');
    
    // Stop typing indicator
    if (isTyping) {
      onTyping(false);
      setIsTyping(false);
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    
    if (!isTyping) {
      setIsTyping(true);
      onTyping(true);
    }
    
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      onTyping(false);
    }, 1000);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach(msg => {
      const date = new Date(msg.createdAt).toLocaleDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(msg);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);
  const otherParticipant = conversation?.participants?.find(p => p._id !== currentUser?.id);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center space-x-3">
          <img
            src={conversation?.provider?.profilePhoto || 'https://via.placeholder.com/40'}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold">
              {conversation?.provider?.fullName || otherParticipant?.name || 'Chat'}
            </h3>
            <p className="text-xs text-green-600">Online</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-200 rounded-full transition">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(messageGroups).map(([date, dateMessages]) => (
          <div key={date}>
            <div className="text-center my-4">
              <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {date === new Date().toLocaleDateString() ? 'Today' : date}
              </span>
            </div>
            {dateMessages.map((msg, idx) => (
              <div
                key={msg._id || idx}
                className={`flex ${msg.sender === currentUser?.id ? 'justify-end' : 'justify-start'} mb-3`}
              >
                {msg.sender !== currentUser?.id && (
                  <img
                    src={conversation?.provider?.profilePhoto || 'https://via.placeholder.com/32'}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover mr-2 self-end"
                  />
                )}
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.sender === currentUser?.id
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="break-words">{msg.message}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === currentUser?.id ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {formatTime(msg.createdAt)}
                    {msg.sender === currentUser?.id && msg.read && (
                      <span className="ml-1">✓✓</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing Indicator */}
      {conversation?.isTyping && (
        <div className="px-4 py-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            <span className="text-xs text-gray-500 ml-2">Typing...</span>
          </div>
        </div>
      )}

      {/* Message Input */}
      <form onSubmit={handleSend} className="p-4 border-t bg-white">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
          >
            <Paperclip size={20} />
          </button>
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
          >
            <Smile size={20} />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={handleTyping}
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;