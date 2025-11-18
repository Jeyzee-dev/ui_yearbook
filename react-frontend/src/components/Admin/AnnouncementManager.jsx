// src/components/Admin/AnnouncementManager.jsx
import React, { useState, useEffect } from 'react';
import './AnnouncementManager.css';

const AnnouncementManager = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [messageData, setMessageData] = useState({
    subject: '',
    message: '',
    targetType: 'all',
    targetBatches: [],
    targetDepartments: []
  });

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    targetType: 'all',
    targetBatches: [],
    targetDepartments: [],
    targetPrograms: [],
    urgency: 'normal'
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      // Mock data for demonstration
      const mockAnnouncements = [
        {
          _id: '1',
          title: 'Alumni Homecoming 2024',
          content: 'Join us for the annual alumni homecoming event on December 15, 2024. Reconnect with old friends and mentors!',
          targetType: 'all',
          urgency: 'important',
          views: 1247,
          recipients: 15234,
          replies: 89,
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          _id: '2',
          title: 'Job Fair Opportunity',
          content: 'Local companies are looking for MinSU graduates. Register now for the virtual job fair happening next month.',
          targetType: 'batch',
          targetBatches: [2023, 2024],
          urgency: 'normal',
          views: 856,
          recipients: 2456,
          replies: 34,
          createdAt: '2024-01-10T14:20:00Z'
        }
      ];
      setAnnouncements(mockAnnouncements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      // Mock API call
      const newAnnouncementWithId = {
        ...newAnnouncement,
        _id: Date.now().toString(),
        views: 0,
        recipients: 15234,
        replies: 0,
        createdAt: new Date().toISOString()
      };
      
      setAnnouncements(prev => [newAnnouncementWithId, ...prev]);
      setShowCreateForm(false);
      setNewAnnouncement({
        title: '', content: '', targetType: 'all', 
        targetBatches: [], targetDepartments: [], targetPrograms: [], urgency: 'normal'
      });
    } catch (error) {
      console.error('Error creating announcement:', error);
    }
  };

  const deleteAnnouncement = async (announcementId) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        setAnnouncements(prev => prev.filter(announcement => announcement._id !== announcementId));
      } catch (error) {
        console.error('Error deleting announcement:', error);
      }
    }
  };

  const handleMessageAlumni = (announcement) => {
    setSelectedAnnouncement(announcement);
    setMessageData({
      subject: `Re: ${announcement.title}`,
      message: '',
      targetType: announcement.targetType,
      targetBatches: announcement.targetBatches || [],
      targetDepartments: announcement.targetDepartments || []
    });
    setShowMessageModal(true);
  };

  const sendMessageToAlumni = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending message to alumni:', messageData);
      // Add your message sending logic here
      alert(`Message sent to ${getTargetAudienceText(selectedAnnouncement)} alumni!`);
      setShowMessageModal(false);
      setMessageData({
        subject: '',
        message: '',
        targetType: 'all',
        targetBatches: [],
        targetDepartments: []
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const getTargetAudienceText = (announcement) => {
    if (!announcement) return 'All Alumni';
    
    switch (announcement.targetType) {
      case 'all':
        return 'All Alumni';
      case 'batch':
        return `Batch ${announcement.targetBatches?.join(', ') || 'All'}`;
      case 'department':
        return `${announcement.targetDepartments?.join(', ') || 'All'} Department`;
      case 'program':
        return `${announcement.targetPrograms?.join(', ') || 'All'} Program`;
      default:
        return 'All Alumni';
    }
  };

  return (
    <div className="announcement-manager">
      <div className="manager-header">
        <h1>Announcement Manager</h1>
        <p>Create and manage announcements for alumni</p>
        <button 
          className="create-announcement-btn"
          onClick={() => setShowCreateForm(true)}
        >
          📢 Create New Announcement
        </button>
      </div>

      {/* Create Announcement Form */}
      {showCreateForm && (
        <div className="modal-overlay" onClick={() => setShowCreateForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Announcement</h2>
              <button 
                className="close-btn"
                onClick={() => setShowCreateForm(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement(prev => ({
                    ...prev, title: e.target.value
                  }))}
                  required
                  placeholder="Enter announcement title"
                />
              </div>

              <div className="form-group">
                <label>Content *</label>
                <textarea
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement(prev => ({
                    ...prev, content: e.target.value
                  }))}
                  required
                  rows="6"
                  placeholder="Enter announcement content..."
                />
              </div>

              <div className="form-group">
                <label>Target Audience</label>
                <select
                  value={newAnnouncement.targetType}
                  onChange={(e) => setNewAnnouncement(prev => ({
                    ...prev, targetType: e.target.value
                  }))}
                >
                  <option value="all">All Alumni</option>
                  <option value="batch">Specific Batch</option>
                  <option value="department">Specific Department</option>
                  <option value="program">Specific Program</option>
                </select>
              </div>

              {/* Conditional Target Selection */}
              {newAnnouncement.targetType === 'batch' && (
                <div className="form-group">
                  <label>Select Batches</label>
                  <div className="checkbox-grid">
                    {[2024, 2023, 2022, 2021, 2020].map(year => (
                      <label key={year} className="checkbox-label">
                        <input
                          type="checkbox"
                          value={year}
                          checked={newAnnouncement.targetBatches.includes(year)}
                          onChange={(e) => {
                            const batches = e.target.checked
                              ? [...newAnnouncement.targetBatches, year]
                              : newAnnouncement.targetBatches.filter(b => b !== year);
                            setNewAnnouncement(prev => ({ ...prev, targetBatches: batches }));
                          }}
                        />
                        Batch {year}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {newAnnouncement.targetType === 'department' && (
                <div className="form-group">
                  <label>Select Departments</label>
                  <div className="checkbox-grid">
                    {['CCS', 'CBM', 'CTE', 'CCJE', 'CAS', 'IF'].map(dept => (
                      <label key={dept} className="checkbox-label">
                        <input
                          type="checkbox"
                          value={dept}
                          checked={newAnnouncement.targetDepartments.includes(dept)}
                          onChange={(e) => {
                            const depts = e.target.checked
                              ? [...newAnnouncement.targetDepartments, dept]
                              : newAnnouncement.targetDepartments.filter(d => d !== dept);
                            setNewAnnouncement(prev => ({ ...prev, targetDepartments: depts }));
                          }}
                        />
                        {dept}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Urgency Level</label>
                <select
                  value={newAnnouncement.urgency}
                  onChange={(e) => setNewAnnouncement(prev => ({
                    ...prev, urgency: e.target.value
                  }))}
                >
                  <option value="normal">Normal</option>
                  <option value="important">Important</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  📢 Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Message Alumni Modal */}
      {showMessageModal && (
        <div className="modal-overlay" onClick={() => setShowMessageModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Message Alumni</h2>
              <button 
                className="close-btn"
                onClick={() => setShowMessageModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={sendMessageToAlumni}>
              <div className="form-group">
                <label>Target Audience</label>
                <div className="audience-info">
                  <strong>{getTargetAudienceText(selectedAnnouncement)}</strong>
                  <span className="recipient-count">(~{selectedAnnouncement?.recipients?.toLocaleString() || '15,234'} alumni)</span>
                </div>
              </div>

              <div className="form-group">
                <label>Subject *</label>
                <input
                  type="text"
                  value={messageData.subject}
                  onChange={(e) => setMessageData(prev => ({
                    ...prev, subject: e.target.value
                  }))}
                  required
                  placeholder="Enter message subject"
                />
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  value={messageData.message}
                  onChange={(e) => setMessageData(prev => ({
                    ...prev, message: e.target.value
                  }))}
                  required
                  rows="8"
                  placeholder="Type your message to alumni..."
                />
              </div>

              <div className="message-preview">
                <h4>Message Preview:</h4>
                <div className="preview-content">
                  <strong>{messageData.subject}</strong>
                  <p>{messageData.message || 'Your message will appear here...'}</p>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowMessageModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  ✉️ Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Announcements List */}
      <div className="announcements-list">
        {announcements.map(announcement => (
          <div key={announcement._id} className={`announcement-card ${announcement.urgency}`}>
            <div className="announcement-header">
              <h3>{announcement.title}</h3>
              <div className="announcement-meta">
                <span className={`urgency-badge ${announcement.urgency}`}>
                  {announcement.urgency}
                </span>
                <span className="target-audience">
                  {getTargetAudienceText(announcement)}
                </span>
                <span className="created-date">
                  {new Date(announcement.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="announcement-content">
              <p>{announcement.content}</p>
            </div>

            <div className="announcement-stats">
              <span>📊 {announcement.views?.toLocaleString()} views</span>
              <span>👥 {announcement.recipients?.toLocaleString()} recipients</span>
              <span>💬 {announcement.replies} replies</span>
            </div>

            <div className="announcement-actions">
              <button className="edit-btn">✏️ Edit</button>
              <button 
                className="message-btn"
                onClick={() => handleMessageAlumni(announcement)}
              >
                💬 Message Alumni
              </button>
              <button className="stats-btn">📈 View Stats</button>
              <button 
                className="delete-btn"
                onClick={() => deleteAnnouncement(announcement._id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}

        {announcements.length === 0 && (
          <div className="no-announcements">
            <div className="no-announcements-icon">📢</div>
            <h3>No announcements yet</h3>
            <p>Create your first announcement to keep alumni informed</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementManager;