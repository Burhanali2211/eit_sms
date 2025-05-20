
/**
 * Database configuration
 * 
 * Manages the connection configuration for PostgreSQL
 */

// Use a mock Pool implementation for frontend compatibility
class MockPool {
  async query() {
    console.error('Direct database connection not available in browser environment');
    return { rows: [] };
  }
}

// Environment variables that should be set in production
// For development, these would be loaded from .env
const DB_HOST = import.meta.env.VITE_PG_HOST || 'localhost';
const DB_PORT = parseInt(import.meta.env.VITE_PG_PORT || '5432');
const DB_NAME = import.meta.env.VITE_PG_DATABASE || 'edusync';
const DB_USER = import.meta.env.VITE_PG_USER || 'postgres';
const DB_PASSWORD = import.meta.env.VITE_PG_PASSWORD || 'postgres';

// Create a mock pool for frontend use
export const pgPool = new MockPool();

// Flag to check if database connection is available
export const shouldUseMockData = (): boolean => {
  return true; // Frontend will always use mock data or API calls
};
