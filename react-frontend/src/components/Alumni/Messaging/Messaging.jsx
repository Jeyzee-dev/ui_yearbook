import React, { useState, useEffect } from 'react';
import { useMessaging } from '../../../hooks/useMessaging';
import { useAlumni } from '../../../contexts/AlumniContext';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';
import './Messaging.css';

const Messaging = () => {
  const { 
    conversations, 
    activeConversation, 
    setActiveConversation,
    sendMessage,
    getConversationMessages 
  } = useMessaging();
  
  const { currentAlumni } = useAlumni();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = conversations.filter(conv =>
        conv.participantName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredConversations(filtered);
    } else {
      setFilteredConversations(conversations);
    }
  }, [searchTerm, conversations]);

  const handleSendMessage = (messageText) => {
    if (activeConversation && messageText.trim()) {
      sendMessage(activeConversation, messageText);
    }
  };

  const handleNewConversation = (alumniId) => {
    console.log('Start new conversation with:', alumniId);
  };

  const handleBackToList = () => {
    setActiveConversation(null);
  };

  const displayConversations = searchTerm ? filteredConversations : conversations;

  return (
    <div className="messaging-container">
      <div className="messaging-header">
        <h1>Messages</h1>
        <div className="header-actions">
          <button className="btn-primary">
            <i className="fas fa-plus"></i>
            New Message
          </button>
        </div>
      </div>

      <div className="messaging-content">
        {/* Conversation List - Hidden on mobile when chat is open */}
        <div className={`conversation-sidebar ${isMobileView && activeConversation ? 'hidden-mobile' : ''}`}>
          <div className="sidebar-header">
            <div className="search-container">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <ConversationList
            conversations={displayConversations}
            activeConversation={activeConversation}
            onSelectConversation={setActiveConversation}
            onNewConversation={handleNewConversation}
          />
        </div>

        {/* Chat Window - Hidden on mobile when no conversation selected */}
        <div className={`chat-main ${isMobileView && !activeConversation ? 'hidden-mobile' : ''}`}>
          {activeConversation ? (
            <ChatWindow
              conversation={conversations.find(c => c.id === activeConversation)}
              messages={getConversationMessages(activeConversation)}
              onSendMessage={handleSendMessage}
              currentUser={currentAlumni}
              onBack={isMobileView ? handleBackToList : null}
            />
          ) : (
            <div className="no-chat-selected">
              <div className="empty-state">
                <i className="fas fa-comments"></i>
                <h3>No Conversation Selected</h3>
                <p>Choose a conversation from the list or start a new one</p>
                <button className="btn-primary">
                  <i className="fas fa-plus"></i>
                  Start New Conversation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messaging;