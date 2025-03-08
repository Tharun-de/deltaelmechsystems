import { vi } from 'vitest';

export const mockSupabase = {
  auth: {
    signUp: vi.fn().mockImplementation(() => Promise.resolve({
      data: { user: null },
      error: null
    })),
    signInWithPassword: vi.fn().mockImplementation(() => Promise.resolve({
      data: { user: null },
      error: null
    })),
    signOut: vi.fn().mockImplementation(() => Promise.resolve({
      error: null
    })),
    getSession: vi.fn().mockImplementation(() => Promise.resolve(null)),
    onAuthStateChange: vi.fn().mockImplementation((callback) => ({
      data: { subscription: { unsubscribe: vi.fn() } }
    }))
  },
  from: vi.fn().mockImplementation((table) => ({
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockImplementation(() => Promise.resolve({
      data: null,
      error: null
    })),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis()
  }))
};

vi.mock('@supabase/supabase-js', () => ({
  createClient: () => mockSupabase
}));

export const resetMocks = () => {
  Object.values(mockSupabase.auth).forEach(mock => {
    if (vi.isMockFunction(mock)) {
      mock.mockClear();
    }
  });
};