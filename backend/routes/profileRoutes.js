import express from 'express';
import pkg from 'express-openid-connect';  // Change this line
const { requiresAuth } = pkg;  // Add this line
import supabase from '../config/db.js';
import { syncAuth0UserWithSupabase } from '../utils/auth0Sync.js';

const router = express.Router();

// Get profile
router.get('/profile', requiresAuth(), async (req, res) => {
  try {
    const { data: profile, error } = await supabase
      .from('business_profiles')
      .select('*')
      .eq('auth0_id', req.oidc.user.sub)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return res.status(500).json({ error: 'Failed to fetch profile' });
    }

    if (!profile) {
      console.log('No profile found, attempting sync');
      const syncedProfile = await syncAuth0UserWithSupabase(req.oidc.user);
      if (syncedProfile) {
        return res.json(syncedProfile);
      }
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(profile);

  } catch (error) {
    console.error('Profile route error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Add update profile route
router.put('/profile/update', requiresAuth(), async (req, res) => {
  try {
    const updates = req.body;
    
    // Fields that users are not allowed to update
    const restrictedFields = ['id', 'auth0_id', 'email', 'created_at', 'is_active'];
    restrictedFields.forEach(field => delete updates[field]);

    // Add updated_at timestamp
    updates.updated_at = new Date().toISOString();

    const { data: profile, error } = await supabase
      .from('business_profiles')
      .update(updates)
      .eq('auth0_id', req.oidc.user.sub)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      return res.status(500).json({ error: 'Failed to update profile' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;