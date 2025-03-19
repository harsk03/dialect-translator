import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { BsArrowRight, BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const HomePage = ({ section }) => {
  // App screenshots carousel
  const appScreenshots = [
    { id: 1, title: "Initial Prototype", description: "Our first Raw wireframe without UI elements", image: "/images/app-v1.jpg" },
    { id: 2, title: "Beta Version", description: "Adding login and dialect selection functionality", image: "/images/app-v2.jpg" },
    { id: 3, title: "Current Release", description: "Polished UI with improved translation accuracy", image: "/images/app-v3.jpg" }
  ];

  // Developer profiles
  const developers = [
    {
      id: 1,
      name: "Shruti Ramdurg",
      role: "Role",
      bio: "BIO",
      image: "/images/dev1.jpg",
      socials: { github: "https://github.com/shrutiramdurg", linkedin: "https://linkedin.com/in/shrutiramdurg" }
    },
    {
      id: 2,
      name: "Harshal Kale",
      role: "Frontend Developer",
      bio: "BIO",
      image: "/images/dev2.jpg",
      socials: { github: "https://github.com/harsk03", linkedin: "https://www.linkedin.com/in/harshalvilaskale?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"}
    },
    {
      id: 3,
      name: "Divyanshi Singh",
      role: "Role",
      bio: "BIO",
      image: "/images/dev3.jpg",
      socials: { github: "https://github.com/#", linkedin: "https://linkedin.com/in/divyanshi-singh-348670294"}
    },
    {
      id: 4,
      name: "Om Surana",
      role: "Role",
      bio: "BIO",
      image: "/images/dev4.jpg",
      socials: { github: "https://github.com/omsurana7", linkedin: "https://linkedin.com/in/om-surana-942b00113"}
    }
  ];

  // Carousel state
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeDeveloper, setActiveDeveloper] = useState(0);

  useEffect(() => {
    if (section) {
      const element = document.querySelector(`.${section}-section`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Reset scroll position to top if no section specified
      window.scrollTo(0, 0);
    }
    
    // This is important - allow normal scrolling after section scroll
    document.body.style.overflow = 'auto';
  }, [section]);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % appScreenshots.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [appScreenshots.length]);

  // Navigation functions
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % appScreenshots.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + appScreenshots.length) % appScreenshots.length);
  };

  const nextDeveloper = () => {
    setActiveDeveloper((prev) => (prev + 1) % developers.length);
  };

  const prevDeveloper = () => {
    setActiveDeveloper((prev) => (prev - 1 + developers.length) % developers.length);
  };

  return (
    <div className="home-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/images/dialect-icon.png" alt="Cultural Dialect Translator" className="logo" />
          <h1>Cultural Dialect Translator</h1>
        </div>
        <div className="navbar-right">
          <Link to="/home" className="nav-link active" onClick={() => window.scrollTo(0, 0)}>Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/developers" className="nav-link">Developers</Link>
          <Link to="/auth" className="nav-button">Try It Now</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Bridge Cultural Gaps Through Language</h1>
          <p>Translate between standard languages and regional dialects with cultural context preservation</p>
          <Link to="/auth" className="cta-button">
            Start Translating <BsArrowRight className="arrow-icon" />
          </Link>
        </div>
        <div className="hero-image">
          <img src="/images/hero-illustration.jpg" alt="Language Translation Concept" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon dialect-icon"></div>
            <h3>Dialect-Specific Translation</h3>
            <p>Preserves cultural nuances between standard languages and regional dialects</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon realtime-icon"></div>
            <h3>Real-Time Feedback</h3>
            <p>Instant suggestions to improve your translations</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon languages-icon"></div>
            <h3>Multiple Languages</h3>
            <p>Support for Hindi, Bengali, Marathi, and Tamil with their regional dialects</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon ai-icon"></div>
            <h3>AI-Powered Detection</h3>
            <p>Advanced algorithms to identify dialects automatically</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>Our Journey</h2>
        <div className="about-content">
          <div className="about-text">
            <h3>Bridging Cultural Gaps</h3>
            <p>Cultural Dialect Translator was born from the recognition that standard translation tools fail to capture the richness of regional dialects. What began as a research project has evolved into a comprehensive tool that preserves the cultural essence of communication.</p>
            <p>Our mission is to facilitate better understanding between speakers of different dialects of the same language, preserving cultural heritage while enabling clearer communication.</p>
          </div>
          <div className="screenshot-carousel">
            <div className="carousel-container">
              {appScreenshots.map((screenshot, index) => (
                <div 
                  key={screenshot.id} 
                  className={`carousel-slide ${index === activeSlide ? 'active' : ''}`}
                  style={{transform: `translateX(${(index - activeSlide) * 100}%)`}}
                >
                  <img src={screenshot.image} alt={screenshot.title} />
                  <div className="carousel-caption">
                    <h4>{screenshot.title}</h4>
                    <p>{screenshot.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="carousel-controls">
              <button onClick={prevSlide} className="carousel-button"><BsChevronLeft /></button>
              <div className="carousel-indicators">
                {appScreenshots.map((_, index) => (
                  <span 
                    key={index} 
                    className={`indicator ${index === activeSlide ? 'active' : ''}`}
                    onClick={() => setActiveSlide(index)}
                  ></span>
                ))}
              </div>
              <button onClick={nextSlide} className="carousel-button"><BsChevronRight /></button>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="developers-section">
        <h2>Meet Our Team</h2>
        <div className="developer-carousel">
          <button onClick={prevDeveloper} className="carousel-button dev-prev"><BsChevronLeft /></button>
          <div className="developer-cards">
            {developers.map((developer, index) => (
              <div 
                key={developer.id} 
                className={`developer-card ${index === activeDeveloper ? 'active' : ''}`}
                style={{transform: `translateX(${(index - activeDeveloper) * 110}%)`}}
              >
                <div className="developer-image">
                  <img src={developer.image} alt={developer.name} />
                </div>
                <h3>{developer.name}</h3>
                <p className="developer-role">{developer.role}</p>
                <p className="developer-bio">{developer.bio}</p>
                <div className="developer-socials">
                  <a href={developer.socials.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                  <a href={developer.socials.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                  
                </div>
              </div>
            ))}
          </div>
          <button onClick={nextDeveloper} className="carousel-button dev-next"><BsChevronRight /></button>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <h2>Linguistic Landscape of India: The Serampore Missionary Map (1822)</h2>
        <div className="map-container">
          <img src="/images/india-dialect-map.jpg" alt="Map of India showing dialect coverage" className="dialect-map" />
       
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Try Cultural Dialect Translator?</h2>
          <p>Sign up to start bridging linguistic and cultural gaps today.</p>
          <Link to="/auth" className="cta-button">
            Get Started <BsArrowRight className="arrow-icon" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-column">
            <h3>Cultural Dialect Translator</h3>
            <p>Bridging cultural gaps through dialect-aware language translation.</p>
            <div className="footer-socials">
              
              <a href="https://github.com/dialect-translator" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a href="https://linkedin.com/company/dialect-translator" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="mailto:contact@dialecttranslator.com" rel="noopener noreferrer"><FaEnvelope /></a>
            </div>
          </div>
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/home" className="footer-link" onClick={() => window.scrollTo(0, 0)}>Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/developers">Developers</Link></li>
              <li><Link to="/auth">Try It Now</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/documentation">Documentation</Link></li>
              <li><Link to="/api">API Reference</Link></li>
              <li><Link to="/tech-stack">Tech Stack</Link></li>
              <li><Link to="/research">Research Paper</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contact Us</h4>
            <ul className="contact-info">
              <li>contact@dialecttranslator.com</li>
              <li>+91 98765 43210</li>
              <li>Bengaluru, India</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Cultural Dialect Translator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;