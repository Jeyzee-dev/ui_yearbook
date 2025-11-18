import React, { useState, useMemo } from 'react';
import { useAlumni } from '../contexts/AlumniContext';
import AlumniHeader from '../components/Alumni/AlumniHeader/AlumniHeader';
import News from '../components/Alumni/News/News';
import SearchBar from '../components/Alumni/Shared/SearchBar/SearchBar';
import Footer from '../components/Footer/Footer';
import './NewsPage.css';

const NewsPage = () => {
  const { news, loading } = useAlumni();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    dateRange: ''
  });
  const [sortBy, setSortBy] = useState('latest');

  const filteredNews = useMemo(() => {
    let filtered = news.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !filters.category || 
        item.category === filters.category;

      return matchesSearch && matchesCategory;
    });

    // Sort news
    filtered.sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.publishDate) - new Date(a.publishDate);
      } else if (sortBy === 'oldest') {
        return new Date(a.publishDate) - new Date(b.publishDate);
      }
      return 0;
    });

    return filtered;
  }, [news, searchTerm, filters, sortBy]);

  const categories = [...new Set(news.map(item => item.category))];
  const recentNews = news.slice(0, 3);

  if (loading) {
    return <div className="loading">Loading news...</div>;
  }

  return (
    <div className="news-page">
      <AlumniHeader />
      
      <div className="news-container">
        <div className="news-header">
          <div className="header-content">
            <h1>Alumni News & Updates</h1>
            <p>Stay informed about MinSU and your fellow alumni</p>
          </div>
          <div className="header-stats">
            <div className="stat">
              <span className="stat-number">{news.length}</span>
              <span className="stat-label">Total News</span>
            </div>
            <div className="stat">
              <span className="stat-number">{recentNews.length}</span>
              <span className="stat-label">Recent Posts</span>
            </div>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="news-controls">
          <div className="search-section">
            <SearchBar 
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search news by title, content, or author..."
            />
          </div>

          <div className="controls-right">
            <div className="sort-section">
              <label>Sort by:</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            <div className="filter-section">
              <select 
                value={filters.category}
                onChange={(e) => setFilters(prev => ({...prev, category: e.target.value}))}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <p>Showing {filteredNews.length} of {news.length} news items</p>
          <button 
            className="clear-filters"
            onClick={() => {
              setSearchTerm('');
              setFilters({ category: '' });
            }}
          >
            Clear Filters
          </button>
        </div>

        {/* Featured News */}
        {filteredNews.length > 0 && (
          <div className="featured-news">
            <h2>Featured Stories</h2>
            <div className="featured-grid">
              {filteredNews.slice(0, 2).map((newsItem, index) => (
                <div key={newsItem.id} className="featured-card">
                  <img 
                    src={newsItem.image} 
                    alt={newsItem.title}
                    className="featured-image"
                  />
                  <div className="featured-content">
                    <span className="category-badge">{newsItem.category}</span>
                    <h3>{newsItem.title}</h3>
                    <p>{newsItem.excerpt}</p>
                    <div className="news-meta">
                      <span>By {newsItem.author}</span>
                      <span>{new Date(newsItem.publishDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* News Component */}
        <News 
          news={filteredNews}
          showFilters={false}
        />

        {/* No Results Message */}
        {filteredNews.length === 0 && (
          <div className="no-news">
            <h3>No news found</h3>
            <p>Try adjusting your search criteria or browse all news</p>
            <button 
              className="browse-all-btn"
              onClick={() => {
                setSearchTerm('');
                setFilters({ category: '' });
              }}
            >
              Browse All News
            </button>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="newsletter-section">
          <div className="newsletter-card">
            <h3>Stay Updated</h3>
            <p>Subscribe to our alumni newsletter for the latest updates</p>
            <div className="subscription-form">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="email-input"
              />
              <button className="subscribe-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsPage;