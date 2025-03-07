import express from 'express';
import { sendEmail } from '../services/emailService.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/send', protect, async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;
    const info = await sendEmail({ to, subject, text, html });
    res.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;