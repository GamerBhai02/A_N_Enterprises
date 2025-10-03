'use client';

import Layout from '@/components/Layout';

export default function AccountPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Account Navigation */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Settings</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-600 font-medium">Profile Information</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">Order History</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">Saved Designs</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">Payment Methods</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">Address Book</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">Wishlist</a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Account Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John"
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
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john.doe@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(123) 456-7890"
                  />
                </div>
                
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}