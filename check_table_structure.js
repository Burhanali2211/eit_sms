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

// Check table structure
async function checkTableStructure(tableName) {
  const client = await pool.connect();
  
  try {
    console.log(`Checking structure of table: ${tableName}`);
    
    // Check if table exists
    const tableExists = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = $1
      )
    `, [tableName]);
    
    if (!tableExists.rows[0].exists) {
      console.log(`Table ${tableName} does not exist.`);
      return;
    }
    
    // Get columns
    const columnsResult = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_schema = 'public'
      AND table_name = $1
      ORDER BY ordinal_position
    `, [tableName]);
    
    console.log(`\nColumns in ${tableName}:`);
    columnsResult.rows.forEach(col => {
      console.log(`- ${col.column_name} (${col.data_type}, ${col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'})`);
    });
    
    // Get primary key
    const pkResult = await client.query(`
      SELECT a.attname
      FROM pg_index i
      JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
      WHERE i.indrelid = $1::regclass
      AND i.indisprimary
    `, [tableName]);
    
    console.log(`\nPrimary key: ${pkResult.rows.map(row => row.attname).join(', ') || 'None'}`);
    
    // Get foreign keys
    const fkResult = await client.query(`
      SELECT
        kcu.column_name,
        ccu.table_name AS foreign_table_name,
        ccu.column_name AS foreign_column_name
      FROM
        information_schema.table_constraints AS tc
      JOIN information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
      JOIN information_schema.constraint_column_usage AS ccu
        ON ccu.constraint_name = tc.constraint_name
        AND ccu.table_schema = tc.table_schema
      WHERE tc.constraint_type = 'FOREIGN KEY'
      AND tc.table_name = $1
    `, [tableName]);
    
    if (fkResult.rows.length > 0) {
      console.log(`\nForeign keys:`);
      fkResult.rows.forEach(fk => {
        console.log(`- ${fk.column_name} → ${fk.foreign_table_name}(${fk.foreign_column_name})`);
      });
    } else {
      console.log('\nNo foreign keys');
    }
    
  } catch (err) {
    console.error('Error checking table structure:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

// Get table name from command line
const tableName = process.argv[2];

if (!tableName) {
  console.error('Please provide a table name as a command line argument.');
  process.exit(1);
}

checkTableStructure(tableName); 