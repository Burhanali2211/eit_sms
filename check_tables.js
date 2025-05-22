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

// Required tables and their primary key columns
// This is the list of tables we expect in a fully functional SchoolVista system
const expectedTables = {
  users: ['id'],
  students: ['id'],
  teachers: ['id'],
  classes: ['id'],
  courses: ['id'],
  assignments: ['id'],
  student_assignments: ['student_id', 'assignment_id'],
  notifications: ['id'],
  user_notifications: ['notification_id', 'user_id'],
  calendar_events: ['id'],
  event_participants: ['event_id', 'user_id'],
  financial_records: ['id'],
  library_items: ['id'],
  user_preferences: ['user_id'],
  system_logs: ['id'],
  teacher_classes: ['teacher_id', 'class_id'],
  class_courses: ['class_id', 'course_id'],
  academic_years: ['id'],
  school_terms: ['id'],
  school_settings: ['id'],
  student_attendance: ['id'],
  student_grades: ['id'],
  messages: ['id'],
  message_recipients: ['message_id', 'recipient_id'],
  staff_schedule: ['id'],
  dashboard_widgets: ['id'],
  transportation_routes: ['id'],
  transportation_assignments: ['id'],
  system_activity_logs: ['id'],
  curriculum_data: ['id']
};

// Expected foreign key relationships for integrity validation
const expectedForeignKeys = [
  { table: 'students', column: 'user_id', references: { table: 'users', column: 'id' } },
  { table: 'teachers', column: 'user_id', references: { table: 'users', column: 'id' } },
  { table: 'teacher_classes', column: 'teacher_id', references: { table: 'teachers', column: 'id' } },
  { table: 'teacher_classes', column: 'class_id', references: { table: 'classes', column: 'id' } },
  { table: 'class_courses', column: 'class_id', references: { table: 'classes', column: 'id' } },
  { table: 'class_courses', column: 'course_id', references: { table: 'courses', column: 'id' } },
  { table: 'student_assignments', column: 'student_id', references: { table: 'students', column: 'id' } },
  { table: 'student_assignments', column: 'assignment_id', references: { table: 'assignments', column: 'id' } },
  { table: 'assignments', column: 'course_id', references: { table: 'courses', column: 'id' } },
  { table: 'user_notifications', column: 'user_id', references: { table: 'users', column: 'id' } },
  { table: 'user_notifications', column: 'notification_id', references: { table: 'notifications', column: 'id' } },
  { table: 'event_participants', column: 'user_id', references: { table: 'users', column: 'id' } },
  { table: 'event_participants', column: 'event_id', references: { table: 'calendar_events', column: 'id' } },
  { table: 'user_preferences', column: 'user_id', references: { table: 'users', column: 'id' } },
  { table: 'school_terms', column: 'academic_year_id', references: { table: 'academic_years', column: 'id' } },
  { table: 'student_grades', column: 'student_id', references: { table: 'students', column: 'id' } },
  { table: 'student_grades', column: 'course_id', references: { table: 'courses', column: 'id' } },
  { table: 'student_grades', column: 'term_id', references: { table: 'school_terms', column: 'id' } },
  { table: 'student_attendance', column: 'student_id', references: { table: 'students', column: 'id' } },
  { table: 'student_attendance', column: 'class_id', references: { table: 'classes', column: 'id' } }
];

// Check if a table exists
async function tableExists(client, tableName) {
  const result = await client.query(`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = $1
    )
  `, [tableName]);
  
  return result.rows[0].exists;
}

