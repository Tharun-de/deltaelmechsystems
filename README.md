# Delta Elmech Systems

A modern web application for project management and client interactions.

## Deployment Guide

### Prerequisites

1. Install required tools:
   - Node.js (v18 or later)
   - npm (v9 or later)
   - Git

2. Sign up for services:
   - [Vercel](https://vercel.com) for frontend hosting
   - [Railway](https://railway.app) for backend hosting
   - [Supabase](https://supabase.com) for database
   - [Sentry](https://sentry.io) for error tracking
   - [New Relic](https://newrelic.com) for performance monitoring

### Environment Setup

1. Create `.env` file in the project root:
```env
# Frontend
VITE_API_URL=your_backend_url
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SENTRY_DSN=your_sentry_dsn

# Backend
PORT=5002
NODE_ENV=production
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEW_RELIC_LICENSE_KEY=your_newrelic_license_key
CORS_ORIGIN=your_frontend_url
```

### Database Setup

1. Run database migrations:
```bash
npm run db:migrate
```

2. Seed initial data (if needed):
```bash
npm run db:seed
```

### Deployment Steps

1. Install dependencies:
```bash
npm run deploy:setup
```

2. Build the application:
```bash
npm run build:all
```

3. Deploy Frontend (Vercel):
```bash
npm run deploy:frontend
```

4. Deploy Backend (Railway):
```bash
npm run deploy:backend
```

Or deploy everything at once:
```bash
npm run deploy
```

### Post-Deployment

1. Configure environment variables in Vercel and Railway dashboards
2. Set up custom domains if needed
3. Configure SSL certificates
4. Test the deployed application
5. Monitor the application using Sentry and New Relic

### Monitoring & Maintenance

- Monitor application performance in New Relic
- Track errors in Sentry
- Check server logs in Railway
- Monitor database performance in Supabase

### Troubleshooting

Common issues and solutions:

1. **Blank Page After Deployment**
   - Check if environment variables are properly set
   - Verify API endpoints are accessible
   - Check browser console for errors

2. **Database Connection Issues**
   - Verify Supabase connection strings
   - Check if IP is whitelisted
   - Verify RLS policies

3. **API Errors**
   - Check CORS configuration
   - Verify API routes
   - Check server logs

### Support

For issues or questions, please contact:
- Technical Support: support@deltaelmech.com
- Emergency Contact: emergency@deltaelmech.com

## License

MIT License - see LICENSE file for details 