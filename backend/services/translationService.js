// backend/services/translationService.js
import fs from 'fs';
import path from 'path';
import { parseString } from 'xml2js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class TranslationService {
  constructor() {
    this.translationCorpus = null;
    this.languageDialectMapping = {
      'English': {
        'Standard': 'english'
      },
      'Hindi': {
        'Standard': 'hindi',
        'Bhojpuri': 'bhojpuri (varanasi)'
      },
      'Bengali': {
        'Standard': 'bengali',
        'Chittagonian': 'chittagonian'
      },
      'Tamil': {
        'Standard': 'tamil',
        'Madurai': 'madurai tamil'
      },
      'Marathi': {
        'Standard': 'marathi',
        'Konkani': 'konkani marathi'
      }
    };
    this.loadCorpus();
  }

  loadCorpus() {
    const tmxPath = path.join(__dirname, '..', '..', 'corpus', 'Multilingual_Corpus.tmx');
    
    try {
      const tmxContent = fs.readFileSync(tmxPath, 'utf-8');
      
      parseString(tmxContent, (err, result) => {
        if (err) {
          console.error('Error parsing TMX file:', err);
          return;
        }
        
        this.translationCorpus = result.tmx.body[0].tu.map(tu => {
          const translations = {};
          
          tu.tuv.forEach(tuv => {
            // Extract full language string
            let fullLang = tuv['$']['xml:lang'].toLowerCase().trim();
            
            translations[fullLang] = tuv.seg[0];
          });
          
          return translations;
        });

        console.log('Translation Corpus Loaded:', 
          this.translationCorpus.map(entry => JSON.stringify(entry)).join('\n')
        );
      });
    } catch (error) {
      console.error('Error loading translation corpus:', error);
    }
  }

  translateText(sourceLanguage, targetLanguage, sourceDialect, targetDialect, text) {
    if (!this.translationCorpus) {
      throw new Error('Translation corpus not loaded');
    }

    // Get mapped language and dialect
    const getLanguageDialectKey = (language, dialect) => {
      const dialectMap = this.languageDialectMapping[language] || {};
      return dialectMap[dialect] || dialectMap['Standard'];
    };

    const sourceKey = getLanguageDialectKey(sourceLanguage, sourceDialect);
    const targetKey = getLanguageDialectKey(targetLanguage, targetDialect);

    // Fallback Strategy 1: Fuzzy Matching
    const fuzzyMatch = this.translationCorpus.find(entry => 
        entry[sourceKey] && 
        entry[sourceKey].toLowerCase().includes(text.toLowerCase().trim())
      );
  
      if (fuzzyMatch) {
        return fuzzyMatch[targetKey];
      }

    // Fallback Strategy 2: Standard Language Translation
    const standardSourceKey = getLanguageDialectKey(sourceLanguage, 'Standard');
    const standardTargetKey = getLanguageDialectKey(targetLanguage, 'Standard');

    const standardEntry = this.translationCorpus.find(entry => 
      entry[standardSourceKey] && 
      entry[standardSourceKey].toLowerCase().trim() === text.toLowerCase().trim()
    );
     
    if (standardEntry) {
        return standardEntry[standardTargetKey];
      }
  
      // Optional: Dialect-Specific Manual Overrides
      const dialectOverrides = {
        'Madurai Tamil': {
          'Hello': 'வணக்கமும்'
        }
        // Add more dialect-specific translations here
      };
      
      const dialectKey = `${targetLanguage} ${targetDialect}`.toLowerCase();
    const manualOverride = dialectOverrides[dialectKey]?.[text];
    
    if (manualOverride) {
      return manualOverride;
    }

    console.log('Translation Attempt:', {
      sourceLanguage,
      sourceDialect,
      targetLanguage,
      targetDialect,
      sourceKey,
      targetKey,
      text
    });

    // Find matching translation
    const matchingEntry = this.translationCorpus.find(entry => 
      entry[sourceKey] && 
      entry[sourceKey].toLowerCase().trim() === text.toLowerCase().trim()
    );

    if (matchingEntry) {
      const translation = matchingEntry[targetKey];
      
      console.log('Translation Found:', {
        source: matchingEntry[sourceKey],
        target: translation
      });

      return translation || null;
    }

    console.log('No Translation Found for:', {
      sourceKey,
      targetKey,
      text
    });

    return null;
  }
}

export default new TranslationService();