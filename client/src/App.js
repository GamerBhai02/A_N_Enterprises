import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import DesignWithAI from './pages/DesignWithAI';
import DesignDetail from './pages/DesignDetail';
import ARViewer from './pages/ARViewer';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/design" element={<DesignWithAI />} />
          <Route path="/design/:id" element={<DesignDetail />} />
          <Route path="/ar/:id" element={<ARViewer />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;