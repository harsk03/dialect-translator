// LanguageSelector.js
import React from 'react';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

function LanguageSelector({ 
  languages, 
  sourceLanguage, 
  targetLanguage, 
  sourceDialect, 
  targetDialect,
  onSourceLanguageChange,
  onTargetLanguageChange,
  onSourceDialectChange,
  onTargetDialectChange,
  onSwap
}) {
  return (
    <div className="language-selector">
      <div className="language-dropdown">
        <select 
          value={sourceLanguage} 
          onChange={(e) => onSourceLanguageChange(e.target.value)}
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
            onChange={(e) => onSourceDialectChange(e.target.value)}
            className="dialect-select"
          >
            {languages.find(lang => lang.name === sourceLanguage)?.dialects.map(dialect => (
              <option key={`source-${dialect}`} value={dialect}>{dialect}</option>
            ))}
          </select>
        )}
      </div>
      
      <SwapHorizIcon className="swap-icon" onClick={onSwap} />
      
      <div className="language-dropdown">
        <select 
          value={targetLanguage} 
          onChange={(e) => onTargetLanguageChange(e.target.value)}
          className="language-select"
        >
          {languages.map(lang => (
            <option key={`target-${lang.name}`} value={lang.name}>{lang.name}</option>
          ))}
        </select>
        
        <select 
          value={targetDialect} 
          onChange={(e) => onTargetDialectChange(e.target.value)}
          className="dialect-select"
        >
          {languages.find(lang => lang.name === targetLanguage)?.dialects.map(dialect => (
            <option key={`target-${dialect}`} value={dialect}>{dialect}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default LanguageSelector;