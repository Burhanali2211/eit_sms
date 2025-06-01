
import { DashboardStat } from "@/types/dashboard";

/**
 * Type guard to check if data is a valid DashboardStat
 */
export function isDashboardStat(data: any): data is DashboardStat {
  return (
    data &&
    typeof data === 'object' &&
    typeof data.title === 'string' &&
    (typeof data.value === 'string' || typeof data.value === 'number') &&
    typeof data.description === 'string'
  );
}

/**
 * Type guard to check if data is an array of DashboardStats
 */
export function isDashboardStatArray(data: any): data is DashboardStat[] {
  return Array.isArray(data) && data.every(isDashboardStat);
}

/**
 * Safely flattens and validates dashboard stats data
 */
export function flattenDashboardStats(data: any): DashboardStat[] {
  if (!data) return [];
  
  // If it's already a flat array of valid stats
  if (isDashboardStatArray(data)) {
    return data;
  }
  
  // If it's a nested array, try to flatten it
  if (Array.isArray(data)) {
    const flattened = data.flat();
    if (isDashboardStatArray(flattened)) {
      return flattened;
    }
  }
  
  // Return empty array if data doesn't match expected structure
  return [];
}
