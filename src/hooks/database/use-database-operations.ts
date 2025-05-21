
import { useState } from 'react';
import { pgPool } from '@/utils/database/config';
import { toast } from '@/hooks/use-toast';

/**
 * Provides database CRUD operation handlers
 * @param tableName The database table to operate on
 */
export function useDatabaseOperations<T>(tableName: string) {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  /**
   * Insert a new record into the database
   */
  const insertItem = async (item: Partial<T>) => {
    setIsProcessing(true);
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
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Update an existing record in the database
   */
  const updateItem = async (id: string | number, changes: Partial<T>) => {
    setIsProcessing(true);
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
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Delete a record from the database
   */
  const deleteItem = async (id: string | number) => {
    setIsProcessing(true);
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
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    insert: insertItem,
    update: updateItem,
    delete: deleteItem,
    isProcessing
  };
}
