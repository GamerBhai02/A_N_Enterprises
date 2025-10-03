const { spawn } = require('child_process');
const path = require('path');

console.log('Starting AN Furnish application...');

// Start Redis (assuming it's installed locally)
console.log('Starting Redis server...');
const redis = spawn('redis-server', [], { stdio: 'inherit' });

// Start backend server
console.log('Starting backend server...');
const backend = spawn('node', ['server.js'], { stdio: 'inherit' });

// Start frontend development server
console.log('Starting frontend development server...');
const frontend = spawn('npm', ['run', 'dev'], { 
  cwd: path.join(__dirname, 'client'),
  stdio: 'inherit' 
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down...');
  redis.kill();
  backend.kill();
  frontend.kill();
  process.exit(0);
});