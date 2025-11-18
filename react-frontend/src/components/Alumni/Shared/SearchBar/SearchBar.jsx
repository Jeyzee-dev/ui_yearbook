import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ 
  value = '', 
  onChange, 
  placeholder = 'Search...', 
  onSearch,
  delay = 300,
  className = '',
  size = 'medium' 
}) => {
  const [inputValue, setInputValue] = useState(value);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onChange) {
        onChange(inputValue);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [inputValue, delay, onChange]);

  // Sync with external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(inputValue);
    }
  };

  const handleClear = () => {
    setInputValue('');
    if (onChange) {
      onChange('');
    }
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <form 
      className={`search-bar ${className} ${size}`} 
      onSubmit={handleSubmit}
    >
      <div className="search-input-container">
        <svg 
          className="search-icon" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
        />
        
        {inputValue && (
          <button
            type="button"
            className="clear-button"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
      
      <button 
        type="submit" 
        className="search-button"
        aria-label="Search"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;