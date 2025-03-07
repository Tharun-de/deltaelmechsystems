import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'supabase.auth.token',
    storage: localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Helper function to check if user has admin role
export const isAdmin = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data: profile } = await supabase
    .from('business_profiles')
    .select('role')
    .eq('auth_user_id', user.id)
    .single();

  return profile?.role === 'admin';
};

// Helper function to get user profile
export const getUserProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('business_profiles')
    .select('*')
    .eq('auth_user_id', user.id)
    .single();

  return profile;
};

// Helper function to handle contact form submissions
export const submitContactForm = async (formData: Omit<Database['public']['Tables']['contact_submissions']['Insert'], 'status'>) => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([{ ...formData, status: 'new' }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Helper function to handle job applications
export const submitJobApplication = async (formData: Omit<Database['public']['Tables']['job_applications']['Insert'], 'status'>) => {
  const { data, error } = await supabase
    .from('job_applications')
    .insert([{ ...formData, status: 'pending' }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Helper function to get submissions for admin
export const getSubmissions = async (type: 'contact' | 'job') => {
  const table = type === 'contact' ? 'contact_submissions' : 'job_applications';
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Helper function to update submission status
export const updateSubmissionStatus = async (
  type: 'contact' | 'job',
  id: string,
  status: string,
  notes?: string
) => {
  const table = type === 'contact' ? 'contact_submissions' : 'job_applications';
  const { data, error } = await supabase
    .from(table)
    .update({ status, admin_notes: notes })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Test account credentials for development
export const TEST_ACCOUNTS = {
  admin: {
    email: 'admin@example.com',
    password: 'admin123',
    userData: {
      id: 'test-admin-id',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin'
    }
  },
  developer: {
    email: 'dev@example.com',
    password: 'dev123',
    userData: {
      id: 'test-dev-id',
      name: 'Developer User',
      email: 'dev@example.com',
      role: 'developer'
    }
  },
  client: {
    email: 'client@example.com',
    password: 'client123',
    userData: {
      id: 'test-client-id',
      name: 'Client User',
      email: 'client@example.com',
      role: 'client'
    }
  }
};