import React, { useState, useEffect } from 'react';
import '../../styles/TypingEffect.css';

const TypingEffect = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 20); // Typing speed can be controlled here, adjust for faster typing

      return () => clearTimeout(timer);
    } else {
      onComplete && onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <div className="typing-text">{displayedText}</div>;
};

export default TypingEffect;
