import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import LoginSign from './LoginSignup';
import IndiaMap3D from './IndiaMap3D';
import DialectTranslator from './DialectTranslator';

const AuthPage = () => (
  <div className="auth-container">
    <LoginSign />
    <IndiaMap3D />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<HomePage section="about" />} />
        <Route path="/developers" element={<HomePage section="developers" />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/app" element={<DialectTranslator />} />
      </Routes>
    </Router>
  );
}

export default App;