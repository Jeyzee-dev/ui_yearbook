// src/hooks/useMessaging.js
import { useState, useCallback } from 'react';
import { useAlumni } from '../contexts/AlumniContext';

export const useMessaging = () => {
  const { messages, conversations, addMessage, startConversation, currentAlumni } = useAlumni();
  const [activeConversation, setActiveConversation] = useState(null);

  // Mock data for development
  const mockConversations = [
    {
      id: 'conv_1',
      participantId: '2',
      participantName: 'Juan Dela Cruz',
      participantAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Hi there! How are you?',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      unread: false
    },
    {
      id: 'conv_2',
      participantId: '3',
      participantName: 'Ana Reyes',
      participantAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Are you coming to the alumni event?',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      unread: true
    }
  ];

  const mockMessages = [
    {
      id: 'msg_1',
      conversationId: 'conv_1',
      senderId: '2',
      content: 'Hi there! How are you?',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      read: true
    },
    {
      id: 'msg_2',
      conversationId: 'conv_1',
      senderId: '1',
      content: 'I\'m doing great! How about you?',
      timestamp: new Date(Date.now() - 240000).toISOString(),
      read: true
    }
  ];

  const sendMessage = useCallback((conversationId, content) => {
    if (!content.trim()) return;

    const newMessage = {
      id: `msg_${Date.now()}`,
      conversationId,
      senderId: currentAlumni?.id,
      content: content.trim(),
      timestamp: new Date().toISOString(),
      read: false
    };

    addMessage(conversationId, newMessage);
    return newMessage;
  }, [addMessage, currentAlumni]);

  const getConversationMessages = useCallback((conversationId) => {
    return mockMessages
      .filter(msg => msg.conversationId === conversationId)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }, []);

  const startNewConversation = useCallback((alumniId) => {
    const conversationId = `conv_${Date.now()}`;
    setActiveConversation(conversationId);
    return conversationId;
  }, []);

  return {
    conversations: mockConversations,
    activeConversation,
    setActiveConversation,
    sendMessage,
    getConversationMessages,
    startNewConversation,
    messages: mockMessages
  };
};