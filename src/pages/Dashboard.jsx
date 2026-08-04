import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const CATEGORIES = [
  { id: "aptitude", name: "Aptitude", icon: "🔢", desc: "Test your math and calculation skills." },
  { id: "reasoning", name: "Logical Reasoning", icon: "🧠", desc: "Puzzles, seating arrangements, and logic." },
  { id: "english", name: "English Language", icon: "📖", desc: "Grammar, reading comprehension, and vocab." },
  { id: "current_affairs", name: "Current Affairs", icon: "🌍", desc: "Recent news and national events." },
  { id: "gk", name: "General Knowledge (GK)", icon: "🏛️", desc: "History, geography, and general facts." }
];

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("bankprep_user");
    if (!storedName) {
      navigate("/");
    } else {
      setUserName(storedName);
    }
  }, [navigate]);

  return (
    <div className="dashboard-page">
      <header className="dash-header">
        <div className="dash-header-content fade-up">
          <div>
            <h1 className="dash-title">Welcome back, <span className="highlight">{userName}</span>!</h1>
            <p className="dash-sub">Ready to ace your banking exams? Choose a category to practice.</p>
          </div>
          <button className="btn btn-outline" onClick={() => { localStorage.removeItem("bankprep_user"); navigate("/"); }}>
            Logout
          </button>
        </div>
      </header>

      <main className="dash-main fade-up">
        <div className="category-grid">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="card category-card">
              <div className="cat-icon">{cat.icon}</div>
              <h3 className="cat-title">{cat.name}</h3>
              <p className="cat-desc">{cat.desc}</p>
              <div className="cat-actions-row">
                <button className="btn btn-outline cat-btn" onClick={() => navigate(`/study/${cat.id}`)}>
                  Study All
                </button>
                <button className="btn btn-primary cat-btn" onClick={() => navigate(`/quiz/${cat.id}`)}>
                  Mock Exam
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
