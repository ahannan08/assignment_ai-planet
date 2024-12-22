// hooks/useQuestionSubmit.js
import { useState } from "react";
import { askQuestion } from "../api/api";

const useQuestionSubmit = (documentId) => {
  const [loading, setLoading] = useState(false);
  const [qnaHistory, setQnaHistory] = useState([]);
  const [error, setError] = useState("");

  const handleQuestionSubmit = async (questionText) => {
    setLoading(true);
    setError("");

    const newQuestion = { question: questionText, answer: "", isNew: true };
    setQnaHistory((prevHistory) => [newQuestion, ...prevHistory]);

    try {
      const data = await askQuestion(documentId, questionText);
      setQnaHistory((prevHistory) =>
        prevHistory.map((item, index) =>
          index === 0
            ? { ...item, answer: data.answer, isNew: false }
            : { ...item, isNew: false }
        )
      );
    } catch (err) {
      setError(err.message || "Error fetching answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    qnaHistory,
    error,
    handleQuestionSubmit,
  };
};

export default useQuestionSubmit;
