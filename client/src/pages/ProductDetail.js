import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from your API
    // Mock data for now
    const mockProduct = {
      _id: id,
      title: 'Modern Sofa',
      category: 'Sofa',
      shortDescription: 'Comfortable three-seater sofa',
      detailedDescription: 'This modern sofa features a sleek design with premium upholstery. Perfect for contemporary living rooms.',
      materials: ['Velvet', 'Wood'],
      dimensions: { w: 200, d: 90, h: 85 },
      photos: [
        'https://via.placeholder.com/600x400',
        'https://via.placeholder.com/600x400/cccccc',
        'https://via.placeholder.com/600x400/999999'
      ],
      tags: ['modern', 'comfortable', 'luxury']
    };

    setTimeout(() => {
      setProduct(mockProduct);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) return <div className="container"><p>Loading product details...</p></div>;
  if (!product) return <div className="container"><p>Product not found</p></div>;

  return (
    <div className="container">
      <div style={{ display: 'flex', gap: '30px', marginTop: '30px' }}>
        <div style={{ flex: 1 }}>
          <img 
            src={product.photos[0]} 
            alt={product.title} 
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h2>{product.title}</h2>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Description:</strong> {product.detailedDescription}</p>
          <p><strong>Materials:</strong> {product.materials.join(', ')}</p>
          <p><strong>Dimensions:</strong> {product.dimensions.w}cm (W) × {product.dimensions.d}cm (D) × {product.dimensions.h}cm (H)</p>
          <p><strong>Tags:</strong> {product.tags.join(', ')}</p>
          <button className="btn" style={{ marginTop: '20px' }}>Enquire / Save Design</button>
        </div>
      </div>
      
      <div style={{ marginTop: '50px' }}>
        <h3>More Images</h3>
        <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
          {product.photos.map((photo, index) => (
            <img 
              key={index} 
              src={photo} 
              alt={`${product.title} ${index + 1}`} 
              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;