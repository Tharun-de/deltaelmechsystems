import { useState } from 'react';
import { supabase } from '@/config/supabase';
import type { ContactSubmission } from '../lib/types';

export function useContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitContactForm = async (formData: Omit<ContactSubmission, 'id' | 'status' | 'created_at' | 'updated_at' | 'admin_notes'>) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([{
          ...formData,
          status: 'new'
        }])
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (err) {
      console.error('Error submitting contact form:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    submitContactForm
  };
}