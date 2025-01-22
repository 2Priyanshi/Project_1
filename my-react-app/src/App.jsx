import React, { useState, useContext } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";

import Login from "./components/Login";
import "./App.css";
import ThemeContext from "./context/ThemeContext";
import StockContext from "./context/StockContext";



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stockSymbol, setStockSymbol]= useState("IBM");

  const handleLogin = () => {
    setIsLoggedIn(true); // Handler for login functionality
  };

  const[darkMode,setDarkMode] = useState(false);

  return (
    <div className="container" id="container">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="app-content">
          <Header />
          <div className="main-content">
           <ThemeContext.Provider value={{darkMode,setDarkMode}}> 
            <StockContext.Provider value={{stockSymbol, setStockSymbol}}>
            <Dashboard /> 
            </StockContext.Provider>
            </ThemeContext.Provider>
          

            
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;



