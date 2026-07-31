import React from 'react';
import './SplitText.css';

/**
 * Splits text by line and reveals them with staggered delay.
 */
export default function SplitText({ text, lines, delay = 0, lineDelayMultiplier = 150 }) {
  // Use provided lines array, or split the text string by newlines (\n)
  const linesToRender = lines || (text ? text.split('\n') : []);

  return (
    <span className="split-text-container">
      {linesToRender.map((line, index) => (
        <span key={index} className="split-line-wrapper">
          <span
            className="split-line"
            style={{
              animationDelay: `${delay + index * lineDelayMultiplier}ms`,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
