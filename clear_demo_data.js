import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';

const { Pool } = pg;

// Load environment variables
dotenv.config();

// Read the .env file if it exists
let envConfig = {};
if (fs.existsSync('.env')) {
  const envFile = fs.readFileSync('.env', 'utf8');
  envFile.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      envConfig[key.trim()] = value.trim();
    }
  });
}

// Database configuration from .env file
const dbConfig = {
  host: process.env.VITE_PG_HOST || envConfig.VITE_PG_HOST || 'localhost',
  port: parseInt(process.env.VITE_PG_PORT || envConfig.VITE_PG_PORT || '5432'),
  database: process.env.VITE_PG_DATABASE || envConfig.VITE_PG_DATABASE || 'edusync',
  user: process.env.VITE_PG_USER || envConfig.VITE_PG_USER || 'postgres',
  password: process.env.VITE_PG_PASSWORD || envConfig.VITE_PG_PASSWORD || 'postgres',
  ssl: (process.env.VITE_PG_SSL === 'true' || envConfig.VITE_PG_SSL === 'true') 
    ? { rejectUnauthorized: false } 
    : false
};

console.log('Database configuration:');
console.log({
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  user: dbConfig.user,
  password: '********', // Masked for security
  ssl: dbConfig.ssl
});

// Create a new pool
const pool = new Pool(dbConfig);

// Function to truncate all tables
async function clearAllData() {
  const client = await pool.connect();
  
  try {
    console.log('🧹 Starting to clear all demo data...');
    
    // Begin transaction
    await client.query('BEGIN');
    
    // Disable triggers temporarily to avoid foreign key constraint errors
    await client.query('SET session_replication_role = replica;');
    
    // Get all tables
    const tablesResult = await client.query(`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public' 
      AND tablename NOT IN ('migrations', 'schema_migrations', 'ar_internal_metadata')
    `);
    
    const tables = tablesResult.rows.map(row => row.tablename);
    console.log(`Found ${tables.length} tables to clear`);
    
    // Truncate each table
    for (const table of tables) {
      try {
        await client.query(`TRUNCATE TABLE "${table}" CASCADE`);
        console.log(`✅ Cleared table: ${table}`);
      } catch (err) {
        console.error(`❌ Error clearing table ${table}:`, err.message);
      }
    }
    
    // Re-enable triggers
    await client.query('SET session_replication_role = DEFAULT;');
    
    // Commit transaction
    await client.query('COMMIT');
    console.log('✅ All demo data has been removed successfully');
    
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Transaction failed:', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

console.log('🚀 SchoolVista Demo Data Cleaner');
console.log('===============================\n');
clearAllData(); 