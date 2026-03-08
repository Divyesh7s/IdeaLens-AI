import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("Account not found. Kindly sign up.");
      return;
    }

    if (
      storedUser.email === email &&
      storedUser.password === password
    ) {

      alert("Login successful");

      // store logged-in user session
      localStorage.setItem("loggedInUser", JSON.stringify(storedUser));

      navigate("/");

    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        <div className="login-left">
          <h2>Welcome Back 👋</h2>
          <p>Login to access your dashboard and manage your account.</p>
        </div>

        <div className="login-right">
          <h2 className="login-title">Login</h2>

          <form onSubmit={handleSubmit} className="login-form">

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="login-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>

              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>

            <p className="signup-text">
              Don't have an account?{" "}
              <span
                style={{ cursor: "pointer", color: "#22c55e" }}
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </p>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;