import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create a mock Supabase client if credentials are missing
const createMockClient = () => {
  console.warn('Warning: Using mock Supabase client. Please set up your Supabase credentials in .env');
  return {
    from: (table) => ({
      select: async () => ({ data: [], error: null }),
      insert: async () => ({ data: null, error: null }),
      update: async () => ({ data: null, error: null }),
      delete: async () => ({ data: null, error: null }),
      eq: () => ({
        select: async () => ({ data: null, error: null }),
        update: async () => ({ data: null, error: null }),
        delete: async () => ({ data: null, error: null })
      })
    })
  };
};

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Test the connection
const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('count', { count: 'exact' });
    
    if (error) throw error;
    console.log('Supabase connection successful');
  } catch (error) {
    console.error('Supabase connection error:', error);
  }
};

testConnection();