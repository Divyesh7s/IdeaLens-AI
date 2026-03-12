import { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Signup failed");
        return;
      }

      alert("Signup successful!");

      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">

        <div className="signup-left">
          <h2>Create Account 🚀</h2>
          <p>Sign up to start using the dashboard and manage your account.</p>
        </div>

        <div className="signup-right">

          <h2 className="signup-title">Sign Up</h2>

          <form onSubmit={handleSubmit} className="signup-form">

            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={handleChange}
                required
              />
            </div>

            <button className="signup-btn">Create Account</button>

            <p className="login-text">
              Already have an account? <Link to="/login">Login</Link>
            </p>

          </form>

        </div>

      </div>
    </div>
  );
}

export default Signup;