import React, { useState, useRef, useEffect } from 'react';
import { useMessaging } from '../../../hooks/useMessaging';
import { useAlumni } from '../../../contexts/AlumniContext';
import { formatTime, getRelativeTime } from '../../../utils/dateFormatters';

const ChatWindow = ({ conversationId, onBack }) => {
  const { getConversationMessages, sendMessage, conversations } = useMessaging();
  const { currentAlumni } = useAlumni();
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  const conversation = conversations.find(c => c.id === conversationId);
  const messages = getConversationMessages(conversationId);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      await sendMessage(conversationId, newMessage, currentAlumni.id);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  if (!conversation) {
    return (
      <div className="chat-window-error">
        <div className="error-state">
          <i className="fas fa-exclamation-triangle"></i>
          <h3>Conversation not found</h3>
          <p>The conversation you're looking for doesn't exist.</p>
          {onBack && (
            <button className="btn-secondary" onClick={onBack}>
              <i className="fas fa-arrow-left"></i>
              Back to Conversations
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      {/* Chat Header */}
      <div className="chat-header">
        {onBack && (
          <button className="back-button" onClick={onBack}>
            <i className="fas fa-arrow-left"></i>
          </button>
        )}
        <div className="chat-partner">
          <img src={conversation.participantAvatar} alt={conversation.participantName} />
          <div className="partner-info">
            <h3>{conversation.participantName}</h3>
            <span className="online-status">Online</span>
          </div>
        </div>
        <div className="chat-actions">
          <button className="action-btn" title="Video Call">
            <i className="fas fa-video"></i>
          </button>
          <button className="action-btn" title="Voice Call">
            <i className="fas fa-phone"></i>
          </button>
          <button className="action-btn" title="More Options">
            <i className="fas fa-ellipsis-v"></i>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="no-messages">
            <i className="fas fa-comments"></i>
            <h4>No messages yet</h4>
            <p>Start the conversation by sending a message</p>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map((message, index) => {
              const isOwnMessage = message.senderId === currentAlumni.id;
              const showDate = index === 0 || 
                new Date(message.timestamp).toDateString() !== 
                new Date(messages[index - 1].timestamp).toDateString();

              return (
                <div key={message.id}>
                  {showDate && (
                    <div className="date-divider">
                      <span>{new Date(message.timestamp).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                  )}
                  
                  <div className={`message ${isOwnMessage ? 'own-message' : 'other-message'}`}>
                    {!isOwnMessage && (
                      <img 
                        src={conversation.participantAvatar} 
                        alt={conversation.participantName}
                        className="message-avatar"
                      />
                    )}
                    <div className="message-content">
                      <div className="message-bubble">
                        <p>{message.content}</p>
                        <span className="message-time">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      {message.read && isOwnMessage && (
                        <div className="message-status">
                          <i className="fas fa-check-double"></i>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="message-input-container">
        <div className="input-actions">
          <button type="button" className="input-action-btn" title="Attach File">
            <i className="fas fa-paperclip"></i>
          </button>
          <button type="button" className="input-action-btn" title="Add Emoji">
            <i className="fas fa-smile"></i>
          </button>
        </div>
        <div className="message-input-wrapper">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="message-input"
            rows="1"
          />
        </div>
        <button 
          type="submit" 
          className="send-button"
          disabled={!newMessage.trim() || isSending}
        >
          {isSending ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            <i className="fas fa-paper-plane"></i>
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;