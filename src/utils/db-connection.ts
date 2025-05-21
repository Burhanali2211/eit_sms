
import { pgPool } from './database/config';

// Add a DB_CONFIG object with environment information
export const DB_CONFIG = {
  environment: import.meta.env.VITE_APP_ENV || 'development',
  appName: import.meta.env.VITE_APP_NAME || 'EduSync',
  host: import.meta.env.VITE_PG_HOST || 'localhost',
  port: parseInt(import.meta.env.VITE_PG_PORT || '5432'),
  database: import.meta.env.VITE_PG_DATABASE || 'edusync',
  user: import.meta.env.VITE_PG_USER || 'postgres',
  password: import.meta.env.VITE_PG_PASSWORD || 'Admin'
};

/**
 * Checks if the database connection is available
 * @returns Promise<boolean> indicating if the connection was successful
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const client = await pgPool.connect();
    client.release();
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

/**
 * Determines if mock data should be used (in case database is not available)
 * @returns Promise<boolean> indicating if mock data should be used
 */
export async function shouldUseMockData(): Promise<boolean> {
  return !(await checkDatabaseConnection());
}
