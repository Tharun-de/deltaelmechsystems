# Development script for PowerShell
Write-Host "Starting development servers..." -ForegroundColor Blue

# Start frontend
Write-Host "Starting frontend server..." -ForegroundColor Blue
$frontendProcess = Start-Process -FilePath "cmd" -ArgumentList "/c", "npm run dev" -NoNewWindow -PassThru

# Start backend
Write-Host "Starting backend server..." -ForegroundColor Blue
$backendProcess = Start-Process -FilePath "cmd" -ArgumentList "/c", "cd backend && npm run dev" -NoNewWindow -PassThru

Write-Host "Both servers are starting..." -ForegroundColor Green
Write-Host "Frontend will be available at: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Backend will be available at: http://localhost:5002" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Yellow

# Keep the script running and handle cleanup
try {
    Wait-Process -Id $frontendProcess.Id, $backendProcess.Id
} catch {
    Write-Host "Stopping servers..." -ForegroundColor Blue
} finally {
    if (!$frontendProcess.HasExited) { Stop-Process -Id $frontendProcess.Id -Force }
    if (!$backendProcess.HasExited) { Stop-Process -Id $backendProcess.Id -Force }
} 