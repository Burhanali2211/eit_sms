
# EduSync School Management System

EduSync is a comprehensive school management system designed to streamline educational workflows, enhance communication between students, teachers, and administrators, and provide powerful tools for managing all aspects of school operations.

## Getting Started with PostgreSQL

This guide will help you migrate from the mock data setup to a full PostgreSQL database implementation.

### Prerequisites

- PostgreSQL 13 or higher installed
- Basic understanding of SQL and database concepts
- Node.js and npm installed

### Step 1: Set Up the PostgreSQL Database

1. Install PostgreSQL if you haven't already:
   - **Windows**: Download and run the installer from [postgresql.org](https://www.postgresql.org/download/windows/)
   - **macOS**: Use Homebrew `brew install postgresql`
   - **Linux (Ubuntu/Debian)**: `sudo apt install postgresql postgresql-contrib`

2. Create a new database for EduSync:

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE edusync;

# Connect to the new database
\c edusync
```

### Step 2: Run the SQL Setup Script

1. Use the provided `dashboard_schema.sql` file to set up your database schema:

```bash
# From your command line, navigate to the SQL folder in your project
cd path/to/project/sql

# Run the schema SQL file
psql -U postgres -d edusync -f dashboard_schema.sql

# Run the views SQL file
psql -U postgres -d edusync -f database_views.sql

# (Optional) Load sample data
psql -U postgres -d edusync -f sample_data.sql
```

### Step 3: Configure the Application

1. Set up the environment variables for your PostgreSQL connection:

```
VITE_PG_HOST=localhost
VITE_PG_PORT=5432
VITE_PG_DATABASE=edusync
VITE_PG_USER=postgres
VITE_PG_PASSWORD=your_postgres_password
```

2. If you're deploying to production, ensure these environment variables are set in your hosting environment.

### Step 4: Install PostgreSQL Client Package

Add the PostgreSQL client to your project dependencies:

```bash
npm install pg
npm install @types/pg --save-dev
```

### Step 5: Testing the Connection

After starting your application, check the console logs to ensure the database connection is successful.

## Database Schema Overview

The EduSync database consists of several interconnected tables:

### Core Tables
- **users** - Stores all user accounts with role-based access control
- **students** - Student-specific information linked to users
- **teachers** - Teacher-specific information linked to users
- **classes** - Class/section information
- **courses** - Course curriculum information

### Dashboard Views
The application uses PostgreSQL views to provide optimized data for dashboard displays:
- **student_dashboard_view** - Student-specific statistics and information
- **teacher_dashboard_view** - Teacher-specific statistics and class information
- **financial_dashboard_view** - Financial statistics and budget information
- And many others...

### Row-Level Security (RLS)
The database implements role-based security through PostgreSQL's Row-Level Security feature, ensuring users can only access data appropriate for their role.

## Working with the Database

### Adding Users

To add a new user to the system:

```sql
INSERT INTO users (name, email, password_hash, role) 
VALUES ('User Name', 'user@example.com', 'hashed_password', 'student');
```

Note: In production, ensure passwords are properly hashed using a secure method.

### Working with Dashboard Views

The dashboard views provide pre-aggregated data for the application. For example, to get student dashboard data:

```sql
SELECT * FROM student_dashboard_view WHERE user_id = 'user-uuid';
```

## Troubleshooting

### Connection Issues

- Verify PostgreSQL is running with: `pg_isready`
- Check connection parameters (host, port, username, password)
- Ensure the database exists: `psql -U postgres -c "\l"`
- Check firewall settings if connecting remotely

### Permission Issues

- Verify the database user has appropriate permissions
- For development, you can grant all privileges: `GRANT ALL PRIVILEGES ON DATABASE edusync TO postgres;`

### View Errors

If dashboard views are not showing data:
- Verify the views exist: `\dv` in psql
- Check that tables referenced by views have data: `SELECT COUNT(*) FROM table_name;`
- Ensure user IDs match between tables

## Maintenance

Regular maintenance tasks to keep your database healthy:

1. **Backups**: 
   ```bash
   pg_dump -U postgres edusync > backup_$(date +%Y%m%d).sql
   ```

2. **Vacuum and Analyze** (optimizes database performance):
   ```sql
   VACUUM ANALYZE;
   ```

3. **Check for slow queries**:
   ```sql
   SELECT * FROM pg_stat_activity WHERE state = 'active';
   ```

## Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Node-Postgres Documentation](https://node-postgres.com/)
