'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Image src="/logo.svg" alt="AN Furnish Logo" width={32} height={32} />
              <span className="ml-2 text-xl font-bold">AN Furnish</span>
            </div>
            <p className="text-gray-400">
              Transforming furniture design with AI technology.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/category/sofas" className="text-gray-400 hover:text-white">Sofas</Link></li>
              <li><Link href="/category/chairs" className="text-gray-400 hover:text-white">Chairs</Link></li>
              <li><Link href="/category/tables" className="text-gray-400 hover:text-white">Tables</Link></li>
              <li><Link href="/category/beds" className="text-gray-400 hover:text-white">Beds</Link></li>
              <li><Link href="/category/decor" className="text-gray-400 hover:text-white">Decor</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link href="/press" className="text-gray-400 hover:text-white">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-white">Shipping</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-white">Returns & Exchanges</Link></li>
              <li><Link href="/warranty" className="text-gray-400 hover:text-white">Warranty</Link></li>
              <li><Link href="/ai-design-faq" className="text-gray-400 hover:text-white">AI Design FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">&copy; 2025 AN Furnish. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-white text-sm">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}