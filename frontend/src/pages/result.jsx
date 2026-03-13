import { useLocation, useNavigate } from "react-router-dom";
import "./result.css";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { idea, analysis } = location.state || {};

  const formatAnalysis = (text) => {
    if (!text) return "";
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br/>");
  };

  return (
    <div className="result-container">

      <div className="result-header">
        <span className="result-badge">✦ AI Analysis Complete</span>
        <h1 className="result-title">Startup Analysis 🚀</h1>
        <p className="result-subtitle">Here's what our AI thinks about your idea</p>
      </div>

      <div className="cards-wrapper">

        <div className="idea-card">
          <div className="card-header">
            <div className="card-icon green">💡</div>
            <h2>Your Idea</h2>
            <span className="card-tag">Input</span>
          </div>
          <div className="card-body">
            <p className="idea-text">{idea}</p>
          </div>
        </div>

        <div className="analysis-card">
          <div className="card-header">
            <div className="card-icon blue">📊</div>
            <h2>AI Insights</h2>
            <span className="card-tag">Result</span>
          </div>
          <div className="card-body">
            <div
              className="analysis-text"
              dangerouslySetInnerHTML={{ __html: formatAnalysis(analysis) }}
            />
          </div>
        </div>

      </div>

      <button className="back-btn" onClick={() => navigate("/")}>
        ← Analyze Another Idea
      </button>

    </div>
  );
}

export default Result;