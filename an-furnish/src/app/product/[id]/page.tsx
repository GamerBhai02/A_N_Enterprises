'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in a real app, this would come from an API
  const product = {
    id: params.id,
    name: 'Luxury Sofa Set',
    price: 2499,
    description: 'Experience unparalleled comfort with our Luxury Sofa Set. Handcrafted with premium materials and designed for both style and durability.',
    features: [
      'Handcrafted solid wood frame',
      'Premium memory foam cushions',
      'Removable, washable covers',
      'Available in multiple fabric options',
      '10-year warranty'
    ],
    images: [
      'https://placehold.co/600x600/EEE/31343C?font=montserrat&text=Sofa+View+1',
      'https://placehold.co/600x600/EEE/31343C?font=montserrat&text=Sofa+View+2',
      'https://placehold.co/600x600/EEE/31343C?font=montserrat&text=Sofa+View+3',
      'https://placehold.co/600x600/EEE/31343C?font=montserrat&text=Sofa+View+4'
    ],
    specifications: {
      dimensions: '220 x 95 x 85 cm',
      weight: '65 kg',
      material: 'Solid oak frame with velvet upholstery',
      care: 'Vacuum regularly, spot clean with mild detergent'
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex text-sm mb-8">
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/shop" className="text-blue-600 hover:underline">Shop</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-500">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative h-96 lg:h-[500px] mb-4">
              <Image
                src={product.images[selectedImage]}
                alt={`${product.name} - View ${selectedImage + 1}`}
                fill
                style={{objectFit: "cover"}}
                className="rounded-lg"
              />
            </div>
            
            {/* Thumbnail gallery */}
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-blue-600' : ''
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    style={{objectFit: "cover"}}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold text-gray-900 mb-4">${product.price}</p>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Specifications</h3>
              <dl className="grid grid-cols-2 gap-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-sm font-medium text-gray-500">{key.charAt(0).toUpperCase() + key.slice(1)}</dt>
                    <dd className="text-sm text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center mb-6">
              <label htmlFor="quantity" className="mr-4 text-gray-700">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex space-x-4 mb-8">
              <button className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors">
                Add to Cart
              </button>
              <button className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors">
                Buy Now
              </button>
            </div>

            {/* 3D Preview Button */}
            <div className="border-t pt-6">
              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v2a1 1 0 01-1 1h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8H3a1 1 0 01-1-1V6a1 1 0 011-1h4zM9 6v2h6V6H9z" />
                </svg>
                View in your room with AR
              </button>
            </div>
          </div>
        </div>

        {/* Description and Reviews Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                Our Luxury Sofa Set is the perfect centerpiece for any living room. Designed with both comfort and style in mind, 
                it features a solid oak frame that ensures durability for years to come.
              </p>
              <p className="text-gray-700 mb-4">
                The premium memory foam cushions provide exceptional support, while the removable, washable covers make maintenance 
                a breeze. Available in a range of sophisticated colors and fabrics, you can customize your sofa to match your unique 
                style.
              </p>
              <p className="text-gray-700">
                Whether you&#39;re hosting guests or enjoying a quiet evening at home, our Luxury Sofa Set offers the perfect balance of 
                elegance and comfort.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
            <div className="space-y-6">
              {[1, 2, 3].map((review) => (
                <div key={review} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">5.0 stars</span>
                  </div>
                  <h3 className="font-medium text-gray-900">Beautiful and comfortable</h3>
                  <p className="text-gray-700 mt-1">This sofa exceeded my expectations. The quality is outstanding and it&#39;s incredibly comfortable.</p>
                  <p className="text-sm text-gray-500 mt-2">- Sarah J., Verified Buyer</p>
                </div>
              ))}
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Read all reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}