import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import './LoginSignup.css';


function LoginSignup() {
  const [theme, setTheme] = useState('light');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Add animation class after component mounts
    const timer = setTimeout(() => {
      document.querySelector('.auth-form').classList.add('show');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleView = () => {
    // Trigger exit animation
    document.querySelector('.auth-form').classList.remove('show');
    
    setTimeout(() => {
      setIsLogin(!isLogin);
      // Reset form data when switching views
      setFormData({
        name: '',
        email: '',
        password: ''
      });
      
      // Trigger entrance animation
      setTimeout(() => {
        document.querySelector('.auth-form').classList.add('show');
      }, 50);
    }, 300);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/app'); // Navigate to the main app
    }, 1500);
  };

  return (
    <div className="App">
      <div className={`phone-container ${theme}`}>
        <div className="app-header">
          <div className="app-title">
            <LanguageIcon style={{ marginRight: '8px' }} /> 
            Dialect Translator
          </div>
          <div className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? <LightModeIcon className="icon" /> : <DarkModeIcon className="icon" />}
          </div>
        </div>
        
        <div className="auth-container">
          <div className="auth-form">
            <div className="auth-header">
              <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
              <p>{isLogin ? 'Sign in to continue' : 'Get started with your account'}</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <div className="input-icon">
                    <PersonIcon />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required={!isLogin}
                  />
                </div>
              )}
              
              <div className="form-group">
                <div className="input-icon">
                  <EmailIcon />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                />
              </div>
              
              <div className="form-group">
                <div className="input-icon">
                  <KeyIcon />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
                <div className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </div>
              </div>
              
              {isLogin && (
                <div className="forgot-password">
                  <a href="#forgot">Forgot Password?</a>
                </div>
              )}
              
              <button type="submit" className={`submit-button ${loading ? 'loading' : ''}`}>
                {loading ? (
                  <div className="spinner"></div>
                ) : (
                  isLogin ? 'Sign In' : 'Sign Up'
                )}
              </button>
            </form>
            
            <div className="auth-divider">
              <span>Or continue with</span>
            </div>
            
            <div className="social-auth">
              <button className="social-button google">
                <GoogleIcon />
              </button>
              <button className="social-button facebook">
                <FacebookIcon />
              </button>
              <button className="social-button twitter">
                <TwitterIcon />
              </button>
            </div>
            
            <div className="auth-switch">
              <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <a href="#toggle" onClick={(e) => { e.preventDefault(); toggleView(); }}>
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;