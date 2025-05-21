
/**
 * Database operations entry point
 * 
 * This file determines whether to use direct PostgreSQL connections
 * or browser-compatible fallbacks.
 */

// Import core utilities
import { shouldUseMockData } from './config';

// Import server implementations
import { fetchData as serverFetchData, fetchFromView as serverFetchFromView } from './fetch';
import { insertData as serverInsertData, updateData as serverUpdateData, deleteData as serverDeleteData } from './mutations';

// Export the appropriate implementations directly
// These functions will internally determine if mock/browser fallback should be used
export const fetchData = serverFetchData;
export const fetchFromView = serverFetchFromView;
export const insertData = serverInsertData;
export const updateData = serverUpdateData;
export const deleteData = serverDeleteData;

// Export other utilities
export * from './config';
export { isBrowserEnvironment } from './browser-fallback';
