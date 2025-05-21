
/**
 * Database configuration
 * 
 * Manages the connection configuration for PostgreSQL
 */

// Environment variables from .env
const DB_HOST = import.meta.env.VITE_PG_HOST || 'localhost';
const DB_PORT = parseInt(import.meta.env.VITE_PG_PORT || '5432');
const DB_NAME = import.meta.env.VITE_PG_DATABASE || 'edusync';
const DB_USER = import.meta.env.VITE_PG_USER || 'postgres';
const DB_PASSWORD = import.meta.env.VITE_PG_PASSWORD || 'Admin';

// API URL for backend requests
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Class for database connection in browser environment
class PgConnection {
  async query(queryText: string, params?: any[]) {
    try {
      // In browser environment, make API call to server
      const response = await fetch(`${API_URL}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: queryText,
          params: params || [],
          dbConfig: {
            host: DB_HOST,
            port: DB_PORT,
            database: DB_NAME,
            user: DB_USER
            // Password is handled securely on the server side
          }
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Database query failed: ${error.message}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  }
}

// Create a connection instance
export const pgPool = new PgConnection();

// Check if we should use real database or mock data
// This will be true when API is available, false otherwise
export const shouldUseMockData = (): boolean => {
  const useRealDb = true;
  // Check if API is actually available
  try {
    fetch(`${API_URL}/health`)
      .then(response => {
        if (!response.ok) {
          console.warn('API is not available. Falling back to mock data.');
          return false;
        }
        return true;
      })
      .catch(() => {
        console.warn('API is not available. Falling back to mock data.');
        return false;
      });
    return useRealDb;
  } catch (error) {
    console.warn('API connection check failed. Falling back to mock data.');
    return false;
  }
};
