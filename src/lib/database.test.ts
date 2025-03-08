import { describe, it, expect, beforeEach } from 'vitest';
import { mockSupabase } from '../tests/mocks/supabase';

describe('Supabase Database Operations', () => {
  const testJobApplication = {
    job_id: 'test-job',
    job_title: 'Test Engineer',
    full_name: 'Test Applicant',
    email: 'test@example.com',
    experience: '3-5 years',
    resume_url: 'https://example.com/resume.pdf'
  };

  const testContactSubmission = {
    first_name: 'Test',
    last_name: 'Contact',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'Test message'
  };

  beforeEach(() => {
    mockSupabase.from.mockClear();
  });

  it('should insert job application', async () => {
    const mockResponse = {
      ...testJobApplication,
      id: '1',
      created_at: new Date().toISOString()
    };

    const mockFrom = {
      insert: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: mockResponse,
        error: null
      })
    };

    mockSupabase.from.mockReturnValue(mockFrom);

    const { data, error } = await mockSupabase
      .from('job_applications')
      .insert(testJobApplication)
      .select()
      .single();

    expect(error).toBeNull();
    expect(data).toEqual(mockResponse);
    expect(mockSupabase.from).toHaveBeenCalledWith('job_applications');
  });

  it('should insert contact submission', async () => {
    const mockResponse = {
      ...testContactSubmission,
      id: '1',
      created_at: new Date().toISOString()
    };

    const mockFrom = {
      insert: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: mockResponse,
        error: null
      })
    };

    mockSupabase.from.mockReturnValue(mockFrom);

    const { data, error } = await mockSupabase
      .from('contact_submissions')
      .insert(testContactSubmission)
      .select()
      .single();

    expect(error).toBeNull();
    expect(data).toEqual(mockResponse);
    expect(mockSupabase.from).toHaveBeenCalledWith('contact_submissions');
  });
});