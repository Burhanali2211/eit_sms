
import { useState, useEffect } from 'react';
import { pgPool } from '@/utils/database/config';
import { checkDatabaseConnection } from '@/utils/db-connection';

/**
 * Hook for querying data from a database view
 */
export function useDatabaseViewQuery<T>(
  viewName: string,
  params: Record<string, any> = {},
  refreshInterval?: number
) {
  const [data, setData] = useState<T | null>(null);
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
      // Build the WHERE clause from params
      const whereConditions = Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, _], index) => `${key} = $${index + 1}`)
        .join(' AND ');
      
      const whereClause = whereConditions ? `WHERE ${whereConditions}` : '';
      const query = `SELECT * FROM ${viewName} ${whereClause}`;
      const paramValues = Object.values(params).filter(v => v !== undefined);
      
      console.log('Executing SQL view query:', query, paramValues);
      
      const result = await pgPool.query(query, paramValues);
      
      if (result && result.rows) {
        // Return the raw rows data, let the consumer handle the structure
        setData(result.rows as T);
      } else {
        setData(null);
      }
      
      setError(null);
    } catch (err: any) {
      console.error(`Error fetching data from view ${viewName}:`, err);
      setError(err);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      fetchData();
      
      if (refreshInterval && refreshInterval > 0) {
        const intervalId = setInterval(fetchData, refreshInterval);
        return () => clearInterval(intervalId);
      }
    } else if (isConnected === false) {
      // Database not connected, stop loading
      setIsLoading(false);
      setData(null);
    }
  }, [JSON.stringify(params), refreshInterval, isConnected]);

  return { data, isLoading, error, refresh: fetchData };
}
