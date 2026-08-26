// frontend/src/services/providerService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/providers';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const providerService = {
  // Apply to become a provider
  applyForProvider: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/apply`, formData, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get nearby providers
  getNearbyProviders: async (lat, lng, radius = 10, page = 1) => {
    try {
      const response = await axios.get(`${API_URL}/nearby`, {
        params: { lat, lng, radius, page }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Search providers
  searchProviders: async (searchParams) => {
    try {
      const response = await axios.get(`${API_URL}/search`, {
        params: searchParams
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get provider by ID
  getProviderById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all applications (Admin only)
  getApplications: async (status = 'Pending') => {
    try {
      const response = await axios.get(`${API_URL}/applications`, {
        params: { status },
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Approve provider (Admin only)
  approveProvider: async (id) => {
    try {
      const response = await axios.put(
        `${API_URL}/applications/${id}/approve`,
        {},
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Reject provider (Admin only)
  rejectProvider: async (id) => {
    try {
      const response = await axios.put(
        `${API_URL}/applications/${id}/reject`,
        {},
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update provider dashboard
  updateDashboard: async (data) => {
    try {
      const response = await axios.put(`${API_URL}/dashboard`, data, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get current provider profile
  getCurrentProvider: async () => {
    try {
      const response = await axios.get(`${API_URL}/me`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};