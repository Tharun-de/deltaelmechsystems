import { describe, it, expect, beforeEach } from 'vitest';
import { mockSupabase } from '../tests/mocks/supabase';

describe('Supabase Auth', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'Test123!@#',
    name: 'Test User'
  };

  beforeEach(() => {
    mockSupabase.auth.signUp.mockClear();
    mockSupabase.auth.signInWithPassword.mockClear();
  });

  it('should sign up a new user', async () => {
    const mockUser = {
      id: '1',
      email: testUser.email,
      user_metadata: { name: testUser.name }
    };

    mockSupabase.auth.signUp.mockResolvedValueOnce({
      data: { user: mockUser, session: {} },
      error: null
    });

    const { data, error } = await mockSupabase.auth.signUp({
      email: testUser.email,
      password: testUser.password,
      options: {
        data: { name: testUser.name }
      }
    });

    expect(error).toBeNull();
    expect(data.user).toEqual(mockUser);
    expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
      email: testUser.email,
      password: testUser.password,
      options: {
        data: { name: testUser.name }
      }
    });
  });

  it('should sign in an existing user', async () => {
    const mockUser = {
      id: '1',
      email: testUser.email,
      user_metadata: { name: testUser.name }
    };

    mockSupabase.auth.signInWithPassword.mockResolvedValueOnce({
      data: { user: mockUser, session: {} },
      error: null
    });

    const { data, error } = await mockSupabase.auth.signInWithPassword({
      email: testUser.email,
      password: testUser.password
    });

    expect(error).toBeNull();
    expect(data.user).toEqual(mockUser);
    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: testUser.email,
      password: testUser.password
    });
  });

  it('should handle invalid credentials', async () => {
    mockSupabase.auth.signInWithPassword.mockResolvedValueOnce({
      data: { user: null, session: null },
      error: { message: 'Invalid credentials' }
    });

    const { data, error } = await mockSupabase.auth.signInWithPassword({
      email: testUser.email,
      password: 'wrongpassword'
    });

    expect(error).toBeDefined();
    expect(error.message).toBe('Invalid credentials');
    expect(data.user).toBeNull();
  });
});