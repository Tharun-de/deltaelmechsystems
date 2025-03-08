import express from 'express';
import pkg from 'express-openid-connect';
const { requiresAuth } = pkg;
import {
  getProfile,
  updateProfile,
  getNotifications,
  markNotificationAsRead
} from '../controllers/profileController.js';

const router = express.Router();

// Protect all profile routes
router.use(requiresAuth());

// Profile management
router.route('/profile')
  .get(getProfile)
  .put(updateProfile);

// Notifications
router.get('/notifications', getNotifications);
router.put('/notifications/:id/read', markNotificationAsRead);

export default router;