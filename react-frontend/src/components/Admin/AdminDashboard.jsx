// src/components/Admin/AdminDashboard.jsx
import React, { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  // Mock data for demonstration
  const [stats, setStats] = useState({
    totalAlumni: 15234,
    pendingVerifications: 47,
    newRegistrations: 89,
    activeUsers: 2456
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      user: 'Juan Dela Cruz',
      action: 'Account Registered',
      time: '5 minutes ago',
      type: 'registration'
    },
    {
      id: 2,
      user: 'Maria Santos',
      action: 'Profile Updated',
      time: '15 minutes ago',
      type: 'update'
    },
    {
      id: 3,
      user: 'Admin User',
      action: 'Approved 5 accounts',
      time: '1 hour ago',
      type: 'approval'
    }
  ]);

  const quickActions = [
    { 
      label: 'Verify Alumni', 
      icon: '✅', 
      description: '47 pending verifications',
      count: 47
    },
    { 
      label: 'Manage Users', 
      icon: '👥', 
      description: '15,234 total alumni',
      count: 15234
    },
    { 
      label: 'Create Announcement', 
      icon: '📢', 
      description: 'Send updates to alumni'
    },
    { 
      label: 'View Activity Log', 
      icon: '📊', 
      description: 'Monitor user activities'
    }
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome to MinSU Alumni Management System</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🎓</div>
          <div className="stat-info">
            <h3>{stats.totalAlumni.toLocaleString()}</h3>
            <p>Total Alumni</p>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{stats.pendingVerifications}</h3>
            <p>Pending Verifications</p>
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <h3>{stats.newRegistrations}</h3>
            <p>New Registrations (7d)</p>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">👤</div>
          <div className="stat-info">
            <h3>{stats.activeUsers.toLocaleString()}</h3>
            <p>Active Users (30d)</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <div key={index} className="action-card">
              <div className="action-icon">{action.icon}</div>
              <div className="action-content">
                <h4>{action.label}</h4>
                <p>{action.description}</p>
                {action.count && <span className="action-badge">{action.count}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {recentActivity.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                {activity.type === 'registration' && '👤'}
                {activity.type === 'update' && '✏️'}
                {activity.type === 'approval' && '✅'}
              </div>
              <div className="activity-content">
                <div className="activity-text">
                  <strong>{activity.user}</strong> {activity.action}
                </div>
                <div className="activity-time">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;