
/**
 * Database operations entry point
 * 
 * This file determines whether to use direct PostgreSQL connections
 * or browser-compatible fallbacks.
 */

// Import the server implementations
import { fetchData as serverFetchData, fetchFromView as serverFetchFromView } from './fetch';
import { insertData as serverInsertData, updateData as serverUpdateData, deleteData as serverDeleteData } from './mutations';

// Import the browser fallback implementations
import { browserFallbackOperations, isBrowserEnvironment } from './browser-fallback';

// Determine which implementation to use - always use browser fallback in browser environment
const useBrowserFallback = isBrowserEnvironment;

// Log which mode we're using
console.log(`Database mode: ${useBrowserFallback ? 'Browser fallback' : 'Server direct connection'}`);

// Export the appropriate implementations
export const fetchData = useBrowserFallback ? browserFallbackOperations.fetchData : serverFetchData;
export const fetchFromView = useBrowserFallback ? browserFallbackOperations.fetchFromView : serverFetchFromView;
export const insertData = useBrowserFallback ? browserFallbackOperations.insertData : serverInsertData;
export const updateData = useBrowserFallback ? browserFallbackOperations.updateData : serverUpdateData;
export const deleteData = useBrowserFallback ? browserFallbackOperations.deleteData : serverDeleteData;

// Export other utilities
export * from './config';
