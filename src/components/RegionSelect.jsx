import React, { useEffect } from 'react';
import SplitText from './SplitText';
import './RegionSelect.css';

// SVG Caret Left inline for portability and style control
const CaretLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 15L7.5 10L12.5 5" stroke="#041E3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function RegionSelect({ selectedRegion, onSelectRegion, onBack, onContinue, progress }) {
  const isContinueEnabled = !!selectedRegion;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '1') {
        onSelectRegion('USA');
      } else if (e.key === '2') {
        onSelectRegion('International');
      } else if (e.key === 'Enter' && isContinueEnabled) {
        onContinue();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelectRegion, onContinue, isContinueEnabled]);

  return (
    <div className="region-select-screen screen-transition" data-node-id="1:22">
      {/* Header with Back button and Progress Bar */}
      <div className="region-header" data-node-id="4:3781">
        <button className="back-button" onClick={onBack} aria-label="Go Back" data-node-id="1:30">
          <CaretLeftIcon />
        </button>
        <div className="progress-container" data-node-id="1:32">
          <div className="progress-track" data-node-id="1:33">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }} 
              data-node-id="1:34"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="region-content" data-node-id="4:3567">
        <h1 className="region-title" data-node-id="1:23">
          <SplitText text="Select your region to sign up" delay={100} />
        </h1>
        
        <div className="options-container reveal-in" style={{ '--delay': '400ms' }} data-node-id="4:3566">
          <button 
            className={`option-card ${selectedRegion === 'USA' ? 'selected' : ''}`}
            onClick={() => onSelectRegion('USA')}
            data-node-id="1:24"
          >
            <span className="option-text" data-node-id="1:25">United States</span>
          </button>
          
          <button 
            className={`option-card ${selectedRegion === 'International' ? 'selected' : ''}`}
            onClick={() => onSelectRegion('International')}
            data-node-id="1:26"
          >
            <span className="option-text" data-node-id="1:27">International</span>
          </button>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="region-footer reveal-in" style={{ '--delay': '600ms' }}>
        <button 
          className={`btn-primary continue-button ${isContinueEnabled ? 'active' : 'disabled'}`}
          onClick={onContinue}
          disabled={!isContinueEnabled}
          data-node-id="1:28"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}
