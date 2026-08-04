import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import questionsData from "../data/questions.json";
import "./Study.css";

export default function Study() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 50;

  useEffect(() => {
    const allCategoryQuestions = questionsData[category];
    if (!allCategoryQuestions || allCategoryQuestions.length === 0) {
      navigate("/dashboard");
      return;
    }
    setQuestions(allCategoryQuestions);
  }, [category, navigate]);

  if (questions.length === 0) return null;

  // Pagination logic
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="study-page fade-up">
      <div className="study-header">
        <button className="btn btn-outline back-btn" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
        <h1 className="study-title">
          Study Mode: <span className="highlight">{category.toUpperCase()}</span>
        </h1>
        <p className="study-sub">Reviewing {questions.length} Questions</p>
      </div>

      <div className="study-container">
        {currentQuestions.map((q, index) => {
          const globalIndex = startIndex + index + 1;
          return (
            <div key={globalIndex} className="card study-card">
              <h3 className="study-q-text">
                <span className="q-number">Q{globalIndex}.</span> {q.q}
              </h3>
              <div className="study-options">
                {q.options.map((opt, optIdx) => {
                  const isCorrect = q.ans === optIdx;
                  return (
                    <div 
                      key={optIdx} 
                      className={`study-option ${isCorrect ? "correct-answer" : ""}`}
                    >
                      <span className="study-opt-letter">{String.fromCharCode(65 + optIdx)}.</span>
                      <span className="study-opt-text">{opt}</span>
                      {isCorrect && <span className="correct-badge">✓ Correct</span>}
                    </div>
                  );
                })}
              </div>
              {q.exp && (
                <div className="study-explanation fade-up">
                  <h4>Explanation:</h4>
                  <p>{q.exp}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pagination-controls">
        <button 
          className="btn btn-outline" 
          disabled={currentPage === 1} 
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className="page-info">Page {currentPage} of {totalPages}</span>
        <button 
          className="btn btn-outline" 
          disabled={currentPage === totalPages} 
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
