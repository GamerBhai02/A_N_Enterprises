const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    // Send response
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/register (admin only)
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Validate input
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      phone,
      passwordHash: password,
      role: role || 'customer'
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id, user.role);

    // Send response
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;