'use client';

import { useState } from 'react';
import Image from "next/image";
import Layout from '@/components/Layout';

export default function ShopPage() {
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
    },
    {
      id: 5,
      name: 'Contemporary Bookshelf',
      price: 799,
      image: 'https://placehold.co/600x400/EEE/31343C?font=montserrat&text=Bookshelf',
      category: 'storage'
    },
    {
      id: 6,
      name: 'Luxury Armchair',
      price: 1299,
      image: 'https://placehold.co/600x400/EEE/31343C?font=montserrat&text=Armchair',
      category: 'chairs'
    }
  ];

  const categories = ['all', 'sofas', 'chairs', 'tables', 'beds', 'storage'];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Furniture Collection</h1>
        
        {/* Category Filter */}
        <div className="py-4 bg-white border-b mb-8">
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </Layout>
  );
}