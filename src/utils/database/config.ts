
import { Pool } from 'pg';

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

pgPool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

console.log(`Connected to PostgreSQL database: ${pgDatabase} on ${pgHost}:${pgPort}`);

export default pgPool;
