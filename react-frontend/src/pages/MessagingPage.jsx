import React, { useState, useEffect } from 'react';
import { useAlumni } from '../contexts/AlumniContext';
import { useMessaging } from '../hooks/useMessaging';
import AlumniHeader from '../components/Alumni/AlumniHeader/AlumniHeader';
import Messaging from '../components/Alumni/Messaging/Messaging';
import Footer from '../components/Footer/Footer';
import './MessagingPage.css';

const MessagingPage = () => {
  const { currentAlumni } = useAlumni();
  const { 
    conversations, 
    activeConversation, 
    messages,
    sendMessage,
    markAsRead,
    loading 
  } = useMessaging();

  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    if (conversations.length > 0 && !selectedConversation) {
      setSelectedConversation(conversations[0].id);
    }
  }, [conversations, selectedConversation]);

  const handleSelectConversation = (conversationId) => {
    setSelectedConversation(conversationId);
    markAsRead(conversationId);
  };

  const handleSendMessage = async (messageText) => {
    if (selectedConversation && messageText.trim()) {
      await sendMessage(selectedConversation, messageText);
    }
  };

  if (loading) {
    return <div className="loading">Loading messages...</div>;
  }

  return (
    <div className="messaging-page">
      <AlumniHeader />
      
      <div className="messaging-container">
        <div className="messaging-header">
          <h1>Messages</h1>
          <p>Connect with your MinSU alumni network</p>
        </div>

        <div className="messaging-content">
          <Messaging 
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={handleSelectConversation}
            messages={messages}
            onSendMessage={handleSendMessage}
            currentUser={currentAlumni}
          />
        </div>

        {/* Quick Actions */}
        <div className="messaging-actions">
          <div className="action-cards">
            <div className="action-card">
              <h3>Start New Conversation</h3>
              <p>Connect with alumni from the directory</p>
              <button 
                className="action-btn"
                onClick={() => window.location.href = '/alumni/directory'}
              >
                Browse Alumni
              </button>
            </div>
            
            <div className="action-card">
              <h3>Message Requests</h3>
              <p>Manage your incoming connection requests</p>
              <button className="action-btn">
                View Requests
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MessagingPage;