import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">Back to Home</Link>
        <div className="navbar-links">
          <Link to="/cart" className="navbar-link">Cart</Link>
          <Link to="/products" className="navbar-link">Products</Link>
        </div>
      </div>
    </nav>
  );
}