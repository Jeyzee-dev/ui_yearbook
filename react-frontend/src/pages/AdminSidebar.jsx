// src/pages/AdminSidebar.jsx
import React, { useState, useRef, useEffect } from 'react';
import AdminDashboard from '../components/Admin/AdminDashboard';
import VerificationQueue from '../components/Admin/VerificationQueue';
import UserManagement from '../components/Admin/UserManagement';
import AnnouncementManager from '../components/Admin/AnnouncementManager';
import ManualAccountCreation from '../components/Admin/ManualAccountCreation';
import ActivityLog from '../components/Admin/ActivityLog';
import StaffManagement from '../components/Admin/StaffManagement';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const notificationRef = useRef(null);

  // Mock notifications data
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'verification',
        title: 'New Alumni Registration',
        message: 'Juan Dela Cruz from Batch 2020 needs verification',
        time: '5 minutes ago',
        read: false,
        link: '/admin/verification'
      },
      {
        id: 2,
        type: 'system',
        title: 'System Maintenance',
        message: 'Scheduled maintenance this weekend',
        time: '2 hours ago',
        read: false,
        link: '/admin/dashboard'
      },
      {
        id: 3,
        type: 'announcement',
        title: 'Announcement Response',
        message: '15 alumni replied to your latest announcement',
        time: '1 day ago',
        read: true,
        link: '/admin/announcements'
      },
      {
        id: 4,
        type: 'user',
        title: 'Profile Update Request',
        message: 'Maria Santos requested profile information update',
        time: '2 days ago',
        read: true,
        link: '/admin/users'
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'verification':
        return <VerificationQueue />;
      case 'users':
        return <UserManagement />;
      case 'announcements':
        return <AnnouncementManager />;
      case 'create-account':
        return <ManualAccountCreation />;
      case 'activity-log':
        return <ActivityLog />;
      case 'staff-management':
        return <StaffManagement />;
      default:
        return <AdminDashboard />;
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'verification', label: 'Verification Queue', icon: '✅' },
    { id: 'users', label: 'User Management', icon: '👥' },
    { id: 'announcements', label: 'Announcements', icon: '📢' },
    { id: 'create-account', label: 'Create Account', icon: '➕' },
    { id: 'staff-management', label: 'Staff Management', icon: '👨‍💼' },
    { id: 'activity-log', label: 'Activity Log', icon: '📝' },
  ];

  const handleLogout = () => {
    console.log('Logging out...');
    setShowProfileModal(false);
    window.location.href = '/login';
  };

  // Notification functions
  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'verification': return '✅';
      case 'system': return '⚙️';
      case 'announcement': return '📢';
      case 'user': return '👤';
      default: return '🔔';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Notification Dropdown Component
  const NotificationDropdown = () => {
    if (!showNotifications) return null;

    return (
      <div className="notification-dropdown">
        <div className="notification-header">
          <h3>Notifications {unreadCount > 0 && <span className="unread-count">{unreadCount}</span>}</h3>
          <div className="header-actions">
            <button onClick={markAllAsRead} className="mark-read-btn">
              Mark all as read
            </button>
            <button onClick={clearAll} className="clear-btn">
              Clear all
            </button>
          </div>
        </div>

        <div className="notification-list">
          {notifications.length === 0 ? (
            <div className="no-notifications">
              <div className="empty-icon">🔔</div>
              <p>No notifications</p>
              <span>You're all caught up!</span>
            </div>
          ) : (
            notifications.map(notification => (
              <div
                key={notification.id}
                className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="notification-icon">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="notification-content">
                  <div className="notification-title">
                    {notification.title}
                  </div>
                  <div className="notification-message">
                    {notification.message}
                  </div>
                  <div className="notification-time">
                    {notification.time}
                  </div>
                </div>
                {!notification.read && <div className="unread-dot"></div>}
              </div>
            ))
          )}
        </div>

        <div className="notification-footer">
          <button className="view-all-btn">
            View All Notifications
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-sidebar-layout">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="brand-info">
            <div className="brand-logo">
              <img 
                src="https://minsu.edu.ph/template/images/logo.png" 
                alt="MinSU Logo" 
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="logo-fallback">🎓</div>
            </div>
            <div className="brand-text">
              <h2>MinSU Alumni</h2>
              <p>Admin Panel</p>
            </div>
          </div>
          <button 
            className={`sidebar-toggle ${sidebarOpen ? 'visible' : ''}`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '‹' : '›'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
              {sidebarOpen && item.id === 'verification' && (
                <span className="notification-badge">47</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div 
            className="admin-user"
            onClick={() => setShowProfileModal(true)}
          >
            <div className="user-avatar">
              <div className="avatar-fallback">👤</div>
            </div>
            {sidebarOpen && (
              <div className="user-info">
                <span className="user-name">Admin User</span>
                <span className="user-role">Administrator</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main-content">
        <header className="content-header">
          <div className="header-left">
            <button 
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <h1>
              {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="header-actions" ref={notificationRef}>
            <div className="notification-container">
              <button 
                className="notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                🔔
                {unreadCount > 0 && <span className="notification-dot">{unreadCount}</span>}
              </button>
              <NotificationDropdown />
            </div>
            <button 
              className="profile-btn"
              onClick={() => setShowProfileModal(true)}
            >
              <span>👤</span>
            </button>
          </div>
        </header>

        <main className="content-main">
          {renderContent()}
        </main>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Account Details</h3>
              <button 
                className="close-btn"
                onClick={() => setShowProfileModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-content">
              <div className="profile-info">
                <div className="profile-avatar">
                  <div className="avatar-fallback">👤</div>
                </div>
                <div className="profile-details">
                  <h4>Admin User</h4>
                  <p>Administrator</p>
                  <span className="email">admin@minsu.edu.ph</span>
                </div>
              </div>
              <div className="profile-stats">
                <div className="stat">
                  <span className="number">1,247</span>
                  <span className="label">Accounts Verified</span>
                </div>
                <div className="stat">
                  <span className="number">89</span>
                  <span className="label">Announcements</span>
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn-secondary">Edit Profile</button>
                <button className="btn-logout" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;