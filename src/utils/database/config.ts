
// Database configuration with proper browser/server handling
import { toast } from '@/hooks/use-toast';
import { createPgPolyfills } from '../pg-polyfills';

// Initialize polyfills for browser environment
createPgPolyfills();

// Detect environment
const isBrowser = typeof window !== 'undefined';

// Get database configuration from environment variables
export const DB_CONFIG = {
  host: import.meta.env.VITE_PG_HOST || 'localhost',
  port: parseInt(import.meta.env.VITE_PG_PORT || '5432'),
  database: import.meta.env.VITE_PG_DATABASE || 'edusync',
  user: import.meta.env.VITE_PG_USER || 'postgres',
  password: import.meta.env.VITE_PG_PASSWORD || 'Admin',
  // Disable SSL in development environment
  ssl: import.meta.env.PROD ? { rejectUnauthorized: false } : false,
};

// Create a proper pool interface that works in both environments
export class DatabasePool {
  private pgPool: any;
  private static instance: DatabasePool;

  private constructor() {
    if (!isBrowser) {
      try {
        // Only import pg in Node.js environment
        // Using dynamic import to prevent browser from trying to parse pg
        import('pg').then(pg => {
          const { Pool } = pg;
          this.pgPool = new Pool(DB_CONFIG);
          
          this.pgPool.on('error', (err: Error) => {
            console.error('Unexpected error on idle client', err);
          });
          
          console.log(`PostgreSQL configuration loaded: ${DB_CONFIG.database} on ${DB_CONFIG.host}:${DB_CONFIG.port}`);
        }).catch(err => {
          console.error('Failed to import pg module:', err);
        });
      } catch (err) {
        console.error('Failed to initialize PostgreSQL pool:', err);
      }
    } else {
      console.log('Browser environment detected, using mock database pool');
    }
  }

  public static getInstance(): DatabasePool {
    if (!DatabasePool.instance) {
      DatabasePool.instance = new DatabasePool();
    }
    return DatabasePool.instance;
  }

  async query(text: string, params: any[] = []) {
    if (isBrowser) {
      console.warn('Cannot execute real database queries in browser');
      return { rows: [] };
    }
    
    try {
      if (!this.pgPool) {
        throw new Error('Database pool not initialized');
      }
      return await this.pgPool.query(text, params);
    } catch (error) {
      console.error('Query error:', error);
      throw error;
    }
  }

  async connect() {
    if (isBrowser) {
      console.warn('Cannot connect to database from browser');
      throw new Error('Cannot connect to database from browser');
    }
    
    try {
      if (!this.pgPool) {
        throw new Error('Database pool not initialized');
      }
      return await this.pgPool.connect();
    } catch (error) {
      console.error('Connection error:', error);
      throw error;
    }
  }

  async end() {
    if (!isBrowser && this.pgPool) {
      await this.pgPool.end();
    }
  }
}

// Export a singleton instance
export const pgPool = DatabasePool.getInstance();

// Export shouldUseMockData function
export async function shouldUseMockData(): Promise<boolean> {
  // In browser, always use mock data
  if (isBrowser) {
    return true;
  }

  try {
    const client = await pgPool.connect();
    // client.release() would be called here in Node environment
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
