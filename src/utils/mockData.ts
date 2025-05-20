
/**
 * Mock data utility
 * 
 * This file provides mock data structures for use when database connection is unavailable
 */

// Re-export mock data structures
export * from './mock';

// Import specific mock data
import { mockCalendarEvents as calendarEvents } from './mock/calendar-data';

// Export for components to use
export const mockCalendarEvents = calendarEvents;

// Empty dashboard stats
export const getRoleDashboardStats = (role: string) => {
  return [];
};

// Empty notifications
export const mockNotifications = [];

// Mock financial records for Finance component
export const mockFinancialRecords = [];

// Mock students data for Classes component
export const mockStudents = [];
