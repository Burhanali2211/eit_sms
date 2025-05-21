
import { pgPool } from './database/config';

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
