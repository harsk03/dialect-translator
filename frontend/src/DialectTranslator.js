// DialectTranslator.js
import React, { useState, useEffect } from 'react';
import './App.css';
import './WorkInProgressMessage.css';
import HomeIcon from '@mui/icons-material/Home';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MicIcon from '@mui/icons-material/Mic';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import SchoolIcon from '@mui/icons-material/School';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LanguageIcon from '@mui/icons-material/Language';

function App() {
  const [theme, setTheme] = useState('light');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('Detect language');
  const [targetLanguage, setTargetLanguage] = useState('Hindi');
  const [sourceDialect, setSourceDialect] = useState('Standard');
  const [targetDialect, setTargetDialect] = useState('Standard');
  const [showDialectInfo, setShowDialectInfo] = useState(false);
  const [copyTooltip, setCopyTooltip] = useState('Copy');
  // eslint-disable-next-line
  const [showMessage, setShowMessage] = useState(true);
  
  const languages = [
    { name: 'Hindi', dialects: ['Standard', 'Bhojpuri'] },
    { name: 'Bengali', dialects: ['Standard', 'Chittagonian'] },
    { name: 'Tamil', dialects: ['Standard', 'Madurai'] },
    { name: 'Marathi', dialects: ['Standard', 'Konkani'] },
    { name: 'English', dialects: ['Standard'] }
  ];
  
  const dialectInfo = {
    'Bhojpuri': 'Bhojpuri is spoken in parts of northern and eastern India. It has approximately 50 million speakers and is known for its rich folk music and cultural traditions.',
    'Chittagonian': 'Chittagonian is spoken in southeastern Bangladesh. It varies significantly from Standard Bengali and has influences from Burmese and Arabic.',
    'Madurai': 'Madurai Tamil is spoken in and around Madurai city in Tamil Nadu, India. It\'s known for its unique pronunciation and vocabulary compared to Standard Tamil.',
    'Konkani': 'Konkani Marathi is spoken along the western coast of India. It has multiple dialects and is influenced by Portuguese due to historical colonization.'
  };

  useEffect(() => {
    if (inputText) {
      handleTranslate();
    }
    // eslint-disable-next-line
  }, [inputText, sourceLanguage, sourceDialect, targetLanguage, targetDialect]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleTranslate = () => {
    // This would connect to your NLP backend
    if (inputText) {
      setOutputText(`Translated from ${sourceLanguage} (${sourceDialect}) to ${targetLanguage} (${targetDialect}): "${inputText}"`);
    } else {
      setOutputText('');
    }
  };
  
  const handleSwapLanguages = () => {
    if (sourceLanguage !== 'Detect language') {
      const tempLang = sourceLanguage;
      const tempDialect = sourceDialect;
      setSourceLanguage(targetLanguage);
      setSourceDialect(targetDialect);
      setTargetLanguage(tempLang);
      setTargetDialect(tempDialect);
      
      // Also swap the text
      setInputText(outputText);
      setOutputText(inputText);
    }
  };

  const handleSourceLanguageChange = (e) => {
    setSourceLanguage(e.target.value);
    setSourceDialect('Standard');
  };

  const handleTargetLanguageChange = (e) => {
    setTargetLanguage(e.target.value);
    setTargetDialect('Standard');
  };
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyTooltip('Copied!');
      setTimeout(() => setCopyTooltip('Copy'), 2000);
    });
  };
  
  const toggleDialectInfo = () => {
    setShowDialectInfo(!showDialectInfo);
  };

  return (
    <div className="App">
      
      {/* Progress Message Bubble*/}
      <div className={`progress-message ${theme} ${!showMessage ? 'hidden' : ''}`}>
        
      <div className="progress-message-content">
  <div className="progress-indicator">
    <div className="pulse-dot"></div>
    <div className="pulse-dot"></div>
    <div className="pulse-dot"></div>
  </div>
  <div className="progress-text">
    <h3>Development in Progress</h3>
    <p>Our team is refining dialect translation models to ensure optimal accuracy. Thank you for your patience.</p>
  </div>
  <div className="progress-actions">
    <button className="home-button" onClick={() => window.location.href = '/home'}>
      <HomeIcon className="home-icon" />
      Home
    </button>
  </div>
  {/* <div className="progress-close">
    <CloseIcon 
      className="close-icon" 
      onClick={() => setShowMessage(false)} 
    />
  </div> */}
</div>
      </div>

      <div className={`phone-container ${theme}`}>
        <div className="app-header">
          <BookmarkBorderIcon className="icon" />
          <span className="app-title">
            <LanguageIcon style={{ marginRight: '8px' }} /> 
            Dialect Translator
          </span>
          <div className="right-icons">
            <div className="theme-toggle" onClick={toggleTheme}>
              {theme === 'dark' ? <LightModeIcon className="icon" /> : <DarkModeIcon className="icon" />}
            </div>
            <AccountCircleIcon className="icon" />
          </div>
        </div>
        
        <div className="translation-container">
          <div className="language-selector">
            <div className="language-dropdown">
              <div className="language-label">From:</div>
              <select 
                value={sourceLanguage} 
                onChange={handleSourceLanguageChange}
                className="language-select"
              >
                <option value="Detect language">Detect language</option>
                {languages.map(lang => (
                  <option key={`source-${lang.name}`} value={lang.name}>{lang.name}</option>
                ))}
              </select>
              
              {sourceLanguage !== 'Detect language' && (
                <select 
                  value={sourceDialect} 
                  onChange={(e) => setSourceDialect(e.target.value)}
                  className="dialect-select"
                >
                  {languages.find(lang => lang.name === sourceLanguage)?.dialects.map(dialect => (
                    <option key={`source-${dialect}`} value={dialect}>{dialect}</option>
                  ))}
                </select>
              )}
            </div>
            
            <div className="swap-icon-container" onClick={handleSwapLanguages}>
              <SwapHorizIcon className="swap-icon" />
            </div>
            
            <div className="language-dropdown">
              <div className="language-label">To:</div>
              <select 
                value={targetLanguage} 
                onChange={handleTargetLanguageChange}
                className="language-select"
              >
                {languages.map(lang => (
                  <option key={`target-${lang.name}`} value={lang.name}>{lang.name}</option>
                ))}
              </select>
              
              <select 
                value={targetDialect} 
                onChange={(e) => setTargetDialect(e.target.value)}
                className="dialect-select"
              >
                {languages.find(lang => lang.name === targetLanguage)?.dialects.map(dialect => (
                  <option key={`target-${dialect}`} value={dialect}>{dialect}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="dialect-tabs">
            <button 
              className={`dialect-tab ${targetDialect === 'Standard' ? 'active' : ''}`}
              onClick={() => setTargetDialect('Standard')}
            >
              Standard
            </button>
            {targetLanguage !== 'English' && languages.find(lang => lang.name === targetLanguage)?.dialects.filter(d => d !== 'Standard').map(dialect => (
              <button 
                key={dialect}
                className={`dialect-tab ${targetDialect === dialect ? 'active' : ''}`}
                onClick={() => setTargetDialect(dialect)}
              >
                {dialect}
              </button>
            ))}
          </div>
          
          <div className="text-area-container">
            <div className="text-input-area">
              <textarea
                placeholder="Enter text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="text-area"
              />
              <div className="text-actions">
                <div className="tooltip">
                  <ContentCopyIcon 
                    className="action-icon" 
                    onClick={() => copyToClipboard(inputText)}
                  />
                  <span className="tooltiptext">{copyTooltip}</span>
                </div>
              </div>
            </div>
            
            <div className="text-output-area">
              <div className="text-area output">
                {outputText || 'Translation will appear here'}
              </div>
              <div className="text-actions">
                <div className="tooltip">
                  <ContentCopyIcon 
                    className="action-icon" 
                    onClick={() => copyToClipboard(outputText)}
                  />
                  <span className="tooltiptext">{copyTooltip}</span>
                </div>
                {targetDialect !== 'Standard' && (
                  <InfoIcon className="action-icon info-button" onClick={toggleDialectInfo} />
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bottom-actions">
          <div className="action-button">
            <MicIcon />
            <span>Voice</span>
          </div>
          <div className="action-button">
            <SchoolIcon />
            <span>Learn</span>
          </div>
          <div className="action-button">
            <CameraAltIcon />
            <span>Camera</span>
          </div>
        </div>
        
        {showDialectInfo && (
          <div className={`dialect-info-panel show`}>
            <div className="info-panel-header">
              <div className="info-panel-title">About {targetDialect}</div>
              <CloseIcon className="close-icon" onClick={toggleDialectInfo} />
            </div>
            <p>{dialectInfo[targetDialect] || `Information about ${targetDialect} dialect.`}</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;