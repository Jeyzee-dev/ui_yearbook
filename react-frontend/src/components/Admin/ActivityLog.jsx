// src/components/Admin/ActivityLog.jsx
import React, { useState, useEffect, useRef } from 'react';
import './ActivityLog.css';

const ActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [filters, setFilters] = useState({
    activityType: 'all',
    userType: 'all',
    dateRange: 'today',
    searchQuery: ''
  });
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);
  const activityEndRef = useRef(null);

  // Mock data for demonstration
  const mockActivities = [
    {
      id: 1,
      user_id: 'AL-2020-00123',
      user_name: 'Juan Dela Cruz',
      user_type: 'alumni',
      activity_type: 'profile_update',
      description: 'Updated personal information',
      details: 'Changed phone number and address',
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(), // 5 minutes ago
      ip_address: '192.168.1.100',
      user_agent: 'Chrome/120.0 Windows'
    },
    {
      id: 2,
      user_id: 'AL-2021-00234',
      user_name: 'Maria Santos',
      user_type: 'alumni',
      activity_type: 'login',
      description: 'User logged in successfully',
      details: 'From mobile device',
      timestamp: new Date(Date.now() - 10 * 60000).toISOString(), // 10 minutes ago
      ip_address: '192.168.1.101',
      user_agent: 'Safari/16.0 iOS'
    },
    {
      id: 3,
      user_id: 'AL-2019-00345',
      user_name: 'Pedro Reyes',
      user_type: 'alumni',
      activity_type: 'logout',
      description: 'User logged out',
      details: 'Session duration: 2 hours 15 minutes',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago
      ip_address: '192.168.1.102',
      user_agent: 'Firefox/121.0 Windows'
    },
    {
      id: 4,
      user_id: 'AL-2022-00456',
      user_name: 'Anna Lopez',
      user_type: 'alumni',
      activity_type: 'message_sent',
      description: 'Sent message to another alumni',
      details: 'Recipient: Carlos Garcia',
      timestamp: new Date(Date.now() - 25 * 60000).toISOString(), // 25 minutes ago
      ip_address: '192.168.1.103',
      user_agent: 'Chrome/120.0 Android'
    },
    {
      id: 5,
      user_id: 'AD-001',
      user_name: 'Admin User',
      user_type: 'admin',
      activity_type: 'account_approved',
      description: 'Approved alumni account',
      details: 'Alumni: Roberto Mendoza (2020-00567)',
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(), // 30 minutes ago
      ip_address: '192.168.1.1',
      user_agent: 'Chrome/120.0 Windows'
    }
  ];

  useEffect(() => {
    // Load initial activities
    setActivities(mockActivities);
    
    // Simulate real-time updates
    if (realTimeEnabled) {
      const interval = setInterval(() => {
        addNewActivity();
      }, 30000); // Add new activity every 30 seconds

      return () => clearInterval(interval);
    }
  }, [realTimeEnabled]);

  useEffect(() => {
    // Scroll to bottom when new activities are added
    activityEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activities]);

  const addNewActivity = () => {
    const activityTypes = ['login', 'logout', 'profile_update', 'message_sent', 'search_performed'];
    const userTypes = ['alumni', 'admin'];
    const alumniNames = ['Juan Dela Cruz', 'Maria Santos', 'Pedro Reyes', 'Anna Lopez', 'Carlos Garcia', 'Elena Torres'];
    
    const newActivity = {
      id: activities.length + 1,
      user_id: `AL-202${Math.floor(Math.random() * 5)}-00${Math.floor(Math.random() * 900) + 100}`,
      user_name: alumniNames[Math.floor(Math.random() * alumniNames.length)],
      user_type: userTypes[Math.floor(Math.random() * userTypes.length)],
      activity_type: activityTypes[Math.floor(Math.random() * activityTypes.length)],
      description: getActivityDescription(activityTypes[Math.floor(Math.random() * activityTypes.length)]),
      details: getActivityDetails(activityTypes[Math.floor(Math.random() * activityTypes.length)]),
      timestamp: new Date().toISOString(),
      ip_address: `192.168.1.${Math.floor(Math.random() * 255)}`,
      user_agent: ['Chrome/120.0 Windows', 'Safari/16.0 iOS', 'Firefox/121.0 Windows', 'Chrome/120.0 Android'][Math.floor(Math.random() * 4)]
    };

    setActivities(prev => [newActivity, ...prev]);
  };

  const getActivityDescription = (type) => {
    const descriptions = {
      login: 'User logged in successfully',
      logout: 'User logged out',
      profile_update: 'Updated personal information',
      message_sent: 'Sent message to another alumni',
      search_performed: 'Performed alumni search',
      account_approved: 'Approved alumni account',
      account_created: 'New account created'
    };
    return descriptions[type] || 'User performed an action';
  };

  const getActivityDetails = (type) => {
    const details = {
      login: 'From new device',
      logout: 'Session completed',
      profile_update: 'Modified contact details',
      message_sent: 'Private conversation started',
      search_performed: 'Filtered by batch and department',
      account_approved: 'Manual verification completed',
      account_created: 'Registration completed'
    };
    return details[type] || 'Action completed successfully';
  };

  const getActivityIcon = (type) => {
    const icons = {
      login: '🔑',
      logout: '🚪',
      profile_update: '✏️',
      message_sent: '💬',
      search_performed: '🔍',
      account_approved: '✅',
      account_created: '👤'
    };
    return icons[type] || '📝';
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - activityTime) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const filteredActivities = activities.filter(activity => {
    if (filters.activityType !== 'all' && activity.activity_type !== filters.activityType) return false;
    if (filters.userType !== 'all' && activity.user_type !== filters.userType) return false;
    if (filters.searchQuery && !activity.user_name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
    return true;
  });

  const exportLogs = () => {
    const csvContent = [
      ['Timestamp', 'User', 'User Type', 'Activity', 'Description', 'Details', 'IP Address'],
      ...filteredActivities.map(activity => [
        new Date(activity.timestamp).toLocaleString(),
        activity.user_name,
        activity.user_type,
        activity.activity_type,
        activity.description,
        activity.details,
        activity.ip_address
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `activity_log_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const clearLogs = () => {
    if (window.confirm('Are you sure you want to clear all activity logs? This action cannot be undone.')) {
      setActivities([]);
    }
  };

  return (
    <div className="activity-log">
      <div className="activity-header">
        <div className="header-content">
          <h1>Activity Log</h1>
          <p>Monitor real-time activities of alumni and administrators</p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">{activities.length}</span>
            <span className="stat-label">Total Activities</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {activities.filter(a => a.user_type === 'alumni').length}
            </span>
            <span className="stat-label">Alumni Activities</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {activities.filter(a => new Date(a.timestamp) > new Date(Date.now() - 3600000)).length}
            </span>
            <span className="stat-label">Last Hour</span>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="activity-controls">
        <div className="controls-left">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by user name..."
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <select
            value={filters.activityType}
            onChange={(e) => setFilters(prev => ({ ...prev, activityType: e.target.value }))}
            className="filter-select"
          >
            <option value="all">All Activities</option>
            <option value="login">Logins</option>
            <option value="logout">Logouts</option>
            <option value="profile_update">Profile Updates</option>
            <option value="message_sent">Messages</option>
            <option value="search_performed">Searches</option>
            <option value="account_approved">Account Approvals</option>
            <option value="account_created">Account Creations</option>
          </select>

          <select
            value={filters.userType}
            onChange={(e) => setFilters(prev => ({ ...prev, userType: e.target.value }))}
            className="filter-select"
          >
            <option value="all">All Users</option>
            <option value="alumni">Alumni Only</option>
            <option value="admin">Admin Only</option>
          </select>
        </div>

        <div className="controls-right">
          <div className="realtime-toggle">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={realTimeEnabled}
                onChange={(e) => setRealTimeEnabled(e.target.checked)}
                className="toggle-input"
              />
              <span className="toggle-slider"></span>
              <span className="toggle-text">Live Updates</span>
            </label>
            {realTimeEnabled && <span className="live-indicator">● LIVE</span>}
          </div>

          <button className="export-btn" onClick={exportLogs}>
            📊 Export CSV
          </button>
          <button className="clear-btn" onClick={clearLogs}>
            🗑️ Clear Logs
          </button>
        </div>
      </div>

      {/* Activity List */}
      <div className="activity-list-container">
        <div className="activity-list">
          {filteredActivities.map((activity, index) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                {getActivityIcon(activity.activity_type)}
              </div>
              
              <div className="activity-content">
                <div className="activity-main">
                  <div className="user-info">
                    <span className="user-name">{activity.user_name}</span>
                    <span className={`user-type ${activity.user_type}`}>
                      {activity.user_type === 'admin' ? '👨‍💼 Admin' : '🎓 Alumni'}
                    </span>
                    <span className="activity-time">
                      {getTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                  <div className="activity-description">
                    {activity.description}
                  </div>
                  {activity.details && (
                    <div className="activity-details">
                      {activity.details}
                    </div>
                  )}
                </div>

                <div className="activity-meta">
                  <span className="ip-address">IP: {activity.ip_address}</span>
                  <span className="user-agent" title={activity.user_agent}>
                    {activity.user_agent.split(' ')[0]}
                  </span>
                  <span className="activity-id">ID: {activity.user_id}</span>
                </div>
              </div>

              <div className={`activity-badge ${activity.activity_type}`}>
                {activity.activity_type.replace('_', ' ')}
              </div>
            </div>
          ))}
          
          <div ref={activityEndRef} />
        </div>

        {filteredActivities.length === 0 && (
          <div className="no-activities">
            <div className="no-activities-icon">📊</div>
            <h3>No activities found</h3>
            <p>Try adjusting your filters or wait for new activities to appear</p>
          </div>
        )}
      </div>

      {/* Real-time Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <span className="last-update">
            Last update: {new Date().toLocaleTimeString()}
          </span>
          <span className="activity-count">
            Showing {filteredActivities.length} of {activities.length} activities
          </span>
        </div>
        <div className="status-right">
          {realTimeEnabled && (
            <span className="real-time-status">
              🔄 Real-time monitoring active
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;