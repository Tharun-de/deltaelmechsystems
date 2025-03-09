import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { mockSupabase } from './mocks/supabase';

interface TestWrapperProps {
  children: React.ReactNode;
}

export const TestWrapper: React.FC<TestWrapperProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <AuthProvider supabaseClient={mockSupabase}>
        {children}
      </AuthProvider>
    </BrowserRouter>
  );
};