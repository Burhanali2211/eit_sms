/**
 * Browser fallback for database operations
 * 
 * When running in a browser environment where direct PostgreSQL connections
 * aren't possible, this module provides mock implementations.
 */

import { toast } from '@/hooks/use-toast';

// Store data in memory for the session
const inMemoryDb: Record<string, any[]> = {};

// Check if we're in a browser environment where direct DB connections won't work
export const isBrowserEnvironment = typeof window !== 'undefined';

// Helper to get mock data for a table
export const getMockData = (tableName: string): any[] => {
  if (!inMemoryDb[tableName]) {
    inMemoryDb[tableName] = [];
  }
  return inMemoryDb[tableName];
};

// Browser-compatible fetch implementation
export async function browserFetchData<T>(
  tableName: string, 
  defaultValue: T, 
  options: any = {}
): Promise<T> {
  console.log(`[Browser Fallback] Fetching data from ${tableName}`);
  
  // In a real application, this would call an API endpoint
  // For now, we'll return mock data or empty results
  try {
    return getMockData(tableName) as unknown as T;
  } catch (error) {
    console.error('Error in browser fetch fallback:', error);
    toast({
      title: 'Data fetch error',
      description: 'Could not fetch data in browser environment',
      variant: 'destructive',
    });
    return defaultValue;
  }
}

// Other database operations would be implemented similarly
export const browserFallbackOperations = {
  fetchData: browserFetchData,
  fetchFromView: browserFetchData,
  insertData: async <T>(tableName: string, data: any): Promise<T | null> => {
    console.log(`[Browser Fallback] Inserting data into ${tableName}`, data);
    const mockData = getMockData(tableName);
    const newItem = { id: `mock-${Date.now()}`, ...data };
    mockData.push(newItem);
    return newItem as unknown as T;
  },
  updateData: async <T>(tableName: string, id: string, data: any): Promise<T | null> => {
    console.log(`[Browser Fallback] Updating data in ${tableName}`, { id, data });
    const mockData = getMockData(tableName);
    const index = mockData.findIndex(item => item.id === id);
    if (index >= 0) {
      mockData[index] = { ...mockData[index], ...data };
      return mockData[index] as unknown as T;
    }
    return null;
  },
  deleteData: async (tableName: string, id: string): Promise<boolean> => {
    console.log(`[Browser Fallback] Deleting data from ${tableName}`, { id });
    const mockData = getMockData(tableName);
    const index = mockData.findIndex(item => item.id === id);
    if (index >= 0) {
      mockData.splice(index, 1);
      return true;
    }
    return false;
  }
};
