const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const designRoutes = require('./routes/designs');
const adminRoutes = require('./routes/admin');
const uploadRoutes = require('./routes/uploads');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'client/build')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/uploads', uploadRoutes);

// Catch-all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/an-furnish', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

module.exports = app;