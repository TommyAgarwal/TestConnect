import React from 'react';
import SplitText from './SplitText';
import './ThankYouScreen.css';

export default function ThankYouScreen({ onReset }) {
  return (
    <div className="thank-you-screen screen-transition" data-node-id="4:3751">
      {/* Centered content */}
      <div className="thank-you-center" data-node-id="4:3757">
        <h1 className="thank-you-title" data-node-id="4:3759">
          <SplitText text="ALL DONE!" delay={100} />
        </h1>
        <p className="thank-you-message reveal-in" style={{ '--delay': '250ms' }} data-node-id="4:3758">
          Thank you for your participation. You may now close this window.
        </p>
      </div>

      {/* Reset footer link */}
      <div className="thank-you-footer reveal-in" style={{ '--delay': '550ms' }}>
        <button 
          className="run-again-link" 
          onClick={onReset}
          data-node-id="4:3760"
        >
          Run test again
        </button>
      </div>
    </div>
  );
}
