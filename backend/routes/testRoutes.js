import express from 'express';
import supabase from '../config/db.js';

const router = express.Router();

// Test endpoint to check Supabase connection
router.get('/supabase-test', async (req, res) => {
  const { data, error } = await supabase
    .from('users')  // Adjust the table name if needed
    .select('*')
    .limit(1);

  if (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
  res.json({ success: true, data });
});

export default router;
