import apiClient from './apiClient';

export const fetchOriginalPets = () => apiClient.get('/original/pets/getallpet');
export const fetchAllPets = () => apiClient.get('/pets/allpets');
export const uploadPet = (petData) => apiClient.post('/pets/petpost', petData);
export const deletePet = (petId) => apiClient.delete(`/pets/deletepet/${petId}`);
export const addOriginalPet = (petData) => apiClient.post('/original/pets/addpet', petData);
export const fetchPetDetails = (userId) => apiClient.get(`/original/pets/finddetails/${userId}`);
