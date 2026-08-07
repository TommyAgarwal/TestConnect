import React, { useEffect } from 'react';
import SplitText from './SplitText';
import './TakeSurveyPrompt.css';

export default function TakeSurveyPrompt({ onAccept, onDecline }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        onAccept();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onAccept]);

  return (
    <div className="survey-prompt-screen screen-transition" data-node-id="4:3683">
      {/* Centered Content */}
      <div className="survey-prompt-center" data-node-id="4:3686">
        <p className="survey-prompt-sub" data-node-id="4:3688">
          <SplitText text="You completed the signup!" delay={100} />
        </p>
        <h2 className="survey-prompt-title" data-node-id="4:3687">
          <SplitText 
            text="Can we ask you a few quick questions about your experience?" 
            delay={250} 
            lineDelayMultiplier={180}
          />
        </h2>
      </div>

      {/* Footer Choices */}
      <div className="survey-prompt-footer reveal-in" style={{ '--delay': '750ms' }} data-node-id="4:3691">
        <button 
          className="btn-primary yes-button" 
          onClick={onAccept}
          data-node-id="4:3689"
        >
          YES
        </button>
        <button 
          className="btn-secondary no-button" 
          onClick={onDecline}
          data-node-id="4:3684"
        >
          NO
        </button>
      </div>
    </div>
  );
}
