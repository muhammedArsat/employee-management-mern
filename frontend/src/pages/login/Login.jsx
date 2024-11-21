import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
const Login = () => {

  const navigate = useNavigate();
  const handleSubmit = (e)=> {
    e.preventDefault();
    navigate("/employee-lists")
  }
  return (
    <div className="container">
    <form className="login-container" onSubmit={handleSubmit}>
      <h3>Login Here!</h3>
      <div className="label-container">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" required placeholder="Jhon Doe" />
      </div>

      <div className="label-container">
        <label htmlFor="pass">Password</label>
        <input type="password" name="pass" required placeholder="Password"  />
      </div>

      <button className="login-btn" onSubmit={onsubmit}>Login</button>
    </form>
    </div>

  );
};

export default Login;
