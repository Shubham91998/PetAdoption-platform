import apiClient from './apiClient';

export const fetchPetRequests = () => apiClient.get('/pets/api/pet-requests');
export const updatePetRequestStatus = (petRequestId, processStatus) =>
  apiClient.put(`/pets/pet-requests/${petRequestId}/update-status`, { processStatus });
export const fetchUserPetRequest = (userId) => apiClient.get(`/pets/api/pet-requests/${userId}`);
