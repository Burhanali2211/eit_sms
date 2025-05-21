
/**
 * Legacy mock data utility
 * 
 * This file now redirects to database connection utilities.
 * It's kept for backward compatibility with components that 
 * still import from this path.
 * 
 * New components should use database hooks directly.
 */

// Re-export database utilities
export * from './database';

// Import and re-export database functions and shouldUseMockData
import {
  fetchData,
  fetchFromView,
  insertData,
  updateData,
  deleteData
} from './database';
import { shouldUseMockData } from './db-connection';

// Export for components to use
export {
  fetchData,
  fetchFromView,
  insertData,
  updateData,
  deleteData,
  shouldUseMockData
};

// For backward compatibility, export empty arrays
export const mockCalendarEvents: any[] = [];
export const mockFinancialRecords: any[] = [];
export const mockNotifications: any[] = [];
export const mockStudents: any[] = [];

export function getRoleDashboardStats(role: string) {
  console.warn('getRoleDashboardStats is deprecated. Use useDatabaseView with dashboard_stats instead');
  return [];
}