// Get table details
async function getTableDetails(client, tableName) {
  // Get columns
  const columnsResult = await client.query(`
    SELECT column_name, data_type, is_nullable, column_default
    FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = $1
    ORDER BY ordinal_position
  `, [tableName]);
  
  // Get primary key
  const pkResult = await client.query(`
    SELECT a.attname
    FROM pg_index i
    JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
    WHERE i.indrelid = $1::regclass
    AND i.indisprimary
  `, [tableName]);
  
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
  
  // Get indexes
  const indexesResult = await client.query(`
    SELECT
      i.relname AS index_name,
      a.attname AS column_name
    FROM
      pg_class t,
      pg_class i,
      pg_index ix,
      pg_attribute a
    WHERE
      t.oid = ix.indrelid
      AND i.oid = ix.indexrelid
      AND a.attrelid = t.oid
      AND a.attnum = ANY(ix.indkey)
      AND t.relkind = 'r'
      AND t.relname = $1
    ORDER BY
      i.relname
  `, [tableName]);
  
  return {
    columns: columnsResult.rows,
    primaryKey: pkResult.rows.map(pk => pk.attname),
    foreignKeys: fkResult.rows,
    indexes: indexesResult.rows
  };
}

// Get table row count
async function getTableRowCount(client, tableName) {
  const result = await client.query(`SELECT COUNT(*) FROM ${tableName}`);
  return parseInt(result.rows[0].count);
}

// Check expected tables and their structure
async function checkTables() {
  const client = await pool.connect();
  
  try {
    console.log('🔍 Checking database tables...\n');
    
    // Get all tables in the database
    const tablesResult = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);
    
    const existingTables = tablesResult.rows.map(row => row.table_name);
    
    console.log(`📋 Found ${existingTables.length} tables in the database.`);
    
    // Check missing tables
    const missingTables = Object.keys(expectedTables).filter(table => !existingTables.includes(table));
    
    if (missingTables.length > 0) {
      console.log('\n⚠️ MISSING TABLES:');
      missingTables.forEach(table => {
        console.log(`   - ${table}`);
      });
    } else {
      console.log('\n✅ All expected tables exist.');
    }
    
    // Check existing tables
    console.log('\n🔍 Checking table structures:');
    
    let tableIssues = [];
    
    // Check only existing tables that are also in our expected tables list
    const tablesToCheck = Object.keys(expectedTables).filter(table => existingTables.includes(table));
    
    for (const tableName of tablesToCheck) {
      const details = await getTableDetails(client, tableName);
      const rowCount = await getTableRowCount(client, tableName);
      
      console.log(`\n📊 Table: ${tableName} (${rowCount} rows)`);
      
      // Check primary key
      const expectedPK = expectedTables[tableName];
      const actualPK = details.primaryKey;
      
      if (!arraysEqual(actualPK.sort(), expectedPK.sort())) {
        console.log(`   ⚠️ Primary key issue: Expected [${expectedPK.join(', ')}], found [${actualPK.join(', ')}]`);
        tableIssues.push({
          table: tableName,
          issue: 'primary_key',
          expected: expectedPK,
          actual: actualPK
        });
      } else {
        console.log(`   ✅ Primary key: [${actualPK.join(', ')}]`);
      }
      
      // Check foreign keys for this table
      const expectedFK = expectedForeignKeys.filter(fk => fk.table === tableName);
      
      if (expectedFK.length > 0) {
        let fkIssues = [];
        
        for (const fk of expectedFK) {
          const foundFK = details.foreignKeys.find(
            f => f.column_name === fk.column && 
                 f.foreign_table_name === fk.references.table && 
                 f.foreign_column_name === fk.references.column
          );
          
          if (!foundFK) {
            fkIssues.push(fk);
          }
        }
        
        if (fkIssues.length > 0) {
          console.log(`   ⚠️ Missing foreign key constraints:`);
          fkIssues.forEach(fk => {
            console.log(`     - ${fk.column} → ${fk.references.table}(${fk.references.column})`);
          });
          
          tableIssues.push({
            table: tableName,
            issue: 'foreign_keys',
            missingForeignKeys: fkIssues
          });
        } else {
          console.log(`   ✅ Foreign key constraints: All ${expectedFK.length} found`);
        }
      }
      
      // Print columns for reference
      console.log(`   Columns:`);
      details.columns.forEach(col => {
        console.log(`     - ${col.column_name} (${col.data_type}, ${col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'})`);
      });
    }
    
    // Generate fix script if issues found
    if (missingTables.length > 0 || tableIssues.length > 0) {
      console.log('\n📝 ISSUES DETECTED - Generating fix script...');
      
      let fixScript = '-- SchoolVista Database Fix Script\n\n';
      
      // Fix for missing tables
      if (missingTables.length > 0) {
        fixScript += '-- Creating missing tables\n\n';
        
        // Add missing tables
        for (const tableName of missingTables) {
          fixScript += generateCreateTableScript(tableName);
        }
      }
      
      // Fix for table issues
      if (tableIssues.length > 0) {
        fixScript += '\n-- Fixing table issues\n\n';
        
        for (const issue of tableIssues) {
          if (issue.issue === 'primary_key') {
            fixScript += generateFixPrimaryKeyScript(issue);
          } else if (issue.issue === 'foreign_keys') {
            fixScript += generateFixForeignKeysScript(issue);
          }
        }
      }
      
      // Write fix script to file
      fs.writeFileSync('database_fix.sql', fixScript);
      console.log('\n✨ Fix script generated: database_fix.sql');
    } else {
      console.log('\n✅ All table structures validated. No issues found.');
    }
    
    // Check views
    const viewsResult = await client.query(`
      SELECT table_name
      FROM information_schema.views
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log(`\n📋 Database Views (${viewsResult.rows.length}):`);
    viewsResult.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });
    
  } catch (err) {
    console.error('Error checking tables:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

// Helper function to compare arrays
function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// Generate CREATE TABLE script
function generateCreateTableScript(tableName) {
  switch (tableName) {
    case 'users':
      return `CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'teacher', 'principal', 'admin', 'financial', 'admission', 'school-admin', 'labs', 'club', 'library', 'super-admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);\n\n`;
    
    case 'students':
      return `CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  roll_number VARCHAR(50) NOT NULL UNIQUE,
  grade VARCHAR(20) NOT NULL,
  section VARCHAR(10) NOT NULL,
  attendance_percentage NUMERIC(5,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);\n\n`;
    
    case 'teachers':
      return `CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);\n\n`;
    
    // Add more cases as needed for other tables
    
    default:
      return `-- Template for table ${tableName} (customize as needed)\nCREATE TABLE ${tableName} (\n  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n  name VARCHAR(255),\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n);\n\n`;
  }
}

