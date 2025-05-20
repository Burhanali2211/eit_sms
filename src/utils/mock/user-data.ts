
/**
 * User-related mock data
 */

import { Notification, CalendarEvent } from "@/types/dashboard";
import { fetchData } from '../database';
import { shouldUseMockData } from '../database';

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Assignment Posted',
    message: 'Mathematics: Algebra Assignment 3 has been posted.',
    time: '2 hours ago',
    read: false
  },
  {
    id: '2',
    title: 'Upcoming Exam',
    message: 'Reminder: Science exam scheduled for next Monday.',
    time: 'Yesterday',
    read: true
  },
  {
    id: '3',
    title: 'Holiday Announcement',
    message: 'School will be closed on May 15th for Staff Development Day.',
    time: '3 days ago',
    read: false
  },
  {
    id: '4',
    title: 'Parent-Teacher Meeting',
    message: 'Parent-teacher conferences scheduled for next week.',
    time: '1 week ago',
    read: true
  },
  {
    id: '5',
    title: 'Library Books Due',
    message: 'Please return your borrowed library books by Friday.',
    time: '1 week ago',
    read: true
  }
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Math Quiz',
    date: 'May 12, 2025',
    time: '10:00 AM'
  },
  {
    id: '2',
    title: 'Science Project Due',
    date: 'May 14, 2025',
    time: '3:00 PM'
  },
  {
    id: '3',
    title: 'School Assembly',
    date: 'May 15, 2025',
    time: '9:00 AM'
  },
  {
    id: '4',
    title: 'Sports Day',
    date: 'May 20, 2025',
    time: '8:00 AM'
  },
  {
    id: '5',
    title: 'Career Counseling',
    date: 'May 22, 2025',
    time: '2:00 PM'
  }
];

// Function to fetch user preferences from database or return defaults
export const getUserPreferences = async (userId: string) => {
  const defaultPreferences = {
    theme: 'system',
    notificationsEnabled: true,
    emailNotifications: true,
    displayMode: 'default'
  };
  
  if (shouldUseMockData()) {
    return defaultPreferences;
  }
  
  try {
    const preferences = await fetchData('user_preferences', defaultPreferences, {
      filter: { user_id: userId }
    });
    
    return {
      theme: preferences.theme || 'system',
      notificationsEnabled: preferences.notificationsEnabled || true,
      emailNotifications: preferences.emailNotifications || true,
      displayMode: preferences.displayMode || 'default'
    };
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return defaultPreferences;
  }
};

// Function to fetch system configuration
export const getSystemConfig = async () => {
  const defaultConfig = {
    siteName: 'EduSync School Management',
    primaryColor: '#3b82f6',
    secondaryColor: '#10b981',
    enableNotifications: true,
    maxFileUploadSize: 10,
    schoolContact: {
      phone: '555-123-4567',
      email: 'contact@edusync.example.com',
      address: '123 Education St, Learning City, 12345'
    }
  };
  
  if (shouldUseMockData()) {
    return defaultConfig;
  }
  
  try {
    const configData = await fetchData('system_configuration', [], {});
    
    if (!Array.isArray(configData) || configData.length === 0) {
      return defaultConfig;
    }
    
    // Transform array of key-value pairs to object
    const config = configData.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
    
    return {
      siteName: config.site_name || defaultConfig.siteName,
      primaryColor: config.theme_primary_color || defaultConfig.primaryColor,
      secondaryColor: config.theme_secondary_color || defaultConfig.secondaryColor,
      enableNotifications: config.enable_notifications === 'true',
      maxFileUploadSize: parseInt(config.max_file_upload_size || '10'),
      schoolContact: {
        phone: config.school_phone || defaultConfig.schoolContact.phone,
        email: config.school_email || defaultConfig.schoolContact.email,
        address: config.school_address || defaultConfig.schoolContact.address
      }
    };
  } catch (error) {
    console.error('Error fetching system configuration:', error);
    return defaultConfig;
  }
};
