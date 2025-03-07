import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { ContactSubmission } from '../lib/types';

export function useContactSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateSubmissionStatus = async (id: string, status: ContactSubmission['status'], notes?: string) => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .update({ status, admin_notes: notes, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setSubmissions(prev => prev.map(sub => sub.id === id ? data : sub));
      return data;
    } catch (err) {
      throw err;
    }
  };

  return {
    submissions,
    loading,
    error,
    updateSubmissionStatus,
    refreshSubmissions: fetchSubmissions
  };
}