
/**
 * Database connection utility
 * 
 * This file re-exports all database functionality and provides a central
 * connection management system for PostgreSQL.
 */

// Re-export everything from the database modules
export * from './database';

// Export environment variables for components that need them
export const DB_CONFIG = {
  host: import.meta.env.VITE_PG_HOST || 'localhost',
  port: parseInt(import.meta.env.VITE_PG_PORT || '5432'),
  database: import.meta.env.VITE_PG_DATABASE || 'edusync',
  user: import.meta.env.VITE_PG_USER || 'postgres',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  appName: import.meta.env.VITE_APP_NAME || 'EduSync',
  environment: import.meta.env.VITE_APP_ENV || 'development'
};

// Check database connection and set up connection handler
export async function checkDatabaseConnection() {
  try {
    const response = await fetch(`${DB_CONFIG.apiUrl}/health`);
    if (!response.ok) {
      console.warn('Database connection check failed. API returned error.');
      return false;
    }
    const data = await response.json();
    console.log('Database connection status:', data);
    return data.connected;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
}
