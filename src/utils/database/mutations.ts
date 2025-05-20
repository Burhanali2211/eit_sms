
/**
 * Database mutation utilities
 * 
 * Provides functions for inserting, updating, and deleting data in the database
 */

import { supabase, shouldUseMockData } from './config';

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
