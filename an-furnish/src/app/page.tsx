'use client';

import { useState } from 'react';
import Image from "next/image";
import Layout from '@/components/Layout';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Mock product data with placeholder images
  const products = [
    {
      id: 1,
      name: 'Modern Sofa',
      price: 2499,
      image: 'https://placehold.co/600x400/EEE/31343C?font=montserrat&text=Modern+Sofa',
      category: 'sofas'
    },
    {
      id: 2,
      name: 'Minimalist Chair',
      price: 899,
      image: 'https://placehold.co/600x400/EEE/31343C?font=montserrat&text=Minimalist+Chair',
      category: 'chairs'
    },
    {
      id: 3,
      name: 'Rustic Dining Table',
      price: 1599,
      image: 'https://placehold.co/600x400/EEE/31343C?font=montserrat&text=Rustic+Table',
      category: 'tables'
    },
    {
      id: 4,
      name: 'Elegant Bed Frame',
      price: 1899,
      image: 'https://placehold.co/600x400/EEE/31343C?font=montserrat&text=Elegant+Bed',
      category: 'beds'
    }
  ];

  const categories = ['all', 'sofas', 'chairs', 'tables', 'beds'];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src="https://placehold.co/1200x600/31343C/EEE?font=montserrat&text=Transform+Your+Space"
          alt="Hero Image"
          fill
          style={{objectFit: "cover"}}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Transform Your Space</h2>
            <p className="text-xl mb-8">AI-powered furniture design and shopping</p>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Start Designing
            </button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{objectFit: "cover"}}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-gray-600">${product.price}</p>
                  <button className="w-full mt-4 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Design Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Design with AI</h2>
              <p className="text-gray-700 mb-6">
                Upload an image or describe your dream furniture, and our AI will generate stunning designs
                tailored to your space.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Generate realistic 2D designs
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Convert to 3D models for AR preview
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Order custom-made furniture
                </li>
              </ul>
              <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors">
                Try AI Design
              </button>
            </div>
            <div className="relative h-80">
              <Image
                src="https://placehold.co/600x400/EEE/31343C?font=montserrat&text=AI+Furniture+Design"
                alt="AI Design"
                fill
                style={{objectFit: "cover"}}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}