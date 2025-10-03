'use client';

import Layout from '@/components/Layout';

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About AN Furnish</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            Welcome to AN Furnish, where innovation meets craftsmanship in the world of furniture design. 
            We&#39;re revolutionizing how people discover, design, and purchase furniture through the power of AI technology.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            Our mission is to make beautiful, functional furniture accessible to everyone by combining cutting-edge 
            artificial intelligence with expert craftsmanship. We believe that everyone deserves a space that 
            reflects their unique style and meets their specific needs.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">AI-Powered Design</h2>
          <p className="text-gray-700 mb-6">
            What sets us apart is our innovative AI design platform. Using advanced machine learning algorithms, 
            we help you visualize and create custom furniture pieces that perfectly fit your space and style. 
            Simply describe what you&#39;re looking for or upload an inspiration image, and our AI will generate 
            stunning designs tailored to your requirements.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Quality Craftsmanship</h2>
          <p className="text-gray-700 mb-6">
            Behind every piece of furniture is a team of skilled artisans who bring our AI-generated designs to life. 
            We work with sustainable materials and time-tested construction techniques to ensure that every item 
            we sell is built to last for generations.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Sustainability</h2>
          <p className="text-gray-700 mb-6">
            We&#39;re committed to reducing our environmental impact through sustainable sourcing, eco-friendly 
            manufacturing processes, and responsible packaging. Our furniture is designed to be both beautiful 
            and environmentally conscious.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Customer Experience</h2>
          <p className="text-gray-700 mb-6">
            From the moment you visit our site, we&#39;re dedicated to providing an exceptional experience. Our 
            easy-to-use platform, detailed product information, and responsive customer service team are here 
            to help you find the perfect pieces for your home.
          </p>
        </div>
      </div>
    </Layout>
  );
}