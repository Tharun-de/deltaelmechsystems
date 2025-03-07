import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { DashboardStats, DashboardUser, Project, Payment, JobApplication, ContactSubmission } from '../lib/types';

export function useAdminDashboard() {
  const queryClient = useQueryClient();

  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ['adminStats'],
    queryFn: async () => {
      // For demo purposes, return mock data
      // In production, this would fetch from Supabase
      return {
        totalUsers: 150,
        activeUsers: 120,
        monthlyRevenue: 75000,
        totalApplications: 45,
        projectsByStatus: {
          planning: 5,
          in_progress: 8,
          completed: 12,
          on_hold: 2
        },
        revenueByMonth: [
          { month: 'Jan', revenue: 65000 },
          { month: 'Feb', revenue: 72000 },
          { month: 'Mar', revenue: 75000 }
        ],
        applicationsByStatus: {
          pending: 20,
          reviewed: 15,
          shortlisted: 8,
          rejected: 2
        }
      };
    }
  });

  // Fetch users
  const { data: users, isLoading: usersLoading } = useQuery<DashboardUser[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  // Update user
  const updateUser = useMutation({
    mutationFn: async ({ userId, updates }: { userId: string; updates: Partial<DashboardUser> }) => {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  // Delete user
  const deleteUser = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  // Fetch projects
  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  // Update project
  const updateProject = useMutation({
    mutationFn: async ({ projectId, updates }: { projectId: string; updates: Partial<Project> }) => {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', projectId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  // Delete project
  const deleteProject = useMutation({
    mutationFn: async (projectId: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  // Fetch payments
  const { data: payments, isLoading: paymentsLoading } = useQuery<Payment[]>({
    queryKey: ['payments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  // Update payment
  const updatePayment = useMutation({
    mutationFn: async ({ paymentId, updates }: { paymentId: string; updates: Partial<Payment> }) => {
      const { data, error } = await supabase
        .from('payments')
        .update(updates)
        .eq('id', paymentId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    }
  });

  // Fetch job applications
  const { data: applications, isLoading: applicationsLoading } = useQuery<JobApplication[]>({
    queryKey: ['applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  // Update job application
  const updateApplication = useMutation({
    mutationFn: async ({ applicationId, updates }: { applicationId: string; updates: Partial<JobApplication> }) => {
      const { data, error } = await supabase
        .from('job_applications')
        .update(updates)
        .eq('id', applicationId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    }
  });

  // Delete job application
  const deleteApplication = useMutation({
    mutationFn: async (applicationId: string) => {
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', applicationId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    }
  });

  // Fetch contact submissions
  const { data: contacts, isLoading: contactsLoading } = useQuery<ContactSubmission[]>({
    queryKey: ['contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  // Update contact submission
  const updateContact = useMutation({
    mutationFn: async ({ contactId, updates }: { contactId: string; updates: Partial<ContactSubmission> }) => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .update(updates)
        .eq('id', contactId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    }
  });

  return {
    stats,
    users,
    projects,
    payments,
    applications,
    contacts,
    loading: statsLoading || usersLoading || projectsLoading || paymentsLoading || applicationsLoading || contactsLoading,
    updateUser,
    deleteUser,
    updateProject,
    deleteProject,
    updatePayment,
    updateApplication,
    deleteApplication,
    updateContact
  };
}