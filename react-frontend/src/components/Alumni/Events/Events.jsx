import React, { useState, useEffect } from 'react';
import { useAlumni } from '../../../contexts/AlumniContext';
import EventCard from './EventCard';
import { isUpcomingEvent, getDaysUntilEvent } from '../../../utils/dateFormatters';
import './Events.css';

const Events = () => {
  const { events, loading } = useAlumni();
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'past'
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    let result = events;

    // Apply date filter
    if (filter === 'upcoming') {
      result = result.filter(event => isUpcomingEvent(event.date));
    } else if (filter === 'past') {
      result = result.filter(event => !isUpcomingEvent(event.date));
    }

    // Apply search filter
    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      result = result.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.organizer.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(event => event.category === selectedCategory);
    }

    setFilteredEvents(result);
  }, [events, filter, searchTerm, selectedCategory]);

  const categories = ['all', ...new Set(events.map(event => event.category))];

  const upcomingEvents = events.filter(event => isUpcomingEvent(event.date));
  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

  if (loading) {
    return (
      <div className="events-loading">
        <div className="loading-spinner"></div>
        <p>Loading events...</p>
      </div>
    );
  }

  return (
    <div className="events-container">
      {/* Events Header */}
      <div className="events-header">
        <div className="header-content">
          <h1>Events & Gatherings</h1>
          <p>Stay connected through alumni events and activities</p>
        </div>
        
        {nextEvent && (
          <div className="next-event-banner">
            <div className="banner-content">
              <div className="event-date">
                <span className="date-day">
                  {new Date(nextEvent.date).getDate()}
                </span>
                <span className="date-month">
                  {new Date(nextEvent.date).toLocaleDateString('en-US', { month: 'short' })}
                </span>
              </div>
              <div className="event-info">
                <h3>Next Event: {nextEvent.title}</h3>
                <p>{getDaysUntilEvent(nextEvent.date)} days away</p>
              </div>
            </div>
            <button className="btn-primary">Register Now</button>
          </div>
        )}
      </div>

      {/* Events Controls */}
      <div className="events-controls">
        <div className="search-filter">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-group">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-filter"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="view-controls">
          <div className="filter-tabs">
            <button
              className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Events
            </button>
            <button
              className={`tab-btn ${filter === 'upcoming' ? 'active' : ''}`}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`tab-btn ${filter === 'past' ? 'active' : ''}`}
              onClick={() => setFilter('past')}
            >
              Past Events
            </button>
          </div>

          <div className="view-stats">
            <span className="events-count">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
            </span>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="events-content">
        {filteredEvents.length === 0 ? (
          <div className="no-events">
            <i className="fas fa-calendar-times"></i>
            <h3>No events found</h3>
            <p>Try adjusting your search criteria or check back later for new events.</p>
          </div>
        ) : (
          <div className="events-grid">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="events-actions">
        <div className="action-card">
          <i className="fas fa-bullhorn"></i>
          <h4>Host an Event</h4>
          <p>Organize a gathering for your batch or department</p>
          <button className="btn-outline">Submit Proposal</button>
        </div>
        
        <div className="action-card">
          <i className="fas fa-question-circle"></i>
          <h4>Need Help?</h4>
          <p>Contact the alumni office for event-related inquiries</p>
          <button className="btn-outline">Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default Events;