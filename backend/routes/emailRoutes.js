import express from 'express';
import pkg from 'express-openid-connect';
const { requiresAuth } = pkg;
import {
  sendEmail,
  getEmailHistory,
  getEmailTemplate,
  updateEmailTemplate
} from '../controllers/emailController.js';

const router = express.Router();

// Protect all email routes
router.use(requiresAuth());

router.post('/send', sendEmail);
router.get('/history', getEmailHistory);
router.get('/templates/:id', getEmailTemplate);
router.put('/templates/:id', updateEmailTemplate);

export default router;