import React from "react";
import './Header.css';
import { LinkIcon } from "@heroicons/react/20/solid";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo">
        <h1 className="logo-text">TradIN</h1>
        <h6 className='logo-text2'>Trading without risk</h6>
      </div>
      <nav className="nav-links">
        <a href="#dashboard" className="nav-link">Dashboard</a>
        
    
        
      </nav>
    </header>
  );
};

export default Header;


