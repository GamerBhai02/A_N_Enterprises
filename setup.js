const { exec } = require('child_process');
const path = require('path');

console.log('Setting up AN Furnish application...');

// Install backend dependencies
console.log('Installing backend dependencies...');
exec('npm install', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error installing backend dependencies: ${error}`);
    return;
  }
  
  console.log('Backend dependencies installed successfully!');
  
  // Install frontend dependencies
  console.log('Installing frontend dependencies...');
  exec('cd client && npm install', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error installing frontend dependencies: ${error}`);
      return;
    }
    
    console.log('Frontend dependencies installed successfully!');
    console.log('Setup complete! Run "npm run dev" to start the application.');
  });
});