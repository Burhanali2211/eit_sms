
/**
 * Database fetch utilities
 * 
 * Provides functions for fetching data from PostgreSQL database
 */

import { pgPool, shouldUseMockData } from './config';
import { toast } from '@/hooks/use-toast';

/**
 * Generic function to fetch data from the database
 * 
 * @param tableName - The database table to query
 * @param defaultValue - Fallback default value to use on error
 * @param options - Query options (select, filter, etc.)
 * @returns The data from the database
 */
export async function fetchData<T>(
  tableName: string, 
  defaultValue: T, 
  options: { 
    select?: string,
    filter?: Record<string, unknown>,
    limit?: number,
    orderBy?: { column: string, ascending?: boolean }
  } = {}
): Promise<T> {
  // First check if we should use mock data
  const useMock = await shouldUseMockData();
  if (useMock) {
    console.log(`Using mock data for ${tableName}`);
    // Import the browser fallbacks dynamically to avoid Node.js vs browser issues
    const { browserFallbackOperations } = await import('./browser-fallback');
    return browserFallbackOperations.fetchData(tableName, defaultValue, options);
  }
  
  try {
    console.log(`Fetching data from ${tableName} with options:`, options);
    
    // Build the SQL query
    let selectFields = options.select || '*';
    let query = `SELECT ${selectFields} FROM ${tableName}`;
    const queryParams: any[] = [];
    
    // Apply filters
    if (options.filter && Object.keys(options.filter).length > 0) {
      query += ' WHERE ';
      const filterClauses: string[] = [];
      
      Object.entries(options.filter).forEach(([key, value], index) => {
        filterClauses.push(`${key} = $${index + 1}`);
        queryParams.push(value);
      });
      
      query += filterClauses.join(' AND ');
    }
    
    // Apply order
    if (options.orderBy) {
      query += ` ORDER BY ${options.orderBy.column} ${options.orderBy.ascending !== false ? 'ASC' : 'DESC'}`;
    }
    
    // Apply limit
    if (options.limit) {
      query += ` LIMIT ${options.limit}`;
    }
    
    console.log('Executing SQL query:', query, queryParams);
    
    // Execute the query through API
    const result = await pgPool.query(query, queryParams);
    
    if (result && result.rows) {
      return result.rows as unknown as T;
    } else {
      console.warn('Query returned no rows or invalid result. Using default value.');
      return defaultValue;
    }
  } catch (error) {
    console.error('Error fetching data from database:', error);
    toast({
      title: 'Database Error',
      description: 'Could not fetch data from database. Check console for details.',
      variant: 'destructive',
    });
    return defaultValue;
  }
}

/**
 * Fetches data using a custom SQL query or database view
 * 
 * @param viewName - The view or SQL query to use
 * @param defaultValue - Fallback default value to use on error
 * @param params - Query parameters
 * @returns The data from the view/query
 */
export async function fetchFromView<T>(
  viewName: string, 
  defaultValue: T, 
  params: Record<string, unknown> = {}
): Promise<T> {
  // First check if we should use mock data
  const useMock = await shouldUseMockData();
  if (useMock) {
    console.log(`Using mock data for view ${viewName}`);
    // Import the browser fallbacks dynamically to avoid Node.js vs browser issues
    const { browserFallbackOperations } = await import('./browser-fallback');
    return browserFallbackOperations.fetchFromView(viewName, defaultValue, params);
  }
  
  try {
    let query = `SELECT * FROM ${viewName}`;
    const queryParams: any[] = [];
    
    // Apply parameters as WHERE conditions
    if (Object.keys(params).length > 0) {
      query += ' WHERE ';
      const paramClauses: string[] = [];
      
      Object.entries(params).forEach(([key, value], index) => {
        paramClauses.push(`${key} = $${index + 1}`);
        queryParams.push(value);
      });
      
      query += paramClauses.join(' AND ');
    }
    
    console.log('Executing SQL view query:', query, queryParams);
    
    // Execute the query through API
    const result = await pgPool.query(query, queryParams);
    
    if (result && result.rows) {
      return result.rows as unknown as T;
    } else {
      console.warn('View query returned no rows or invalid result. Using default value.');
      return defaultValue;
    }
  } catch (error) {
    console.error(`Error fetching from view ${viewName}:`, error);
    toast({
      title: 'Database Error',
      description: `Could not fetch data from view ${viewName}. Check console for details.`,
      variant: 'destructive',
    });
    return defaultValue;
  }
}
