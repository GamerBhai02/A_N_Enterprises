'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">AN Furnish</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            <Link href="/shop" className="text-gray-700 hover:text-gray-900">Shop</Link>
            <Link href="/design" className="text-gray-700 hover:text-gray-900">Design AI</Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900">About</Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link href="/account" className="p-2 text-gray-700 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            <Link href="/cart" className="p-2 text-gray-700 hover:text-gray-900 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5h13.2l-1.1-5M7 13v7a2 2 0 002 2h6a2 2 0 002-2v-7M7 13h10" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="md:hidden border-t pt-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/shop" 
                className="text-gray-700 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                href="/design" 
                className="text-gray-700 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Design AI
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="pt-2 border-t">
                <Link 
                  href="/account" 
                  className="flex items-center text-gray-700 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Account
                </Link>
              </div>
              <Link 
                href="/cart" 
                className="flex items-center text-gray-700 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5h13.2l-1.1-5M7 13v7a2 2 0 002 2h6a2 2 0 002-2v-7M7 13h10" />
                </svg>
                Cart (2)
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}