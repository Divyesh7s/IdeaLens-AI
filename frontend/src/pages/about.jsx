import { useNavigate } from "react-router-dom";
import { RiAccountCircleLine } from "react-icons/ri";
import "./about.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-container">

      <nav className="navbar">
        <span className="logo" onClick={() => navigate("/")}>IdeaLens Ai</span>
        <div className="nav-right">
          <ul className="nav-links">
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/about")}>About</li>
            <li onClick={() => navigate("/contact")}>Contact</li>
          </ul>
          
        </div>
      </nav>

      <div className="about-header">
        <span className="about-badge">Who We Are</span>
        <h1 className="about-title">About Us</h1>
        <p className="about-subtitle">We help entrepreneurs validate and analyze their startup ideas using AI.</p>
      </div>

      <div className="about-wrapper">

        <div className="about-section">
          <div className="section-icon">🎯</div>
          <h2>Our Mission</h2>
          <p>We believe every great startup begins with a great idea. Our mission is to give every entrepreneur access to powerful AI-driven analysis so they can build smarter and faster.</p>
        </div>

       

        <div className="about-section">
          <div className="section-icon">⚙️</div>
          <h2>How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3>Enter Your Idea</h3>
              <p>Describe your startup idea in a few sentences.</p>
            </div>
            <div className="step-card">
              <div className="step-number">02</div>
              <h3>AI Analyzes</h3>
              <p>Our AI evaluates market size, competition and feasibility.</p>
            </div>
            <div className="step-card">
              <div className="step-number">03</div>
              <h3>Get Insights</h3>
              <p>Receive a detailed report with actionable recommendations.</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <div className="section-icon">👥</div>
          <h2>Made By</h2>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">DS</div>
              <h3>Divyesh Sathwara</h3>
              <p>Founder & Developer</p>
            </div>
        
          </div>
        </div>

        <div className="about-cta">
          <h2>Ready to analyze your idea?</h2>
          <p>Join thousands of entrepreneurs already using our platform.</p>
          <button className="cta-btn" onClick={() => navigate("/")}>
            Get Started →
          </button>
        </div>

      </div>
    </div>
  );
}

export default About;