
/**
 * Mock data utility
 * 
 * This file now serves as a compatibility layer that provides empty data
 * with the correct types when database connection fails
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
