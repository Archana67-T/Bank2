import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (!name.trim()) {
      setError("Please enter your name to continue.");
      return;
    }
    localStorage.setItem("bankprep_user", name.trim());
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-bg-orb orb1" />
      <div className="login-bg-orb orb2" />
      <div className="login-container fade-up">
        <div className="login-logo">
          <span className="logo-icon">🏦</span>
          <h1 className="logo-title">BankPrep</h1>
          <p className="logo-sub">Your ultimate bank exam preparation hub</p>
        </div>

        <div className="login-card card">
          <h2 className="login-heading">Welcome! Let's get started</h2>
          <p className="login-desc">Enter your name to begin your practice session.</p>

          <div className="input-group">
            <label htmlFor="username">Your Name</label>
            <input
              id="username"
              type="text"
              placeholder="e.g. Archana"
              value={name}
              onChange={e => { setName(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleStart()}
              className="login-input"
            />
            {error && <span className="input-error">{error}</span>}
          </div>

          <button className="btn btn-primary login-btn" onClick={handleStart}>
            Start Practicing →
          </button>

          <div className="login-features">
            {[
              { icon: "📚", label: "5+ Categories" },
              { icon: "⚡", label: "Instant Results" },
              { icon: "🏆", label: "Performance Tracking" },
            ].map(f => (
              <div key={f.label} className="feature-chip">
                <span>{f.icon}</span> {f.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
