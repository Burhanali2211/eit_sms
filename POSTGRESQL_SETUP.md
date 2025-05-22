# PostgreSQL Setup for SchoolVista Unify

This guide will walk you through setting up PostgreSQL for the SchoolVista Unify application.

## Prerequisites

- PostgreSQL 12+ installed on your system or server
- Basic understanding of SQL and database management
- Access to a terminal or command prompt

## Step 1: Install PostgreSQL

If you haven't already installed PostgreSQL, you can download it from the official website:
https://www.postgresql.org/download/

Follow the installation instructions for your operating system.

## Step 2: Create the Database

1. Open a terminal/command prompt and connect to PostgreSQL:

```bash
# For Windows (using psql if it's in your PATH)
psql -U postgres

# For Linux/Mac
sudo -u postgres psql
```

2. Create a new database for the application:

```sql
CREATE DATABASE schoolvista;
```

3. Connect to the newly created database:

```sql
\c schoolvista
```

## Step 3: Run the Schema Creation Scripts

Run the following SQL scripts in order to set up the database schema:

1. First, run the main schema script:

```bash 
# Using psql command line
psql -U postgres -d schoolvista -f sql/dashboard_schema.sql

# Or if you're already in psql
\i sql/dashboard_schema.sql
```

2. Then, run the additional tables script:

```bash
psql -U postgres -d schoolvista -f sql/dashboard_tables_update.sql

# Or if you're already in psql
\i sql/dashboard_tables_update.sql
```

3. Next, create the database views:

```bash
psql -U postgres -d schoolvista -f sql/database_views.sql

# Or if you're already in psql
\i sql/database_views.sql
```

4. Finally, run the demo data script (optional, for testing):

```bash
psql -U postgres -d schoolvista -f sql/demo_data.sql

# Or if you're already in psql
\i sql/demo_data.sql
```

## Step 4: Set Up Environment Variables

1. Create a `.env` file in the root of your project based on this template:

```
# PostgreSQL Database Connection
VITE_PG_HOST=localhost
VITE_PG_PORT=5432
VITE_PG_DATABASE=schoolvista
VITE_PG_USER=postgres
VITE_PG_PASSWORD=YourPasswordHere
VITE_PG_SSL=false

# Application Config
VITE_APP_NAME=SchoolVista
VITE_APP_ENV=development
```

2. Update the values with your actual PostgreSQL credentials.

## Step 5: Verify the Connection

1. Start the development server:

```bash
npm run dev
```

2. The application should now be connected to your PostgreSQL database.
3. Check the console logs for database connection information.

## Troubleshooting

### Connection Issues

If you encounter connection issues:

1. Verify your PostgreSQL service is running
2. Check that your credentials in the `.env` file are correct
3. Ensure the database exists and is accessible
4. Check for firewall issues if connecting to a remote database

### Schema Issues

If you encounter schema-related errors:

1. Make sure all scripts ran successfully without errors
2. Check that you ran the scripts in the correct order
3. Verify that the database user has appropriate permissions

## Using Mock Data for Development

If you can't connect to PostgreSQL or want to develop without a database:

1. The application is designed to fall back to mock data when a database connection is not available
2. This behavior is controlled by the `shouldUseMockData()` function in `src/utils/database/config.ts`

## Backup & Restore

To backup your database:

```bash
pg_dump -U postgres -d schoolvista > backup_filename.sql
```

To restore from a backup:

```bash
psql -U postgres -d schoolvista < backup_filename.sql
```

## Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Node-Postgres Documentation](https://node-postgres.com/) 