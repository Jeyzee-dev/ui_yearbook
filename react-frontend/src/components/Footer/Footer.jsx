import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <img 
              src="https://tse3.mm.bing.net/th/id/OIP.tMmFZwBZrMx31lmMpteDpQHaHa?pid=Api&P=0&h=220" 
              alt="MinSU Logo" 
              className="footer-logo"
            />
            <div>
              <h3>MinSU E-YearBook</h3>
              <p>Bridging the past with the future</p>
            </div>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Quick Links</h4>
              <a href="#features">Features</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="link-group">
              <h4>Support</h4>
              <a href="#help">Help Center</a>
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 MinSU E-YearBook System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;