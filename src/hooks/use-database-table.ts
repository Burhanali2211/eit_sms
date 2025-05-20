
import { useState, useEffect } from 'react';
import { pgPool } from '@/utils/database/config';
import { handleMockResponse } from '@/utils/mock';
import { toast } from '@/hooks/use-toast';

interface UseDatabaseTableOptions {
  refreshInterval?: number;
  initialData?: any[];
  mockData?: any[];
}

export function useDatabaseTable<T>(
  tableName: string, 
  options: UseDatabaseTableOptions = {}
) {
  const { refreshInterval, initialData = [], mockData = [] } = options;
  const [data, setData] = useState<T[]>(initialData.length > 0 ? initialData : mockData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // In a real environment, this would query the database
      const query = `SELECT * FROM ${tableName}`;
      const result = await pgPool.query(query);
      
      // If we got real results, use them, otherwise use mock data
      if (result.rows && result.rows.length > 0) {
        setData(result.rows as T[]);
      } else if (mockData.length > 0) {
        setData(mockData as T[]);
      } else {
        setData([] as T[]);
      }
      
      setError(null);
    } catch (err: any) {
      console.error(`Error fetching data from ${tableName}:`, err);
      setError(err);
      if (mockData.length > 0) {
        console.log(`Using mock data for ${tableName}`);
        setData(mockData as T[]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const insertItem = async (item: Partial<T>) => {
    try {
      // In a real environment, this would insert into the database
      const keys = Object.keys(item);
      const values = Object.values(item);
      const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
      
      const query = `
        INSERT INTO ${tableName} (${keys.join(', ')})
        VALUES (${placeholders})
        RETURNING *
      `;
      
      console.info(`SQL that would be executed: ${query}`, values);
      
      // Simulate successful insertion with mock data
      const newId = Math.random().toString(36).substring(2, 15);
      const newItem = { id: newId, ...item } as unknown as T;
      setData([...data, newItem]);
      
      handleMockResponse('Create', true);
      return newItem;
    } catch (err: any) {
      console.error(`Error inserting into ${tableName}:`, err);
      handleMockResponse('Create', false);
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
      
      console.info(`SQL that would be executed: ${query}`, [...values, id]);
      
      // Simulate successful update with mock data
      setData(data.map(item => {
        const itemId = (item as any).id;
        return itemId === id ? { ...item, ...changes } : item;
      }));
      
      handleMockResponse('Update', true);
      return { id, ...changes };
    } catch (err: any) {
      console.error(`Error updating in ${tableName}:`, err);
      handleMockResponse('Update', false);
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
      
      console.info(`SQL that would be executed: ${query}`, [id]);
      
      // Simulate successful deletion with mock data
      setData(data.filter(item => (item as any).id !== id));
      
      handleMockResponse('Delete', true);
      return { id };
    } catch (err: any) {
      console.error(`Error deleting from ${tableName}:`, err);
      handleMockResponse('Delete', false);
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
    
    // Set up refresh interval if provided
    if (refreshInterval && refreshInterval > 0) {
      const intervalId = setInterval(fetchData, refreshInterval);
      return () => clearInterval(intervalId);
    }
  }, [refreshInterval]);

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
  mockData: T[] = [],
  params: Record<string, any> = {},
  refreshInterval?: number
) {
  const [data, setData] = useState<T[]>(mockData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

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
      
      console.info(`SQL that would be executed: ${query}`, paramValues);
      
      // Use mock data since we're in browser environment
      setData(mockData as T[]);
      setError(null);
    } catch (err: any) {
      console.error(`Error fetching data from view ${viewName}:`, err);
      setError(err);
      // Fall back to mock data
      setData(mockData);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    if (refreshInterval && refreshInterval > 0) {
      const intervalId = setInterval(fetchData, refreshInterval);
      return () => clearInterval(intervalId);
    }
  }, [JSON.stringify(params), refreshInterval]);

  return { data, isLoading, error, refresh: fetchData };
}
