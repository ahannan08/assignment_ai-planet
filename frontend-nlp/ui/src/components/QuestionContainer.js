// components/QuestionContainer.js
import React, { useState } from "react";
import "../styles/q.css";

const QuestionContainer = ({ onSubmit }) => {
  const [question, setQuestion] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (question.trim()) {
      onSubmit(question);
      setQuestion(""); // Clear the input field
    }
  };

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="question-input"
        placeholder="Type your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button type="submit" className="question-button">
        Ask
      </button>
    </form>
  );
};

export default QuestionContainer;
