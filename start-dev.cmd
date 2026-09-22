@echo off
REM Start the Next.js development server
cd /d %~dp0
echo Starting Kellugs CMS...
echo.
echo The server will be available at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
npx next dev --port 3000
