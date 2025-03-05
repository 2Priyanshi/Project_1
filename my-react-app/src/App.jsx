
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Updated import
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import "./App.css";
import ThemeContext from "./context/ThemeContext";
import StockContext from "./context/StockContext";

import Portfolio from "./components/Portfolio";



const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stockSymbol, setStockSymbol]= useState("IBM");


  const handleLogin = () => {
    setIsLoggedIn(true); // Set login state to true after successful login
  };


  const[darkMode,setDarkMode] = useState(false);

  return (

    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              !isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <div className="app-content">
                  <Header />
                  <div className="main-content">
                    <ThemeContext.Provider value={{darkMode,setDarkMode}}>
                      <StockContext.Provider value={{stockSymbol,setStockSymbol}}>
                      <Dashboard />
                      </StockContext.Provider>
                    </ThemeContext.Provider>
                   
                  </div>
                  <Footer />
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />
           <Route path="/portfolio" element={<div><ThemeContext.Provider value={{darkMode,setDarkMode}}><Portfolio/> </ThemeContext.Provider></div>}></Route>
        </Routes>
      </div>
    </Router>


  );
};

export default App;

