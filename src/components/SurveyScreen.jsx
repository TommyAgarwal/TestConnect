import React, { useState } from 'react';
import SplitText from './SplitText';
import './SurveyScreen.css';

const CaretLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 15L7.5 10L12.5 5" stroke="#041E3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function SurveyScreen({ onBack, onSubmit }) {
  const [ease, setEase] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [language, setLanguage] = useState(null);
  const [confusion, setConfusion] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ease: ease || 'N/A',
      confidence: confidence || 'N/A',
      language: language || 'N/A',
      confusion: confusion.trim() || 'N/A',
      feedback: feedback.trim() || 'N/A',
    });
  };

  return (
    <div className="survey-screen screen-transition" data-node-id="4:3588">
      {/* Header */}
      <div className="survey-header">
        <button className="back-button" onClick={onBack} aria-label="Go Back" data-node-id="4:3768">
          <CaretLeftIcon />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="survey-form-container">
        <div className="survey-content">
          <div className="survey-header-text" data-node-id="4:3692">
            <h1 className="survey-title" data-node-id="4:3680">
              <SplitText text="Take our short survey" delay={100} />
            </h1>
            <p className="survey-subtitle reveal-in" style={{ '--delay': '200ms' }} data-node-id="4:3681">
              Your anonymous feedback will help improve this experience
            </p>
          </div>

          <div className="survey-fields reveal-in" style={{ '--delay': '450ms' }} data-node-id="4:3679">
            {/* Q1: Ease of Completion */}
            <div className="survey-question-group" data-node-id="4:3631">
              <label className="question-label" data-node-id="4:3615">
                How easy was it to complete the signup?
              </label>
              <div className="scale-legend" data-node-id="4:3628">
                <span data-node-id="4:3626">Very Difficult</span>
                <span data-node-id="4:3627">Very Easy</span>
              </div>
              <div className="scale-options-container" data-node-id="4:3629">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`scale-btn ${ease === num ? 'selected' : ''}`}
                    onClick={() => setEase(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2: Confidence */}
            <div className="survey-question-group" data-node-id="4:3632">
              <label className="question-label" data-node-id="4:3633">
                How confident did you feel completing the signup?
              </label>
              <div className="scale-legend" data-node-id="4:3635">
                <span data-node-id="4:3636">Not Confident</span>
                <span data-node-id="4:3637">Very Confident</span>
              </div>
              <div className="scale-options-container" data-node-id="4:3638">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`scale-btn ${confidence === num ? 'selected' : ''}`}
                    onClick={() => setConfidence(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Q3: Language Preference */}
            <div className="survey-question-group" data-node-id="4:3649">
              <label className="question-label" data-node-id="4:3650">
                Did the signup appear in your preferred language?
              </label>
              <div className="binary-options-container" data-node-id="4:3655">
                <button
                  type="button"
                  className={`binary-btn ${language === 'Yes' ? 'selected' : ''}`}
                  onClick={() => setLanguage('Yes')}
                  data-node-id="4:3656"
                >
                  <span data-node-id="4:3657">Yes</span>
                </button>
                <button
                  type="button"
                  className={`binary-btn ${language === 'No' ? 'selected' : ''}`}
                  onClick={() => setLanguage('No')}
                  data-node-id="4:3658"
                >
                  <span data-node-id="4:3659">No</span>
                </button>
              </div>
            </div>

            {/* Q4: Confusion */}
            <div className="survey-question-group" data-node-id="4:3668">
              <label className="question-label" data-node-id="4:3669">
                Did you experience any confusion during the signup?
              </label>
              <textarea
                className="survey-textarea"
                placeholder="Describe any friction or points of confusion..."
                value={confusion}
                onChange={(e) => setConfusion(e.target.value)}
                data-node-id="4:3671"
              />
            </div>

            {/* Q5: Suggestions */}
            <div className="survey-question-group" data-node-id="4:3675">
              <label className="question-label" data-node-id="4:3676">
                Any other feedback or suggestions?
              </label>
              <textarea
                className="survey-textarea"
                placeholder="Your thoughts..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                data-node-id="4:3677"
              />
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="survey-footer reveal-in" style={{ '--delay': '650ms' }}>
          <button type="submit" className="btn-primary submit-responses-btn" data-node-id="4:3666">
            SUBMIT RESPONSES
          </button>
        </div>
      </form>
    </div>
  );
}
