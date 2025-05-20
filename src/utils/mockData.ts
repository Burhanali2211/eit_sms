
/**
 * Mock data utility
 * 
 * This file provides mock data structures for use when database connection is unavailable
 */

// Re-export empty data structures
export * from './mock';

// Empty dashboard stats
export const getRoleDashboardStats = (role: string) => {
  return [];
};

// Empty events and notifications
export const mockCalendarEvents = [];
export const mockNotifications = [];

// Mock financial records for Finance component
export const mockFinancialRecords = [];

// Mock students data for Classes component
export const mockStudents = [];
