import React, { useEffect, useState } from 'react';
import SplitText from './SplitText';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Start progress transition on mount
    const progressTimer = setTimeout(() => {
      setActive(true);
    }, 50);

    // Auto-advance screen after 3 seconds (3000ms)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(completeTimer);
    };
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
    <div className="loading-screen screen-transition" data-node-id="1:115">
      <div className="loading-box" data-node-id="1:140">
        <h2 className="loading-text" data-node-id="1:139">
          <SplitText text="Generating your exclusive offer..." delay={100} />
        </h2>
        <div className="loading-progress-container" data-node-id="1:132">
          <div className="loading-progress-track" data-node-id="1:133">
            <div 
              className={`loading-progress-fill ${active ? 'active' : ''}`} 
              data-node-id="1:134" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
