import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import { mockSupabase, resetMocks } from './mocks/supabase';

// Create test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <AuthProvider supabaseClient={mockSupabase}>
      {children}
    </AuthProvider>
  </BrowserRouter>
);

describe('Authentication Components', () => {
  beforeEach(() => {
    resetMocks();
  });

  describe('LoginPage', () => {
    beforeEach(() => {
      render(<LoginPage />, { wrapper: TestWrapper });
    });

    it('renders login form', () => {
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('handles successful login', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        user_metadata: { name: 'Test User', role: 'client' }
      };

      mockSupabase.auth.signInWithPassword.mockResolvedValueOnce({
        data: { user: mockUser, session: {} },
        error: null
      });

      await userEvent.type(screen.getByLabelText(/email address/i), 'test@example.com');
      await userEvent.type(screen.getByLabelText(/password/i), 'Test123!@#');
      await userEvent.click(screen.getByRole('button', { name: /login/i }));

      await waitFor(() => {
        expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'Test123!@#'
        });
      });
    });

    it('handles login error', async () => {
      mockSupabase.auth.signInWithPassword.mockResolvedValueOnce({
        data: { user: null, session: null },
        error: { message: 'Invalid login credentials' }
      });

      await userEvent.type(screen.getByLabelText(/email address/i), 'test@example.com');
      await userEvent.type(screen.getByLabelText(/password/i), 'wrongpass');
      await userEvent.click(screen.getByRole('button', { name: /login/i }));

      await waitFor(() => {
        expect(screen.getByText(/Invalid login credentials/i)).toBeInTheDocument();
      });
    });
  });

  describe('SignupPage', () => {
    beforeEach(() => {
      render(<SignupPage />, { wrapper: TestWrapper });
    });

    it('renders signup form', () => {
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    });

    it('validates password match', async () => {
      await userEvent.type(screen.getByLabelText(/full name/i), 'Test User');
      await userEvent.type(screen.getByLabelText(/email address/i), 'test@example.com');
      await userEvent.type(screen.getByLabelText(/^password$/i), 'Test123!@#');
      await userEvent.type(screen.getByLabelText(/confirm password/i), 'Test123!@#different');
      await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

      await waitFor(() => {
        expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
      });
    });

    it('handles successful registration', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        user_metadata: { name: 'Test User', role: 'client' }
      };

      mockSupabase.auth.signUp.mockResolvedValueOnce({
        data: { user: mockUser, session: {} },
        error: null
      });

      await userEvent.type(screen.getByLabelText(/full name/i), 'Test User');
      await userEvent.type(screen.getByLabelText(/email address/i), 'test@example.com');
      await userEvent.type(screen.getByLabelText(/^password$/i), 'Test123!@#');
      await userEvent.type(screen.getByLabelText(/confirm password/i), 'Test123!@#');
      await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

      await waitFor(() => {
        expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'Test123!@#',
          options: {
            data: { name: 'Test User' }
          }
        });
      });
    });
  });
});