import express from 'express';
import pkg from 'express-openid-connect';
const { requiresAuth } = pkg;
import {
  createPaymentIntent,
  createRazorpayOrder,
  verifyRazorpayPayment
} from '../controllers/paymentController.js';

const router = express.Router();

// Protect all payment routes
router.use(requiresAuth());

// Stripe payment routes
router.post('/stripe/create-payment-intent', createPaymentIntent);

// Razorpay payment routes
router.post('/razorpay/create-order', createRazorpayOrder);
router.post('/razorpay/verify-payment', verifyRazorpayPayment);

export default router;