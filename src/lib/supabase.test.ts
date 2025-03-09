import { describe, it, expect } from 'vitest';
import { supabase } from './supabase';

describe('Supabase Connection', () => {
  it('should be properly initialized', () => {
    expect(supabase).toBeDefined();
    expect(supabase.auth).toBeDefined();
    expect(process.env.VITE_SUPABASE_URL).toBeDefined();
    expect(process.env.VITE_SUPABASE_ANON_KEY).toBeDefined();
  });

  it('should have valid configuration', () => {
    expect(process.env.VITE_SUPABASE_URL).toBe('https://test.supabase.co');
    expect(process.env.VITE_SUPABASE_ANON_KEY).toBe('test-key');
  });
});