import React, { useState } from 'react';
import SplitText from './SplitText';
import usFlag from '../assets/us_flag.png';
import './PhoneInputScreen.css';

const CaretLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 15L7.5 10L12.5 5" stroke="#041E3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function PhoneInputScreen({ 
  initialPhone = '', 
  onContinueUS, 
  onContinueInternational, 
  onBack, 
  progress 
}) {
  const [phone, setPhone] = useState(initialPhone);
  const [rawDigits, setRawDigits] = useState(() => initialPhone.replace(/\D/g, '').replace(/^1/, ''));
  const [isFocused, setIsFocused] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  // Responsive CTA positioning when soft keyboard is active on mobile
  React.useEffect(() => {
    if (!window.visualViewport) return;

    const handleViewportChange = () => {
      const vv = window.visualViewport;
      const diff = window.innerHeight - vv.height;
      if (diff > 100) {
        setKeyboardOffset(diff);
      } else {
        setKeyboardOffset(0);
      }
    };

    window.visualViewport.addEventListener('resize', handleViewportChange);
    window.visualViewport.addEventListener('scroll', handleViewportChange);
    return () => {
      window.visualViewport.removeEventListener('resize', handleViewportChange);
      window.visualViewport.removeEventListener('scroll', handleViewportChange);
    };
  }, []);

  const handlePhoneChange = (e) => {
    const rawInput = e.target.value;
    const isDeleting = e.nativeEvent?.inputType?.includes('delete') || false;

    let str = rawInput.trim();
    if (str.startsWith('+1')) {
      str = str.slice(2);
    } else if (str.startsWith('+')) {
      str = str.slice(1);
    }

    let digits = str.replace(/\D/g, '');
    if (digits.length === 11 && digits.startsWith('1')) {
      digits = digits.slice(1);
    }

    if (isDeleting && rawDigits && digits.length === rawDigits.length && digits.length > 0) {
      digits = digits.slice(0, -1);
    }

    digits = digits.slice(0, 10);
    setRawDigits(digits);

    let formatted = '';
    if (digits.length > 0) {
      if (digits.length < 3) {
        formatted = `(${digits}`;
      } else if (digits.length === 3) {
        formatted = `(${digits})`;
      } else if (digits.length <= 6) {
        formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      } else {
        formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
      }
    }
    setPhone(formatted);
  };

  const handleClear = () => {
    setPhone('');
    setRawDigits('');
  };

  const isContinueEnabled = rawDigits.length === 10;

  const handleContinue = () => {
    if (isContinueEnabled && onContinueUS) {
      onContinueUS(phone);
    }
  };

  return (
    <div className="phone-screen screen-transition">
      {/* Header with Back button and Progress Bar */}
      <div className="phone-header">
        <button className="back-button" onClick={onBack} aria-label="Go Back">
          <CaretLeftIcon />
        </button>
        <div className="progress-container">
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="phone-content">
        <div className="phone-header-text">
          <h1 className="phone-title">
            <SplitText text="Let's get started!" delay={100} />
          </h1>
          <p className="phone-subtitle reveal-in" style={{ '--delay': '200ms' }}>
            Enter your phone number.
          </p>
        </div>

        {/* Inputs */}
        <div className="phone-input-row reveal-in" style={{ '--delay': '400ms' }}>
          <div className="country-code-box" aria-label="Country code USA +1">
            <img src={usFlag} alt="US Flag" className="flag-img" />
            <span className="code-text">+1</span>
          </div>
          <div className="phone-number-wrapper">
            <input 
              type="tel"
              className="phone-number-input"
              placeholder="(555) 000-0000"
              value={phone}
              onChange={handlePhoneChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              name="tel"
              autocomplete="tel-national"
            />
            {isFocused && phone && (
              <button 
                type="button" 
                className="clear-button" 
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleClear}
                aria-label="Clear phone number"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* International Flow Link */}
        <button 
          type="button"
          className="intl-flow-link reveal-in" 
          style={{ '--delay': '550ms' }}
          onClick={onContinueInternational}
        >
          I don't have a US phone number
        </button>
      </div>

      {/* Footer CTA */}
      <div 
        className="phone-footer reveal-in" 
        style={{ 
          '--delay': '700ms',
          transform: keyboardOffset > 0 ? `translateY(-${keyboardOffset}px)` : undefined
        }}
      >
        <button 
          type="button"
          className={`btn-primary continue-button ${isContinueEnabled ? 'active' : 'disabled'}`}
          onClick={handleContinue}
          disabled={!isContinueEnabled}
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}
