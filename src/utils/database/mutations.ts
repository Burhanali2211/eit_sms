
/**
 * Database mutation utilities
 * 
 * Provides functions for inserting, updating, and deleting data in PostgreSQL database
 */

import { pgPool } from './config';

/**
 * Inserts data into the database
 * 
 * @param tableName - The table to insert into
 * @param data - The data to insert
 * @returns The inserted data with generated fields
 */
export async function insertData<T>(tableName: string, data: T): Promise<T> {
  try {
    // Extract column names and values from data object
    const columns = Object.keys(data as Record<string, any>);
    const values = Object.values(data as Record<string, any>);
    
    // Create placeholders for prepared statement
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
    
    // Build the INSERT query
    const query = `
      INSERT INTO ${tableName} (${columns.join(', ')})
      VALUES (${placeholders})
      RETURNING *
    `;
    
    console.log('Executing INSERT query:', query, values);
    
    // Execute the query
    const result = await pgPool.query(query, values);
    
    if (result.rows.length === 0) {
      throw new Error('Insert operation did not return any data');
    }
    
    return result.rows[0] as T;
  } catch (error) {
    console.error('Error inserting data:', error);
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
  try {
    // Extract column names and values, excluding the id field
    const entries = Object.entries(data as Record<string, any>);
    
    // Create SET clause
    const setClauses = entries.map((_, index) => `${entries[index][0]} = $${index + 1}`).join(', ');
    
    // Build the UPDATE query
    const query = `
      UPDATE ${tableName}
      SET ${setClauses}
      WHERE id = $${entries.length + 1}
      RETURNING *
    `;
    
    // Prepare values array with id as the last parameter
    const values = [...entries.map(entry => entry[1]), id];
    
    console.log('Executing UPDATE query:', query, values);
    
    // Execute the query
    const result = await pgPool.query(query, values);
    
    if (result.rows.length === 0) {
      throw new Error(`No record found with id ${id}`);
    }
    
    return result.rows[0] as T;
  } catch (error) {
    console.error('Error updating data:', error);
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
  try {
    // Build the DELETE query
    const query = `
      DELETE FROM ${tableName}
      WHERE id = $1
    `;
    
    console.log('Executing DELETE query:', query, [id]);
    
    // Execute the query
    const result = await pgPool.query(query, [id]);
    
    if (result.rowCount === 0) {
      throw new Error(`No record found with id ${id}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
}
