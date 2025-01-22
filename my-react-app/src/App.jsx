// App.jsx
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
  const [isActive, setIsActive] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true); // Handler for login functionality
  };

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
  );
};

export default App;

