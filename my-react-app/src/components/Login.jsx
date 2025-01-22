import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [isActive, setIsActive] = useState(false);  // Toggles between login and register

  const handleRegisterClick = () => {
    setIsActive(true);  // Switch to the register form
  };

  const handleLoginClick = () => {
    setIsActive(false);  // Switch to the login form
  };

  return (
    <div className={`container ${isActive ? "active" : ""}`} id="container">
      {/* Sign Up Form */}
      <div className="form-container sign-up">
        <form>
          <h1 className="text-color-header">Create Account</h1>
          <input className="text-color" type="text" placeholder="Name" />
          <input className="text-color" type="email" placeholder="Email" />
          <input className="text-color" type="password" placeholder="Password" />
          <button type="button" onClick={onLogin}>Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in">
        <form>
          <h1 className="text-color-header">Sign In</h1>
          <input className="text-color" type="email" placeholder="Email" />
          <input className="text-color" type="password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <button type="button" onClick={onLogin}>Sign In</button>
        </form>
      </div>

      {/* Toggle Panels */}
      <div className="toggle-container">
        <div className="toggle">
          {/* Left Panel */}
          <div className="toggle-panel toggle-left">
            <h1 className="text-color-header2">Welcome Back</h1>
            <p>Enter your personal details to use all of the site's features</p>
            <button onClick={handleLoginClick}>
              Sign In
            </button>
          </div>

          {/* Right Panel */}
          <div className="toggle-panel toggle-right">
            <h1 className="text-color-header2">Hello there!</h1>
            <p>Register with your personal details to use all of the site's features</p>
            <button onClick={handleRegisterClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
