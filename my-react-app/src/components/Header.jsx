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

  const handleDownloadCSV = async () => {
    const userId = localStorage.getItem("userId"); // Replace with the actual userId
    const url = `http://localhost:8080/api/transactions/export/csv?userId=${userId}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to download CSV');
      }

      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = urlBlob;
      link.setAttribute('download', 'transactions.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  };
  return (
    <header className="header-container">
      <div className="logo">
        <h1 className="logo-text">TradIN</h1>
        <h6 className='logo-text2'>Trading without risk</h6>
      </div>
      <nav className="nav-links">
        <button className="nav-link" onClick={()=>navigate("/portfolio")}>Portfolio</button>
        <button className="nav-link" onClick={handleDownloadCSV}>Download CSV</button>
          
      </nav>
    </header>
  );
};

export default Header;


