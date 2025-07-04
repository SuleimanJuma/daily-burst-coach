import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useNotifications } from '@/contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Settings,
  CheckCheck,
  Trash2,
  ExternalLink,
  BookOpen,
  Award,
  CreditCard,
  AlertTriangle,
  Trophy
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

export const NotificationBell: React.FC = () => {
  const {
    notifications,
    unreadCount,
    showNotificationDropdown,
    setShowNotificationDropdown,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearOldNotifications
  } = useNotifications();
  
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowNotificationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowNotificationDropdown]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'lesson':
        return <BookOpen className="w-4 h-4 text-learning" />;
      case 'streak':
      case 'achievement':
        return <Award className="w-4 h-4 text-streak" />;
      case 'subscription':
        return <CreditCard className="w-4 h-4 text-whatsapp" />;
      case 'system':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
      setShowNotificationDropdown(false);
    }
  };

  const handleToggleDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  const groupNotificationsByDate = () => {
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    
    const groups = {
      today: [] as any[],
      yesterday: [] as any[],
      earlier: [] as any[]
    };

    notifications.forEach(notification => {
      const notificationDate = new Date(notification.timestamp);
      if (notificationDate.toDateString() === today.toDateString()) {
        groups.today.push(notification);
      } else if (notificationDate.toDateString() === yesterday.toDateString()) {
        groups.yesterday.push(notification);
      } else {
        groups.earlier.push(notification);
      }
    });

    return groups;
  };

  const groupedNotifications = groupNotificationsByDate();

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="outline"
        size="default"
        onClick={handleToggleDropdown}
        className={cn(
          "relative transition-all duration-200",
          showNotificationDropdown && "bg-accent",
          unreadCount > 0 && "animate-pulse"
        )}
      >
        <Bell className={cn(
          "w-4 h-4 transition-transform duration-200",
          unreadCount > 0 && "animate-bounce"
        )} />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs animate-pulse">
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        )}
      </Button>

      {showNotificationDropdown && (
        <Card
          ref={dropdownRef}
          className="absolute right-0 top-full mt-2 w-96 max-h-[600px] shadow-lg border z-50 bg-background"
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/settings')}
                  className="h-8 w-8 p-0"
                >
                  <Settings className="w-4 h-4" />
                </Button>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="h-8 px-2 text-xs"
                  >
                    <CheckCheck className="w-3 h-3 mr-1" />
                    Mark all read
                  </Button>
                )}
              </div>
            </div>
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground">
                You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </CardHeader>

          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Bell className="w-12 h-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">No notifications yet</p>
                  <p className="text-sm text-muted-foreground/70">
                    You'll see updates about lessons, streaks, and more here
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {/* Today */}
                  {groupedNotifications.today.length > 0 && (
                    <div>
                      <div className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider bg-muted/50">
                        Today
                      </div>
                      {groupedNotifications.today.map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            "px-4 py-3 border-l-4 cursor-pointer transition-colors hover:bg-accent/50",
                            !notification.read && "bg-accent/20",
                            getPriorityColor(notification.priority)
                          )}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className={cn(
                                  "text-sm font-medium truncate",
                                  !notification.read && "font-semibold"
                                )}>
                                  {notification.title}
                                </p>
                                <div className="flex items-center gap-1 ml-2">
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeNotification(notification.id);
                                    }}
                                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-muted-foreground">
                                  {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                                </span>
                                {notification.actionUrl && (
                                  <ExternalLink className="w-3 h-3 text-muted-foreground" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Yesterday */}
                  {groupedNotifications.yesterday.length > 0 && (
                    <div>
                      <div className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider bg-muted/50">
                        Yesterday
                      </div>
                      {groupedNotifications.yesterday.map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            "px-4 py-3 border-l-4 cursor-pointer transition-colors hover:bg-accent/50",
                            !notification.read && "bg-accent/20",
                            getPriorityColor(notification.priority)
                          )}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className={cn(
                                  "text-sm font-medium truncate",
                                  !notification.read && "font-semibold"
                                )}>
                                  {notification.title}
                                </p>
                                <div className="flex items-center gap-1 ml-2">
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                  )}
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-muted-foreground">
                                  {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                                </span>
                                {notification.actionUrl && (
                                  <ExternalLink className="w-3 h-3 text-muted-foreground" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Earlier */}
                  {groupedNotifications.earlier.length > 0 && (
                    <div>
                      <div className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider bg-muted/50">
                        Earlier
                      </div>
                      {groupedNotifications.earlier.map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            "px-4 py-3 border-l-4 cursor-pointer transition-colors hover:bg-accent/50",
                            !notification.read && "bg-accent/20",
                            getPriorityColor(notification.priority)
                          )}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className={cn(
                                  "text-sm font-medium truncate",
                                  !notification.read && "font-semibold"
                                )}>
                                  {notification.title}
                                </p>
                                <div className="flex items-center gap-1 ml-2">
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                  )}
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-muted-foreground">
                                  {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                                </span>
                                {notification.actionUrl && (
                                  <ExternalLink className="w-3 h-3 text-muted-foreground" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>

            {notifications.length > 0 && (
              <>
                <Separator />
                <div className="p-4 space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => clearOldNotifications(7)}
                    className="w-full justify-center"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear notifications older than 7 days
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
