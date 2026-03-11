import { useLocation,useNavigate } from "react-router-dom";
import "./result.css"

function result(){
    const location = useLocation();
    const navigate = useNavigate();

    const {idea,analysis}= location.state || {};
    return(
        <div className="result-container">
            <h1 className="result-title">Startup Analysis 🚀</h1>

            <div className="idea-card">
               <h2>Your Idea</h2>
                <p>{idea}</p>
            </div>

            <div className="analysis-card">
                <h2>AI Insights</h2>
                <pre>{analysis}</pre>
            </div>

            <button className="back-btn" onClick={() => navigate("/")}>
                Analyze Another Idea
            </button>
        </div>
    )

}
export default result;