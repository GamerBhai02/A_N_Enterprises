const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Sofa', 'Chair', 'Table', 'Bed', 'Headboard', 'Curtain', 'Repair']
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true
  },
  detailedDescription: {
    type: String,
    required: true
  },
  materials: [{
    type: String,
    trim: true
  }],
  dimensions: {
    w: { type: Number, required: true },
    d: { type: Number, required: true },
    h: { type: Number, required: true }
  },
  photos: [{
    type: String
  }],
  tags: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  published: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Product', productSchema);