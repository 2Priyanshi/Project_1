// import React, { useState } from "react";
// import "./Login.css";

// const Login = ({ onLogin }) => {
//   const [isActive, setIsActive] = useState(false);

//   const handleRegisterClick = () => {
//     setIsActive(true);
//   };

//   const handleLoginClick = () => {
//     setIsActive(false);
//   };

//   return (
//     <div className={`container ${isActive ? "active" : ""}`} id="container">
//       {/* Sign Up Form */}
//       <div className="form-container sign-up">
//         <form>
//           <h1 className="text-color-header">Create Account</h1>
//           <input className="text-color" type="text" placeholder="Name" />
//           <input className="text-color" type="email" placeholder="Email" />
//           <input className="text-color" type="password" placeholder="Password" />
//           <button type="button" onClick={onLogin}>Sign Up</button>
//         </form>
//       </div>

//       {/* Sign In Form */}
//       <div className="form-container sign-in">
//         <form>
//           <h1 className="text-color-header">Sign In</h1>
//           <input className="text-color" type="email" placeholder="Email" />
//           <input className="text-color" type="password" placeholder="Password" />
//           <a href="#">Forgot your password?</a>
//           <button type="button" onClick={onLogin}>Sign In</button>
//         </form>
//       </div>

//       {/* Toggle Panels */}
//       <div className="toggle-container">
//         <div className="toggle">
//           {/* Left Panel */}
//           <div className="toggle-panel toggle-left">
//             <h1 className="text-color-header2">Welcome Back</h1>
//             <p>Enter your personal details to use all of the site's features</p>
//             <button className="hidden" onClick={handleLoginClick}>
//               Sign In
//             </button>
//           </div>

//           {/* Right Panel */}
//           <div className="toggle-panel toggle-right">
//             <h1 className="text-color-header2">Hello there!</h1>
//             <p>Register with your personal details to use all of the site's features</p>
//             <button className="hidden" onClick={handleRegisterClick}>
//               Sign Up
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

//-----------------------------------------------------------------------------

// import React, { useState } from "react";
// import axios from "axios";
// import "./Login.css";

// const Login = ({ onLogin }) => {
//   const [isActive, setIsActive] = useState(false); // Toggles between login and register forms
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");
//   const history = useHistory();

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle registration
//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8080/api/register", {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//       });
//       setMessage(response.data);
//       setIsActive(false); // Switch to login form after successful registration
//     } catch (error) {
//       setMessage(error.response?.data || "Registration failed.");
//     }
//   };

//   // Handle login
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8080/api/login", {
//         email: formData.email,
//         password: formData.password,
//       });
//       setMessage(response.data);
//       onLogin(); // Notify App component that login was successful
//       history.push("/dashboard");
//     } catch (error) {
//       setMessage(error.response?.data || "Login failed.");
//     }
//   };

//   // Toggle to registration form
//   const handleRegisterClick = () => {
//     setIsActive(true);
//     setMessage("");
//   };

//   // Toggle to login form
//   const handleLoginClick = () => {
//     setIsActive(false);
//     setMessage("");
//   };

//   return (
//     <div className={`container ${isActive ? "active" : ""}`} id="container">
//       {/* Sign Up Form */}
//       <div className="form-container sign-up">
//         <form onSubmit={handleRegisterSubmit}>
//           <h1 className="text-color-header">Create Account</h1>
//           <input
//             className="text-color"
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleInputChange}
//           />
//           <input
//             className="text-color"
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleInputChange}
//           />
//           <input
//             className="text-color"
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleInputChange}
//           />
//           <button type="submit">Sign Up</button>
//         </form>
//       </div>

//       {/* Sign In Form */}
//       <div className="form-container sign-in">
//         <form onSubmit={handleLoginSubmit}>
//           <h1 className="text-color-header">Sign In</h1>
//           <input
//             className="text-color"
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleInputChange}
//           />
//           <input
//             className="text-color"
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleInputChange}
//           />
//           <a href="#">Forgot your password?</a>
//           <button type="submit">Sign In</button>
//         </form>
//       </div>

//       {/* Toggle Panels */}
//       <div className="toggle-container">
//         <div className="toggle">
//           {/* Left Panel */}
//           <div className="toggle-panel toggle-left">
//             <h1 className="text-color-header2">Welcome Back</h1>
//             <p>Enter your personal details to use all of the site's features</p>
//             <button className="hidden" onClick={handleLoginClick}>
//               Sign In
//             </button>
//           </div>

//           {/* Right Panel */}
//           <div className="toggle-panel toggle-right">
//             <h1 className="text-color-header2">Hello there!</h1>
//             <p>Register with your personal details to use all of the site's features</p>
//             <button className="hidden" onClick={handleRegisterClick}>
//               Sign Up
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Display message */}
//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// };

// export default Login;
//------------------------------------------------------------------------

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Updated import
import "./Login.css";

const Login = ({ onLogin }) => {
  const [isActive, setIsActive] = useState(false); // Toggles between login and register forms
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Updated from useHistory to useNavigate

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle registration
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      setMessage(response.data);
      setIsActive(false); // Switch to login form after successful registration
    } catch (error) {
      setMessage(error.response?.data || "Registration failed.");
    }
  };

  // Handle login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email: formData.email,
        password: formData.password,
      });
      setMessage(response.data);
      onLogin(); // Notify App component that login was successful
      navigate("/dashboard"); // Use navigate to redirect to dashboard
    } catch (error) {
      setMessage(error.response?.data || "Login failed.");
    }
  };

  // Toggle to registration form
  const handleRegisterClick = () => {
    setIsActive(true);
    setMessage("");
  };

  // Toggle to login form
  const handleLoginClick = () => {
    setIsActive(false);
    setMessage("");
  };

  return (
    <div className={`container ${isActive ? "active" : ""}`} id="container">
      {/* Sign Up Form */}
      <div className="form-container sign-up">
        <form onSubmit={handleRegisterSubmit}>
          <h1 className="text-color-header">Create Account</h1>
          <input
            className="text-color"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            className="text-color"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            className="text-color"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in">
        <form onSubmit={handleLoginSubmit}>
          <h1 className="text-color-header">Sign In</h1>
          <input
            className="text-color"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            className="text-color"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <a href="#">Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Toggle Panels */}
      <div className="toggle-container">
        <div className="toggle">
          {/* Left Panel */}
          <div className="toggle-panel toggle-left">
            <h1 className="text-color-header2">Welcome Back</h1>
            <p>Enter your personal details to use all of the site's features</p>
            <button className="hidden" onClick={handleLoginClick}>
              Sign In
            </button>
          </div>

          {/* Right Panel */}
          <div className="toggle-panel toggle-right">
            <h1 className="text-color-header2">Hello there!</h1>
            <p>Register with your personal details to use all of the site's features</p>
            <button className="hidden" onClick={handleRegisterClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Display message */}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;


