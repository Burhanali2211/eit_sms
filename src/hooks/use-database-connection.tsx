
import { useState, useEffect } from 'react';
import { fetchData, fetchFromView, insertData, updateData, deleteData } from '@/utils/db-connection';
import { toast } from '@/hooks/use-toast';

/**
 * Custom hook to interact with the database for a specific entity type
 * Handles data fetching, loading state, errors, and CRUD operations
 * 
 * @param tableName - The database table to interact with
 * @param mockData - Mock data to use as fallback
 * @param options - Query options (select, filter, etc.)
 */
export function useDatabaseTable<T extends { id: string }>(
  tableName: string,
  mockData: T[],
  options: {
    select?: string,
    filter?: Record<string, unknown>,
    limit?: number,
    orderBy?: { column: string, ascending?: boolean },
    revalidateInterval?: number // ms between auto-refresh
  } = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Function to fetch data
  const fetchTableData = async () => {
    setIsLoading(true);
    try {
      const result = await fetchData<T[]>(tableName, mockData, options);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      console.error(`Error fetching data from ${tableName}:`, err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch on mount and when dependencies change
  useEffect(() => {
    fetchTableData();
    
    // Set up auto-refresh interval if specified
    if (options.revalidateInterval) {
      const interval = setInterval(fetchTableData, options.revalidateInterval);
      return () => clearInterval(interval);
    }
  }, [tableName, JSON.stringify(options.filter), options.limit, options.select, options.orderBy?.column, options.orderBy?.ascending]);
  
  // Create operation
  const create = async (item: Omit<T, 'id'>) => {
    try {
      const result = await insertData<T>(tableName, item as any);
      if (result) {
        setData(prev => [...prev, result]);
        toast({
          title: 'Success',
          description: 'Record created successfully',
          variant: 'default',
        });
        return result;
      }
      throw new Error('Failed to create record');
    } catch (err) {
      console.error('Error creating record:', err);
      toast({
        title: 'Error',
        description: 'Failed to create record',
        variant: 'destructive',
      });
      throw err;
    }
  };
  
  // Update operation
  const update = async (id: string, updates: Partial<T>) => {
    try {
      const result = await updateData<T>(tableName, id, updates);
      if (result) {
        setData(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
        toast({
          title: 'Success',
          description: 'Record updated successfully',
          variant: 'default',
        });
        return result;
      }
      throw new Error('Failed to update record');
    } catch (err) {
      console.error('Error updating record:', err);
      toast({
        title: 'Error',
        description: 'Failed to update record',
        variant: 'destructive',
      });
      throw err;
    }
  };
  
  // Delete operation
  const remove = async (id: string) => {
    try {
      const success = await deleteData(tableName, id);
      if (success) {
        setData(prev => prev.filter(item => item.id !== id));
        toast({
          title: 'Success',
          description: 'Record deleted successfully',
          variant: 'default',
        });
        return true;
      }
      throw new Error('Failed to delete record');
    } catch (err) {
      console.error('Error deleting record:', err);
      toast({
        title: 'Error',
        description: 'Failed to delete record',
        variant: 'destructive',
      });
      throw err;
    }
  };
  
  // Refresh data
  const refresh = () => {
    fetchTableData();
  };
  
  return {
    data,
    isLoading,
    error,
    create,
    update,
    remove,
    refresh
  };
}

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
