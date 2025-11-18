import React, { useState } from 'react';
import { formatDate, getRelativeTime } from '../../../utils/dateFormatters';

const NewsCard = ({ news, featured = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleShare = () => {
    // In a real app, this would implement sharing functionality
    console.log('Share news:', news.title);
  };

  const handleSave = () => {
    // In a real app, this would implement save functionality
    console.log('Save news:', news.title);
  };

  const handleReadMore = () => {
    // In a real app, this would navigate to the full article
    console.log('Read more:', news.title);
  };

  const displayContent = isExpanded || featured ? news.content : `${news.content.substring(0, 150)}...`;

  return (
    <div className={`news-card ${featured ? 'featured' : ''}`}>
      {/* News Image */}
      <div className="news-image">
        <img src={news.image} alt={news.title} />
        <div className="news-category">
          <span className={`category-badge ${news.category}`}>
            {news.category}
          </span>
        </div>
        {featured && (
          <div className="featured-badge">
            <i className="fas fa-star"></i>
            Featured
          </div>
        )}
      </div>

      {/* News Content */}
      <div className="news-content">
        <div className="news-meta">
          <span className="publish-date">
            <i className="fas fa-calendar"></i>
            {getRelativeTime(news.publishDate)}
          </span>
          <span className="read-time">
            <i className="fas fa-clock"></i>
            {news.readTime}
          </span>
          <span className="author">
            <i className="fas fa-user-edit"></i>
            {news.author}
          </span>
        </div>

        <h3 className="news-title">{news.title}</h3>
        
        <p className="news-description">
          {displayContent}
          {!featured && news.content.length > 150 && (
            <button
              className="read-more-btn"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          )}
        </p>

        <div className="news-actions">
          <div className="action-buttons">
            <button className="action-btn" onClick={handleReadMore}>
              <i className="fas fa-book-open"></i>
              Read Full Article
            </button>
            
            <button className="action-btn" onClick={handleShare}>
              <i className="fas fa-share"></i>
              Share
            </button>
            
            <button className="action-btn" onClick={handleSave}>
              <i className="fas fa-bookmark"></i>
              Save
            </button>
          </div>

          {featured && (
            <div className="featured-actions">
              <button className="btn-primary" onClick={handleReadMore}>
                Read Full Story
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;