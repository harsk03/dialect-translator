// TextArea.js
import React, { useState, useEffect } from 'react';
import './App.css';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MicIcon from '@mui/icons-material/Mic';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import GroupsIcon from '@mui/icons-material/Groups';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LanguageSelector from './LanguageSelector';
import TextArea from './TextArea';

function App() {
  const [theme, setTheme] = useState('dark');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('Detect language');
  const [targetLanguage, setTargetLanguage] = useState('Hindi');
  const [sourceDialect, setSourceDialect] = useState('Standard');
  const [targetDialect, setTargetDialect] = useState('Standard');
  
  const languages = [
    { name: 'Hindi', dialects: ['Standard', 'Bhojpuri'] },
    { name: 'Bengali', dialects: ['Standard', 'Chittagonian'] },
    { name: 'Tamil', dialects: ['Standard', 'Madurai'] },
    { name: 'Marathi', dialects: ['Standard', 'Konkani'] },
    { name: 'English', dialects: ['Standard'] }
  ];

  useEffect(() => {
    if (inputText) {
      handleTranslate();
    }
  }, [inputText, sourceLanguage, sourceDialect, targetLanguage, targetDialect]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleTranslate = () => {
    // This would connect to your NLP backend
    if (inputText) {
      setOutputText(`Translated text from ${sourceLanguage} (${sourceDialect}) to ${targetLanguage} (${targetDialect}): "${inputText}"`);
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

  const handleSourceLanguageChange = (language) => {
    setSourceLanguage(language);
    setSourceDialect('Standard');
  };

  const handleTargetLanguageChange = (language) => {
    setTargetLanguage(language);
    setTargetDialect('Standard');
  };

  return (
    <div className={`App ${theme}`}>
      <div className="phone-container">
        <div className="app-header">
          <BookmarkBorderIcon className="icon" />
          <span className="app-title">Dialect Translator</span>
          <div className="right-icons">
            <div className="theme-toggle" onClick={toggleTheme}>
              {theme === 'dark' ? <LightModeIcon className="icon" /> : <DarkModeIcon className="icon" />}
            </div>
            <AccountCircleIcon className="icon" />
          </div>
        </div>
        
        <div className="translation-container">
          <LanguageSelector 
            languages={languages}
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            sourceDialect={sourceDialect}
            targetDialect={targetDialect}
            onSourceLanguageChange={handleSourceLanguageChange}
            onTargetLanguageChange={handleTargetLanguageChange}
            onSourceDialectChange={setSourceDialect}
            onTargetDialectChange={setTargetDialect}
            onSwap={handleSwapLanguages}
          />
          
          <div className="text-area-container">
            <TextArea 
              isInput={true}
              text={inputText}
              onTextChange={setInputText}
              placeholder="Enter text"
            />
            
            <TextArea 
              isInput={false}
              text={outputText}
              onTextChange={() => {}}
              placeholder="Translation"
            />
          </div>
        </div>
        
        <div className="bottom-actions">
          <div className="action-button">
            <GroupsIcon />
            <span>Conversation</span>
          </div>
          <div className="action-button">
            <MicIcon />
          </div>
          <div className="action-button">
            <CameraAltIcon />
            <span>Camera</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;