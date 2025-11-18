import React, { useState } from 'react';
import { useAlumni } from '../../../contexts/AlumniContext';
import ProfileEdit from './ProfileEdit';
import './AlumniProfile.css';

const AlumniProfile = ({ alumniId, isOwnProfile = false }) => {
  const { currentAlumni, alumniList, updateProfile } = useAlumni();
  const [isEditing, setIsEditing] = useState(false);
  
  const profileAlumni = isOwnProfile ? currentAlumni : alumniList.find(a => a.id === alumniId);

  if (!profileAlumni) {
    return (
      <div className="profile-not-found">
        <i className="fas fa-user-slash"></i>
        <h3>Profile Not Found</h3>
        <p>The alumni profile you're looking for doesn't exist.</p>
      </div>
    );
  }

  if (isEditing) {
    return (
      <ProfileEdit
        alumni={profileAlumni}
        onSave={updateProfile}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="alumni-profile">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar-section">
          <div className="avatar-container">
            <img 
              src={profileAlumni.profilePicture} 
              alt={profileAlumni.fullName}
              className="profile-avatar"
            />
            {profileAlumni.diplomaVerified && (
              <div className="verification-badge large" title="Diploma Verified">
                <i className="fas fa-check-circle"></i>
                <span>Verified</span>
              </div>
            )}
          </div>
          
          {isOwnProfile && (
            <button 
              className="edit-profile-btn"
              onClick={() => setIsEditing(true)}
            >
              <i className="fas fa-edit"></i>
              Edit Profile
            </button>
          )}
        </div>

        <div className="profile-info">
          <h1 className="profile-name">{profileAlumni.fullName}</h1>
          <div className="profile-batch-program">
            <span className="batch-year">Batch {profileAlumni.batchYear}</span>
            <span className="program">{profileAlumni.program}</span>
          </div>
          <div className="profile-details">
            <div className="detail-item">
              <i className="fas fa-graduation-cap"></i>
              <span>{profileAlumni.department}</span>
            </div>
            <div className="detail-item">
              <i className="fas fa-users"></i>
              <span>Section {profileAlumni.section}</span>
            </div>
            <div className="detail-item">
              <i className="fas fa-venus-mars"></i>
              <span>{profileAlumni.gender}</span>
            </div>
          </div>
        </div>

        <div className="profile-status">
          <div className={`status-badge ${profileAlumni.employmentStatus}`}>
            <i className={`fas ${profileAlumni.employmentStatus === 'employed' ? 'fa-briefcase' : 'fa-search'}`}></i>
            {profileAlumni.employmentStatus === 'employed' ? 'Employed' : 'Seeking Opportunities'}
          </div>
          {profileAlumni.employmentStatus === 'employed' && (
            <div className="employment-info">
              <div className="company">{profileAlumni.currentCompany}</div>
              <div className="position">{profileAlumni.position}</div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        <div className="content-grid">
          {/* Contact Information */}
          <div className="info-section">
            <h3 className="section-title">
              <i className="fas fa-address-card"></i>
              Contact Information
            </h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Email</label>
                <div className="value">
                  <i className="fas fa-envelope"></i>
                  {profileAlumni.email}
                </div>
              </div>
              <div className="info-item">
                <label>Phone</label>
                <div className="value">
                  <i className="fas fa-phone"></i>
                  {profileAlumni.phone}
                </div>
              </div>
              <div className="info-item">
                <label>Address</label>
                <div className="value">
                  <i className="fas fa-map-marker-alt"></i>
                  {profileAlumni.address}
                </div>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="info-section">
            <h3 className="section-title">
              <i className="fas fa-graduation-cap"></i>
              Academic Information
            </h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Batch Year</label>
                <div className="value">{profileAlumni.batchYear}</div>
              </div>
              <div className="info-item">
                <label>Program</label>
                <div className="value">{profileAlumni.program}</div>
              </div>
              <div className="info-item">
                <label>Department</label>
                <div className="value">{profileAlumni.department}</div>
              </div>
              <div className="info-item">
                <label>Section</label>
                <div className="value">{profileAlumni.section}</div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          {profileAlumni.employmentStatus === 'employed' && (
            <div className="info-section">
              <h3 className="section-title">
                <i className="fas fa-briefcase"></i>
                Professional Information
              </h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Current Company</label>
                  <div className="value">{profileAlumni.currentCompany}</div>
                </div>
                <div className="info-item">
                  <label>Position</label>
                  <div className="value">{profileAlumni.position}</div>
                </div>
                <div className="info-item">
                  <label>Employment Status</label>
                  <div className="value status-employed">Employed</div>
                </div>
              </div>
            </div>
          )}

          {/* Account Information */}
          {isOwnProfile && (
            <div className="info-section">
              <h3 className="section-title">
                <i className="fas fa-user-cog"></i>
                Account Information
              </h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Account Status</label>
                  <div className="value status-verified">
                    <i className="fas fa-check-circle"></i>
                    Verified Account
                  </div>
                </div>
                <div className="info-item">
                  <label>Member Since</label>
                  <div className="value">
                    {new Date(profileAlumni.registrationDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <div className="info-item">
                  <label>Diploma Status</label>
                  <div className="value">
                    {profileAlumni.diplomaVerified ? (
                      <span className="status-verified">
                        <i className="fas fa-check-circle"></i>
                        Verified
                      </span>
                    ) : (
                      <span className="status-pending">
                        <i className="fas fa-clock"></i>
                        Pending Verification
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {!isOwnProfile && (
          <div className="profile-actions">
            <button className="btn-primary">
              <i className="fas fa-comment"></i>
              Send Message
            </button>
            <button className="btn-secondary">
              <i className="fas fa-share"></i>
              Share Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniProfile;