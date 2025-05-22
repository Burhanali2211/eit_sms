# Database Integration Guide for SchoolVista Unify

This guide explains how to ensure your SchoolVista Unify application is properly configured to use PostgreSQL as the primary data source instead of mock data.

## Overview

The application is designed with a dual-mode data layer:
1. **PostgreSQL Mode**: Connects to a real database for production use
2. **Mock Data Mode**: Uses in-memory data for development without a database

## Prerequisites

- PostgreSQL database set up following the instructions in `POSTGRESQL_SETUP.md`
- `.env` file with proper database credentials 
- Node.js and npm installed

## Configuration Steps

### 1. Create the .env File

Create a `.env` file in the project root with your database credentials:

```
# PostgreSQL Database Connection
VITE_PG_HOST=localhost
VITE_PG_PORT=5432
VITE_PG_DATABASE=schoolvista
VITE_PG_USER=postgres
VITE_PG_PASSWORD=YourPasswordHere
VITE_PG_SSL=false

# Application Config
VITE_APP_ENV=development
```

### 2. Verify Database Connection Logic

The application's database connection is handled in `src/utils/database/config.ts`. 

The key components are:
- `DatabasePool` class: Manages PostgreSQL connections
- `shouldUseMockData()` function: Determines when to use mock data

The application will automatically try to connect to PostgreSQL first, then fall back to mock data if the connection fails.

### 3. Using Database Hooks

To query the database, use these hooks:

1. **useDatabase**: Basic connection and query
   ```tsx
   const { data, isLoading, error } = useDatabase('SELECT * FROM users');
   ```

2. **useDatabaseTable**: For CRUD operations on tables
   ```tsx
   const { data, isLoading, error, create, update, remove } = useDatabaseTable('users');
   ```

3. **useDatabaseView**: For database views
   ```tsx
   const { data, isLoading, error } = useDatabaseView('student_dashboard_view');
   ```

### 4. Testing Database Connectivity

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Check console logs for database connection messages:
   - "PostgreSQL configuration loaded..." indicates success
   - "Database connection failed..." indicates failure and fallback to mock data

3. Use the application and verify data is being saved/loaded from the database

### 5. Updating Database Schema as You Develop

As you develop new features, you may need to update the database schema:

1. Create a new SQL file (e.g., `schema_update_YYYY_MM_DD.sql`) with your changes
2. Include necessary ALTER TABLE, CREATE TABLE, or other SQL statements
3. Run the script against your database
4. Update your TypeScript types to match the schema changes

Example workflow:
```sql
-- schema_update_2025_06_01.sql
ALTER TABLE users ADD COLUMN last_login TIMESTAMP WITH TIME ZONE;
CREATE INDEX idx_users_last_login ON users(last_login);
```

### 6. Troubleshooting Database Issues

#### Connection Problems

If you're having trouble connecting:

1. Verify PostgreSQL is running:
   ```bash
   # Windows
   sc query postgresql
   
   # Linux/Mac
   systemctl status postgresql
   ```

2. Check if you can connect manually:
   ```bash
   psql -U postgres -d schoolvista
   ```

3. Verify .env values match your PostgreSQL configuration

#### Data Not Appearing in the UI

If your database is connected but data isn't showing:

1. Check the application is actually using the database (not mock data)
2. Verify the tables contain data with direct SQL queries
3. Look for errors in console logs when data is being loaded
4. Ensure your SQL queries are correct in the application code

## Converting from Mock Data to Real Data

As you develop components using mock data, you'll need to update them to use real database data:

1. Replace hardcoded mock data with database hooks:

   ```tsx
   // Before (with mock data)
   const students = mockStudents;
   
   // After (with database)
   const { data: students, isLoading } = useDatabaseTable('students');
   ```

2. Add loading states to your components:

   ```tsx
   if (isLoading) {
     return <LoadingSpinner />;
   }
   ```

3. Add error handling:

   ```tsx
   if (error) {
     return <ErrorMessage message={error.message} />;
   }
   ```

## Best Practices

1. **Typed Data**: Use TypeScript interfaces for all database results
2. **Parameterized Queries**: Always use parameters instead of string concatenation
3. **Transaction Support**: Use transactions for multi-step operations
4. **Connection Management**: Don't create unnecessary database connections
5. **Error Handling**: Implement proper error handling for database operations
6. **Migrations**: Manage database schema changes with a proper migration system

## Advanced: Moving to a Full ORM

For larger applications, consider replacing direct SQL with an ORM like:

- **Prisma**: Type-safe database client with migrations
- **TypeORM**: ORM with decorator support
- **Sequelize**: Feature-rich ORM

This can provide additional type safety and developer experience improvements. 