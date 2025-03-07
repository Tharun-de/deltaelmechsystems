import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler.js';

// Import Auth0 middleware from CommonJS module
import pkg from 'express-openid-connect';
const { auth, requiresAuth } = pkg;

// Import Supabase sync and client
import { syncAuth0UserWithSupabase } from './utils/auth0Sync.js';
import supabase from './config/db.js';

// Load environment variables explicitly from the project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();

// ------------------------
// Auth0 configuration
// ------------------------
const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: process.env.BASE_URL || 'http://localhost:5000',
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
};

// Use Auth0 middleware
app.use(auth(authConfig));

// Add Supabase sync middleware
app.use(async (req, res, next) => {
  if (req.oidc.isAuthenticated()) {
    try {
      const auth0User = req.oidc.user;
      console.log('Processing auth for:', auth0User.email);

      const supabaseUser = await syncAuth0UserWithSupabase(auth0User);
      if (supabaseUser) {
        req.supabaseUser = supabaseUser;
        console.log('Sync successful for:', supabaseUser.email);
      }
    } catch (error) {
      console.error('Sync error:', error);
    }
  }
  next();
});

// ------------------------
// Standard Middleware Setup
// ------------------------
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(helmet());
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 600000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
});
app.use('/api', limiter);

// Logging (only in development)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ------------------------
// Mount Routes
// ------------------------
import authRoutes from './routes/authRoutes.js';
import homeRoutes from './routes/homeRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import formRoutes from './routes/formRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import testRoutes from './routes/testRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/homepage', homeRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/email', emailRoutes);
app.use('/', profileRoutes);
app.use('/api/admin', adminRoutes);

// ------------------------
// Public and Protected Routes
// ------------------------

// Public home route
app.get('/', (req, res) => {
  res.send('Welcome to our public site!');
});

// Explicit login route
app.get('/login', (req, res) => {
  res.oidc.login({ returnTo: '/profile' });
});

// Logout route
app.get('/logout', (req, res) => {
  res.oidc.logout({ returnTo: '/' });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    environment: process.env.NODE_ENV,
    supabaseConnected: !!process.env.SUPABASE_URL,
    auth0Connected: !!process.env.AUTH0_CLIENT_ID
  });
});

// ------------------------
// Error Handling
// ------------------------
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// ------------------------
// Start the Server
// ------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`Supabase URL configured: ${!!process.env.SUPABASE_URL}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

export default app;