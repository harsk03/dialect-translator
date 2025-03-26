import React, { useState, useRef, useEffect, useCallback } from 'react';

const VoiceRecognition = ({ 
  language, 
  onTranscript, 
  theme 
}) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Language code mapping
  const getLanguageCode = useCallback((language) => {
    const languageCodeMap = {
      'Hindi': 'hi-IN',
      'Bengali': 'bn-BD',
      'Tamil': 'ta-IN',
      'Marathi': 'mr-IN',
      'English': 'en-IN',
      'Detect language': 'en-IN' // Default to English if language not detected
    };
    return languageCodeMap[language] || 'en-IN';
  }, []);

  useEffect(() => {
    // Check browser support for Web Speech API
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      
      // Configuration
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = getLanguageCode(language);

      // Event Handlers
      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.error('Web Speech API not supported');
    }

    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language, getLanguageCode, onTranscript]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } else {
      // Start listening
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (err) {
          console.error('Failed to start speech recognition', err);
        }
      }
    }
  }, [isListening]);

  // Add an effect to trigger voice recognition when component is used
  useEffect(() => {
    toggleListening();
  }, [toggleListening]);

  return null; // This component doesn't render anything visually
};

export default React.memo(VoiceRecognition);