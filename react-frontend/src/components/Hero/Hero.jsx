import React from 'react';
import AuthModal from '../Shared/AuthModal';
import './Hero.css';

const Hero = () => {
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setShowAuthModal(true);
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="highlight">MinSU E-YearBook</span>
            </h1>
            <p className="hero-subtitle">
              Reconnect with your batchmates, relive memories, and stay updated with your alma mater. 
              Join our growing community of successful alumni.
            </p>
            
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">5,000+</div>
                <div className="stat-label">Registered Alumni</div>
                <button className="stat-btn" onClick={handleClick}>Join as Alumni</button>
              </div>
              <div className="stat">
                <div className="stat-number">5+</div>
                <div className="stat-label">Batch Years</div>
                <button className="stat-btn" onClick={handleClick}>Search Yours</button>
              </div>
              <div className="stat">
                <div className="stat-number">10+</div>
                <div className="stat-label">Programs</div>
                <button className="stat-btn" onClick={handleClick}>Explore Programs</button>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="batch-years">
              <div className="batch-card" onClick={handleClick}>2024</div>
              <div className="batch-card" onClick={handleClick}>2023</div>
              <div className="batch-card" onClick={handleClick}>2022</div>
              <div className="batch-card" onClick={handleClick}>2021</div>
              <div className="batch-card" onClick={handleClick}>2020</div>
            </div>
            
            <div className="alumni-preview">
              <div className="preview-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
                <div className="alumni-image">
                  <div className="image-placeholder"></div>
                </div>
                <div className="alumni-info">
                  <h3>Rhamzel Mogol</h3>
                  <p>Batch 2020 - BS Information Technology</p>
                  <span className="verified-badge">Verified Alumni</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </section>
  );
};

export default Hero;