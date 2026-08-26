// frontend/src/services/chatService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/chat';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const chatService = {
  // Get or create conversation
  getOrCreateConversation: async (providerId) => {
    try {
      const response = await axios.post(
        `${API_URL}/conversation/${providerId}`,
        {},
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user's conversations
  getUserConversations: async () => {
    try {
      const response = await axios.get(`${API_URL}/conversations`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get conversation messages
  getConversationMessages: async (conversationId) => {
    try {
      const response = await axios.get(`${API_URL}/messages/${conversationId}`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Mark messages as read
  markAsRead: async (conversationId) => {
    try {
      const response = await axios.put(
        `${API_URL}/read/${conversationId}`,
        {},
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};