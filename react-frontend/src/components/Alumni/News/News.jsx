import React, { useState, useEffect } from 'react';
import { useAlumni } from '../../../contexts/AlumniContext';
import NewsCard from './NewsCard';
import './News.css';

const News = () => {
  const { news, loading } = useAlumni();
  const [filter, setFilter] = useState('all'); // 'all', 'university', 'alumni', 'scholarship'
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNews, setFilteredNews] = useState([]);

  useEffect(() => {
    let result = news;

    // Apply category filter
    if (filter !== 'all') {
      result = result.filter(item => item.category === filter);
    }

    // Apply search filter
    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.author.toLowerCase().includes(query)
      );
    }

    setFilteredNews(result);
  }, [news, filter, searchTerm]);

  const categories = [
    { value: 'all', label: 'All News', count: news.length },
    { value: 'university', label: 'University', count: news.filter(item => item.category === 'university').length },
    { value: 'alumni', label: 'Alumni', count: news.filter(item => item.category === 'alumni').length },
    { value: 'scholarship', label: 'Scholarship', count: news.filter(item => item.category === 'scholarship').length },
    { value: 'event', label: 'Event Updates', count: news.filter(item => item.category === 'event').length }
  ];

  const featuredNews = news.filter(item => item.featured).slice(0, 2);
  const recentNews = filteredNews.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  if (loading) {
    return (
      <div className="news-loading">
        <div className="loading-spinner"></div>
        <p>Loading news...</p>
      </div>
    );
  }

  return (
    <div className="news-container">
      {/* News Header */}
      <div className="news-header">
        <div className="header-content">
          <h1>Alumni News & Updates</h1>
          <p>Stay informed about university news, alumni achievements, and important announcements</p>
        </div>
        
        {featuredNews.length > 0 && (
          <div className="featured-news">
            <h2>Featured Stories</h2>
            <div className="featured-grid">
              {featuredNews.map(item => (
                <NewsCard key={item.id} news={item} featured={true} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* News Controls */}
      <div className="news-controls">
        <div className="search-section">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="filter-section">
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.value}
                className={`category-filter ${filter === category.value ? 'active' : ''}`}
                onClick={() => setFilter(category.value)}
              >
                <span className="filter-label">{category.label}</span>
                <span className="filter-count">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Content */}
      <div className="news-content">
        <div className="content-header">
          <h2>
            {filter === 'all' ? 'All News' : 
             categories.find(c => c.value === filter)?.label || 'News'}
          </h2>
          <span className="results-count">
            {filteredNews.length} {filteredNews.length === 1 ? 'article' : 'articles'}
          </span>
        </div>

        {recentNews.length === 0 ? (
          <div className="no-news">
            <i className="fas fa-newspaper"></i>
            <h3>No news found</h3>
            <p>Try adjusting your search criteria or check back later for updates.</p>
          </div>
        ) : (
          <div className="news-grid">
            {recentNews.map(item => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        )}
      </div>

      {/* Newsletter Subscription */}
      <div className="newsletter-section">
        <div className="newsletter-card">
          <div className="newsletter-content">
            <h3>Stay Updated</h3>
            <p>Subscribe to our alumni newsletter to receive the latest news and updates directly in your inbox.</p>
            <div className="subscription-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="email-input"
              />
              <button className="subscribe-btn">
                <i className="fas fa-paper-plane"></i>
                Subscribe
              </button>
            </div>
            <p className="privacy-note">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
          <div className="newsletter-graphic">
            <i className="fas fa-envelope-open-text"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;