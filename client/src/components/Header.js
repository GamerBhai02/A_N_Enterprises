import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-brand">
        <Link to="/"><h1>AN Furnish</h1></Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/design">Design with AI</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </header>
  );
};

export default Header;