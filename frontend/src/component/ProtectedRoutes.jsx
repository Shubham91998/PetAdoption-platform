import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

const ProtectedRoutes = ({ children }) => {
  const { authUser } = useAuth();

  // If user is authenticated, render the child components
  if (authUser) {
    return children;
  }

  // If user is not authenticated, redirect to login page
  return <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
