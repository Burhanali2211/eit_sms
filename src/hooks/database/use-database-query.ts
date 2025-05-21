
import { useState, useEffect } from 'react';
import { pgPool } from '@/utils/database/config';
import { checkDatabaseConnection } from '@/utils/db-connection';

interface UseDatabaseQueryOptions {
  filter?: Record<string, unknown>;
  refreshInterval?: number;
  initialData?: any[];
}

/**
 * Hook for querying data from a database table
 */
export function useDatabaseQuery<T>(
  tableName: string,
  options: UseDatabaseQueryOptions = {}
) {
  const { filter = {}, refreshInterval, initialData = [] } = options;
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  // Check database connection first
  useEffect(() => {
    const checkConnection = async () => {
      const connected = await checkDatabaseConnection();
      setIsConnected(connected);
    };
    checkConnection();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Build the SQL query with filters if provided
      let query = `SELECT * FROM ${tableName}`;
      const queryParams: any[] = [];
      
      // Apply filters
      if (filter && Object.keys(filter).length > 0) {
        query += ' WHERE ';
        const filterClauses: string[] = [];
        
        Object.entries(filter).forEach(([key, value], index) => {
          filterClauses.push(`${key} = $${index + 1}`);
          queryParams.push(value);
        });
        
        query += filterClauses.join(' AND ');
      }
      
      console.log('Executing SQL query:', query, queryParams);
      
      // Query the database
      const result = await pgPool.query(query, queryParams);
      
      if (result && result.rows) {
        setData(result.rows as T[]);
      } else {
        setData([] as T[]);
      }
      
      setError(null);
    } catch (err: any) {
      console.error(`Error fetching data from ${tableName}:`, err);
      setError(err);
      setData([] as T[]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      fetchData();
      
      // Set up refresh interval if provided
      if (refreshInterval && refreshInterval > 0) {
        const intervalId = setInterval(fetchData, refreshInterval);
        return () => clearInterval(intervalId);
      }
    }
  }, [refreshInterval, isConnected, JSON.stringify(filter)]); // Add filter as a dependency

  return { 
    data, 
    isLoading, 
    error, 
    refresh: fetchData
  };
}
