# Deploy script for PowerShell
Write-Host "🚀 Starting deployment process..." -ForegroundColor Blue

# Function to handle errors
function Handle-Error {
    param($ErrorMessage)
    Write-Host "❌ Error: $ErrorMessage" -ForegroundColor Red
    exit 1
}

# Setup
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
try {
    npm install
    Set-Location backend
    npm install
    Set-Location ..
} catch {
    Handle-Error "Failed to install dependencies"
}

# Build
Write-Host "🔨 Building project..." -ForegroundColor Blue
try {
    npm run build
    Set-Location backend
    npm run build
    Set-Location ..
} catch {
    Handle-Error "Failed to build project"
}

# Database Migrations
Write-Host "🗃️ Running database migrations..." -ForegroundColor Blue
try {
    npm run db:migrate
} catch {
    Handle-Error "Failed to run database migrations"
}

# Deploy Frontend
Write-Host "🌐 Deploying frontend to Vercel..." -ForegroundColor Blue
try {
    vercel --prod
} catch {
    Handle-Error "Failed to deploy frontend"
}

# Deploy Backend
Write-Host "🚂 Deploying backend to Railway..." -ForegroundColor Blue
try {
    Set-Location backend
    railway up
    Set-Location ..
} catch {
    Handle-Error "Failed to deploy backend"
}

Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green 