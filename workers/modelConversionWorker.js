const { Worker } = require('bullmq');
const Redis = require('ioredis');
const axios = require('axios');
const DesignRequest = require('../models/DesignRequest');

// Initialize Redis connection
const redisConnection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Create worker
const modelConversionWorker = new Worker('modelConversion', async job => {
  const { designId, imageUrl, dimensions } = job.data;
  
  try {
    console.log(`Processing 3D conversion for design ${designId}`);
    
    // In a real implementation, you would:
    // 1. Call HuggingFace API to convert image to 3D model
    // 2. Save 3D model to S3
    // 3. Update design request with 3D model URL
    
    // For demonstration, we'll simulate the process
    // Simulate API calls with a delay
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Generate mock 3D model URL
    const glbUrl = `https://example.com/3d-model-${designId}.glb`;
    
    // Update design request
    const designRequest = await DesignRequest.findByIdAndUpdate(
      designId,
      {
        glbModel: glbUrl,
        status: '3d_ready'
      },
      { new: true }
    );
    
    if (!designRequest) {
      throw new Error('Design request not found');
    }
    
    console.log(`3D conversion completed for design ${designId}`);
    
    return { 
      success: true, 
      designId,
      modelUrl: glbUrl
    };
  } catch (error) {
    console.error('3D conversion failed:', error);
    
    // Update design request status to error
    await DesignRequest.findByIdAndUpdate(designId, {
      status: 'images_generated'
    });
    
    throw error;
  }
}, { 
  connection: redisConnection,
  concurrency: 3 // Process up to 3 jobs concurrently (3D conversion is resource intensive)
});

// Handle worker events
modelConversionWorker.on('completed', job => {
  console.log(`Job ${job.id} completed successfully`);
});

modelConversionWorker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed with error:`, err);
});

console.log('3D Model Conversion Worker started...');

module.exports = modelConversionWorker;