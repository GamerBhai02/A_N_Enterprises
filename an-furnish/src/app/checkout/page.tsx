'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function CheckoutPage() {
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Mock cart items and totals - in a real app, this would come from state or an API
  const cartItems = [
    {
      id: 1,
      name: 'Luxury Sofa Set',
      price: 2499,
      quantity: 1,
      image: 'https://placehold.co/80x80/EEE/31343C?font=montserrat&text=Sofa'
    },
    {
      id: 2,
      name: 'Minimalist Coffee Table',
      price: 899,
      quantity: 1,
      image: 'https://placehold.co/80x80/EEE/31343C?font=montserrat&text=Table'
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = shippingMethod === 'standard' ? 99 : 199;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Information */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    placeholder="123 Main St"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province
                  </label>
                  <input
                    type="text"
                    id="state"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zip"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    id="country"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                    {/* Add more countries as needed */}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Shipping Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Method</h2>
              
              <div className="space-y-4">
                <label className="flex items-center p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="shipping"
                    value="standard"
                    checked={shippingMethod === 'standard'}
                    onChange={() => setShippingMethod('standard')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">Standard Shipping</span>
                      <span className="font-medium text-gray-900">$99.00</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Delivery in 5-7 business days</p>
                  </div>
                </label>
                
                <label className="flex items-center p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="shipping"
                    value="express"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">Express Shipping</span>
                      <span className="font-medium text-gray-900">$199.00</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Delivery in 2-3 business days</p>
                  </div>
                </label>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
              
              <div className="space-y-4">
                <label className="flex items-center p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">Credit Card</span>
                      <div className="flex space-x-2">
                        <svg className="h-6 w-10" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="36" height="24" rx="4" fill="#F8F9FA" />
                          <path d="M7 7h22v10H7V7z" fill="#EAEAEA" />
                          <path d="M11 12h4v3h-4v-3zM21 12h4v3h-4v-3z" fill="white" />
                        </svg>
                        <svg className="h-6 w-10" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="36" height="24" rx="4" fill="#F8F9FA" />
                          <circle cx="18" cy="12" r="8" fill="#FFC400" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </label>
                
                {paymentMethod === 'card' && (
                  <div className="pl-8 space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiration Date
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          placeholder="MM/YY"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          placeholder="123"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="nameOnCard"
                        placeholder="John Doe"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}
                
                <label className="flex items-center p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">PayPal</span>
                      <svg className="h-6 w-16" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="120" height="24" rx="4" fill="#F8F9FA" />
                        <path d="M36 8h48v8H36V8zm4 4h40v2H40V12z" fill="#00308F" />
                      </svg>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex items-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="object-cover rounded-md mr-3"
                      />
                      <span className="text-gray-600">
                        {item.name} × {item.quantity}
                      </span>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-600">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-lg font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors">
                Place Order
              </button>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}