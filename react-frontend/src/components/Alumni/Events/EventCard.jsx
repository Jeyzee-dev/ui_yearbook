import React, { useState } from 'react';
import { formatDate, formatTime, isUpcomingEvent, getDaysUntilEvent } from '../../../utils/dateFormatters';

const EventCard = ({ event }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const isEventUpcoming = isUpcomingEvent(event.date);
  const daysUntilEvent = getDaysUntilEvent(event.date);
  const eventDate = new Date(event.date);

  const handleRegister = () => {
    setIsRegistered(true);
    // In a real app, this would call an API to register for the event
    console.log('Registered for event:', event.title);
  };

  const handleShare = () => {
    // In a real app, this would implement sharing functionality
    console.log('Share event:', event.title);
  };

  return (
    <div className={`event-card ${isEventUpcoming ? 'upcoming' : 'past'}`}>
      {/* Event Image */}
      <div className="event-image">
        <img src={event.image} alt={event.title} />
        <div className="event-status">
          {isEventUpcoming ? (
            <span className="status-upcoming">
              <i className="fas fa-clock"></i>
              {daysUntilEvent === 0 ? 'Today' : `${daysUntilEvent} days to go`}
            </span>
          ) : (
            <span className="status-past">
              <i className="fas fa-check-circle"></i>
              Event Ended
            </span>
          )}
        </div>
      </div>

      {/* Event Content */}
      <div className="event-content">
        <div className="event-header">
          <h3 className="event-title">{event.title}</h3>
          <div className="event-category">
            <span className={`category-badge ${event.category}`}>
              {event.category}
            </span>
          </div>
        </div>

        <p className="event-description">
          {isExpanded ? event.description : `${event.description.substring(0, 100)}...`}
        </p>

        {isExpanded && (
          <div className="event-details">
            <div className="detail-item">
              <i className="fas fa-calendar"></i>
              <div>
                <strong>Date & Time</strong>
                <span>{formatDate(event.date)} at {formatTime(event.date)}</span>
              </div>
            </div>
            
            <div className="detail-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <strong>Location</strong>
                <span>{event.location}</span>
              </div>
            </div>
            
            <div className="detail-item">
              <i className="fas fa-user-friends"></i>
              <div>
                <strong>Organizer</strong>
                <span>{event.organizer}</span>
              </div>
            </div>

            {event.registrationRequired && (
              <div className="detail-item">
                <i className="fas fa-users"></i>
                <div>
                  <strong>Attendance</strong>
                  <span>{event.attendees} of {event.maxAttendees} registered</span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="event-actions">
          <div className="action-buttons">
            {isEventUpcoming && event.registrationRequired && (
              <button
                className={`register-btn ${isRegistered ? 'registered' : ''}`}
                onClick={handleRegister}
                disabled={isRegistered}
              >
                <i className={`fas ${isRegistered ? 'fa-check' : 'fa-user-plus'}`}></i>
                {isRegistered ? 'Registered' : 'Register Now'}
              </button>
            )}
            
            <button className="share-btn" onClick={handleShare}>
              <i className="fas fa-share"></i>
              Share
            </button>
          </div>

          <button
            className="expand-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;