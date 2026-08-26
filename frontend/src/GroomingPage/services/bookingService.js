// frontend/src/services/bookingService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/bookings';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const bookingService = {
  // Create new booking
  createBooking: async (providerId, bookingData) => {
    try {
      const response = await axios.post(`${API_URL}/${providerId}`, bookingData, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user's bookings
  getUserBookings: async () => {
    try {
      const response = await axios.get(`${API_URL}/user/my-bookings`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get provider's bookings
  getProviderBookings: async () => {
    try {
      const response = await axios.get(`${API_URL}/provider/my-bookings`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update booking status
  updateBookingStatus: async (bookingId, status) => {
    try {
      const response = await axios.put(
        `${API_URL}/${bookingId}/status`,
        { status },
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Cancel booking
  cancelBooking: async (bookingId) => {
    try {
      const response = await axios.put(
        `${API_URL}/${bookingId}/cancel`,
        {},
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get booking by ID
  getBookingById: async (bookingId) => {
    try {
      const response = await axios.get(`${API_URL}/${bookingId}`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};