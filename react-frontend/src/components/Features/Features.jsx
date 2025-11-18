import React, { useState } from 'react';
import AuthModal from '../Shared/AuthModal';
import './Features.css';

const Features = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setShowAuthModal(true);
  };

  return (
    <section id="features" className="features">
      <div className="container">
        <h2 className="section-title">System Features</h2>
        <p className="section-subtitle">
          Everything you need to reconnect with your MinSU community
        </p>

        {/* How It Works */}
        <div className="features-section">
          <h3 className="subsection-title">How It Works</h3>
          <div className="process-grid">
            <div className="process-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
              <div className="process-number">1</div>
              <h4>Complete Registration</h4>
              <p>Fill out your details, upload 2x2 photo and diploma for verification</p>
              <div className="process-tags">
                <span>Personal Info</span>
                <span>2x2 Photo</span>
                <span>Diploma Scan</span>
              </div>
            </div>

            <div className="process-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
              <div className="process-number">2</div>
              <h4>Admin Verification</h4>
              <p>Our team reviews your submission to ensure authenticity</p>
              <div className="process-status">
                <span className="status pending">Pending</span>
                <span className="status verified">Verified</span>
              </div>
            </div>

            <div className="process-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
              <div className="process-number">3</div>
              <h4>Automatic Sorting</h4>
              <p>Get categorized by batch, program, and department automatically</p>
              <div className="process-tags">
                <span>Batch 2020</span>
                <span>BS Information Technology</span>
                <span>CCS Department</span>
              </div>
            </div>

            <div className="process-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
              <div className="process-number">4</div>
              <h4>Connect & Explore</h4>
              <p>Start searching, messaging, and connecting with alumni</p>
              <div className="process-tags">
                <span>Search</span>
                <span>Message</span>
                <span>Events</span>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Search */}
        <div className="features-section">
          <h3 className="subsection-title">Smart Alumni Search</h3>
          <div className="search-demo">
            <div className="search-input">
              <input 
                type="text" 
                placeholder="Search by name, batch year, program, department..."
                onClick={handleClick}
                readOnly
                style={{ cursor: 'pointer' }}
              />
              <button onClick={handleClick}>🔍 Search</button>
            </div>
            <div className="search-filters">
              <select onClick={handleClick} style={{ cursor: 'pointer' }}>
                <option>All Batches</option>
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
                 <option>2023</option>
                <option>2024</option>
              </select>
              <select onClick={handleClick} style={{ cursor: 'pointer' }}>
                <option>All Programs</option>
                <option>Bachelor of Science in Information Technology</option>
                <option>Bachelor of Science in Computer Engineering</option>
                <option>Bachelor of Science in Entrepeneurship</option>
                <option>Bachelor of Science in Tourism Management</option>
                <option>Bachelor of Science in Hospitality Management</option>
                <option>Bachelor of Science in Criminology</option>
                <option>Bachelor of Arts in Political Science</option>
                <option>Bachelor of Secondary Education</option>
                <option>Bachelor of Elementary Education</option>
                <option>Bachelor of Science in Fisheries</option>
              </select>
              <select onClick={handleClick} style={{ cursor: 'pointer' }}>
                <option>All Departments</option>
                <option>CCS</option>
                <option>CTE</option>
                <option>CBM</option>
                <option>CCJE</option>
                <option>CAS</option>
                <option>IF</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="features-section">
          <h3 className="subsection-title">Smart Notifications</h3>
          <div className="notifications-grid">
            <div className="notification-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
              <div className="notification-type">Batch Specific</div>
              <h4>🎓 Batch 2020 Reunion</h4>
              <p>Let's plan our 5-year reunion! Join the discussion group...</p>
            </div>
            <div className="notification-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
              <div className="notification-type">Department Wide</div>
              <h4>💻 CIT Industry Talk</h4>
              <p>Guest speaker from Google discussing AI trends...</p>
            </div>
            <div className="notification-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
              <div className="notification-type">University Event</div>
              <h4>🎉 Foundation Day</h4>
              <p>Join us in celebrating MinSU's 45th Foundation Day...</p>
            </div>
          </div>
        </div>
      </div>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </section>
  );
};

export default Features;