import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlumniContext } from '../../../contexts/AlumniContext';
import SearchBar from '../Shared/SearchBar/SearchBar';
import './AlumniHeader.css';

const AlumniHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  
  const { currentAlumni, notifications, unreadCount, markAsRead, markAllAsRead } = useContext(AlumniContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications && !event.target.closest('.notification-container')) {
        setShowNotifications(false);
      }
      if (showProfileMenu && !event.target.closest('.profile-container')) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications, showProfileMenu]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  const handleNotificationItemClick = (notificationId) => {
    markAsRead(notificationId);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
    // Implement search functionality
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Implement logout logic
  };

  return (
    <header className={`alumni-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        {/* Logo and Brand */}
        <div className="nav-brand">
          <img 
            src="https://tse3.mm.bing.net/th/id/OIP.tMmFZwBZrMx31lmMpteDpQHaHa?pid=Api&P=0&h=220" 
            alt="MinSU Logo" 
            className="logo"
          />
          <div className="brand-text">
            <h1>MinSU E-YearBook</h1>
            <p>Alumni Portal</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <SearchBar 
            placeholder="Search alumni, events, news..."
            onSearch={handleSearch}
            size="small"
          />
        </div>

        {/* Navigation Menu */}
        <nav className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link 
            to="/alumni/dashboard" 
            className={`nav-link ${location.pathname === '/alumni/dashboard' || location.pathname === '/alumni' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <i className="fas fa-home"></i>
            <span>Dashboard</span>
          </Link>
          <Link 
            to="/alumni/directory" 
            className={`nav-link ${location.pathname === '/alumni/directory' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <i className="fas fa-users"></i>
            <span>Directory</span>
          </Link>
          <Link 
            to="/alumni/events" 
            className={`nav-link ${location.pathname === '/alumni/events' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <i className="fas fa-calendar"></i>
            <span>Events</span>
          </Link>
          <Link 
            to="/alumni/news" 
            className={`nav-link ${location.pathname === '/alumni/news' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <i className="fas fa-newspaper"></i>
            <span>News</span>
          </Link>
          <Link 
            to="/alumni/messaging" 
            className={`nav-link ${location.pathname === '/alumni/messaging' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <i className="fas fa-comments"></i>
            <span>Messages</span>
            {unreadCount > 0 && <span className="message-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>}
          </Link>
          
          {/* Alumni-specific features */}
          <div className="alumni-actions">
            {/* Notifications */}
            <div className="notification-container">
              <button 
                className="notification-btn"
                onClick={handleNotificationClick}
              >
                <i className="fas fa-bell"></i>
                {unreadCount > 0 && (
                  <span className="notification-dot">{unreadCount > 99 ? '99+' : unreadCount}</span>
                )}
              </button>
              
              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h3>Notifications</h3>
                    <div className="notification-actions">
                      <span className="unread-count">{unreadCount} unread</span>
                      {unreadCount > 0 && (
                        <button 
                          className="mark-all-read"
                          onClick={handleMarkAllAsRead}
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="notification-list">
                    {notifications.length > 0 ? (
                      notifications.slice(0, 5).map(notification => (
                        <div 
                          key={notification.id} 
                          className={`notification-item ${notification.unread ? 'unread' : ''}`}
                          onClick={() => handleNotificationItemClick(notification.id)}
                        >
                          <div className="notification-icon">
                            <i className={`fas ${notification.icon || 'fa-info-circle'}`}></i>
                          </div>
                          <div className="notification-content">
                            <div className="notification-title">{notification.title}</div>
                            <div className="notification-message">{notification.message}</div>
                            <div className="notification-time">
                              {new Date(notification.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                          {notification.unread && <div className="unread-indicator"></div>}
                        </div>
                      ))
                    ) : (
                      <div className="no-notifications">
                        <i className="fas fa-bell-slash"></i>
                        <p>No notifications</p>
                        <span>You're all caught up!</span>
                      </div>
                    )}
                  </div>
                  <div className="notification-footer">
                    <Link to="/alumni/notifications" className="view-all-btn">
                      View All Notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="profile-container">
              <button 
                className="profile-btn"
                onClick={handleProfileClick}
              >
                <img 
                  src={currentAlumni?.profilePicture || '/default-avatar.png'} 
                  alt="Profile" 
                  className="user-avatar"
                />
                <span className="user-name">{currentAlumni?.fullName?.split(' ')[0]}</span>
                <i className="fas fa-chevron-down"></i>
              </button>
              
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <div className="profile-info">
                    <img 
                      src={currentAlumni?.profilePicture || '/default-avatar.png'} 
                      alt="Profile" 
                      className="profile-avatar"
                    />
                    <div className="user-details">
                      <div className="user-fullname">{currentAlumni?.fullName}</div>
                      <div className="user-batch">{currentAlumni?.batchYear} • {currentAlumni?.program}</div>
                    </div>
                  </div>
                  <div className="dropdown-menu">
                    <Link to="/alumni/profile" className="menu-item" onClick={() => setShowProfileMenu(false)}>
                      <i className="fas fa-user"></i>
                      My Profile
                    </Link>
                    <Link to="/alumni/settings" className="menu-item" onClick={() => setShowProfileMenu(false)}>
                      <i className="fas fa-cog"></i>
                      Settings
                    </Link>
                    <Link to="/alumni/help" className="menu-item" onClick={() => setShowProfileMenu(false)}>
                      <i className="fas fa-question-circle"></i>
                      Help & Support
                    </Link>
                    <div className="menu-divider"></div>
                    <button className="menu-item logout-btn" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt"></i>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default AlumniHeader;