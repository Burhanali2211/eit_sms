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

// Check constraints on a table
async function checkConstraints(tableName) {
  const client = await pool.connect();
  
  try {
    console.log(`Checking constraints on table: ${tableName}`);
    
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
    
    // Get check constraints
    const checksResult = await client.query(`
      SELECT c.conname as constraint_name, 
             pg_get_constraintdef(c.oid) as constraint_definition
      FROM pg_constraint c
      JOIN pg_namespace n ON n.oid = c.connamespace
      JOIN pg_class t ON t.oid = c.conrelid
      WHERE t.relname = $1
      AND n.nspname = 'public'
      AND c.contype = 'c'
    `, [tableName]);
    
    console.log(`\nCheck constraints in ${tableName}:`);
    checksResult.rows.forEach(check => {
      console.log(`- ${check.constraint_name}: ${check.constraint_definition}`);
    });
    
    // Get enum types used in the table
    const enumTypesQuery = `
      SELECT 
        a.attname as column_name,
        t.typname as type_name
      FROM pg_type t
      JOIN pg_enum e ON e.enumtypid = t.oid
      JOIN pg_catalog.pg_attribute a ON a.atttypid = t.oid
      JOIN pg_catalog.pg_class c ON c.oid = a.attrelid
      WHERE c.relname = $1
      GROUP BY a.attname, t.typname
    `;
    
    const enumResult = await client.query(enumTypesQuery, [tableName]);
    
    if (enumResult.rows.length > 0) {
      console.log('\nEnum types used:');
      for (const enumType of enumResult.rows) {
        console.log(`\nColumn ${enumType.column_name} uses enum type: ${enumType.type_name}`);
        
        // Get the values for this enum type
        const enumValuesQuery = `
          SELECT e.enumlabel
          FROM pg_enum e
          JOIN pg_type t ON e.enumtypid = t.oid
          WHERE t.typname = $1
          ORDER BY e.enumsortorder
        `;
        
        const valuesResult = await client.query(enumValuesQuery, [enumType.type_name]);
        
        console.log('Allowed values:');
        valuesResult.rows.forEach(row => {
          console.log(`- ${row.enumlabel}`);
        });
      }
    }
    
  } catch (err) {
    console.error('Error checking constraints:', err);
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

checkConstraints(tableName); 