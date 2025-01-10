// // App.jsx
// import React, { useState } from "react";
// import "./App.css";

// const App = () => {
//   const [isActive, setIsActive] = useState(false);

//   const handleRegisterClick = () => {
//     setIsActive(true);
//   };

//   const handleLoginClick = () => {
//     setIsActive(false);
//   };

//   return (
//     <div className={`container ${isActive ? "active" : ""}`} id="container">
//       <div className="form-container sign-up">
//         <form>
//           <h1 className="text-color-header">Create Account</h1>
//           <input  className="text-color" type="text" placeholder="Name" />
//           <input  className="text-color" type="email" placeholder="Email" />
//           <input  className="text-color" type="password" placeholder="Password" />
//           <button type="button">Sign Up</button>
//         </form>
//       </div>

//       <div className="form-container sign-in">
//         <form>
//           <h1 className="text-color-header">Sign In</h1>
//           <input  className="text-color" type="email" placeholder="Email" />
//           <input  className="text-color" type="password" placeholder="Password" />
//           <a href="#">Forgot your password?</a>
//           <button type="button">Sign In</button>
//         </form>
//       </div>

//       <div className="toggle-container">
//         <div className="toggle">
//           <div className="toggle-panel toggle-left">
//             <h1 className="text-color-header2">Welcome Back</h1>
//             <p>Enter your personal details to use all of the site's features</p>
//             <button className="hidden" id="login" onClick={handleLoginClick}>
//               Sign In
//             </button>
//           </div>
//           <div className="toggle-panel toggle-right">
//             <h1 className="text-color-header2">Hello there!</h1>
//             <p>Register with your personal details to use all of the site's features</p>
//             <button className="hidden" id="register" onClick={handleRegisterClick}>
//               Sign Up
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

 //App.jsximport React, { useState } from "react";

import axios from "axios";
import React, { useState } from "react";

const App = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegister ? "/api/register" : "/api/login";
      const response = await axios.post(`http://localhost:8080${endpoint}`, formData);
      setMessage(response.data);
    } catch (error) {
      setMessage(error.response?.data || "An error occurred");
    }
  };

  return (
    <div>
      <h1>{isRegister ? "Register" : "Login"}</h1>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={() => setIsRegister(!isRegister)}>
        Switch to {isRegister ? "Login" : "Register"}
      </button>
    </div>
  );
};

export default App;

