import React from "react";
import './Header.css';
import { LinkIcon } from "@heroicons/react/20/solid";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Portfolio from "./Portfolio";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header-container">
      <div className="logo">
        <h1 className="logo-text">Trade-IN</h1>
        <h6 className='logo-text2'>Trading without risk</h6>
      </div>
      <nav className="nav-links">
        <button className="nav-link" onClick={()=>navigate("/portfolio")}>Portfolio</button>
        
          
      </nav>
    </header>
  );
};

export default Header;


