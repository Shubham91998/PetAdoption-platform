// frontend/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { authUser } = useAuth();
  
  // Check if user is logged in
  if (!authUser) {
    return <Navigate to="/signup" replace />;
  }
  
  // Check if user has required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(authUser.role)) {
    // Redirect based on user role
    if (authUser.role === 'admin') {
      return <Navigate to="/PetManage" replace />;
    } else if (authUser.role === 'provider') {
      return <Navigate to="/provider/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }
  
  return children;
};

export default ProtectedRoute;