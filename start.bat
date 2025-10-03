@echo off
echo Starting AN Furnish application...

echo Starting backend server...
start "Backend" cmd /k "node server.js"

echo Starting frontend development server...
cd client
start "Frontend" cmd /k "npm start"

echo Application startup commands initiated.
echo Please ensure Redis server is running separately.
echo Press any key to close this window...
pause >nul