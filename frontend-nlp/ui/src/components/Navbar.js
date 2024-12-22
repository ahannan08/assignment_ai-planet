// components/Navbar.js
import React from "react";
import '../styles/navbar.css';

const Navbar = ({ children }) => (
  <nav className="navbar">
    <div className="navbar-logo">
      <img src="/image.png" alt="Logo" />
    </div>
    <div className="navbar-actions">
      {children}
    </div>
  </nav>
);

export default Navbar;