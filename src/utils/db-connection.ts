/**
 * PostgreSQL Database Connection Utility
 * 
 * This file provides functions for connecting to a PostgreSQL database
 * and executing queries. It serves as an example of how to interact with
 * the database after migrating from Supabase.
 */

import { Pool, QueryResult } from 'pg';

// Database configuration
// In a real application, these values should come from environment variables
const config = {
  user: process.env.DB_USER || 'edusync_user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'edusync_db',
  password: process.env.DB_PASSWORD || 'secure_password',
  port: parseInt(process.env.DB_PORT || '5432'),
  // Additional options
  ssl: process.env.DB_USE_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait for a connection
};

// Create a new pool
const pool = new Pool(config);

// Log connection events for debugging
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

/**
 * Execute a query against the PostgreSQL database
 * @param text - SQL query text
 * @param params - Query parameters
 * @returns Promise that resolves to the query result
 */
export async function query<T>(text: string, params?: any[]): Promise<QueryResult<T>> {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    
    // Log slow queries for optimization
    if (duration > 500) { // Log queries that take more than 500ms
      console.warn('Slow query detected:', { text, duration, rows: result.rowCount });
    }
    
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

/**
 * Get a client from the pool
 * @returns A client from the pool
 */
export async function getClient() {
  const client = await pool.connect();
  const query = client.query;
  const release = client.release;
  
  // Add timestamp and logging to track query execution time
  // @ts-ignore
  client.query = (...args) => {
    client.lastQuery = args;
    return query.apply(client, args);
  };
  
  // Override client.release to keep track of released clients
  client.release = () => {
    client.query = query;
    client.release = release;
    return release.apply(client);
  };
  
  return client;
}

/**
 * Example function for transaction handling
 * @param callback - Function to execute within the transaction
 * @returns Promise that resolves to the result of the callback
 */
export async function transaction<T>(callback: (client: any) => Promise<T>): Promise<T> {
  const client = await getClient();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

/**
 * Close the pool when the application shuts down
 */
export async function closePool() {
  await pool.end();
  console.log('Database pool has been closed');
}

// Example data access functions

/**
 * Get all users
 * @returns Promise that resolves to an array of users
 */
export async function getUsers() {
  const result = await query<{id: string, name: string, email: string, role: string}>(
    'SELECT id, name, email, role FROM users'
  );
  return result.rows;
}

/**
 * Get user by ID
 * @param id - User ID
 * @returns Promise that resolves to a user object or null if not found
 */
export async function getUserById(id: string) {
  const result = await query<{id: string, name: string, email: string, role: string}>(
    'SELECT id, name, email, role FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

/**
 * Get dashboard stats for a user based on their role
 * @param userId - User ID
 * @param role - User role
 * @returns Promise that resolves to dashboard stats
 */
export async function getDashboardStats(userId: string, role: string) {
  switch (role) {
    case 'student':
      const studentResult = await query(
        'SELECT * FROM student_dashboard_view WHERE user_id = $1',
        [userId]
      );
      return studentResult.rows[0] || null;
      
    case 'teacher':
      const teacherResult = await query(
        'SELECT * FROM teacher_dashboard_view WHERE user_id = $1',
        [userId]
      );
      return teacherResult.rows[0] || null;
      
    case 'financial':
      const financialResult = await query(
        'SELECT * FROM financial_dashboard_view'
      );
      return financialResult.rows[0] || null;
      
    // Add cases for other roles
      
    default:
      // Default stats for admin, principal, etc.
      const defaultResult = await query(
        'SELECT * FROM system_health'
      );
      return defaultResult.rows[0] || null;
  }
}

/**
 * Get notifications for a user
 * @param userId - User ID
 * @param limit - Maximum number of notifications to return
 * @returns Promise that resolves to array of notifications
 */
export async function getUserNotifications(userId: string, limit = 10) {
  const result = await query(
    `SELECT n.id, n.title, n.message, n.created_at, un.is_read 
     FROM notifications n
     JOIN user_notifications un ON n.id = un.notification_id
     WHERE un.user_id = $1
     ORDER BY n.created_at DESC
     LIMIT $2`,
    [userId, limit]
  );
  return result.rows;
}

/**
 * Get calendar events for a user
 * @param userId - User ID
 * @param limit - Maximum number of events to return
 * @returns Promise that resolves to array of events
 */
export async function getUserCalendarEvents(userId: string, limit = 5) {
  const result = await query(
    `SELECT e.id, e.title, e.description, 
     to_char(e.event_date, 'Month DD, YYYY') as date,
     to_char(e.event_time, 'HH24:MI') as time
     FROM calendar_events e
     JOIN event_participants ep ON e.id = ep.event_id
     WHERE ep.user_id = $1 AND e.event_date >= CURRENT_DATE
     ORDER BY e.event_date, e.event_time
     LIMIT $2`,
    [userId, limit]
  );
  return result.rows;
}

// Export the pool for direct use if needed
export default pool;
