import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import LoginSignup from './LoginSignup';
import DialectTranslator from './DialectTranslator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<HomePage section="about" />} />
        <Route path="/developers" element={<HomePage section="developers" />} />
        <Route path="/auth" element={<LoginSignup />} />
        <Route path="/app" element={<DialectTranslator />} />
      </Routes>
    </Router>
  );
}

export default App;