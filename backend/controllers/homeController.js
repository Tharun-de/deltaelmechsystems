import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

export const getHomeContent = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('home_content')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching home content:', error);
      return res.status(500).json({ error: 'Failed to fetch home content' });
    }

    res.json(data || {});
  } catch (error) {
    console.error('Home content error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateHomeContent = async (req, res) => {
  try {
    const updates = req.body;
    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('home_content')
      .upsert(updates)
      .select()
      .single();

    if (error) {
      console.error('Error updating home content:', error);
      return res.status(500).json({ error: 'Failed to update home content' });
    }

    res.json(data);
  } catch (error) {
    console.error('Home content update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 