'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';

export default function DesignPage() {
  const [step, setStep] = useState(1);
  const [textPrompt, setTextPrompt] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [convertingTo3D, setConvertingTo3D] = useState(false);
  const [threeDModelUrl, setThreeDModelUrl] = useState<string | null>(null);

  // Handle text prompt submission
  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textPrompt.trim()) return;
    
    // Call Gemini API to generate images
    try {
      const response = await fetch('/api/ai/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Generate a detailed description of a furniture piece based on this description: ${textPrompt}. Then create three highly detailed prompts for image generation that focus on different angles and lighting conditions.`
        }),
      });
      
      await response.json();
      
      // In a real implementation, you would parse the response to extract image generation prompts
      // For now, we'll simulate with mock images
      setGeneratedImages([
        'https://placehold.co/400x400/EEE/31343C?font=montserrat&text=Design+1',
        'https://placehold.co/400x400/EEE/31343C?font=montserrat&text=Design+2',
        'https://placehold.co/400x400/EEE/31343C?font=montserrat&text=Design+3'
      ]);
      
      setStep(2);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle 3D conversion
  const handleConvertTo3D = async () => {
    if (!selectedImage) return;
    
    setConvertingTo3D(true);
    
    // Call 2D to 3D conversion API
    try {
      const response = await fetch('/api/convert/2d-to-3d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: selectedImage,
          dimensions: { width: 200, height: 100, depth: 80 } // Example dimensions in cm
        }),
      });
      
      const data = await response.json();
      setThreeDModelUrl(data.modelUrl);
      setStep(3);
    } catch (error) {
      console.error('Error converting to 3D:', error);
    } finally {
      setConvertingTo3D(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">AI Furniture Designer</h1>
        
        {/* Progress Steps */}
        <div className="flex items-center mb-12">
          <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-500'}`}>
            <div className={`rounded-full p-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
              </svg>
            </div>
            <span className="ml-2 font-medium">Design Input</span>
          </div>
          <div className={`flex-grow h-0.5 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          
          <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-500'}`}>
            <div className={`rounded-full p-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
              </svg>
            </div>
            <span className="ml-2 font-medium">AI Generation</span>
          </div>
          <div className={`flex-grow h-0.5 mx-4 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          
          <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-500'}`}>
            <div className={`rounded-full p-2 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
            </div>
            <span className="ml-2 font-medium">3D Preview</span>
          </div>
        </div>
        
        {/* Step 1: Design Input */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">Describe Your Furniture Design</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Text Input Option */}
              <div>
                <h3 className="text-lg font-medium mb-4">Describe with Text</h3>
                <form onSubmit={handleTextSubmit} className="space-y-4">
                  <textarea
                    value={textPrompt}
                    onChange={(e) => setTextPrompt(e.target.value)}
                    placeholder="Describe your ideal furniture piece..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Generate Designs
                  </button>
                </form>
              </div>
              
              {/* Image Upload Option */}
              <div>
                <h3 className="text-lg font-medium mb-4">Upload Inspiration Image</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 10h-4m-6-4v4m0 0v4m0-4h4m-6 0h4" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">Drag and drop an image here, or click to select</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="mt-2 cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Choose Image
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 2: AI Generation Results */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">AI-Generated Designs</h2>
              <button
                onClick={() => setStep(1)}
                className="text-blue-600 hover:text-blue-800"
              >
                Back
              </button>
            </div>
            
            {/* Show uploaded image if available */}
            {uploadedImage && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Your Uploaded Image</h3>
                <img
                  src={uploadedImage}
                  alt="Uploaded design"
                  className="max-h-64 mx-auto rounded-lg shadow-md"
                />
              </div>
            )}
            
            {/* Generated images grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {generatedImages.map((imageUrl, index) => (
                <div key={index} className="relative">
                  <img
                    src={imageUrl}
                    alt={`Generated design ${index + 1}`}
                    className={`w-full h-64 object-cover rounded-lg cursor-pointer ${
                      selectedImage === imageUrl ? 'ring-4 ring-blue-600' : ''
                    }`}
                    onClick={() => setSelectedImage(imageUrl)}
                  />
                  {selectedImage === imageUrl && (
                    <div className="absolute top-2 right-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleConvertTo3D}
                disabled={!selectedImage}
                className={`bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors ${
                  !selectedImage ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Convert Selected Design to 3D
              </button>
            </div>
          </div>
        )}
        
        {/* Step 3: 3D Preview */}
        {step === 3 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">3D Model Preview</h2>
              <button
                onClick={() => setStep(2)}
                className="text-blue-600 hover:text-blue-800"
              >
                Back
              </button>
            </div>
            
            {convertingTo3D ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                <p className="mt-4 text-lg">Converting to 3D model...</p>
              </div>
            ) : threeDModelUrl ? (
              <div className="space-y-6">
                {/* Placeholder for 3D viewer - in a real app, you would use a library like three.js */}
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <p className="mt-4 text-lg">3D Model Viewer (would be implemented with three.js or similar)</p>
                    <p className="text-gray-600">Model URL: {threeDModelUrl}</p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors">
                    Add to Cart
                  </button>
                  <button className="bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition-colors">
                    Download Model
                  </button>
                  <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
                    View in AR
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-lg">No 3D model available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}