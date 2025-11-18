import React from 'react';
import { useAlumni } from '../contexts/AlumniContext';
import { useNotifications } from '../hooks/useNotifications';
import { formatDate, getRelativeTime } from '../utils/dateFormatters';
import AlumniHeader from '../components/Alumni/AlumniHeader/AlumniHeader';
import Footer from '../components/Footer/Footer';
import './AlumniDashboard.css';

const AlumniDashboard = () => {
  const { currentAlumni, events, news, alumniList } = useAlumni();
  const { getRecentNotifications, getUnreadNotifications } = useNotifications();
  
  const unreadNotifications = getUnreadNotifications();
  const recentNews = news.slice(0, 3);
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).slice(0, 2);
  const alumniStats = {
    totalConnections: alumniList.length - 1,
    upcomingEvents: upcomingEvents.length,
    unreadMessages: unreadNotifications.length,
    profileViews: Math.floor(Math.random() * 100) + 50
  };

  if (!currentAlumni) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="alumni-dashboard">
      <AlumniHeader />
      
      <div className="dashboard-content">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-content">
            <h1>Welcome back, {currentAlumni.fullName.split(' ')[0]}! 👋</h1>
            <p>Stay connected with your MinSU alumni community</p>
          </div>
          <div className="welcome-stats">
            <div className="stat-item">
              <span className="stat-number">{alumniStats.totalConnections}</span>
              <span className="stat-label">Alumni Connections</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{alumniStats.upcomingEvents}</span>
              <span className="stat-label">Upcoming Events</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>Alumni Network</h3>
              <p className="stat-number">{alumniList.length} graduates</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>Upcoming Events</h3>
              <p className="stat-number">{upcomingEvents.length} events</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔔</div>
            <div className="stat-info">
              <h3>Notifications</h3>
              <p className="stat-number">{unreadNotifications.length} unread</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👀</div>
            <div className="stat-info">
              <h3>Profile Views</h3>
              <p className="stat-number">{alumniStats.profileViews} views</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="main-grid">
          {/* Left Column - Quick Actions & Recent Activity */}
          <div className="left-column">
            {/* Quick Actions */}
            <div className="quick-actions-card">
              <h2>Quick Actions</h2>
              <div className="action-buttons">
                <button 
                  className="action-btn primary"
                  onClick={() => window.location.href = '/alumni/directory'}
                >
                  <span>👥</span>
                  Find Alumni
                </button>
                <button 
                  className="action-btn secondary"
                  onClick={() => window.location.href = '/alumni/events'}
                >
                  <span>📅</span>
                  Browse Events
                </button>
                <button 
                  className="action-btn secondary"
                  onClick={() => window.location.href = '/alumni/messaging'}
                >
                  <span>💬</span>
                  Check Messages
                </button>
                <button 
                  className="action-btn secondary"
                  onClick={() => window.location.href = '/alumni/profile'}
                >
                  <span>👤</span>
                  Update Profile
                </button>
              </div>
            </div>

            {/* Recent Notifications */}
            <div className="notifications-card">
              <div className="card-header">
                <h2>Recent Notifications</h2>
                <span className="badge">{unreadNotifications.length}</span>
              </div>
              <div className="notifications-list">
                {getRecentNotifications(4).map(notification => (
                  <div key={notification.id} className={`notification-item ${notification.unread ? 'unread' : ''}`}>
                    <div className="notification-icon">
                      {notification.type === 'event' && '📅'}
                      {notification.type === 'verification' && '✅'}
                      {notification.type === 'message' && '💬'}
                    </div>
                    <div className="notification-content">
                      <p className="notification-message">{notification.message}</p>
                      <span className="notification-time">
                        {getRelativeTime(notification.timestamp)}
                      </span>
                    </div>
                    {notification.unread && <div className="unread-dot"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Upcoming Events & Recent News */}
          <div className="right-column">
            {/* Upcoming Events */}
            <div className="events-card">
              <div className="card-header">
                <h2>Upcoming Events</h2>
                <button 
                  className="view-all-btn"
                  onClick={() => window.location.href = '/alumni/events'}
                >
                  View All
                </button>
              </div>
              <div className="events-list">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="event-item">
                    <div className="event-date">
                      <span className="date-day">{new Date(event.date).getDate()}</span>
                      <span className="date-month">
                        {new Date(event.date).toLocaleString('default', { month: 'short' })}
                      </span>
                    </div>
                    <div className="event-details">
                      <h4>{event.title}</h4>
                      <p>{event.location}</p>
                      <span className="event-attendees">
                        {event.attendees} attending
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent News */}
            <div className="news-card">
              <div className="card-header">
                <h2>Latest News</h2>
                <button 
                  className="view-all-btn"
                  onClick={() => window.location.href = '/alumni/news'}
                >
                  View All
                </button>
              </div>
              <div className="news-list">
                {recentNews.map(item => (
                  <div key={item.id} className="news-item">
                    <div className="news-image">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="news-content">
                      <h4>{item.title}</h4>
                      <p>{item.content.substring(0, 80)}...</p>
                      <span className="news-meta">
                        {formatDate(item.publishDate)} • {item.readTime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AlumniDashboard;