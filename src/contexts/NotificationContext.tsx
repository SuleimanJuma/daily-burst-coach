import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'lesson' | 'streak' | 'subscription' | 'system' | 'achievement';
  read: boolean;
  timestamp: Date;
  actionUrl?: string;
  icon?: string;
  priority?: 'low' | 'medium' | 'high';
}

interface NotificationPreferences {
  whatsappNotifications: boolean;
  pushNotifications: boolean;
  emailNotifications: boolean;
  deliveryTime: string;
  frequency: 'daily' | 'weekdays' | 'weekly';
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  preferences: NotificationPreferences;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearOldNotifications: (days: number) => void;
  updatePreferences: (preferences: Partial<NotificationPreferences>) => void;
  showNotificationDropdown: boolean;
  setShowNotificationDropdown: (show: boolean) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: '🎉 New lesson sent!',
      message: "Lesson 'Present Simple' has been sent to 247 students at 8:00 AM",
      type: 'lesson',
      read: false,
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      actionUrl: '/lessons/present-simple',
      priority: 'medium'
    },
    {
      id: '2',
      title: '🌟 Streak milestone reached!',
      message: "You've maintained a 5-day teaching streak! Keep it up!",
      type: 'streak',
      read: false,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      priority: 'high'
    },
    {
      id: '3',
      title: '💳 Subscription reminder',
      message: 'Your subscription renews in 3 days',
      type: 'subscription',
      read: true,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      actionUrl: '/settings/billing',
      priority: 'medium'
    }
  ]);

  const [preferences, setPreferences] = useState<NotificationPreferences>({
    whatsappNotifications: true,
    pushNotifications: true,
    emailNotifications: false,
    deliveryTime: '08:00',
    frequency: 'daily',
    soundEnabled: true,
    vibrationEnabled: true
  });

  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Play sound if enabled
    if (preferences.soundEnabled) {
      playNotificationSound();
    }

    // Show browser notification if supported and enabled
    if (preferences.pushNotifications && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico'
      });
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearOldNotifications = (days: number) => {
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    setNotifications(prev =>
      prev.filter(notification => notification.timestamp > cutoffDate)
    );
  };

  const updatePreferences = (newPreferences: Partial<NotificationPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  const playNotificationSound = () => {
    try {
      const audio = new Audio('/notification-sound.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Fallback for browsers that don't allow autoplay
        console.log('Could not play notification sound');
      });
    } catch (error) {
      console.log('Notification sound not available');
    }
  };

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Demo notifications disabled
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (Math.random() > 0.95) { // 5% chance every minute
  //       const lessonTitles = ['Grammar Basics', 'Conversation Skills', 'Business English', 'Digital Marketing'];
  //       const randomTitle = lessonTitles[Math.floor(Math.random() * lessonTitles.length)];
  //       
  //       addNotification({
  //         title: '📚 New lesson available!',
  //         message: `"${randomTitle}" is ready for your students`,
  //         type: 'lesson',
  //         priority: 'medium'
  //       });
  //     }
  //   }, 60000); // Check every minute
  //
  //   return () => clearInterval(interval);
  // }, []);

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    preferences,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearOldNotifications,
    updatePreferences,
    showNotificationDropdown,
    setShowNotificationDropdown
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
