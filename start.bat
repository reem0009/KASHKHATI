@echo off
REM KASHKHATI - One-Click Startup (Monorepo)
REM Run from KASHKHATI root folder
echo.
echo ========================================
echo   🚀 KASHKHATI Startup (Monorepo)
echo ========================================
echo.

REM Check Node.js
node -v >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found. Install from https://nodejs.org
    pause
    exit /b 1
)

REM Create database if PostgreSQL available
psql -U postgres -c "CREATE DATABASE kashkhati_db;" >nul 2>&1

REM Start Backend
echo Starting Backend on http://localhost:3000 ...
start "KASHKHATI Backend" cmd /k "cd /d %~dp0backend && npm run dev"

REM Start Frontend
echo Starting Frontend on http://localhost:5173 ...
start "KASHKHATI Frontend" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo ✅ Both services starting...
echo 🔗 Frontend: http://localhost:5173
echo 🔗 Backend:  http://localhost:3000/health
echo.
timeout /t 3 >nul
start http://localhost:5173
echo Keep both terminal windows open. Press any key to exit this launcher.
pause >nul
