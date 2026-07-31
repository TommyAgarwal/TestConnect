import React, { useEffect } from 'react';
import googleWalletSvg from './GoogleWallet.svg';
import './SuccessScreen.css';

// CSS Barcode simulation pattern (widths in pixels)
const BARCODE_PATTERN = [
  2, 1, 3, 1, 1, 4, 2, 1, 2, 3, 1, 1, 4, 1, 2, 2, 1, 3, 1, 2, 4, 1, 1, 3, 2, 1, 2, 1, 4, 1, 2, 3, 1, 2, 1, 4, 2, 1
];

export default function SuccessScreen({ onComplete }) {
  useEffect(() => {
    // success screen auto-advances to the next step after 3000ms
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="success-screen screen-transition" data-node-id="4:3445">
      <div className="coupon-card reveal-in" style={{ '--delay': '100ms' }} data-node-id="4:3446">
        
        {/* Coupon Header */}
        <div className="coupon-header" data-node-id="4:3448">
          <div className="coupon-brand-group" data-node-id="4:3450">
            <span className="coupon-welcome" data-node-id="4:3451">Welcome to</span>
            <div className="coupon-logo-box" data-node-id="4:3452">
              <span className="coupon-logo-text" data-node-id="4:3453">TEST CONNECT</span>
            </div>
          </div>
          
          <div className="coupon-banner" data-node-id="4:3454">
            <p className="banner-take" data-node-id="4:3455">Take</p>
            <p className="banner-discount" data-node-id="4:3456">10% Off</p>
            <p className="banner-terms" data-node-id="4:3457">Your Entire Purchase</p>
          </div>
          
          <div className="coupon-expiry" data-node-id="4:3458">
            <span className="expiry-title" data-node-id="4:3459">OFFER EXPIRES</span>
            <span className="expiry-date" data-node-id="4:3460">July 30, 2026</span>
          </div>
        </div>

        {/* Real Barcode representation using custom CSS lines */}
        <div className="barcode-container" data-node-id="4:3461">
          <div className="barcode-lines">
            {BARCODE_PATTERN.map((width, index) => (
              <span 
                key={index} 
                className="barcode-bar" 
                style={{ 
                  width: `${width}px`,
                  marginRight: index % 3 === 0 ? '2px' : '1px' 
                }} 
              />
            ))}
          </div>
          <p className="barcode-code" data-node-id="4:3463">
            UUP10GLP0009ABC6TS
          </p>
        </div>

        {/* Wallet Badge from user SVG */}
        <div className="wallet-badge-wrapper" data-node-id="17:3995">
          <img src={googleWalletSvg} alt="Add to Google Wallet" className="google-wallet-btn" />
        </div>
        
      </div>
    </div>
  );
}
