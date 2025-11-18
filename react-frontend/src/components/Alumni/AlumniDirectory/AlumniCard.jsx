import React, { useState } from 'react';
import { useMessaging } from '../../../hooks/useMessaging';
import { getRelativeTime } from '../../../utils/dateFormatters';

const AlumniCard = ({ alumni, viewMode }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { startNewConversation } = useMessaging();

  const handleMessageClick = () => {
    startNewConversation(alumni.id);
    // In a real app, this would navigate to messaging page
    console.log('Start conversation with:', alumni.fullName);
  };

  const handleViewProfile = () => {
    // Navigate to profile page
    window.location.href = `/alumni/profile/${alumni.id}`;
  };

  const employmentStatus = alumni.employmentStatus === 'employed' 
    ? `Employed at ${alumni.currentCompany}`
    : 'Seeking opportunities';

  return (
    <div className={`alumni-card ${viewMode}`}>
      <div className="card-header">
        <div className="avatar-section">
          <img 
            src={alumni.profilePicture} 
            alt={alumni.fullName}
            className="alumni-avatar"
          />
          {alumni.diplomaVerified && (
            <div className="verification-badge" title="Diploma Verified">
              <i className="fas fa-check-circle"></i>
            </div>
          )}
        </div>
        
        <div className="basic-info">
          <h3 className="alumni-name">{alumni.fullName}</h3>
          <p className="alumni-batch">{alumni.batchYear} • {alumni.program}</p>
          <p className="alumni-department">{alumni.department}</p>
          <p className="alumni-section">Section: {alumni.section}</p>
        </div>
      </div>

      <div className="card-body">
        <div className="employment-status">
          <i className={`fas ${alumni.employmentStatus === 'employed' ? 'fa-briefcase' : 'fa-search'}`}></i>
          <span>{employmentStatus}</span>
        </div>

        {alumni.employmentStatus === 'employed' && alumni.position && (
          <div className="position">
            <i className="fas fa-user-tie"></i>
            <span>{alumni.position}</span>
          </div>
        )}

        <div className="contact-info">
          <i className="fas fa-envelope"></i>
          <span>{alumni.email}</span>
        </div>

        {viewMode === 'list' && (
          <div className="additional-info">
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <span>{alumni.phone}</span>
            </div>
            <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>{alumni.address}</span>
            </div>
            <div className="info-item">
              <i className="fas fa-calendar"></i>
              <span>Joined {getRelativeTime(alumni.registrationDate)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="card-actions">
        <button 
          className="btn-secondary"
          onClick={handleViewProfile}
        >
          <i className="fas fa-eye"></i>
          View Profile
        </button>
        <button 
          className="btn-primary"
          onClick={handleMessageClick}
        >
          <i className="fas fa-comment"></i>
          Message
        </button>
      </div>

      {viewMode === 'grid' && showDetails && (
        <div className="card-details">
          <div className="details-grid">
            <div className="detail-item">
              <strong>Phone:</strong>
              <span>{alumni.phone}</span>
            </div>
            <div className="detail-item">
              <strong>Address:</strong>
              <span>{alumni.address}</span>
            </div>
            <div className="detail-item">
              <strong>Gender:</strong>
              <span>{alumni.gender}</span>
            </div>
            <div className="detail-item">
              <strong>Joined:</strong>
              <span>{getRelativeTime(alumni.registrationDate)}</span>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'grid' && (
        <button 
          className="toggle-details-btn"
          onClick={() => setShowDetails(!showDetails)}
        >
          <i className={`fas fa-chevron-${showDetails ? 'up' : 'down'}`}></i>
          {showDetails ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

export default AlumniCard;