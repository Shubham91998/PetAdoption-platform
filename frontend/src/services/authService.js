import apiClient from './apiClient';

export const signup = (userData) => apiClient.post('/user/signup', userData);
export const login = (credentials) => apiClient.post('/user/login', credentials);
export const createNutritionUser = (nutritionData) => apiClient.post('/user/create', nutritionData);
