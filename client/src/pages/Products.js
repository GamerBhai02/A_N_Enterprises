import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real app, this would be your API endpoint
        // const response = await axios.get('/api/products');
        // setProducts(response.data);
        
        // Mock data for now
        const mockProducts = [
          {
            _id: '1',
            title: 'Modern Sofa',
            category: 'Sofa',
            shortDescription: 'Comfortable three-seater sofa',
            photos: ['https://via.placeholder.com/300x200']
          },
          {
            _id: '2',
            title: 'Ergonomic Chair',
            category: 'Chair',
            shortDescription: 'Office chair with lumbar support',
            photos: ['https://via.placeholder.com/300x200']
          },
          {
            _id: '3',
            title: 'Dining Table',
            category: 'Table',
            shortDescription: 'Wooden dining table for 6',
            photos: ['https://via.placeholder.com/300x200']
          }
        ];
        
        setProducts(mockProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="container"><p>Loading products...</p></div>;
  if (error) return <div className="container"><p>Error: {error}</p></div>;

  return (
    <div className="container">
      <h2>Our Furniture Collection</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.photos[0]} alt={product.title} />
            <div className="product-card-content">
              <h3>{product.title}</h3>
              <p>{product.shortDescription}</p>
              <Link to={`/products/${product._id}`} className="btn">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;