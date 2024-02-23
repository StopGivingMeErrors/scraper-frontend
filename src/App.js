import React, { useState } from 'react';
import './App.css';
import copy from 'clipboard';

function App() {
  const [result, setResult] = useState('');
  const [includeScreenshot, setIncludeScreenshot] = useState(false);
  const [includeHTML, setIncludeHTML] = useState(false);
  const [scrapedHTML, setScrapedHTML] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);


  const handleDownloadImage = async () => {
    try {
      if (result && result.screenshotPath) {
        const response = await fetch(`https://scraper-chefk0n6m-stopgivingmeerrors.vercel.app${result.screenshotPath}`);

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'screenshot.jpg');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };


  class Clipboard {
    writeText(text) {
      return new Promise((resolve, reject) => {
        navigator.clipboard.writeText(text)
          .then(() => resolve())
          .catch(error => reject(error));
      });
    }
  }
  const handleScrape = async () => {
    try {
      setLoading(true);
  
      let requestUrl = `https://scraper-henna.vercel.app/api/scrape?url=${encodeURIComponent(url)}`;

  
      if (includeScreenshot) {
        requestUrl += '&screenshot=true';
      }
  
      if (includeHTML) {
        requestUrl += '&html=true';
      }
  
      const response = await fetch(requestUrl, {
        method: 'GET',
        mode: 'cors',
      });
  
      const result = await response.json();
      console.log('Scraped Result:', result);
  
      setResult(result);
      if (result.htmlContent) {
        setScrapedHTML(result.htmlContent);
      }
  
      // Introduce a small delay before setting loading to false
      setTimeout(() => {
        setLoading(false);
      }, 500); // Adjust the delay time as needed
  
    } catch (error) {
      console.error('Error in handleScrape:', error);
      setLoading(false); // Ensure loading is set to false in case of an error
    }
  };
  

  const handleCopyHTML = () => {
    if (scrapedHTML) {
      const clipboard = new Clipboard();
      clipboard.writeText(scrapedHTML)
        .then(() => alert('HTML copied to clipboard!'))
        .catch(error => console.error('Error copying HTML:', error));
    }
  };

  return (
    <div className="app-container">
      <header className="header">
      <h1>Scrapify</h1>
      </header>
      <section className="hero-section">
    
    {/* <p>Some catchy subheading to describe your product or service.</p> */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginBottom: '50px'}}>
      <label style={{ color: '#eeee', marginBottom: '30px' }}> Paste the link of the website we want to scrape:</label>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
        <input
          type="checkbox"
          checked={includeScreenshot}
          onChange={() => setIncludeScreenshot(!includeScreenshot)}
          id="includeScreenshotCheckbox"
          style={{ width: '20px', height: '21px', marginRight: '5px' }}
        />
        <label
          style={{ color:"#fff" }}
         htmlFor="includeScreenshotCheckbox">Scrape Screenshot</label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          checked={includeHTML}
          onChange={() => setIncludeHTML(!includeHTML)}
          id="includeHTMLCheckbox"
          style={{ width: '20px', height: '21px', marginRight: '5px' }}
        />
        <label
         style={{ color:"#fff" }}
         htmlFor="includeHTMLCheckbox">Scrape HTML</label>
      </div>
    </div>
    <button onClick={handleScrape}>Scrape Data</button>
 
  </section>
  {loading && (
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
    )}
      <section className="features-section">
       
        {result && (
          <div className="feature">
            {includeScreenshot && result.screenshotPath && (
            <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={`https://scraper-henna.vercel.app/${result.screenshotPath}`} alt="Scraped Data" />
              <a href={`https://scraper-henna.vercel.app/${result.screenshotPath}`} download="screenshot.jpg">
              <button onClick={handleDownloadImage}>Download Image</button>
              </a>
            </div>
          </>
          
              
            )}
            {includeHTML && scrapedHTML && (
              <div className="scraped-html-container">
                <h2>Scraped HTML Content</h2>
                <textarea
                  className="scraped-html-textarea"
                  value={scrapedHTML}
                  readOnly
                  rows={10}
                  cols={80}
                />
                <button onClick={handleCopyHTML}>Copy HTML</button>
              </div>
            )}
          </div>
        )}
      </section>

      
    </div>
  );
}


export default App;
