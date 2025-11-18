import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-brand">
          <img 
            src="https://tse3.mm.bing.net/th/id/OIP.tMmFZwBZrMx31lmMpteDpQHaHa?pid=Api&P=0&h=220" 
            alt="MinSU Logo" 
            className="logo"
          />
          <div className="brand-text">
            <h1>MinSU E-YearBook</h1>
            <p>Connecting Alumni Through Time</p>
          </div>
        </div>

        <nav className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <a href="#home" onClick={() => scrollToSection('home')}>Home</a>
          <a href="#about" onClick={() => scrollToSection('about')}>About</a>
          <a href="#features" onClick={() => scrollToSection('features')}>Features</a>
          <a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a>
          <div className="auth-buttons">
            <button className="btn-login" onClick={handleLogin}>
              Login
            </button>
            <button className="btn-register" onClick={handleRegister}>
              Register
            </button>
          </div>
        </nav>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;