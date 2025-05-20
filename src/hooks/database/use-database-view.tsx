
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
 * @param mockData - Mock data to use as fallback
 * @param params - Query parameters
 */
export function useDatabaseView<T>(
  viewName: string,
  mockData: T,
  params: Record<string, unknown> = {},
  revalidateInterval?: number
) {
  const [data, setData] = useState<T>(mockData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchViewData = async () => {
    setIsLoading(true);
    try {
      const result = await fetchFromView<T>(viewName, mockData, params);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      console.error(`Error fetching data from view ${viewName}:`, err);
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
