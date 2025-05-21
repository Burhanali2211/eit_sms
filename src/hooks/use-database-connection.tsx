
import { useDatabaseQuery } from "./database/use-database-query";
import { useDatabaseViewQuery } from "./database/use-database-view-query";
import { useDatabaseOperations } from "./database/use-database-operations";
import { DB_CONFIG } from '@/utils/db-connection';

/**
 * Hook for interacting with a database table
 * Provides query, create, update, delete functionality
 */
export function useDatabaseTable<T>(
  tableName: string,
  options: {
    refreshInterval?: number;
    initialData?: any[];
    filter?: Record<string, unknown>;
  } = {}
) {
  // Get query functionality
  const { 
    data, 
    isLoading, 
    error, 
    refresh
  } = useDatabaseQuery<T>(tableName, options);
  
  // Get CRUD operations
  const {
    insert,
    update,
    delete: remove,
    isProcessing
  } = useDatabaseOperations<T>(tableName);
  
  return {
    // Data and state
    data,
    isLoading: isLoading || isProcessing,
    error,
    
    // Operations
    create: insert,
    update,
    remove,
    refresh,
    
    // Configuration
    tableName,
    config: DB_CONFIG
  };
}

/**
 * Hook for interacting with a database view
 */
export function useDatabaseView<T>(
  viewName: string, 
  params: Record<string, any> = {},
  options = {},
  refreshInterval?: number
) {
  // Use the view query hook
  const { 
    data, 
    isLoading, 
    error,
    refresh
  } = useDatabaseViewQuery<T>(viewName, params, refreshInterval);
  
  return {
    data,
    isLoading,
    error,
    refresh,
    viewName,
    config: DB_CONFIG
  };
}
