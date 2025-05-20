
/**
 * Database configuration
 * 
 * Manages the connection configuration for PostgreSQL
 */

import { Pool } from 'pg';

// Environment variables that should be set in production
// For development, these would be loaded from .env
const DB_HOST = import.meta.env.VITE_PG_HOST || 'localhost';
const DB_PORT = parseInt(import.meta.env.VITE_PG_PORT || '5432');
const DB_NAME = import.meta.env.VITE_PG_DATABASE || 'edusync';
const DB_USER = import.meta.env.VITE_PG_USER || 'postgres';
const DB_PASSWORD = import.meta.env.VITE_PG_PASSWORD || 'postgres';

// Create PostgreSQL connection pool
export const pgPool = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
});

// Flag to check if database connection is available
export const shouldUseMockData = (): boolean => {
  return false; // Always use real database data now
};

