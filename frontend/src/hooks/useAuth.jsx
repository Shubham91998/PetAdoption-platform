import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const initialAuthUser = localStorage.getItem('user');
  const [authUser, setAuthUser] = useState(
    initialAuthUser ? JSON.parse(initialAuthUser) : null
  );

  useEffect(() => {
    if (authUser) {
      localStorage.setItem('user', JSON.stringify(authUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
