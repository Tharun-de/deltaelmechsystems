# Delta Elmech Systems

Delta Elmech Systems is a professional engineering services platform that connects clients with expert engineering solutions.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Git

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
cp .env.example .env
# Edit .env with your configuration
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

- Staging: Automatically deployed from `staging` branch
- Production: Automatically deployed from `main` branch

## 📝 Contributing

Please read [CONTRIBUTING.md](.github/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, email support@deltaelmechsystems.com or join our Slack channel. 