/**
 * PostgreSQL Connection Example for SchoolVista Unify
 * 
 * This is a simple script demonstrating how to connect to PostgreSQL
 * from a Node.js application using the pg module.
 * 
 * Usage:
 * 1. Create a .env file with your database credentials
 * 2. Run this script with: node db_connector_example.js
 */

// Load environment variables - for a real application, use dotenv
const DB_CONFIG = {
  host: process.env.VITE_PG_HOST || 'localhost',
  port: parseInt(process.env.VITE_PG_PORT || '5432'),
  database: process.env.VITE_PG_DATABASE || 'schoolvista',
  user: process.env.VITE_PG_USER || 'postgres',
  password: process.env.VITE_PG_PASSWORD || 'YourPasswordHere',
  // Disable SSL in development environment
  ssl: process.env.VITE_PG_SSL === 'true' ? { rejectUnauthorized: false } : false,
};

// Import the pg module
const { Pool } = require('pg');

// Create a connection pool
const pool = new Pool(DB_CONFIG);

// Connection error handler
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

/**
 * Execute a simple query
 * @param {string} text - SQL query text
 * @param {Array} params - Query parameters
 * @returns {Promise} - Query result
 */
async function query(text, params = []) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log(`Query executed in ${duration}ms, returned ${res.rowCount} rows`);
    return res;
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
}

/**
 * Get a client from the pool
 * @returns {Promise} - Client connection
 */
async function getClient() {
  const client = await pool.connect();
  const query = client.query;
  const release = client.release;
  
  // Override client.query to log queries
  client.query = (...args) => {
    client.lastQuery = args;
    return query.apply(client, args);
  };
  
  // Override client.release to keep track of clients
  client.release = () => {
    client.query = query;
    client.release = release;
    return release.apply(client);
  };
  
  return client;
}

// Example usage
async function testConnection() {
  try {
    // Test connection by querying system table
    const res = await query('SELECT current_database() as database, current_user as user, version()');
    console.log('Successfully connected to PostgreSQL!');
    console.log('Database:', res.rows[0].database);
    console.log('User:', res.rows[0].user);
    console.log('Version:', res.rows[0].version);
    
    // Example: Query users table
    const userResult = await query('SELECT COUNT(*) FROM users');
    console.log(`Total users: ${userResult.rows[0].count}`);
    
    // Example: Using a client directly
    const client = await getClient();
    try {
      await client.query('BEGIN');
      // Multiple queries using the same client
      const classesResult = await client.query('SELECT COUNT(*) FROM classes');
      console.log(`Total classes: ${classesResult.rows[0].count}`);
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Database connection error:', err);
  } finally {
    // Close the pool
    await pool.end();
  }
}

// Run the test
testConnection();

/**
 * To use this connection pattern in your application:
 * 
 * 1. Create a database.js module that exports the pool and query functions
 * 2. Import the module in your application files
 * 3. Use the query function for simple queries
 * 4. Use getClient for transactions or when you need a dedicated client
 * 
 * For production, consider:
 * - Using connection pooling
 * - Implementing retry logic for temporary connection issues
 * - Using a migration tool for schema changes
 * - Implementing proper error handling and logging
 */ 