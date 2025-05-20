
# EduSync Database Implementation Guide

This guide provides step-by-step instructions for implementing the EduSync database system for the dashboard, making it fully controllable from the database. This can work with both PostgreSQL and Supabase.

## Setup Instructions

### Option 1: Using PostgreSQL Directly

1. Install PostgreSQL (version 13 or higher recommended)
2. Create a new database called `edusync`
3. Run the `dashboard_schema.sql` script to create the database structure
4. Run the `sample_data.sql` script to populate the database with initial data
5. Configure your application to connect to the PostgreSQL database

### Option 2: Using Supabase

1. Create a new Supabase project
2. In the SQL editor, run the `supabase-to-postgresql.sql` script
3. This script sets up the database structure and RLS policies
4. Run the `sample_data.sql` script to add initial data
5. Use the Supabase client to connect your application

## Database Migration Strategy

When moving from mock data to a real database implementation, follow these steps:

1. Replace mock data fetching functions with actual API calls to the database
2. Use environment variables to control whether to use mock data or real data
3. Implement proper data validation and error handling for database operations
4. Set up proper authentication and authorization

## Database Views

The `database_views.sql` file contains SQL views that aggregate data for dashboard displays. These views simplify frontend development by providing pre-calculated statistics.

## Connection Setup

### For PostgreSQL Direct Connection:
```typescript
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'edusync',
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432')
});

export default pool;
```

### For Supabase Connection:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
```

## CRUD Operations Implementation

The dashboard is designed to perform CRUD (Create, Read, Update, Delete) operations on all data shown. Each dashboard section has corresponding database tables, and the frontend should implement proper data fetching and mutation operations.

For example, to fetch financial records:

```typescript
// Using PostgreSQL
const getFinancialRecords = async () => {
  const result = await pool.query('SELECT * FROM financial_records ORDER BY record_date DESC');
  return result.rows;
}

// Using Supabase
const getFinancialRecords = async () => {
  const { data, error } = await supabase
    .from('financial_records')
    .select('*')
    .order('record_date', { ascending: false });
    
  if (error) throw error;
  return data;
}
```

## Data Update Strategy

For real-time updates:

1. Implement WebSocket connections or polling mechanisms
2. Use Supabase's real-time subscriptions if using Supabase
3. Update the UI whenever data changes in the database

## Production Considerations

1. Implement connection pooling for production PostgreSQL use
2. Set up database backups and recovery procedures
3. Implement proper indexing strategy for performance optimization
4. Monitor database performance and optimize queries as needed
