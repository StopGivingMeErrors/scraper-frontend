// App.js (frontend code)
import React, { useState } from 'react';
import './App.css';
import ScreenshotDisplay from './ScreenshotDisplay';

function App() {
  const [result, setResult] = useState('');

  const handleScrape = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/scrape', {
        method: 'GET',
        mode: 'cors', // Add this line
      });
      const result = await response.json();
      setResult(result);
    } catch (error) {
      console.error('Error in handleScrape:', error);
    }
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Click the button to initiate scraping.
        </p>
        <button onClick={handleScrape}>Scrape Data</button>
        <div id="result">
          {result && result.screenshotPath && <ScreenshotDisplay screenshotPath={`http://localhost:3001${result.screenshotPath}`} />}
        </div>
      </header>
    </div>
  );
}

export default App;
