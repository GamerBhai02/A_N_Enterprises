const express = require('express');
const DesignRequest = require('../models/DesignRequest');
const { Queue } = require('bullmq');
const Redis = require('ioredis');

const router = express.Router();

// Initialize Redis connection and queues
const redisConnection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const imageGenerationQueue = new Queue('imageGeneration', { connection: redisConnection });
const modelConversionQueue = new Queue('modelConversion', { connection: redisConnection });

// Generate unique lead ID
const generateLeadId = () => {
  const date = new Date();
  const year = date.getFullYear().toString().substr(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `LD-${year}${month}${day}-${random}`;
};

// POST /api/designs - create new design request
router.post('/', async (req, res) => {
  try {
    const { customer, inputType, textPrompt, uploadedImages, collectedAnswers } = req.body;
    
    // Validate input
    if (!customer || !inputType) {
      return res.status(400).json({ message: 'Customer and input type are required' });
    }
    
    // Create design request
    const designRequest = new DesignRequest({
      leadId: generateLeadId(),
      customer,
      inputType,
      textPrompt: inputType === 'text' ? textPrompt : undefined,
      uploadedImages: inputType === 'upload' ? uploadedImages : undefined,
      collectedAnswers
    });
    
    await designRequest.save();
    res.status(201).json(designRequest);
  } catch (error) {
    console.error('Error creating design request:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/designs/:id - view request status & assets
router.get('/:id', async (req, res) => {
  try {
    const designRequest = await DesignRequest.findById(req.params.id);
    if (!designRequest) {
      return res.status(404).json({ message: 'Design request not found' });
    }
    res.json(designRequest);
  } catch (error) {
    console.error('Error fetching design request:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/designs/:id/generate-images - triggers Nano Banana
router.post('/:id/generate-images', async (req, res) => {
  try {
    const designRequest = await DesignRequest.findById(req.params.id);
    if (!designRequest) {
      return res.status(404).json({ message: 'Design request not found' });
    }
    
    // Add job to image generation queue
    const job = await imageGenerationQueue.add('generateImages', {
      designId: designRequest._id,
      textPrompt: designRequest.textPrompt,
      uploadedImages: designRequest.uploadedImages
    });
    
    res.json({ 
      message: 'Image generation job queued',
      jobId: job.id
    });
  } catch (error) {
    console.error('Error queuing image generation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/designs/:id/convert-3d - triggers HF 2D→3D conversion
router.post('/:id/convert-3d', async (req, res) => {
  try {
    const designRequest = await DesignRequest.findById(req.params.id);
    if (!designRequest) {
      return res.status(404).json({ message: 'Design request not found' });
    }
    
    if (!designRequest.selectedImage) {
      return res.status(400).json({ message: 'No image selected for 3D conversion' });
    }
    
    // Add job to model conversion queue
    const job = await modelConversionQueue.add('convertTo3D', {
      designId: designRequest._id,
      imageUrl: designRequest.selectedImage,
      dimensions: designRequest.collectedAnswers?.dimensions
    });
    
    // Update status
    designRequest.status = '3d_requested';
    await designRequest.save();
    
    res.json({ 
      message: '3D conversion job queued',
      jobId: job.id
    });
  } catch (error) {
    console.error('Error queuing 3D conversion:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/designs/:id/job/:jobId - job status
router.get('/:id/job/:jobId', async (req, res) => {
  try {
    // In a real implementation, you would check the actual job status from BullMQ
    // For now, we'll return a mock response
    res.json({ 
      jobId: req.params.jobId,
      status: 'completed',
      progress: 100
    });
  } catch (error) {
    console.error('Error fetching job status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/designs/:id/submit-order - convert lead to order
router.post('/:id/submit-order', async (req, res) => {
  try {
    const designRequest = await DesignRequest.findById(req.params.id);
    if (!designRequest) {
      return res.status(404).json({ message: 'Design request not found' });
    }
    
    // In a real implementation, you would create an order here
    // For now, we'll just update the status
    designRequest.status = 'quoted';
    await designRequest.save();
    
    res.json({ 
      message: 'Order submitted successfully',
      designRequest
    });
  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;