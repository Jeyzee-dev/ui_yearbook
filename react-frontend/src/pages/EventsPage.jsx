import React, { useState, useMemo } from 'react';
import { useAlumni } from '../contexts/AlumniContext';
import AlumniHeader from '../components/Alumni/AlumniHeader/AlumniHeader';
import Events from '../components/Alumni/Events/Events';
import SearchBar from '../components/Alumni/Shared/SearchBar/SearchBar';
import Footer from '../components/Footer/Footer';
import './EventsPage.css';

const EventsPage = () => {
  const { events, loading } = useAlumni();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    eventType: '',
    dateRange: '',
    location: ''
  });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = !filters.eventType || 
        event.type === filters.eventType;
      
      const matchesLocation = !filters.location || 
        event.location?.toLowerCase().includes(filters.location.toLowerCase());

      // Date filtering logic
      const matchesDate = !filters.dateRange || 
        (filters.dateRange === 'upcoming' && new Date(event.date) >= new Date()) ||
        (filters.dateRange === 'past' && new Date(event.date) < new Date());

      return matchesSearch && matchesType && matchesLocation && matchesDate;
    });
  }, [events, searchTerm, filters]);

  const eventTypes = [...new Set(events.map(event => event.type))];
  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const pastEvents = events.filter(event => new Date(event.date) < new Date());

  if (loading) {
    return <div className="loading">Loading events...</div>;
  }

  return (
    <div className="events-page">
      <AlumniHeader />
      
      <div className="events-container">
        <div className="events-header">
          <div className="header-content">
            <h1>Alumni Events</h1>
            <p>Stay connected through MinSU alumni events and gatherings</p>
          </div>
          <div className="header-stats">
            <div className="stat">
              <span className="stat-number">{upcomingEvents.length}</span>
              <span className="stat-label">Upcoming Events</span>
            </div>
            <div className="stat">
              <span className="stat-number">{pastEvents.length}</span>
              <span className="stat-label">Past Events</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="events-controls">
          <div className="search-section">
            <SearchBar 
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search events by title, description..."
            />
          </div>

          <div className="controls-right">
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
            </div>

            <div className="filters-section">
              <select 
                value={filters.eventType}
                onChange={(e) => setFilters(prev => ({...prev, eventType: e.target.value}))}
              >
                <option value="">All Event Types</option>
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select 
                value={filters.dateRange}
                onChange={(e) => setFilters(prev => ({...prev, dateRange: e.target.value}))}
              >
                <option value="">All Dates</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past Events</option>
              </select>

              <input 
                type="text"
                placeholder="Location..."
                value={filters.location}
                onChange={(e) => setFilters(prev => ({...prev, location: e.target.value}))}
              />
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <p>Showing {filteredEvents.length} of {events.length} events</p>
          <button 
            className="clear-filters"
            onClick={() => {
              setSearchTerm('');
              setFilters({ eventType: '', dateRange: '', location: '' });
            }}
          >
            Clear All Filters
          </button>
        </div>

        {/* Events Component */}
        <Events 
          events={filteredEvents}
          viewMode={viewMode}
          showFilters={false}
        />

        {/* No Results Message */}
        {filteredEvents.length === 0 && (
          <div className="no-events">
            <h3>No events found</h3>
            <p>Try adjusting your search criteria or browse all events</p>
            <button 
              className="browse-all-btn"
              onClick={() => {
                setSearchTerm('');
                setFilters({ eventType: '', dateRange: '', location: '' });
              }}
            >
              Browse All Events
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;