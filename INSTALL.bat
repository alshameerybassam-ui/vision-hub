@echo off
chcp 65001 >nul
title Vision Hub - Local Installation

echo ==========================================
echo   Vision Hub - Local Installation
echo ==========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed!
    echo Please download from: https://nodejs.org
    echo Download version 22.x LTS (green button)
    echo Install it and restart your computer
    pause
    exit /b 1
)

echo ✅ Node.js is installed

REM Check if we're in the right folder
if not exist "package.json" (
    echo ❌ package.json not found!
    echo Please make sure you're in the vision-hub-nextjs-v2 folder
    pause
    exit /b 1
)

echo ✅ Found package.json

echo.
echo ==========================================
echo Step 1: Installing packages...
echo ==========================================
echo.
echo This may take 2-5 minutes, please wait...
echo.

npm install

if errorlevel 1 (
    echo ❌ Installation failed!
    echo Trying with legacy peer deps...
    npm install --legacy-peer-deps

    if errorlevel 1 (
        echo ❌ Still failed!
        echo Please send me the error message
        pause
        exit /b 1
    )
)

echo.
echo ✅ Packages installed successfully!
echo.

echo ==========================================
echo Step 2: Starting the project...
echo ==========================================
echo.
echo Opening browser at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

start http://localhost:3000

npm run dev

pause
