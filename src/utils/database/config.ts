
import { Pool } from 'pg';
import { createPgPolyfills } from '../pg-polyfills';

// Initialize polyfills for browser environment
createPgPolyfills();

// Get database configuration from environment variables
const pgHost = import.meta.env.VITE_PG_HOST || 'localhost';
const pgPort = parseInt(import.meta.env.VITE_PG_PORT || '5432');
const pgDatabase = import.meta.env.VITE_PG_DATABASE || 'edusync';
const pgUser = import.meta.env.VITE_PG_USER || 'postgres';
const pgPassword = import.meta.env.VITE_PG_PASSWORD || 'Admin';

// Create a connection pool
export const pgPool = new Pool({
  host: pgHost,
  port: pgPort,
  database: pgDatabase,
  user: pgUser,
  password: pgPassword,
});

// Export shouldUseMockData function for backward compatibility
export async function shouldUseMockData(): Promise<boolean> {
  try {
    const client = await pgPool.connect();
    client.release();
    return false; // Connection successful, no need for mock data
  } catch (error) {
    console.error('Database connection failed, using mock data instead', error);
    return true; // Connection failed, use mock data
  }
}

pgPool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  // Don't exit process in browser environment
  if (typeof process !== 'undefined') {
    process.exit(-1);
  }
});

console.log(`PostgreSQL configuration loaded: ${pgDatabase} on ${pgHost}:${pgPort}`);

export default pgPool;
