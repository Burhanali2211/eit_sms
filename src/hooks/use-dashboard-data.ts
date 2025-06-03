
import { useState, useEffect } from 'react';
import { apiClient } from '@/utils/api/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface DashboardStat {
  metric: string;
  value: number;
  label: string;
  description: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  is_read: boolean;
  created_at: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  event_type: string;
}

export function useDashboardData() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      // Fetch dashboard stats
      const statsResponse = await apiClient.getDashboardStats(user.role, user.id);
      if (statsResponse.error) {
        throw new Error(statsResponse.error);
      }
      setStats(statsResponse.data || []);

      // Fetch notifications
      const notificationsResponse = await apiClient.getNotifications(user.id);
      if (notificationsResponse.error) {
        throw new Error(notificationsResponse.error);
      }
      setNotifications(notificationsResponse.data || []);

      // Fetch events
      const eventsResponse = await apiClient.getEvents(user.id);
      if (eventsResponse.error) {
        throw new Error(eventsResponse.error);
      }
      setEvents(eventsResponse.data || []);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dashboard data';
      setError(errorMessage);
      console.error('Dashboard data fetch error:', err);
      
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data. Using fallback data.',
        variant: 'destructive',
      });

      // Set fallback data
      setStats([
        { metric: 'total', value: 0, label: 'Loading...', description: 'Data will load shortly' }
      ]);
      setNotifications([]);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      const response = await apiClient.markNotificationRead(notificationId);
      if (response.error) {
        throw new Error(response.error);
      }
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, is_read: true }
            : notification
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
      toast({
        title: 'Error',
        description: 'Failed to mark notification as read',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user?.id, user?.role]);

  return {
    stats,
    notifications,
    events,
    isLoading,
    error,
    refetch: fetchDashboardData,
    markNotificationAsRead
  };
}
