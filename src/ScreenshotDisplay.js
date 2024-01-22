// ScreenshotDisplay.js
import React from 'react';

const ScreenshotDisplay = ({ screenshotPath }) => {
    return (
      <div className="screenshot-container">
        <h2>Screenshot</h2>
        <img src={screenshotPath} alt="Screenshot" />
      </div>
    );
  };
  
export default ScreenshotDisplay;
