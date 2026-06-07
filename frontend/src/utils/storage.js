export const getStoredUser = () => {
  const stored = localStorage.getItem('user');
  return stored ? JSON.parse(stored) : null;
};

export const clearStoredUser = () => {
  localStorage.removeItem('user');
};
