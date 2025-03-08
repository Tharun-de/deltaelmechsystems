// Initialize New Relic if license key is available
let newrelic;
try {
  if (process.env.NODE_ENV === 'production' && process.env.NEW_RELIC_LICENSE_KEY && process.env.NEW_RELIC_LICENSE_KEY !== 'dummy_key') {
    newrelic = await import('newrelic');
  } else {
    console.log('New Relic license key not configured or not in production mode, skipping initialization');
  }
} catch (error) {
  console.warn('Failed to initialize New Relic:', error.message);
}

import dotenv from 'dotenv';
// Load environment variables explicitly from the project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import errorHandler from './middleware/errorHandler.js';
import csrf from 'csurf';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import Logger from './config/logger.js';
import cache from './services/cache.js';

// Import Supabase client
import { supabase } from './config/db.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read swagger.json
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'swagger.json'), 'utf8'));

const app = express();

// Add New Relic transaction handling
try {
  if (newrelic?.middleware?.webframework) {
    app.use(newrelic.middleware.webframework({
      enabled: true,
      insertTraceHeader: true,
    }));
    console.log('New Relic middleware initialized successfully');
  } else {
    console.log('New Relic middleware not available, skipping initialization');
  }
} catch (error) {
  console.warn('Failed to initialize New Relic middleware:', error.message);
}

// ------------------------
// Standard Middleware Setup
// ------------------------

// Enable gzip compression
app.use(compression());

// Security middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token']
}));

// Enhanced security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "*.newrelic.com"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https:'],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", process.env.SUPABASE_URL, "*.nr-data.net"],
      fontSrc: ["'self'", 'https:', 'data:'],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'self'"]
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(xss());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 600000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// CSRF protection (exclude Swagger UI and API docs)
app.use((req, res, next) => {
  if (req.path.startsWith('/api-docs')) {
    next();
  } else {
    csrf({ cookie: true })(req, res, next);
  }
});

app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Custom logging middleware with performance tracking
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    Logger.http(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
    );
    // Track response time in New Relic if initialized
    if (newrelic) {
      newrelic.recordMetric('Custom/ResponseTime', duration);
    }
  });
  next();
});

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Delta Elmech Systems API Documentation'
}));

// ------------------------
// Mount Routes
// ------------------------
import authRoutes from './routes/authRoutes.js';
import homeRoutes from './routes/homeRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import formRoutes from './routes/formRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/homepage', homeRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
} else {
  // Public home route for development
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Health check route with enhanced monitoring
app.get('/health', async (req, res) => {
  const redisStatus = await cache.set('health-check', 'ok', 10);
  const metrics = {
    status: 'ok',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    supabaseConnected: !!process.env.SUPABASE_URL,
    redisConnected: redisStatus,
    version: process.env.npm_package_version,
    newrelicEnabled: !!process.env.NEW_RELIC_LICENSE_KEY
  };

  // Track metrics in New Relic
  newrelic.recordCustomEvent('HealthCheck', metrics);
  
  res.json(metrics);
});

// ------------------------
// Error Handling
// ------------------------
app.use((err, req, res, next) => {
  // Track error in New Relic only if initialized
  if (newrelic) {
    newrelic.noticeError(err);
  }
  Logger.error('Unhandled error:', err);
  errorHandler(err, req, res, next);
});

// 404 handler
app.use((req, res) => {
  Logger.warn(`404 - Not Found: ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// ------------------------
// Start the Server
// ------------------------
const PORT = process.env.PORT || 5002;
const server = app.listen(PORT, () => {
  Logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  Logger.info(`API Documentation available at http://localhost:${PORT}/api-docs`);
  Logger.info(`Supabase URL configured: ${!!process.env.SUPABASE_URL}`);
  Logger.info(`New Relic monitoring enabled: ${!!process.env.NEW_RELIC_LICENSE_KEY}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  if (newrelic) {
    newrelic.noticeError(err);
  }
  Logger.error('Unhandled Promise Rejection:', err);
  // Give the server a grace period to finish pending requests
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  if (newrelic) {
    newrelic.noticeError(err);
  }
  Logger.error('Uncaught Exception:', err);
  // Give the server a grace period to finish pending requests
  server.close(() => process.exit(1));
});

export default app;
