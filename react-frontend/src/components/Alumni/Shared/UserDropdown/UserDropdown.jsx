import React, { useState, useRef, useEffect } from 'react';
import './UserDropdown.css';

const UserDropdown = ({ 
  user, 
  onProfileClick, 
  onSettingsClick, 
  onLogoutClick,
  position = 'bottom-right'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (action) => {
    setIsOpen(false);
    if (action === 'profile' && onProfileClick) {
      onProfileClick();
    } else if (action === 'settings' && onSettingsClick) {
      onSettingsClick();
    } else if (action === 'logout' && onLogoutClick) {
      onLogoutClick();
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className={`user-dropdown ${position}`} ref={dropdownRef}>
      <button className="user-trigger" onClick={handleToggle}>
        <div className="user-avatar">
          {user.profilePicture ? (
            <img 
              src={user.profilePicture} 
              alt={`${user.firstName} ${user.lastName}`}
            />
          ) : (
            <div className="avatar-placeholder">
              {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
            </div>
          )}
        </div>
        
        <div className="user-info">
          <span className="user-name">
            {user.firstName} {user.lastName}
          </span>
          <span className="user-role">
            {user.role || 'Alumni'}
          </span>
        </div>
        
        <svg 
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`} 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="menu-header">
            <div className="header-avatar">
              {user.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt={`${user.firstName} ${user.lastName}`}
                />
              ) : (
                <div className="avatar-placeholder large">
                  {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                </div>
              )}
            </div>
            <div className="header-info">
              <h4>{user.firstName} {user.lastName}</h4>
              <p>{user.email}</p>
              <span className="user-batch">
                {user.course} • {user.graduationYear}
              </span>
            </div>
          </div>

          <div className="menu-items">
            <button 
              className="menu-item"
              onClick={() => handleMenuItemClick('profile')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>My Profile</span>
            </button>

            <button 
              className="menu-item"
              onClick={() => handleMenuItemClick('settings')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>Settings</span>
            </button>

            <div className="menu-divider"></div>

            <button 
              className="menu-item logout"
              onClick={() => handleMenuItemClick('logout')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;