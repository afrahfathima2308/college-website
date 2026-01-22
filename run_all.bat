@echo off
title College Portal Starter

echo ==========================================
echo   🚀 Starting College Portal Services...
echo ==========================================

:: Start Backend
echo.
echo [1/2] Starting Backend...
start "BACKEND_SERVER" cmd /k "cd backend && npm run dev"

:: Small delay
timeout /t 3 /nobreak > nul

:: Start Frontend
echo [2/2] Starting Frontend...
start "FRONTEND_SERVER" cmd /k "cd frontend && npm run dev"

echo.
echo ==========================================
echo   ✅ Both windows should be open now!
echo.
echo   1. Backend (Port 5000)
echo   2. Frontend (Port 5173)
echo.
echo   Keep this window open if you want to see logs,
echo   or you can close it now.
echo ==========================================
pause
