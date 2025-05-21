
/**
 * Database mutation utilities
 * 
 * Provides functions for inserting, updating, and deleting data
 * using the PostgreSQL database through API calls
 */

import { pgPool, shouldUseMockData } from './config';
import { toast } from '@/hooks/use-toast';

/**
 * Inserts data into the database
 * 
 * @param tableName - The table to insert into
 * @param data - The data to insert
 * @returns The inserted data with generated fields
 */
export async function insertData<T>(tableName: string, data: T): Promise<T> {
  // First check if we should use mock data
  const useMock = await shouldUseMockData();
  if (useMock) {
    console.log(`Using mock data for inserting into ${tableName}`);
    // Import the browser fallbacks dynamically to avoid Node.js vs browser issues
    const { browserFallbackOperations } = await import('./browser-fallback');
    return browserFallbackOperations.insertData(tableName, data);
  }
  
  try {
    const keys = Object.keys(data as object);
    const values = Object.values(data as object);
    
    if (keys.length === 0) {
      throw new Error("Cannot insert empty data object");
    }
    
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
    const query = `
      INSERT INTO ${tableName} (${keys.join(', ')})
      VALUES (${placeholders})
      RETURNING *
    `;
    
    console.log('Executing SQL insert:', query, values);
    
    const result = await pgPool.query(query, values);
    
    if (result && result.rows && result.rows.length > 0) {
      toast({
        title: 'Success',
        description: `Data successfully added to ${tableName}`,
      });
      return result.rows[0] as T;
    } else {
      throw new Error('Insert operation did not return data');
    }
  } catch (error) {
    console.error('Error inserting data:', error);
    toast({
      title: 'Error',
      description: 'Failed to insert data',
      variant: 'destructive',
    });
    throw error;
  }
}

/**
 * Updates data in the database
 * 
 * @param tableName - The table to update
 * @param id - The ID of the record to update
 * @param data - The data to update
 * @returns The updated data
 */
export async function updateData<T>(
  tableName: string, 
  id: string, 
  data: Partial<T>
): Promise<T> {
  // First check if we should use mock data
  const useMock = await shouldUseMockData();
  if (useMock) {
    console.log(`Using mock data for updating in ${tableName}`);
    // Import the browser fallbacks dynamically to avoid Node.js vs browser issues
    const { browserFallbackOperations } = await import('./browser-fallback');
    return browserFallbackOperations.updateData(tableName, id, data);
  }
  
  try {
    const keys = Object.keys(data as object);
    const values = Object.values(data as object);
    
    if (keys.length === 0) {
      throw new Error("Cannot update with empty data object");
    }
    
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
      toast({
        title: 'Success',
        description: `Record successfully updated in ${tableName}`,
      });
      return result.rows[0] as T;
    } else {
      throw new Error('Update operation did not return data');
    }
  } catch (error) {
    console.error('Error updating data:', error);
    toast({
      title: 'Error',
      description: 'Failed to update data',
      variant: 'destructive',
    });
    throw error;
  }
}

/**
 * Deletes data from the database
 * 
 * @param tableName - The table to delete from
 * @param id - The ID of the record to delete
 * @returns True if successful, throws error otherwise
 */
export async function deleteData(tableName: string, id: string): Promise<boolean> {
  // First check if we should use mock data
  const useMock = await shouldUseMockData();
  if (useMock) {
    console.log(`Using mock data for deleting from ${tableName}`);
    // Import the browser fallbacks dynamically to avoid Node.js vs browser issues
    const { browserFallbackOperations } = await import('./browser-fallback');
    return browserFallbackOperations.deleteData(tableName, id);
  }
  
  try {
    const query = `
      DELETE FROM ${tableName}
      WHERE id = $1
      RETURNING id
    `;
    
    console.log('Executing SQL delete:', query, [id]);
    
    const result = await pgPool.query(query, [id]);
    
    if (result && result.rows && result.rows.length > 0) {
      toast({
        title: 'Success',
        description: `Record successfully deleted from ${tableName}`,
      });
      return true;
    } else {
      throw new Error('No record found to delete');
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    toast({
      title: 'Error',
      description: 'Failed to delete data',
      variant: 'destructive',
    });
    throw error;
  }
}
