import { User as SupabaseUser } from '@supabase/supabase-js';

export interface User extends SupabaseUser {
  user_metadata: {
    name: string;
    role: 'admin' | 'manager' | 'client';
  };
}

export interface AuthError {
  message: string;
  status?: number;
} 