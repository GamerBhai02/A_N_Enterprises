const { Worker } = require('bullmq');
const Redis = require('ioredis');
const axios = require('axios');
const DesignRequest = require('../models/DesignRequest');

// Initialize Redis connection
const redisConnection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Create worker
const imageGenerationWorker = new Worker('imageGeneration', async job => {
  const { designId, textPrompt, uploadedImages } = job.data;
  
  try {
    console.log(`Processing image generation for design ${designId}`);
    
    // In a real implementation, you would:
    // 1. Call Gemini API to generate prompts if needed
    // 2. Call Nano Banana API to generate images
    // 3. Save images to S3
    // 4. Update design request with generated images
    
    // For demonstration, we'll simulate the process
    const generatedImages = [];
    
    // Simulate API calls with a delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate mock image URLs
    for (let i = 0; i < 3; i++) {
      generatedImages.push({
        url: `https://example.com/generated-image-${designId}-${i}.jpg`,
        prompt: `Generated image ${i+1} for ${textPrompt || 'uploaded design'}`,
        score: Math.random()
      });
    }
    
    // Update design request
    const designRequest = await DesignRequest.findByIdAndUpdate(
      designId,
      {
        generatedImages: generatedImages,
        status: 'images_generated'
      },
      { new: true }
    );
    
    if (!designRequest) {
      throw new Error('Design request not found');
    }
    
    console.log(`Image generation completed for design ${designId}`);
    
    return { 
      success: true, 
      designId,
      images: generatedImages 
    };
  } catch (error) {
    console.error('Image generation failed:', error);
    
    // Update design request status to error
    await DesignRequest.findByIdAndUpdate(designId, {
      status: 'new'
    });
    
    throw error;
  }
}, { 
  connection: redisConnection,
  concurrency: 5 // Process up to 5 jobs concurrently
});

// Handle worker events
imageGenerationWorker.on('completed', job => {
  console.log(`Job ${job.id} completed successfully`);
});

imageGenerationWorker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed with error:`, err);
});

console.log('Image Generation Worker started...');

module.exports = imageGenerationWorker;