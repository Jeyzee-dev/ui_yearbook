import React, { useState } from 'react';
import AuthModal from '../Shared/AuthModal';
import './About.css';

const About = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setShowAuthModal(true);
  };

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About MinSU E-YearBook</h2>
        <div className="about-content">
          <div className="about-text">
            <p className="about-description">
              MinSU E-YearBook is a comprehensive digital platform designed to reconnect, engage, and strengthen 
              the bonds between Mindoro State University alumni across different generations and programs.
            </p>
            
            <div className="about-features">
              <div className="about-feature-item">
                <div className="feature-icon">🎓</div>
                <div className="feature-content">
                  <h3>Verified Alumni Network</h3>
                  <p>All members are verified through diploma submission and admin approval process</p>
                </div>
              </div>
              
              <div className="about-feature-item">
                <div className="feature-icon">🔒</div>
                <div className="feature-content">
                  <h3>Secure Platform</h3>
                  <p>Your personal information is protected with advanced security measures</p>
                </div>
              </div>
              
              <div className="about-feature-item">
                <div className="feature-icon">🤝</div>
                <div className="feature-content">
                  <h3>Community Driven</h3>
                  <p>Built by MinSU alumni, for MinSU alumni to foster lifelong connections</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-stats">
            <div className="stat-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
              <div className="stat-number">45+</div>
              <div className="stat-label">Years of Excellence</div>
            </div>
            <div className="stat-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
              <div className="stat-number">15K+</div>
              <div className="stat-label">Alumni Community</div>
            </div>
            <div className="stat-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
              <div className="stat-number">50+</div>
              <div className="stat-label">Programs Offered</div>
            </div>
          </div>
        </div>
      </div>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </section>
  );
};

export default About;