<<<<<<< HEAD
// App.jsx
import React, { useState } from "react";
=======
>>>>>>> ebac1a9f2e2faf3937438355d61db11412d32deb

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Updated import
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import "./App.css";


const App = () => {
<<<<<<< HEAD
  const [isActive, setIsActive] = useState(false);
=======
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stockSymbol, setStockSymbol]= useState("IBM");
>>>>>>> ebac1a9f2e2faf3937438355d61db11412d32deb

  const handleLogin = () => {
    setIsLoggedIn(true); // Set login state to true after successful login
  };

<<<<<<< HEAD
  return (
    <div className={`container ${isActive ? "active" : ""}`} id="container">
      <div className="form-container sign-up">
        <form>
          <h1 className="text-color-header">Create Account</h1>
          <input  className="text-color" type="text" placeholder="Name" />
          <input  className="text-color" type="email" placeholder="Email" />
          <input  className="text-color" type="password" placeholder="Password" />
          <button type="button">Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form>
          <h1 className="text-color-header">Sign In</h1>
          <input  className="text-color" type="email" placeholder="Email" />
          <input  className="text-color" type="password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <button type="button">Sign In</button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1 className="text-color-header2">Welcome Back</h1>
            <p>Enter your personal details to use all of the site's features</p>
            <button className="hidden" id="login" onClick={handleLoginClick}>
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1 className="text-color-header2">Hello there!</h1>
            <p>Register with your personal details to use all of the site's features</p>
            <button className="hidden" id="register" onClick={handleRegisterClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
=======
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
                    <Dashboard />
                  </div>
                  <Footer />
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>

>>>>>>> ebac1a9f2e2faf3937438355d61db11412d32deb
  );
};

export default App;
<<<<<<< HEAD

=======
>>>>>>> ebac1a9f2e2faf3937438355d61db11412d32deb
