# Delta Elmech Systems

Delta Elmech Systems is a professional engineering services platform that connects clients with expert engineering solutions.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Git

### Required Services

- [Vercel](https://vercel.com) for frontend hosting
- [Railway](https://railway.app) for backend hosting
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

## 📝 Contributing

Please read [CONTRIBUTING.md](.github/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support:
- Technical Support: support@deltaelmech.com
- Emergency Contact: emergency@deltaelmech.com
- Slack Channel: [Join Here]
