import React, { useState } from 'react';
import { useAlumni } from '../contexts/AlumniContext';
import AlumniHeader from '../components/Alumni/AlumniHeader/AlumniHeader';
import AlumniProfile from '../components/Alumni/AlumniProfile/AlumniProfile';
import ProfileEdit from '../components/Alumni/AlumniProfile/ProfileEdit';
import Footer from '../components/Footer/Footer';
import './AlumniProfilePage.css';

const AlumniProfilePage = () => {
  const { currentAlumni, updateProfile } = useAlumni();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleSaveProfile = async (updatedData) => {
    try {
      await updateProfile(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (!currentAlumni) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="alumni-profile-page">
      <AlumniHeader />
      
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <img 
              src={currentAlumni.profilePicture || '/default-avatar.png'} 
              alt={`${currentAlumni.firstName} ${currentAlumni.lastName}`}
            />
          </div>
          <div className="profile-info">
            <h1>{currentAlumni.firstName} {currentAlumni.lastName}</h1>
            <p className="course-year">{currentAlumni.course} • Class of {currentAlumni.graduationYear}</p>
            <p className="current-position">{currentAlumni.currentPosition} at {currentAlumni.currentCompany}</p>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">{currentAlumni.connections || 0}</span>
                <span className="stat-label">Connections</span>
              </div>
              <div className="stat">
                <span className="stat-number">{currentAlumni.profileViews || 0}</span>
                <span className="stat-label">Profile Views</span>
              </div>
            </div>
          </div>
          <div className="profile-actions">
            {!isEditing && (
              <button 
                className="edit-profile-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="profile-tabs">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
          <button 
            className={`tab-btn ${activeTab === 'connections' ? 'active' : ''}`}
            onClick={() => setActiveTab('connections')}
          >
            Connections
          </button>
        </div>

        {/* Content Area */}
        <div className="profile-content">
          {isEditing ? (
            <ProfileEdit 
              alumni={currentAlumni}
              onSave={handleSaveProfile}
              onCancel={handleCancelEdit}
            />
          ) : (
            <>
              {activeTab === 'profile' && <AlumniProfile alumni={currentAlumni} />}
              {activeTab === 'activity' && (
                <div className="activity-tab">
                  <h3>Recent Activity</h3>
                  <p>Your recent activities will appear here.</p>
                </div>
              )}
              {activeTab === 'connections' && (
                <div className="connections-tab">
                  <h3>Your Connections</h3>
                  <p>Your alumni connections will appear here.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AlumniProfilePage;