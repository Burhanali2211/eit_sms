
/**
 * Database configuration for EduSync
 * PostgreSQL connection setup with environment variables
 */

const { Pool } = require('pg');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'edusync',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
};

const pool = new Pool(dbConfig);

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Test connection function
const testConnection = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW(), current_database(), current_user');
    console.log('✅ Database connected successfully!');
    console.log(`📊 Database: ${result.rows[0].current_database}`);
    console.log(`👤 User: ${result.rows[0].current_user}`);
    console.log(`⏰ Time: ${result.rows[0].now}`);
    client.release();
    return true;
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    console.error('💡 Make sure PostgreSQL is running and credentials are correct');
    console.error('🔧 Check your .env file or environment variables');
    return false;
  }
};

// Helper function to execute queries
const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('📝 Query executed:', { text, duration, rows: res.rowCount });
    return res;
  } catch (err) {
    console.error('❌ Query error:', { text, error: err.message });
    throw err;
  }
};

// Helper function to get a client from the pool
const getClient = async () => {
  try {
    const client = await pool.connect();
    return client;
  } catch (err) {
    console.error('❌ Failed to get database client:', err.message);
    throw err;
  }
};

module.exports = {
  pool,
  query,
  getClient,
  testConnection,
  dbConfig
};
