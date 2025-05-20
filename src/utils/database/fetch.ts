/**
 * Database fetch utilities
 * 
 * Provides functions for fetching data from the database
 */

import { supabase, shouldUseMockData } from './config';

/**
 * Generic function to fetch data from the database
 * Falls back to mock data if database connection fails or mock mode is enabled
 * 
 * @param tableName - The database table to query
 * @param mockData - Mock data to return if using mock mode
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
  // If using mock data, return the mock data
  if (shouldUseMockData()) {
    console.log(`Using mock data for ${tableName}`);
    return mockData;
  }

  // Otherwise, attempt to fetch from Supabase
  try {
    console.log(`Fetching data from ${tableName} with options:`, options);
    
    if (!supabase) {
      console.error('Supabase client is not initialized. Using mock data instead.');
      return mockData;
    }
    
    let query = supabase
      .from(tableName)
      .select(options.select || '*');
    
    // Apply filters
    if (options.filter) {
      Object.entries(options.filter).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }
    
    // Apply order
    if (options.orderBy) {
      query = query.order(options.orderBy.column, { 
        ascending: options.orderBy.ascending ?? true 
      });
    }
    
    // Apply limit
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching data from Supabase:', error);
      return mockData;
    }
    
    console.log(`Successfully fetched data from ${tableName}`);
    return data as unknown as T;
  } catch (error) {
    console.error('Error connecting to database:', error);
    return mockData;
  }
}

/**
 * Fetches data using a custom SQL query or database view
 * 
 * @param viewName - The view or SQL query to use
 * @param mockData - Mock data to return if using mock mode
 * @param params - Query parameters
 * @returns The data from the view/query or mock data
 */
export async function fetchFromView<T>(
  viewName: string, 
  mockData: T, 
  params: Record<string, unknown> = {}
): Promise<T> {
  if (shouldUseMockData()) {
    console.log(`Using mock data for view ${viewName}`);
    return mockData;
  }
  
  try {
    if (!supabase) {
      console.error('Supabase client is not initialized. Using mock data instead.');
      return mockData;
    }
    
    const { data, error } = await supabase
      .from(viewName)
      .select('*')
      .eq(Object.keys(params)[0] || 'id', Object.values(params)[0] || '');
    
    if (error) {
      console.error(`Error fetching from view ${viewName}:`, error);
      return mockData;
    }
    
    return data as unknown as T;
  } catch (error) {
    console.error(`Error fetching from view ${viewName}:`, error);
    return mockData;
  }
}
