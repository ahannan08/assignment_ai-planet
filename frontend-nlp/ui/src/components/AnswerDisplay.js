import React, { useState, useEffect } from 'react';
import UserAvatar from './utils/UserAvatar';
import AnswerLoading from './utils/AnswerLoading';
import TypingEffect from './utils/TypingEffect';
import '../styles/a.css';

const AnswerDisplay = ({ question, answer, loading, userName, isNew }) => {
  const [isTyping, setIsTyping] = useState(isNew);

  useEffect(() => {
    if (!loading && answer && isNew) {
      setIsTyping(true);
    }
  }, [answer, loading, isNew]);

  return (
    <div className="qa-container">
      {question && (
        <div className="question-section">
          <div className="qa-content">
            <UserAvatar name={userName} />
            <p className="qa-text question-text">{question}</p>
          </div>
        </div>
      )}

      <div className="answer-section">
        <div className="qa-content">
          <img src="/image.png" alt="Assistant" className="qa-avatar" />
          <div className="qa-text">
            {loading && isNew ? (
              <AnswerLoading />
            ) : (
              isNew && isTyping ? (
                <TypingEffect
                  text={answer}
                  onComplete={() => setIsTyping(false)}  // Stop typing after completion
                />
              ) : (
                <p>{answer}</p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerDisplay;
