import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { mockSupabase, resetMocks } from './mocks/supabase';

// Reset all mocks before each test
beforeEach(() => {
  resetMocks();
});

// Mock window.scrollTo
window.scrollTo = vi.fn();

// Mock BroadcastChannel
class MockBroadcastChannel {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  postMessage = vi.fn();
  addEventListener = vi.fn();
  removeEventListener = vi.fn();
  close = vi.fn();
  on = vi.fn();
}

// @ts-ignore
global.BroadcastChannel = MockBroadcastChannel;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock ResizeObserver
window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock environment variables
process.env.VITE_SUPABASE_URL = 'https://test.supabase.co';
process.env.VITE_SUPABASE_ANON_KEY = 'test-key';

// Mock fetch
global.fetch = vi.fn();

// Export mocked supabase instance
export { mockSupabase };