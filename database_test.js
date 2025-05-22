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
  database: process.env.VITE_PG_DATABASE || envConfig.VITE_PG_DATABASE || 'schoolvista',
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

// Test connection
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ Successfully connected to PostgreSQL');
    
    // Get database information
    const dbInfoResult = await client.query(`
      SELECT current_database() as database,
             current_user as user,
             version() as version,
             now() as server_time
    `);
    
    console.log('\n📊 Database Information:');
    console.log(dbInfoResult.rows[0]);
    
    // List all tables
    const tablesResult = await client.query(`
      SELECT table_name, table_type
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('\n📋 Tables in database:');
    tablesResult.rows.forEach(row => {
      console.log(`${row.table_name} (${row.table_type})`);
    });
    
    // Select count of records from key tables
    console.log('\n🔢 Record counts:');
    
    for (const table of ['users', 'students', 'teachers', 'classes', 'courses']) {
      try {
        const countResult = await client.query(`SELECT COUNT(*) FROM ${table}`);
        console.log(`${table}: ${countResult.rows[0].count} records`);
      } catch (err) {
        console.log(`${table}: Error - ${err.message}`);
      }
    }

    // Get the valid roles from the check constraint
    try {
      const rolesResult = await client.query(`
        SELECT pg_get_constraintdef(con.oid) as constraint_def
        FROM pg_constraint con
        JOIN pg_class rel ON rel.oid = con.conrelid
        JOIN pg_namespace nsp ON nsp.oid = rel.relnamespace
        WHERE rel.relname = 'users' 
          AND con.conname = 'users_role_check'
          AND nsp.nspname = 'public'
      `);
      
      if (rolesResult.rows.length > 0) {
        console.log('\n📋 User role constraint:');
        console.log(rolesResult.rows[0].constraint_def);
      }
    } catch (err) {
      console.log('Could not retrieve role constraint:', err.message);
    }
    
    client.release();
    
    return true;
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    return false;
  }
}

// CRUD operations test
async function testCrudOperations() {
  console.log('\n🔄 Testing CRUD operations:');
  let testClient;
  
  try {
    testClient = await pool.connect();
    await testClient.query('BEGIN');
    
    // First check what valid roles are available
    const rolesQuery = await testClient.query(`
      SELECT column_name, data_type, is_nullable, 
             col_description((table_schema || '.' || table_name)::regclass::oid, ordinal_position) as description
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'users'
        AND column_name = 'role'
    `);
    
    console.log('\n📊 User role column info:');
    console.log(rolesQuery.rows[0]);
    
    // Try to get valid roles by looking at enum values if it's an enum type
    let validRole = 'student'; // Fallback to a common role
    try {
      // Check if we can get valid roles from pg_enum
      const roleValuesQuery = await testClient.query(`
        SELECT e.enumlabel
        FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid
        JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
        WHERE t.typname = 'role'
      `);
      
      if (roleValuesQuery.rows.length > 0) {
        console.log('\n📊 Available role values:');
        const roleValues = roleValuesQuery.rows.map(r => r.enumlabel);
        console.log(roleValues);
        validRole = roleValues[0]; // Use the first role value
      }
    } catch (err) {
      // Try another approach - check for existing values
      try {
        const existingRolesQuery = await testClient.query(`
          SELECT DISTINCT role FROM users LIMIT 5
        `);
        if (existingRolesQuery.rows.length > 0) {
          validRole = existingRolesQuery.rows[0].role;
        }
      } catch (err2) {
        console.log('Could not determine roles from existing data:', err2.message);
      }
    }
    
    // CREATE: Insert a test user
    console.log(`\n➕ CREATE: Inserting test user with role: ${validRole}...`);
    const insertResult = await testClient.query(`
      INSERT INTO users (name, email, password_hash, role) 
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role
    `, ['Test User', 'test@schoolvista.example', 'test_hash_123', validRole]);
    
    console.log('User created:', insertResult.rows[0]);
    const userId = insertResult.rows[0].id;
    
    // READ: Get the user we just created
    console.log('\n📖 READ: Reading test user...');
    const readResult = await testClient.query(`
      SELECT id, name, email, role FROM users WHERE id = $1
    `, [userId]);
    
    console.log('User read:', readResult.rows[0]);
    
    // UPDATE: Update the test user
    console.log('\n✏️ UPDATE: Updating test user...');
    const updateResult = await testClient.query(`
      UPDATE users SET name = $1 WHERE id = $2
      RETURNING id, name, email, role
    `, ['Test User Updated', userId]);
    
    console.log('User updated:', updateResult.rows[0]);
    
    // DELETE: Delete the test user
    console.log('\n❌ DELETE: Deleting test user...');
    const deleteResult = await testClient.query(`
      DELETE FROM users WHERE id = $1
      RETURNING id
    `, [userId]);
    
    console.log(`User deleted, ID: ${deleteResult.rows[0].id}`);
    
    // ROLLBACK transaction to clean up test data
    await testClient.query('ROLLBACK');
    console.log('\n✅ All CRUD operations successful! (Transaction rolled back)');
    
  } catch (err) {
    if (testClient) {
      await testClient.query('ROLLBACK');
    }
    console.error('❌ CRUD test error:', err.message);
  } finally {
    if (testClient) {
      testClient.release();
    }
  }
}

// Check active connections
async function checkActiveConnections() {
  try {
    const client = await pool.connect();
    
    console.log('\n🔌 Active database connections:');
    const connectionsResult = await client.query(`
      SELECT datname as database, usename as user, 
             application_name, client_addr, state, 
             backend_start, query
      FROM pg_stat_activity
      WHERE datname = current_database()
    `);
    
    console.log(`Total connections: ${connectionsResult.rowCount}`);
    connectionsResult.rows.forEach(conn => {
      console.log(`- ${conn.user}@${conn.database} (${conn.application_name || 'N/A'}) - State: ${conn.state}`);
    });
    
    client.release();
  } catch (err) {
    console.error('❌ Error checking connections:', err.message);
  }
}

// Main execution function
async function main() {
  console.log('🚀 SchoolVista Database Test Tool');
  console.log('=================================\n');
  
  const connected = await testConnection();
  
  if (connected) {
    await testCrudOperations();
    await checkActiveConnections();
    
    // Add monitoring hint
    console.log('\n📊 To monitor database activity in real-time:');
    console.log('1. Connect to database: psql -U postgres -d schoolvista');
    console.log('2. Run: SELECT * FROM pg_stat_activity WHERE datname = current_database();');
    
    console.log('\n📝 Common PostgreSQL commands:');
    console.log('- \\dt: List all tables');
    console.log('- \\d+ table_name: Show table structure');
    console.log('- \\l: List all databases');
    console.log('- \\c database_name: Connect to a database');
    console.log('- \\q: Quit psql');
  }
  
  // End pool
  await pool.end();
}

// Run the main function
main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
}); 