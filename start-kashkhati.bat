@echo off
REM KASHKHATI - One-Click Startup Script
REM Author: KASHKHATI Team
REM Date: 2026-08-31

echo.
echo ========================================
echo   🚀 KASHKHATI Startup Script
echo ========================================
echo.

REM Check Node.js
echo [1/4] Checking Node.js...
node -v >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found. Please install from https://nodejs.org
    pause
    exit /b 1
)
echo ✅ Node.js found

REM Check PostgreSQL
echo [2/4] Checking PostgreSQL...
psql -U postgres -c "SELECT 1" >nul 2>&1
if errorlevel 1 (
    echo ⚠️  PostgreSQL not found. Please install from https://www.postgresql.org
    pause
    exit /b 1
)
echo ✅ PostgreSQL found

REM Create database if not exists
echo [3/4] Checking database...
psql -U postgres -c "CREATE DATABASE kashkhati_db;" >nul 2>&1
echo ✅ Database ready

REM Start Backend in new window
echo [4/4] Starting Backend...
start cmd /k "cd KASHKHATI-Backend && npm run dev"

REM Start Frontend in new window
start cmd /k "cd KASHKHATI && npm run dev"

echo.
echo ========================================
echo ✅ KASHKHATI is starting!
echo ========================================
echo.
echo 🔗 Frontend: http://localhost:5173
echo 🔗 Backend:  http://localhost:3000
echo.
echo Opening browser in 3 seconds...
timeout /t 3
start http://localhost:5173

echo.
echo 💡 Tip: Keep both terminal windows open
echo.
