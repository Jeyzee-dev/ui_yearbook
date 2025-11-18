import React, { useState, useEffect } from 'react';
import { useAlumni } from '../../../contexts/AlumniContext';
import { useAlumniSearch, useAlumniStats } from '../../../hooks/useAlumni';
import { getBatchYears, getPrograms, getDepartments, getSections } from '../../../utils/alumniFilters';
import AlumniCard from './AlumniCard';
import './AlumniDirectory.css';

const AlumniDirectory = () => {
  const { alumniList, loading } = useAlumni();
  const { searchResults, filters, searchAlumni, clearFilters, setFilters } = useAlumniSearch();
  const stats = useAlumniStats();
  
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    searchAlumni();
  }, [searchAlumni]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchAlumni();
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  const batchYears = getBatchYears(alumniList);
  const programs = getPrograms(alumniList);
  const departments = getDepartments(alumniList);
  const sections = getSections(alumniList);

  if (loading) {
    return (
      <div className="alumni-directory-loading">
        <div className="loading-spinner"></div>
        <p>Loading alumni directory...</p>
      </div>
    );
  }

  return (
    <div className="alumni-directory">
      {/* Header Stats */}
      <div className="directory-header">
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-number">{stats.totalAlumni}</div>
            <div className="stat-label">Total Alumni</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.employed}</div>
            <div className="stat-label">Employed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.unemployed}</div>
            <div className="stat-label">Seeking Opportunities</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="directory-controls">
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search by name, program, or company..."
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn">Search</button>
            </div>
          </form>
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <label>Batch Year</label>
            <select
              value={filters.batchYear}
              onChange={(e) => handleFilterChange('batchYear', e.target.value)}
            >
              <option value="">All Years</option>
              {batchYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Program</label>
            <select
              value={filters.program}
              onChange={(e) => handleFilterChange('program', e.target.value)}
            >
              <option value="">All Programs</option>
              {programs.map(program => (
                <option key={program} value={program}>{program}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Employment</label>
            <select
              value={filters.employmentStatus}
              onChange={(e) => handleFilterChange('employmentStatus', e.target.value)}
            >
              <option value="">All</option>
              <option value="employed">Employed</option>
              <option value="unemployed">Seeking Opportunities</option>
            </select>
          </div>

          <button onClick={clearFilters} className="clear-filters-btn">
            <i className="fas fa-times"></i>
            Clear Filters
          </button>
        </div>

        <div className="view-controls">
          <div className="sort-controls">
            <span>Sort by:</span>
            <button 
              className={`sort-btn ${sortBy === 'name' ? 'active' : ''}`}
              onClick={() => handleSortChange('name')}
            >
              Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button 
              className={`sort-btn ${sortBy === 'batchYear' ? 'active' : ''}`}
              onClick={() => handleSortChange('batchYear')}
            >
              Batch {sortBy === 'batchYear' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </div>

          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <i className="fas fa-th"></i>
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <i className="fas fa-list"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="directory-results">
        <div className="results-header">
          <h3>{searchResults.length} Alumni Found</h3>
          {filters.searchQuery && (
            <div className="active-filters">
              <span>Active filters:</span>
              {filters.batchYear && <span className="filter-tag">Batch: {filters.batchYear}</span>}
              {filters.program && <span className="filter-tag">Program: {filters.program}</span>}
              {filters.employmentStatus && (
                <span className="filter-tag">
                  {filters.employmentStatus === 'employed' ? 'Employed' : 'Seeking Opportunities'}
                </span>
              )}
            </div>
          )}
        </div>

        {searchResults.length === 0 ? (
          <div className="no-results">
            <i className="fas fa-search"></i>
            <h4>No alumni found</h4>
            <p>Try adjusting your search criteria or filters</p>
            <button onClick={clearFilters} className="btn-primary">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className={`alumni-grid ${viewMode}`}>
            {searchResults.map(alumni => (
              <AlumniCard 
                key={alumni.id} 
                alumni={alumni} 
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniDirectory;