import express from 'express';
import pkg from 'express-openid-connect';
const { requiresAuth } = pkg;
import {
  submitJobApplication,
  submitContactForm,
  getJobApplications,
  getContactForms,
  updateJobApplication,
  updateContactForm
} from '../controllers/formController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/job-application', submitJobApplication);
router.post('/contact', submitContactForm);

// Protected routes
router.get('/job-applications', protect, admin, getJobApplications);
router.get('/contacts', protect, admin, getContactForms);
router.put('/job-applications/:id', protect, admin, updateJobApplication);
router.put('/contacts/:id', protect, admin, updateContactForm);

export default router;