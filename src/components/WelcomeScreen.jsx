import React from 'react';
import SplitText from './SplitText';
import './WelcomeScreen.css';

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="welcome-screen screen-transition" data-node-id="1:9">
      {/* Content wrapper with top padding */}
      <div className="welcome-content" data-node-id="12:3843">
        <div className="welcome-header" data-node-id="12:3842">
          <h1 className="welcome-title" data-node-id="7:3841">
            <SplitText text="Welcome!" delay={100} />
          </h1>
          <p className="welcome-subtitle" data-node-id="4:3784">
            <SplitText 
              text="In this session, you will simulate a sign up for Test Connect, a fictional customer loyalty program for a retail brand." 
              delay={200}
              wordDelayMultiplier={30}
            />
          </p>
        </div>
        
        <ul className="welcome-bullets reveal-in" style={{ '--delay': '700ms' }} data-node-id="5:3786">
          <li>
            This is a usability test, not a real sign up. <span className="bold-text">Any personal information that you enter will NOT be used or stored.</span>
          </li>
          <li>
            Completion time and any feedback you choose to provide will be recorded <span className="text-secondary">anonymously.</span>
          </li>
          <li>
            This interaction is intended for mobile devices, please <span className="bold-text">use your phone if possible.</span>
          </li>
        </ul>
      </div>

      {/* Footer CTA */}
      <div className="welcome-footer reveal-in" style={{ '--delay': '900ms' }}>
        <button className="btn-primary" onClick={onStart} data-node-id="4:3782">
          GET STARTED
        </button>
      </div>
    </div>
  );
}
