# Delta Elmech Systems

Delta Elmech Systems is a professional engineering services platform that connects clients with expert engineering solutions.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Git

### Required Services

- [Render](https://render.com) for frontend and backend hosting
- [Supabase](https://supabase.com) for database
- [Sentry](https://sentry.io) for error tracking
- [New Relic](https://newrelic.com) for performance monitoring

### Installation

1. Clone the repository
```bash
git clone https://github.com/Tharun-de/deltaelmechsystems.git
cd deltaelmechsystems
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd ../backend
npm install
```

4. Set up environment variables
```bash
# Frontend (.env)
VITE_API_URL=your_backend_url
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SENTRY_DSN=your_sentry_dsn

# Backend (.env)
PORT=5002
NODE_ENV=production
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEW_RELIC_LICENSE_KEY=your_newrelic_license_key
CORS_ORIGIN=your_frontend_url
```

5. Start development servers
```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd backend
npm run dev
```

## 🏗️ Project Structure

```
deltaelmechsystems/
├── frontend/           # React + Vite frontend
├── backend/           # Node.js + Express backend
├── .github/           # GitHub configurations
└── docs/             # Documentation
```

## 🌿 Branch Strategy

- `main` - Production branch
- `staging` - Pre-production testing
- `develop` - Development branch
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `release/*` - Release preparation
- `hotfix/*` - Production hotfixes

## 🔄 Development Workflow

1. Create a new branch from `develop`
```bash
git checkout develop
git pull
git checkout -b feature/your-feature-name
```

2. Make your changes and commit
```bash
git add .
git commit -m "feat: your feature description"
```

3. Push and create PR
```bash
git push origin feature/your-feature-name
# Create PR on GitHub targeting develop branch
```

## 🚀 Deployment

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

1. Create services on Render.com:
   - Create a Static Site service for the frontend
   - Create a Web Service for the backend

2. Configure environment variables in Render dashboard:
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

3. Set up build commands:
   - Frontend: `npm run build`
   - Backend: `npm install && npm run build`

4. Set up start commands:
   - Frontend: Serve the `dist` directory
   - Backend: `npm start`

### Post-Deployment

1. Configure custom domains in Render dashboard
2. Set up SSL certificates (automatically handled by Render)
3. Test the deployed application
4. Monitor the application using Sentry and New Relic

### Monitoring & Maintenance

- Monitor application performance in New Relic
- Track errors in Sentry
- Check server logs in Render dashboard
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

## 📝 Contributing

Please read [CONTRIBUTING.md](.github/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support:
- Technical Support: support@deltaelmech.com
- Emergency Contact: emergency@deltaelmech.com
- Slack Channel: [Join Here]
