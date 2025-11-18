import { useCallback } from 'react';
import { useAlumni } from '../contexts/AlumniContext';

export const useNotifications = () => {
  const { notifications, markAsRead, markAllAsRead } = useAlumni();

  const getRecentNotifications = useCallback((limit = 5) => {
    return notifications
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }, [notifications]);

  const getUnreadNotifications = useCallback(() => {
    return notifications.filter(notif => notif.unread);
  }, [notifications]);

  const addNotification = useCallback((notification) => {
    // This would typically be handled by the context
    // For now, we'll just log it
    console.log('New notification:', notification);
  }, []);

  return {
    notifications,
    getRecentNotifications,
    getUnreadNotifications,
    markAsRead,
    markAllAsRead,
    addNotification
  };
};