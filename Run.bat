@echo off
chcp 65001 >nul
title Database Backup Manager

echo ========================================
echo   Database Backup Manager
echo ========================================
echo.

cd /d "%~dp0"

if not exist "node_modules\" (
    echo [INFO] Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies!
        pause
        exit /b 1
    )
    echo.
)

echo [INFO] Starting backup manager...
echo.

npm start

if errorlevel 1 (
    echo.
    echo [ERROR] Backup process failed!
    pause
    exit /b 1
)

echo.
echo [INFO] Process completed.
pause

