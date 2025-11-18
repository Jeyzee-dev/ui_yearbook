import React from 'react';
import './Process.css';

const Process = () => {
  return (
    <div>
      {/* How It Works Section */}
      <section id="how-it-works" className="process-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Simple 4-step process to join and connect with MinSU alumni community</p>
          
          <div className="process-grid-2x2">
            {/* Row 1: Step 1 & 2 */}
            <div className="process-row">
              <div className="process-card">
                <div className="process-number">1</div>
                <h3>Complete Registration</h3>
                <p>Fill out your details, upload 2x2 photo, and diploma copy for verification</p>
                <div className="requirements">
                  <span>✓ Personal Information</span>
                  <span>✓ 2x2 Photo</span>
                  <span>✓ Diploma Scan</span>
                </div>
              </div>

              <div className="process-card">
                <div className="process-number">2</div>
                <h3>Admin Verification</h3>
                <p>Our admin team reviews your submission for authenticity</p>
                <div className="verification-status">
                  <div className="status-item">
                    <span className="status-dot pending"></span>
                    Pending Review
                  </div>
                  <div className="status-item">
                    <span className="status-dot verified"></span>
                    Verified Account
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Step 3 & 4 */}
            <div className="process-row">
              <div className="process-card">
                <div className="process-number">3</div>
                <h3>Automatic Sorting</h3>
                <p>Get automatically categorized by batch, program, and department</p>
                <div className="sorting-tags">
                  <span className="tag">Batch 2020</span>
                  <span className="tag">Computer Science</span>
                  <span className="tag">CIT Department</span>
                </div>
              </div>

              <div className="process-card">
                <div className="process-number">4</div>
                <h3>Connect & Explore</h3>
                <p>Start searching, messaging, and connecting with fellow alumni</p>
                <div className="features-mini">
                  <span>🔍 Search</span>
                  <span>💬 Message</span>
                  <span>📢 Events</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Search Section */}
      <section id="search" className="search-section">
        <div className="container">
          <h2 className="section-title">Try Our Smart Search</h2>
          <p className="section-subtitle">Find alumni quickly with our advanced filtering system</p>
          
          <div className="search-demo">
            <div className="search-input">
              <input 
                type="text" 
                placeholder="Search alumni by name, batch year, program..."
              />
              <button>🔍 Search</button>
            </div>
            <div className="search-filters">
              <div className="filter-group">
                <label>Batch Year</label>
                <select>
                  <option value="">All Batches</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Program</label>
                <select>
                  <option value="">All Programs</option>
                  <option value="bsit">Bachelor of Science in Information Technology</option>
                  <option value="bscpe">Bachelor of Science in Computer Engineering</option>
                   <option value="bse">Bachelor of Science in Entrepeneurship</option>
                  <option value="bstm">Bachelor of Science in Tourism Management</option>
                  <option value="bshm">Bachelor of Science in Hospitality Management</option>
                  <option value="bscj">Bachelor of Science in Criminology</option>
                  <option value="baps">Bachelor of Arts in Political Science</option>
                  <option value="bse">Bachelor of Secondary Education</option>
                  <option value="bee">Bachelor of Elementary Education</option>
                  <option value="bsf">Bachelor of Science in Fisheries</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Department</label>
                <select>
                  <option value="">All Departments</option>
                  <option value="ccs">CCS</option>
                  <option value="cbm">CBM</option>
                  <option value="cas">CAS</option>
                  <option value="ccje">CCJE</option>
                  <option value="cas">CAS</option>
                   <option value="if">IF</option>
                </select>
              </div>
            </div>
            
            <div className="search-results-preview">
              <div className="result-card">
                <div className="result-avatar"></div>
                <div className="result-info">
                  <h4>Rhamzel mogol</h4>
                  <p>Batch 2020 - BS Information Technology</p>
                  <span className="result-badge">Verified</span>
                </div>
              </div>
              <div className="result-card">
                <div className="result-avatar"></div>
                <div className="result-info">
                  <h4>Karen Salmorin</h4>
                  <p>Batch 2021 - BS Information Technology</p>
                  <span className="result-badge">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Notifications Section */}
      <section id="notifications" className="notifications-section">
        <div className="container">
          <h2 className="section-title">Smart Notifications</h2>
          <p className="section-subtitle">Stay updated with targeted announcements and events</p>
          
          <div className="notifications-grid">
            <div className="notification-card batch-notification">
              <div className="notification-header">
                <span className="notification-badge">Batch Specific</span>
                <span className="notification-time">2 hours ago</span>
              </div>
              <h4>🎓 Batch 2020 - 5 Year Reunion</h4>
              <p>Let's plan our 5-year reunion! Join the discussion group and share your availability for December 2025.</p>
              <div className="notification-actions">
                <button className="btn-interested">I'm Interested</button>
                <button className="btn-share">Share</button>
              </div>
            </div>

            <div className="notification-card department-notification">
              <div className="notification-header">
                <span className="notification-badge">Department Wide</span>
                <span className="notification-time">1 day ago</span>
              </div>
              <h4>💻 BSIT Department - Industry Talk</h4>
              <p>Guest speaker from Google discussing AI trends. Open to all BSIT alumni. December 15, 2024 at MinSU Auditorium.</p>
              <div className="notification-actions">
                <button className="btn-interested">Register Now</button>
                <button className="btn-share">Share</button>
              </div>
            </div>

            <div className="notification-card university-notification">
              <div className="notification-header">
                <span className="notification-badge">University Event</span>
                <span className="notification-time">3 days ago</span>
              </div>
              <h4>🎉 MinSU Foundation Day</h4>
              <p>Join us in celebrating MinSU's 45th Foundation Day! Activities include campus tour, alumni games, and fellowship dinner.</p>
              <div className="notification-actions">
                <button className="btn-interested">Learn More</button>
                <button className="btn-share">Share</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Process;