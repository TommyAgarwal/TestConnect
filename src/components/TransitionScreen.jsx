import React, { useEffect } from 'react';
import SplitText from './SplitText';
import './TransitionScreen.css';

export default function TransitionScreen({ onComplete }) {
  useEffect(() => {
    // Transition screen auto-advances to the next step
    // The user mentioned: "Once I provide the following screen I will specify the exact duration."
    // We'll set a standard default placeholder of 2000ms for now.
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  return (
    <div className="transition-screen screen-transition" data-node-id="1:15">
      <div className="transition-box" data-node-id="1:16">
        <p className="transition-welcome" data-node-id="1:17">
          <SplitText text="Welcome to" delay={150} />
        </p>
        <div className="transition-brand-border reveal-in" style={{ '--delay': '400ms' }} data-node-id="1:18">
          <p className="transition-brand-text" data-node-id="1:19">
            POLO CONNECT
          </p>
        </div>
      </div>
    </div>
  );
}
