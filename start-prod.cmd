@echo off
REM Build and start the Next.js production server
cd /d %~dp0
echo Building Kellugs CMS...
echo.
call npm run build
if errorlevel 1 (
    echo Build failed
    exit /b 1
)
echo.
echo Build complete. Starting server...
echo The server will be available at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
npm start
