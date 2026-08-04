import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, category } = location.state || { score: 0, total: 0, category: "unknown" };
  
  const percentage = total === 0 ? 0 : Math.round((score / total) * 100);
  
  let message = "Keep practicing!";
  let badge = "badge-danger";
  if (percentage >= 80) {
    message = "Outstanding! You're ready for the exam.";
    badge = "badge-success";
  } else if (percentage >= 50) {
    message = "Good effort! A little more practice needed.";
    badge = "badge-primary";
  }

  return (
    <div className="result-page fade-up">
      <div className="result-card card">
        <div className="result-icon">
          {percentage >= 80 ? "🏆" : percentage >= 50 ? "👍" : "💪"}
        </div>
        
        <h1 className="result-title">Quiz Completed!</h1>
        <p className="result-msg">{message}</p>
        
        <div className="score-circle">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path
              className="circle-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="circle"
              strokeDasharray={`${percentage}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="percentage">{percentage}%</text>
          </svg>
        </div>

        <div className="score-details">
          <div className="stat">
            <span className="stat-label">Score</span>
            <span className="stat-val">{score} / {total}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Status</span>
            <span className={`badge ${badge}`}>{percentage >= 50 ? "PASS" : "FAIL"}</span>
          </div>
        </div>

        <div className="result-actions">
          <button className="btn btn-primary" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
