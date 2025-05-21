
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
  const [data, setData] = useState<T[]>([]);
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
        setData(result.rows as T[]);
      } else {
        setData([] as T[]);
      }
      
      setError(null);
    } catch (err: any) {
      console.error(`Error fetching data from view ${viewName}:`, err);
      setError(err);
      setData([] as T[]);
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
    }
  }, [JSON.stringify(params), refreshInterval, isConnected]);

  return { data, isLoading, error, refresh: fetchData };
}
