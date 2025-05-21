
/**
 * Legacy database table hook
 * 
 * This file is kept for backward compatibility with components 
 * that still use it. It's recommended to use the newer
 * database hooks from hooks/database/ instead.
 */

import { useState, useEffect } from 'react';
import { pgPool } from '@/utils/database/config';
import { toast } from '@/hooks/use-toast';
import { checkDatabaseConnection } from '@/utils/db-connection';

interface UseDatabaseTableOptions {
  refreshInterval?: number;
  initialData?: any[];
  filter?: Record<string, unknown>;
}

export function useDatabaseTable<T>(
  tableName: string, 
  options: UseDatabaseTableOptions = {}
) {
  const { refreshInterval, initialData = [], filter = {} } = options;
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

  const insertItem = async (item: Partial<T>) => {
    try {
      const keys = Object.keys(item);
      const values = Object.values(item);
      const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
      
      const query = `
        INSERT INTO ${tableName} (${keys.join(', ')})
        VALUES (${placeholders})
        RETURNING *
      `;
      
      console.log('Executing SQL insert:', query, values);
      
      const result = await pgPool.query(query, values);
      
      if (result && result.rows && result.rows.length > 0) {
        const newItem = result.rows[0] as T;
        setData([...data, newItem]);
        
        toast({
          title: 'Success',
          description: `Record added to ${tableName}`,
        });
        return newItem;
      } else {
        throw new Error('Insert operation did not return data');
      }
    } catch (err: any) {
      console.error(`Error inserting into ${tableName}:`, err);
      toast({
        title: 'Error',
        description: 'Failed to add record',
        variant: 'destructive',
      });
      throw err;
    }
  };

  const updateItem = async (id: string | number, changes: Partial<T>) => {
    try {
      const keys = Object.keys(changes);
      const values = Object.values(changes);
      const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
      
      const query = `
        UPDATE ${tableName}
        SET ${setClause}
        WHERE id = $${values.length + 1}
        RETURNING *
      `;
      
      console.log('Executing SQL update:', query, [...values, id]);
      
      const result = await pgPool.query(query, [...values, id]);
      
      if (result && result.rows && result.rows.length > 0) {
        const updatedItem = result.rows[0] as T;
        setData(data.map(item => {
          const itemId = (item as any).id;
          return itemId === id ? updatedItem : item;
        }));
        
        toast({
          title: 'Success',
          description: 'Record updated successfully',
        });
        return updatedItem;
      } else {
        throw new Error('Update operation did not return data');
      }
    } catch (err: any) {
      console.error(`Error updating in ${tableName}:`, err);
      toast({
        title: 'Error',
        description: 'Failed to update record',
        variant: 'destructive',
      });
      throw err;
    }
  };

  const deleteItem = async (id: string | number) => {
    try {
      const query = `
        DELETE FROM ${tableName}
        WHERE id = $1
        RETURNING id
      `;
      
      console.log('Executing SQL delete:', query, [id]);
      
      const result = await pgPool.query(query, [id]);
      
      if (result && result.rows && result.rows.length > 0) {
        setData(data.filter(item => (item as any).id !== id));
        
        toast({
          title: 'Success',
          description: 'Record deleted successfully',
        });
        return { id };
      } else {
        throw new Error('No record found to delete');
      }
    } catch (err: any) {
      console.error(`Error deleting from ${tableName}:`, err);
      toast({
        title: 'Error',
        description: 'Failed to delete record',
        variant: 'destructive',
      });
      throw err;
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
    refresh: fetchData,
    insert: insertItem,
    update: updateItem,
    delete: deleteItem
  };
}

export function useDatabaseView<T>(
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
