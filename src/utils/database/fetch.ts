
/**
 * Database fetch utilities
 * 
 * Provides functions for fetching data from PostgreSQL database
 * or using mock data in browser environments
 */

import { pgPool } from './config';

/**
 * Generic function to fetch data from the database
 * In browser environment, this will return mock data or make API calls
 * 
 * @param tableName - The database table to query
 * @param mockData - Fallback mock data to use
 * @param options - Query options (select, filter, etc.)
 * @returns The data from the database or mock data
 */
export async function fetchData<T>(
  tableName: string, 
  mockData: T, 
  options: { 
    select?: string,
    filter?: Record<string, unknown>,
    limit?: number,
    orderBy?: { column: string, ascending?: boolean }
  } = {}
): Promise<T> {
  try {
    console.log(`Fetching data from ${tableName} with options:`, options);
    
    // In browser environment, we should use an API call instead of direct DB access
    // For now, return mock data and log that this would be an API call in production
    console.info(`In production, this would be an API call to fetch data from ${tableName}`);
    return mockData;
    
    // The code below is kept for reference but won't be used in browser environment
    /*
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
    
    // Execute the query
    const result = await pgPool.query(query, queryParams);
    return result.rows as unknown as T;
    */
  } catch (error) {
    console.error('Error fetching data from database:', error);
    return mockData; // Return mock data on error
  }
}

/**
 * Fetches data using a custom SQL query or database view
 * In browser environment, this will return mock data or make API calls
 * 
 * @param viewName - The view or SQL query to use
 * @param mockData - Fallback mock data to use
 * @param params - Query parameters
 * @returns The data from the view/query or mock data
 */
export async function fetchFromView<T>(
  viewName: string, 
  mockData: T, 
  params: Record<string, unknown> = {}
): Promise<T> {
  try {
    // In browser environment, we should use an API call instead of direct DB access
    // For now, return mock data and log that this would be an API call in production
    console.info(`In production, this would be an API call to fetch data from view ${viewName}`);
    return mockData;
    
    // The code below is kept for reference but won't be used in browser environment
    /*
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
    
    // Execute the query
    const result = await pgPool.query(query, queryParams);
    return result.rows as unknown as T;
    */
  } catch (error) {
    console.error(`Error fetching from view ${viewName}:`, error);
    return mockData; // Return mock data on error
  }
}
