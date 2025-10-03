@echo off
echo Starting AN Furnish development environment...

echo Installing dependencies...
npm install
cd client
npm install
cd ..

echo Starting development servers...
start "Backend" cmd /k "npm run dev:server"
start "Frontend" cmd /k "npm run dev:client"

echo Development environment startup commands initiated.
echo Please ensure Redis server is running separately.
echo Press any key to close this window...
pause >nul