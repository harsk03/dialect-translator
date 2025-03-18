// App.js - Modified for split layout
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginSignup from './LoginSignup';
import DialectTranslator from './DialectTranslator'; // Renamed from original App

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<LoginSignup />} />
        <Route path="/app" element={<DialectTranslator />} />
      </Routes>
    </Router>
  );
}

export default App;