import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiAccountCircleLine } from "react-icons/ri";
import "./contact.css";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-container">
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
      <div className="contact-header">
        <span className="contact-badge">Get In Touch</span>
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">Have a question or feedback? We'd love to hear from you.</p>
      </div>

      <div className="contact-wrapper">

        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">📧</div>
            <div>
              <h3>Email</h3>
              <p>idealensai@gmail.com</p>
            </div>
          </div>
          
          <div className="info-card">
            <div className="info-icon">🕐</div>
            <div>
              <h3>Response Time</h3>
              <p>Within 24 hours</p>
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          {submitted ? (
            <div className="success-msg">
              <div className="success-icon">✅</div>
              <h2>Message Sent!</h2>
              <p>We'll get back to you within 24 hours.</p>
              <button className="back-btn" onClick={() => setSubmitted(false)}>
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  placeholder="Write your message..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Send Message →
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

export default Contact;