import { User } from '@supabase/supabase-js';

// Basic JSON type for Supabase
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// User Types
export interface DashboardUser extends User {
  role: 'admin' | 'developer' | 'client';
  name: string;
  status: 'active' | 'inactive';
}

// Project Types
export interface Project {
  id: string;
  title: string;
  description: string;
  client_id: string;
  developer_ids: string[];
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  start_date: string;
  end_date?: string;
  budget: number;
  created_at: string;
  updated_at: string;
}

// Payment Types
export interface Payment {
  id: string;
  project_id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: 'stripe' | 'razorpay';
  transaction_id: string;
  created_at: string;
  updated_at: string;
}

// Job Application Types
export interface JobApplication {
  id: string;
  job_id: string;
  job_title: string;
  full_name: string;
  email: string;
  experience: string;
  linkedin?: string;
  resume_url: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

// Contact Submission Types
export interface ContactSubmission {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: 'new' | 'in-progress' | 'resolved';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

// Dashboard Statistics Types
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  monthlyRevenue: number;
  totalApplications: number;
  projectsByStatus: {
    planning: number;
    in_progress: number;
    completed: number;
    on_hold: number;
  };
  revenueByMonth: {
    month: string;
    revenue: number;
  }[];
  applicationsByStatus: {
    pending: number;
    reviewed: number;
    shortlisted: number;
    rejected: number;
  };
}

// Supabase Database Types
export interface Database {
  public: {
    Tables: {
      business_profiles: {
        Row: {
          id: string
          auth_user_id: string
          role: 'admin' | 'manager' | 'client' | 'site_supervisor'
          company_name: string
          company_registration_number: string | null
          gst_number: string | null
          contact_person_name: string
          email: string
          phone: string | null
          alternate_phone: string | null
          address: string | null
          city: string | null
          state: string | null
          postal_code: string | null
          country: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['business_profiles']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['business_profiles']['Insert']>
      }
      contact_submissions: {
        Row: ContactSubmission
        Insert: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['contact_submissions']['Insert']>
      }
      job_applications: {
        Row: JobApplication
        Insert: Omit<JobApplication, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['job_applications']['Insert']>
      }
      projects: {
        Row: Project
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['projects']['Insert']>
      }
      payments: {
        Row: Payment
        Insert: Omit<Payment, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['payments']['Insert']>
      }
    }
  }
}