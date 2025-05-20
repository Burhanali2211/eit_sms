
/**
 * Mock data utility
 * 
 * This file provides mock data structures for use when database connection is unavailable
 */

// Re-export mock data structures
export * from './mock';

// Import specific mock data
import { mockCalendarEvents, getRoleDashboardStats, mockNotifications, mockFinancialRecords, mockStudents } from './mock';

// Export for components to use
export { 
  mockCalendarEvents, 
  getRoleDashboardStats, 
  mockNotifications,
  mockFinancialRecords,
  mockStudents
};

