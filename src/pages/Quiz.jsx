import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import questionsData from "../data/questions.json";
import "./Quiz.css";

export default function Quiz() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currIdx, setCurrIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const allCategoryQuestions = questionsData[category];
    if (!allCategoryQuestions || allCategoryQuestions.length === 0) {
      navigate("/dashboard");
      return;
    }
    
    // Pick 20 random questions for the mock exam
    const shuffled = [...allCategoryQuestions].sort(() => 0.5 - Math.random());
    const selectedSubset = shuffled.slice(0, 20);
    setQuestions(selectedSubset);
  }, [category, navigate]);

  if (questions.length === 0) return null;

  const currentQ = questions[currIdx];

  const handleSubmit = () => {
    if (!isAnswered) {
      // First click: evaluate and show explanation
      setIsAnswered(true);
      if (selected === currentQ.ans) {
        setScore(score + 1);
      }
    } else {
      // Second click: go to next question
      if (currIdx + 1 < questions.length) {
        setSelected(null);
        setIsAnswered(false);
        setCurrIdx(currIdx + 1);
      } else {
        // Finish quiz
        navigate("/result", { state: { score: score, total: questions.length, category } });
      }
    }
  };

  return (
    <div className="quiz-page fade-up">
      <div className="quiz-container">
        <header className="quiz-header">
          <div className="quiz-progress-text">
            Question {currIdx + 1} of {questions.length}
          </div>
          <div className="quiz-progress-bar">
            <div 
              className="quiz-progress-fill" 
              style={{ width: `${((currIdx + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </header>

        <div className="quiz-card card">
          <h2 className="question-text">{currentQ.q}</h2>
          
          <div className="options-grid">
            {currentQ.options.map((opt, idx) => {
              let btnClass = "";
              if (isAnswered) {
                if (idx === currentQ.ans) btnClass = "correct";
                else if (idx === selected) btnClass = "wrong";
              } else if (selected === idx) {
                btnClass = "selected";
              }

              return (
                <button
                  key={idx}
                  className={`option-btn ${btnClass}`}
                  disabled={isAnswered}
                  onClick={() => setSelected(idx)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                  <span className="option-text">{opt}</span>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="explanation-box fade-up">
              <h4>Explanation:</h4>
              <p>{currentQ.exp}</p>
            </div>
          )}
        </div>

        <div className="quiz-footer">
          <button 
            className="btn btn-primary" 
            disabled={selected === null} 
            onClick={handleSubmit}
          >
            {!isAnswered ? "Submit Answer" : (currIdx + 1 === questions.length ? "Finish Exam" : "Next Question →")}
          </button>
        </div>
      </div>
    </div>
  );
}
