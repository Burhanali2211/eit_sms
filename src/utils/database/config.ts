
import { Pool } from 'pg';
import { createPgPolyfills } from '../pg-polyfills';
import { toast } from '@/hooks/use-toast';

// Initialize polyfills for browser environment
createPgPolyfills();

// Detect environment
const isBrowser = typeof window !== 'undefined';

// Get database configuration from environment variables
const pgHost = import.meta.env.VITE_PG_HOST || 'localhost';
const pgPort = parseInt(import.meta.env.VITE_PG_PORT || '5432');
const pgDatabase = import.meta.env.VITE_PG_DATABASE || 'edusync';
const pgUser = import.meta.env.VITE_PG_USER || 'postgres';
const pgPassword = import.meta.env.VITE_PG_PASSWORD || 'Admin';

// Create a singleton pool instance for server environments, or a mock for browser
let pgPool: Pool;

try {
  // Initialize the connection pool
  pgPool = new Pool({
    host: pgHost,
    port: pgPort,
    database: pgDatabase,
    user: pgUser,
    password: pgPassword,
    // Disable SSL in development environment
    ssl: import.meta.env.PROD ? { rejectUnauthorized: false } : false,
  });

  if (!isBrowser) {
    pgPool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      // Don't exit process in browser environment
      if (typeof process !== 'undefined') {
        process.exit(-1);
      }
    });
    
    console.log(`PostgreSQL configuration loaded: ${pgDatabase} on ${pgHost}:${pgPort}`);
  }
} catch (err) {
  console.error('Failed to initialize PostgreSQL pool:', err);
  // Create a mock pool for browser environments
  if (isBrowser) {
    pgPool = {
      query: () => Promise.reject(new Error('Cannot connect to PostgreSQL from browser')),
      connect: () => Promise.reject(new Error('Cannot connect to PostgreSQL from browser')),
      end: () => Promise.resolve(),
    } as unknown as Pool;
  }
}

// Export shouldUseMockData function for backward compatibility
export async function shouldUseMockData(): Promise<boolean> {
  // In browser, always use mock data
  if (isBrowser) {
    return true;
  }

  try {
    const client = await pgPool.connect();
    client.release();
    return false; // Connection successful, no need for mock data
  } catch (error) {
    console.error('Database connection failed, using mock data instead', error);
    toast({
      title: 'Database Connection Error',
      description: 'Using mock data instead of live database.',
      variant: 'destructive',
    });
    return true; // Connection failed, use mock data
  }
}

export default pgPool;
