'use client';

import { useState } from 'react';
import Image from 'next/image';
import Layout from '@/components/Layout';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Luxury Sofa Set',
      price: 2499,
      quantity: 1,
      image: 'https://placehold.co/120x120/EEE/31343C?font=montserrat&text=Sofa'
    },
    {
      id: 2,
      name: 'Minimalist Coffee Table',
      price: 899,
      quantity: 1,
      image: 'https://placehold.co/120x120/EEE/31343C?font=montserrat&text=Table'
    }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 99; // Free shipping over $5000
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5h13.2l-1.1-5M7 13v7a2 2 0 002 2h6a2 2 0 002-2v-7M7 13h10" />
            </svg>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-gray-600">Looks like you haven&#39;t added any items to your cart yet.</p>
            <button className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex p-6 border-b last:border-b-0">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={120}
                        height={120}
                        className="object-cover rounded-md"
                      />
                    </div>
                    
                    <div className="ml-6 flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <p className="text-2xl font-semibold text-gray-900 mt-1">${item.price}</p>
                      
                      {/* Quantity selector */}
                      <div className="flex items-center mt-4">
                        <label htmlFor={`quantity-${item.id}`} className="text-sm text-gray-600 mr-3">
                          Quantity:
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 border-x border-gray-300">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-6 text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="ml-6 flex flex-col justify-center">
                      <p className="text-xl font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-lg font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors">
                  Checkout
                </button>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    Free shipping on orders over $5,000
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}