import { vi } from 'vitest';

export const handlers = {
  auth: {
    login: vi.fn().mockImplementation(async (email, password) => {
      if (email === 'test@example.com' && password === 'Test123!@#') {
        return {
          success: true,
          user: {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            role: 'client'
          }
        };
      }
      throw new Error('Invalid credentials');
    }),

    register: vi.fn().mockImplementation(async (name, email, password) => {
      return {
        success: true,
        user: {
          id: '1',
          name,
          email,
          role: 'client'
        }
      };
    })
  }
};

// Mock fetch responses
global.fetch = vi.fn((url) => {
  if (url.includes('/api/auth/login')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(handlers.auth.login())
    });
  }
  if (url.includes('/api/auth/register')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(handlers.auth.register())
    });
  }
  return Promise.reject(new Error(`Unhandled request: ${url}`));
});