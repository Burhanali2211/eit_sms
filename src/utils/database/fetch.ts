
/**
 * Database fetch utilities
 * 
 * Provides functions for fetching data from PostgreSQL database
 */

import { pgPool } from './config';

/**
 * Generic function to fetch data from the database
 * 
 * @param tableName - The database table to query
 * @param mockData - No longer used, kept for API compatibility
 * @param options - Query options (select, filter, etc.)
 * @returns The data from the database
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
  } catch (error) {
    console.error('Error fetching data from database:', error);
    throw error;
  }
}

/**
 * Fetches data using a custom SQL query or database view
 * 
 * @param viewName - The view or SQL query to use
 * @param mockData - No longer used, kept for API compatibility
 * @param params - Query parameters
 * @returns The data from the view/query
 */
export async function fetchFromView<T>(
  viewName: string, 
  mockData: T, 
  params: Record<string, unknown> = {}
): Promise<T> {
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
    
    // Execute the query
    const result = await pgPool.query(query, queryParams);
    return result.rows as unknown as T;
  } catch (error) {
    console.error(`Error fetching from view ${viewName}:`, error);
    throw error;
  }
}
