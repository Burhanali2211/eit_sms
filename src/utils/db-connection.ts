
/**
 * Database connection utility
 * 
 * This file provides utilities for connecting to the database,
 * with support for both PostgreSQL direct connection and Supabase.
 */

import { createClient } from '@supabase/supabase-js';

// Environment variables that would be set in production
// For development, these can be hard-coded or loaded from .env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || true;

// Create Supabase client only if valid URL and key are provided
export const supabase = (SUPABASE_URL && SUPABASE_URL !== 'your_supabase_url' && SUPABASE_KEY && SUPABASE_KEY !== 'your_supabase_anon_key') 
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

/**
 * Determines if the app should use mock data instead of real database data
 * This is useful during development or when database is not available
 */
export const shouldUseMockData = (): boolean => {
  return USE_MOCK_DATA || !supabase;
};

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
 * Inserts data into the database
 * 
 * @param tableName - The table to insert into
 * @param data - The data to insert
 * @returns The inserted data or null if there was an error
 */
export async function insertData<T>(tableName: string, data: T): Promise<T | null> {
  if (shouldUseMockData()) {
    console.log(`[MOCK] Inserting into ${tableName}:`, data);
    return data; // Just return the data in mock mode
  }
  
  try {
    if (!supabase) {
      console.error('Supabase client is not initialized. Using mock data instead.');
      return data;
    }
    
    const { data: insertedData, error } = await supabase
      .from(tableName)
      .insert(data as any)
      .select();
    
    if (error) {
      console.error('Error inserting data:', error);
      return null;
    }
    
    return insertedData[0] as T;
  } catch (error) {
    console.error('Error inserting data:', error);
    return null;
  }
}

/**
 * Updates data in the database
 * 
 * @param tableName - The table to update
 * @param id - The ID of the record to update
 * @param data - The data to update
 * @returns The updated data or null if there was an error
 */
export async function updateData<T>(
  tableName: string, 
  id: string, 
  data: Partial<T>
): Promise<T | null> {
  if (shouldUseMockData()) {
    console.log(`[MOCK] Updating ${tableName} with ID ${id}:`, data);
    return data as T; // Just return the data in mock mode
  }
  
  try {
    if (!supabase) {
      console.error('Supabase client is not initialized. Using mock data instead.');
      return data as T;
    }
    
    const { data: updatedData, error } = await supabase
      .from(tableName)
      .update(data as any)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error updating data:', error);
      return null;
    }
    
    return updatedData[0] as T;
  } catch (error) {
    console.error('Error updating data:', error);
    return null;
  }
}

/**
 * Deletes data from the database
 * 
 * @param tableName - The table to delete from
 * @param id - The ID of the record to delete
 * @returns True if successful, false otherwise
 */
export async function deleteData(tableName: string, id: string): Promise<boolean> {
  if (shouldUseMockData()) {
    console.log(`[MOCK] Deleting from ${tableName} with ID ${id}`);
    return true; // Pretend it worked in mock mode
  }
  
  try {
    if (!supabase) {
      console.error('Supabase client is not initialized.');
      return false;
    }
    
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting data:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting data:', error);
    return false;
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
