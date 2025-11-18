import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockAlumniData, mockNotifications, mockEvents, mockNews } from '../data/mockAlumniData';

const AlumniContext = createContext();

export const AlumniProvider = ({ children }) => {
  const [currentAlumni, setCurrentAlumni] = useState(null);
  const [alumniList, setAlumniList] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to load data
    const loadData = async () => {
      setLoading(true);
      try {
        // Set current user (in real app, this would come from authentication)
        setCurrentAlumni(mockAlumniData[0]);
        setAlumniList(mockAlumniData);
        setNotifications(mockNotifications);
        setEvents(mockEvents);
        setNews(mockNews);
        
        // Initialize empty conversations
        setConversations([]);
        setMessages([]);
      } catch (error) {
        console.error('Error loading alumni data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, unread: false } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, unread: false })));
  };

  const addMessage = (conversationId, newMessage) => {
    setMessages(prev => [...prev, { ...newMessage, conversationId }]);
    
    // Update conversation last message
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, lastMessage: newMessage.content, timestamp: newMessage.timestamp }
          : conv
      )
    );
  };

  const updateProfile = (updatedData) => {
    setCurrentAlumni(prev => ({ ...prev, ...updatedData }));
    // Also update in alumni list
    setAlumniList(prev =>
      prev.map(alum =>
        alum.id === currentAlumni.id ? { ...alum, ...updatedData } : alum
      )
    );
  };

  const startConversation = (alumniId) => {
    const alumni = alumniList.find(a => a.id === alumniId);
    const existingConv = conversations.find(c => c.participantId === alumniId);
    
    if (existingConv) return existingConv.id;

    const newConversation = {
      id: `conv_${Date.now()}`,
      participantId: alumniId,
      participantName: alumni.fullName,
      participantAvatar: alumni.profilePicture,
      lastMessage: '',
      timestamp: new Date().toISOString(),
      unread: false
    };

    setConversations(prev => [newConversation, ...prev]);
    return newConversation.id;
  };

  const value = {
    currentAlumni,
    setCurrentAlumni,
    alumniList,
    setAlumniList,
    notifications,
    setNotifications,
    messages,
    setMessages,
    events,
    setEvents,
    news,
    setNews,
    conversations,
    setConversations,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addMessage,
    updateProfile,
    startConversation,
    loading
  };

  return (
    <AlumniContext.Provider value={value}>
      {children}
    </AlumniContext.Provider>
  );
};

export const useAlumni = () => {
  const context = useContext(AlumniContext);
  if (!context) {
    throw new Error('useAlumni must be used within an AlumniProvider');
  }
  return context;
};

export { AlumniContext };
export default AlumniContext;