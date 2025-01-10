import React, { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Portfolio from "./components/Portfolio";
import MarketTrends from "./components/MarketTrends";
import Trade from "./components/Trade";
import Login from "./components/Login";
import "./App.css";
import "./components/Login.css";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true); // Handler for login functionality
  };

  return (
    <div className="container" id="container">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="app-content">
          <Header />
          <div className="main-content">
            <Dashboard />
            <div className="bg-blue-500 text-white p-4 rounded-lg">
  This is a Tailwind styled div!
</div>

            
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;



