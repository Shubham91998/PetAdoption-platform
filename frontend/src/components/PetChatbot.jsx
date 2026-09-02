import { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Minus, 
  Send, 
  User, 
  Bot, 
  PawPrint,
  ChevronDown,
  Loader2
} from 'lucide-react';
import axios from 'axios';

const renderInlineText = (text) => text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
  if (part.startsWith('**') && part.endsWith('**')) {
    return <strong key={index} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
  }

  return part;
});

const renderAssistantContent = (content) => content.split(/\r?\n/).map((line, index) => {
  const trimmedLine = line.trim();
  const markdownHeadingMatch = trimmedLine.match(/^#{1,6}\s+(.+?)\s*#*$/);
  const headingMatch = trimmedLine.match(/^\*\*(.+?)\*\*:?$/);
  const bulletMatch = trimmedLine.match(/^(?:[-*•])\s+(.+)$/);
  const numberedMatch = trimmedLine.match(/^\d+[.)]\s+(.+)$/);

  if (!trimmedLine) {
    return <div key={index} className="h-1" aria-hidden="true" />;
  }

  if (markdownHeadingMatch || headingMatch) {
    return (
      <h4 key={index} className="mt-3 mb-1 flex items-center gap-1.5 text-sm font-bold text-blue-700 first:mt-0">
        <PawPrint className="h-3.5 w-3.5 shrink-0 text-blue-500" aria-hidden="true" />
        <span>{renderInlineText((markdownHeadingMatch || headingMatch)[1])}</span>
      </h4>
    );
  }

  if (bulletMatch || numberedMatch) {
    return (
      <div key={index} className="flex gap-2 pl-1">
        <span className="mt-0.5 font-semibold text-blue-500">{bulletMatch ? '•' : `${trimmedLine.match(/^\d+/)[0]}.`}</span>
        <span className="min-w-0">{renderInlineText((bulletMatch || numberedMatch)[1])}</span>
      </div>
    );
  }

  return <p key={index} className="mb-1 last:mb-0">{renderInlineText(trimmedLine)}</p>;
});

const PetChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: "🐾 **Hi! I'm PetPal AI!**\n\nI'm your personal pet assistant. Ask me anything about:\n• Pet adoption 🏠\n• Pet care and health 🩺\n• Breed recommendations 🐕\n• Training tips 🎓\n• Nutrition advice 🍖\n\n**What would you like to know about pets today?**",
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async (text) => {
    const messageText = text || inputValue.trim();
    if (!messageText || isLoading) return;

    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Add typing indicator
    const typingId = `typing-${Date.now()}`;
    setMessages(prev => [...prev, {
      id: typingId,
      role: 'assistant',
      content: '',
      isTyping: true,
      timestamp: Date.now()
    }]);

    try {
      // Call AI API
      const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8001').replace(/\/$/, '');
      const response = await axios.post(`${apiUrl}/api/ai/chat`, {
        message: messageText,
        history: messages
          .filter(message =>
            (message.role === 'user' || message.role === 'assistant') &&
            !message.isTyping &&
            !message.isError &&
            message.content
          )
          .slice(-12)
          .map(message => ({ role: message.role, content: message.content }))
      }, { withCredentials: true });

      // Remove typing indicator
      setMessages(prev => prev.filter(m => m.id !== typingId));

      if (response.data?.success) {
        // Add AI response
        const aiMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: response.data.content,
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      console.error('Chat error:', error.response?.data || error.message || error);
      setMessages(prev => prev.filter(m => m.id !== typingId));
      const serverMessage = error.response?.status === 400
        ? (error.response.data?.content || 'Please enter a shorter pet-related question.')
        : error.response?.status === 500
        ? '🐾 Sorry, the server is having trouble. Please try again shortly.'
        : '😅 Sorry, I\'m having trouble connecting. Please check your internet connection and try again.';
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: serverMessage,
        isError: true,
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickSuggestions = [
    { text: "🐕 Suggest a friendly dog breed", icon: "🐕" },
    { text: "🏠 Best pets for apartments", icon: "🏠" },
    { text: "🍖 What should I feed my puppy?", icon: "🍖" },
    { text: "🩺 How often should I vaccinate my cat?", icon: "🩺" },
    { text: "🎓 How to potty train a dog?", icon: "🎓" },
    { text: "🐈 Adopt vs Buy - which is better?", icon: "🐈" }
  ];

  // Floating button when chat is closed
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[min(450px,95vw)] rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 rounded-full p-1.5">
            <PawPrint className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">PetPal AI</h3>
            <p className="text-blue-100 text-xs">Your Pet Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white hover:bg-white/20 rounded-lg p-1.5 transition-colors"
            aria-label="Minimize"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20 rounded-lg p-1.5 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Minimized State */}
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 border-t border-gray-200 flex items-center justify-center gap-2 text-gray-700 text-sm transition-colors"
        >
          <ChevronDown className="h-4 w-4" />
          Restore chat
        </button>
      ) : (
        <>
          {/* Messages Container */}
          <div className="h-[480px] overflow-y-auto bg-gray-50">
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id}>
                  {/* User Message */}
                  {message.role === 'user' && (
                    <div className="flex justify-end gap-2">
                      <div className="max-w-[85%] bg-blue-600 rounded-2xl rounded-br-md px-4 py-2.5">
                        <p className="text-white text-sm whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Assistant Message */}
                  {message.role === 'assistant' && !message.isTyping && !message.isError && (
                    <div className="flex gap-2">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1 bg-white rounded-2xl rounded-tl-md px-4 py-2.5 shadow-sm">
                        <div className="text-gray-800 text-sm break-words leading-relaxed">
                          {renderAssistantContent(message.content)}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Typing Indicator */}
                  {message.isTyping && (
                    <div className="flex gap-2">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {message.isError && (
                    <div className="flex gap-2">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="flex-1 bg-red-50 rounded-2xl rounded-tl-md px-4 py-2.5 border border-red-200">
                        <p className="text-red-700 text-sm">{message.content}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="border-t border-gray-200 bg-white px-4 py-3">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-300">
              {quickSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(suggestion.text)}
                  disabled={isLoading}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{suggestion.icon}</span>
                  <span>{suggestion.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about pets..."
                rows={1}
                className="flex-1 resize-none rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                style={{ minHeight: '40px', maxHeight: '100px' }}
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !inputValue.trim()}
                className="rounded-xl bg-blue-600 px-4 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">
              🐾 PetPal AI • Powered by PawFect Pet Adoption Platform.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PetChatbot;