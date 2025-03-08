import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const userRole = user?.user_metadata?.role;
  
  // If a role is required and the user doesn't have the correct role, redirect to home
  if (requiredRole && (!userRole || userRole !== requiredRole)) {
    console.log('Access denied - Required role:', requiredRole, 'User role:', userRole);
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;