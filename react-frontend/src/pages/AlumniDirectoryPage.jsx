import React, { useState, useMemo } from 'react';
import { useAlumni } from '../contexts/AlumniContext';
import AlumniHeader from '../components/Alumni/AlumniHeader/AlumniHeader';
import AlumniDirectory from '../components/Alumni/AlumniDirectory/AlumniDirectory';
import SearchBar from '../components/Alumni/Shared/SearchBar/SearchBar';
import Footer from '../components/Footer/Footer';
import './AlumniDirectoryPage.css';

const AlumniDirectoryPage = () => {
  const { alumni, loading } = useAlumni();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    graduationYear: '',
    course: '',
    location: ''
  });

  const filteredAlumni = useMemo(() => {
    if (!alumni || !Array.isArray(alumni)) {
      return [];
    }
    return alumni.filter(alumnus => {
      if (!alumnus) return false;
      const matchesSearch = 
        (alumnus.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        (alumnus.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        (alumnus.course?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
      
      const matchesGraduation = !filters.graduationYear || 
        alumnus.graduationYear === filters.graduationYear;
      
      const matchesCourse = !filters.course || 
        alumnus.course === filters.course;
      
      const matchesLocation = !filters.location || 
        alumnus.currentLocation?.toLowerCase().includes(filters.location.toLowerCase());

      return matchesSearch && matchesGraduation && matchesCourse && matchesLocation;
    });
  }, [alumni, searchTerm, filters]);

  const uniqueCourses = alumni && Array.isArray(alumni) 
    ? [...new Set(alumni.map(a => a?.course).filter(Boolean))].sort()
    : [];
  const uniqueGraduationYears = alumni && Array.isArray(alumni)
    ? [...new Set(alumni.map(a => a?.graduationYear).filter(Boolean))].sort((a, b) => b - a)
    : [];

  if (loading) {
    return <div className="loading">Loading alumni directory...</div>;
  }

  return (
    <div className="alumni-directory-page">
      <AlumniHeader />
      
      <div className="directory-container">
        <div className="directory-header">
          <h1>Alumni Directory</h1>
          <p>Connect with {alumni && Array.isArray(alumni) ? alumni.length : 0} MinSU alumni worldwide</p>
        </div>

        {/* Search and Filters */}
        <div className="search-filters-section">
          <div className="search-bar-container">
            <SearchBar 
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by name, course, or location..."
            />
          </div>

          <div className="filters-grid">
            <div className="filter-group">
              <label>Graduation Year</label>
              <select 
                value={filters.graduationYear}
                onChange={(e) => setFilters(prev => ({...prev, graduationYear: e.target.value}))}
              >
                <option value="">All Years</option>
                {uniqueGraduationYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Course</label>
              <select 
                value={filters.course}
                onChange={(e) => setFilters(prev => ({...prev, course: e.target.value}))}
              >
                <option value="">All Courses</option>
                {uniqueCourses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Location</label>
              <input 
                type="text"
                placeholder="Enter location..."
                value={filters.location}
                onChange={(e) => setFilters(prev => ({...prev, location: e.target.value}))}
              />
            </div>

            <button 
              className="clear-filters"
              onClick={() => setFilters({ graduationYear: '', course: '', location: '' })}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-info">
          <p>Showing {filteredAlumni.length} of {alumni && Array.isArray(alumni) ? alumni.length : 0} alumni</p>
        </div>

        {/* Alumni Directory Component */}
        <AlumniDirectory alumni={filteredAlumni} />
      </div>
      <Footer />
    </div>
  );
};

export default AlumniDirectoryPage;