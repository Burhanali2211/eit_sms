
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
    // Initialize with empty array
    inMemoryDb[tableName] = [];
    
    // For popular tables, we could add some starter mock data
    if (tableName === 'users') {
      inMemoryDb[tableName] = [
        { id: 'mock-1', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
        { id: 'mock-2', name: 'Teacher User', email: 'teacher@example.com', role: 'teacher' },
        { id: 'mock-3', name: 'Student User', email: 'student@example.com', role: 'student' },
      ];
    } else if (tableName === 'courses') {
      inMemoryDb[tableName] = [
        { id: 'c1', name: 'Mathematics', description: 'Basic math course', teacherId: 'mock-2' },
        { id: 'c2', name: 'Science', description: 'Introduction to science', teacherId: 'mock-2' }
      ];
    }
  }
  return inMemoryDb[tableName];
};

// Browser-compatible fetch implementation
export async function browserFetchData<T>(
  tableName: string, 
  defaultValue: T, 
  options: any = {}
): Promise<T> {
  console.log(`[Browser Fallback] Fetching data from ${tableName}`, options);
  
  try {
    const mockData = getMockData(tableName);
    
    // Handle filtering if provided
    if (options.filter && Object.keys(options.filter).length > 0) {
      const filtered = mockData.filter(item => {
        return Object.entries(options.filter).every(([key, value]) => item[key] === value);
      });
      return filtered as unknown as T;
    }
    
    // Handle ordering if provided
    if (options.orderBy) {
      const { column, ascending = true } = options.orderBy;
      mockData.sort((a, b) => {
        if (a[column] < b[column]) return ascending ? -1 : 1;
        if (a[column] > b[column]) return ascending ? 1 : -1;
        return 0;
      });
    }
    
    // Handle limit if provided
    if (options.limit && typeof options.limit === 'number') {
      return mockData.slice(0, options.limit) as unknown as T;
    }
    
    // Return all data
    return mockData as unknown as T;
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
  insertData: async <T>(tableName: string, data: any): Promise<T> => {
    console.log(`[Browser Fallback] Inserting data into ${tableName}`, data);
    const mockData = getMockData(tableName);
    const newItem = { id: `mock-${Date.now()}`, ...data };
    mockData.push(newItem);
    
    toast({
      title: 'Data saved',
      description: 'Data has been saved (in browser memory only)',
    });
    
    return newItem as unknown as T;
  },
  updateData: async <T>(tableName: string, id: string, data: any): Promise<T> => {
    console.log(`[Browser Fallback] Updating data in ${tableName}`, { id, data });
    const mockData = getMockData(tableName);
    const index = mockData.findIndex(item => item.id === id);
    if (index >= 0) {
      mockData[index] = { ...mockData[index], ...data };
      
      toast({
        title: 'Data updated',
        description: 'Data has been updated (in browser memory only)',
      });
      
      return mockData[index] as unknown as T;
    }
    return data as unknown as T;  // Return original data as fallback
  },
  deleteData: async (tableName: string, id: string): Promise<boolean> => {
    console.log(`[Browser Fallback] Deleting data from ${tableName}`, { id });
    const mockData = getMockData(tableName);
    const index = mockData.findIndex(item => item.id === id);
    if (index >= 0) {
      mockData.splice(index, 1);
      
      toast({
        title: 'Data deleted',
        description: 'Data has been deleted (in browser memory only)',
      });
      
      return true;
    }
    return false;
  }
};
