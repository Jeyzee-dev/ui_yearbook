import React from 'react';
import { getRelativeTime } from '../../../utils/dateFormatters';

const ConversationList = ({ conversations, activeConversation, onSelectConversation, onNewConversation }) => {
  if (conversations.length === 0) {
    return (
      <div className="conversation-list-empty">
        <div className="empty-state">
          <i className="fas fa-comments"></i>
          <h4>No Conversations</h4>
          <p>Start a conversation with fellow alumni</p>
          <button className="btn-primary" onClick={() => onNewConversation()}>
            <i className="fas fa-plus"></i>
            Start Chatting
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="conversation-list">
      {conversations.map(conversation => (
        <div
          key={conversation.id}
          className={`conversation-item ${activeConversation === conversation.id ? 'active' : ''}`}
          onClick={() => onSelectConversation(conversation.id)}
        >
          <div className="conversation-avatar">
            <img src={conversation.participantAvatar} alt={conversation.participantName} />
            {conversation.unread && <div className="unread-indicator"></div>}
          </div>
          
          <div className="conversation-content">
            <div className="conversation-header">
              <h4 className="participant-name">{conversation.participantName}</h4>
              <span className="conversation-time">
                {getRelativeTime(conversation.timestamp)}
              </span>
            </div>
            
            <div className="conversation-preview">
              <p className="last-message">
                {conversation.lastMessage || 'Start a conversation...'}
              </p>
              {conversation.unread && <span className="unread-badge">New</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;