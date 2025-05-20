/**
 * Hook for interacting with database views
 */

import { useState, useEffect } from 'react';
import { fetchFromView } from '@/utils/database';

/**
 * Custom hook to interact with a database view
 * Similar to useDatabaseTable but read-only (no CRUD operations)
 * 
 * @param viewName - The database view to query
 * @param defaultValue - Default value to use initially and during errors
 * @param params - Query parameters
 */
export function useDatabaseView<T>(
  viewName: string,
  defaultValue: T,
  params: Record<string, unknown> = {},
  revalidateInterval?: number
) {
  const [data, setData] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchViewData = async () => {
    setIsLoading(true);
    try {
      const result = await fetchFromView<T>(viewName, defaultValue, params);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      console.error(`Error fetching data from view ${viewName}:`, err);
      // In case of error, keep using the default value
      setData(defaultValue);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch on mount and when dependencies change
  useEffect(() => {
    fetchViewData();
    
    // Set up auto-refresh interval if specified
    if (revalidateInterval) {
      const interval = setInterval(fetchViewData, revalidateInterval);
      return () => clearInterval(interval);
    }
  }, [viewName, JSON.stringify(params)]);
  
  // Refresh data
  const refresh = () => {
    fetchViewData();
  };
  
  return {
    data,
    isLoading,
    error,
    refresh
  };
}
