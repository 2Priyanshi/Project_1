import React from "react";
import './Header.css';

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo">
        <h1 className="logo-text">TradIN</h1>
        <h6 className='logo-text2'>Trading without risk</h6>
      </div>
      <nav className="nav-links">
        <a href="#dashboard" className="nav-link">Dashboard</a>
        <a href="#marketwatch" className="nav-link">Market Watch</a>
        <a href="#portfolio" className="nav-link">Portfolio</a>
        <a href="#settings" className="nav-link">Settings</a>
      </nav>
    </header>
  );
};

export default Header;


