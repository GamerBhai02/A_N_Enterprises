'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function ConfirmationPage() {
  // In a real app, you would get the order details from the URL or API
  const orderNumber = 'ORD-12345678';
  const estimatedDelivery = 'October 10-12, 2025';
  
  // Mock order items
  const orderItems = [
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
  
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // In a real app, you might send an analytics event when the page loads
  useEffect(() => {
    console.log('Order confirmed:', orderNumber);
    // You could send this to Google Analytics, Mixpanel, etc.
    // gtag('event', 'purchase', { transaction_id: orderNumber, value: total });
  }, [orderNumber, total]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Icon and Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank you for your order!</h1>
          <p className="text-gray-600">We&#39;ve received your order and will begin processing it shortly.</p>
        </div>
        
        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Order #{orderNumber}</h2>
              <p className="text-gray-600 mt-1">Placed on {new Date().toLocaleDateString()}</p>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <p className="text-sm text-gray-600">Estimated Delivery</p>
              <p className="font-semibold text-gray-900">{estimatedDelivery}</p>
            </div>
          </div>
          
          {/* Order Items */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
            <div className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-cover rounded-md"
                  />
                  <div className="ml-4 flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="border-t mt-6 pt-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Customer Support and Next Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What Happens Next?</h3>
            <ol className="space-y-3">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center mr-3 mt-0.5">1</span>
                <span>You&#39;ll receive a confirmation email with your order details.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center mr-3 mt-0.5">2</span>
                <span>We&#39;ll notify you when your order ships with tracking information.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center mr-3 mt-0.5">3</span>
                <span>Expect your furniture to arrive within the estimated delivery window.</span>
              </li>
            </ol>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Support</h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium">Questions about your order?</p>
                <p className="text-gray-600 mt-1">Contact our customer service team for assistance.</p>
              </div>
              <div>
                <p className="font-medium">Email:</p>
                <p className="text-blue-600">support@anfurnish.com</p>
              </div>
              <div>
                <p className="font-medium">Phone:</p>
                <p className="text-gray-900">(555) 123-4567</p>
              </div>
              <div>
                <p className="font-medium">Hours:</p>
                <p className="text-gray-600">Mon-Fri, 9AM-6PM EST</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Continue Shopping Button */}
        <div className="text-center">
          <button className="bg-gray-900 text-white py-3 px-8 rounded-md hover:bg-gray-800 transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}