// Generate script to fix primary key
function generateFixPrimaryKeyScript(issue) {
  const { table, expected, actual } = issue;
  
  let script = `-- Fix primary key for ${table}\n`;
  
  // Drop existing primary key
  if (actual.length > 0) {
    script += `ALTER TABLE ${table} DROP CONSTRAINT IF EXISTS ${table}_pkey;\n`;
  }
  
  // Add new primary key
  if (expected.length === 1) {
    script += `ALTER TABLE ${table} ADD PRIMARY KEY (${expected[0]});\n\n`;
  } else {
    script += `ALTER TABLE ${table} ADD PRIMARY KEY (${expected.join(', ')});\n\n`;
  }
  
  return script;
}

// Generate script to fix foreign keys
function generateFixForeignKeysScript(issue) {
  const { table, missingForeignKeys } = issue;
  
  let script = `-- Fix foreign keys for ${table}\n`;
  
  missingForeignKeys.forEach(fk => {
    const constraintName = `${table}_${fk.column}_fkey`;
    script += `ALTER TABLE ${table} ADD CONSTRAINT ${constraintName} FOREIGN KEY (${fk.column}) REFERENCES ${fk.references.table}(${fk.references.column})`;
    
    // Add ON DELETE action if needed (adjust as needed)
    if (fk.onDelete) {
      script += ` ON DELETE ${fk.onDelete}`;
    } else {
      // Default to CASCADE for user relationships, RESTRICT for others
      if (fk.references.table === 'users') {
        script += ` ON DELETE CASCADE`;
      } else {
        script += ` ON DELETE RESTRICT`;
      }
    }
    
    script += `;\n`;
  });
  
  script += '\n';
  return script;
}

// Execute the check
console.log('🚀 SchoolVista Database Table Checker');
console.log('=====================================\n');
checkTables(); 