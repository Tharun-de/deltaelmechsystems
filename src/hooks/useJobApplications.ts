import { useState, useEffect } from 'react';
import { supabase } from "@/config/supabase";
import type { JobApplication } from '../lib/types';

export function useJobApplications(userId?: string) {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, [userId]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      let query = supabase.from('job_applications').select('*');
      
      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const submitApplication = async (applicationData: Omit<JobApplication, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .insert([applicationData])
        .select()
        .single();

      if (error) throw error;
      setApplications(prev => [data, ...prev]);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const updateApplicationStatus = async (id: string, status: JobApplication['status'], notes?: string) => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .update({ status, admin_notes: notes })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setApplications(prev => prev.map(app => app.id === id ? data : app));
      return data;
    } catch (err) {
      throw err;
    }
  };

  return {
    applications,
    loading,
    error,
    submitApplication,
    updateApplicationStatus,
    refreshApplications: fetchApplications
  };
}