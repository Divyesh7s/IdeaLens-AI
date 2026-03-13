import { useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { RiAccountCircleLine } from "react-icons/ri";

function Home() {

  const [idea, setIdea] = useState("");
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const loggedIn = storedUser !== null;

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://idealens-ai.onrender.com/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ idea: idea })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      navigate("/result", {
        state: {
          idea: idea,
          analysis: data.analysis
        }
      });

    } catch (err) {
      console.error(err);
    }
  };
  // Example user (later replace with real login data)
  

//   const loggedIn = false;

  return (
    <div className="home-container">

      {/* Navbar */}

      <nav className="navbar">
        <h2 className="logo">IdeaLens Ai</h2>
      <div className="nav-right">
        <ul className="nav-links">
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/about")}>About</li>
          <li onClick={() => navigate("/contact")}>Contact</li>
        </ul>

        {/* User Icon */}

        <div className="user-menu">

          <div
            className="user-icon"
            onClick={() => setOpen(!open)}
          >
            <RiAccountCircleLine size={28} color="#64748b" />
          </div>

          {open && (
            <div className="dropdown">

              {loggedIn ? (
                <>
                  <p className="user-name">{storedUser.name}</p>
                  <p className="user-email">{storedUser.email}</p>

                  <button className="logout-btn"
                    onClick={() => {
                    localStorage.removeItem("loggedInUser");
                    navigate("/login");
                  }}>Logout</button>
                </>
              ) : (
                <button className="login-btn"
                  onClick={() => navigate("/login")}>Login</button>
              )}

            </div>
          )}
         </div>
        </div>

      </nav>

      {/* Hero Section */}

      <div className="hero">

        <h1 className="title_name">IdeaLens AI</h1>

        <h1 className="hero-title">
          Turn Your Startup Idea Into Reality 🚀
        </h1>

        <p className="hero-desc">
          Share your startup idea and discover insights, improvements,
          and opportunities to build the next big innovation.
        </p>

        <form className="idea-form" onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Enter your startup idea..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          />

          <button>Submit Idea</button>

        </form>

      </div>
        
    </div>
  );
}

export default Home;