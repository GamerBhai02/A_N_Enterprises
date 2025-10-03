import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <section className="hero">
        <h2>Design Your Furniture with AI</h2>
        <p>Transform your space with custom furniture designs powered by artificial intelligence.</p>
        <Link to="/design" className="btn">Design With AI</Link>
      </section>
      
      <div className="container">
        <h2>Featured Categories</h2>
        <div className="products-grid">
          <div className="product-card">
            <img src="https://via.placeholder.com/300x200" alt="Sofas" />
            <div className="product-card-content">
              <h3>Sofas</h3>
              <p>Comfortable and stylish seating solutions</p>
            </div>
          </div>
          
          <div className="product-card">
            <img src="https://via.placeholder.com/300x200" alt="Chairs" />
            <div className="product-card-content">
              <h3>Chairs</h3>
              <p>Ergonomic and elegant chair designs</p>
            </div>
          </div>
          
          <div className="product-card">
            <img src="https://via.placeholder.com/300x200" alt="Tables" />
            <div className="product-card-content">
              <h3>Tables</h3>
              <p>Functional and beautiful table designs</p>
            </div>
          </div>
        </div>
        
        <section style={{ marginTop: '50px', textAlign: 'center' }}>
          <h2>How It Works</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
            <div>
              <h3>1. Describe</h3>
              <p>Tell us about your furniture idea</p>
            </div>
            <div>
              <h3>2. Visualize</h3>
              <p>See AI-generated designs</p>
            </div>
            <div>
              <h3>3. Customize</h3>
              <p>Preview in your space with AR</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;