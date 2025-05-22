# Database Testing and Verification Guide for SchoolVista

This guide provides commands and tools to test your PostgreSQL database connection, perform CRUD operations, and verify if your SchoolVista application is properly connected to the database.

## Prerequisites

- Node.js installed (v14+)
- npm installed
- PostgreSQL server running

## 1. Set Up Your Environment

First, create a `.env` file in your project root with proper PostgreSQL credentials:

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

## 2. Install Required Dependencies

Run this command to install the necessary Node.js packages:

```bash
npm install pg dotenv
```

## 3. Basic Database Connection Test

We've created a database test tool to verify your connection and perform basic CRUD operations. To use it:

```bash
node database_test.js
```

This will:
- Test connection to your database
- Show database information
- List all tables in the database 
- Count records in key tables
- Test CRUD operations (Create, Read, Update, Delete)

## 4. Monitor Database Connections

To verify if your web application is connecting to the database, we've provided a real-time connection monitor:

```bash
node connection_monitor.js
```

This starts a web server on port 3333. Open http://localhost:3333 in your browser to:
- See all active database connections
- Monitor new connections in real-time
- Check if your web app is establishing connections

**How to use it:**
1. Start the connection monitor in a terminal window
2. In another terminal, start your application: `npm run dev`
3. Navigate to different pages in your application
4. Monitor the connection dashboard to see new connections

## 5. Using PostgreSQL Command Line (Optional)

If you have `psql` installed, you can directly interact with the database:

```bash
# Connect to database
psql -U postgres -d schoolvista

# List all tables
\dt

# Describe a table structure
\d+ users

# Show all databases
\l

# Run a query
SELECT * FROM users LIMIT 5;

# Exit psql
\q
```

## 6. Check Website Database Integration

To verify if your website is properly using the database:

1. **Test Login Functionality:**
   - Log in with a user from the demo data (e.g., admin@schoolvista.example with password 'password123')
   - If login succeeds, the web app is reading from the database

2. **Create New Data:**
   - Create a new user, student, or other record
   - If successful, check the database to see if the record was added

3. **Monitor Network Requests:**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Look for API calls that might interact with the database

4. **Check Server Logs:**
   - Look for database query logs in your server console
   - Error messages will indicate connection problems

## 7. Troubleshooting

If you encounter issues:

1. **Connection Failures:**
   - Ensure PostgreSQL is running
   - Verify credentials in .env file
   - Check database permissions
   - Test connection with the database_test.js tool

2. **Website Not Using Database:**
   - Check if the application is falling back to mock data
   - Verify database connection in server logs
   - Check for error messages in browser console

3. **Data Not Showing/Updating:**
   - Use direct database queries to check if data exists
   - Inspect browser network requests for API responses
   - Look for error messages in server logs

## 8. Common Database Operations

Here are SQL statements for common operations:

```sql
-- Create a new user
INSERT INTO users (name, email, password_hash, role) 
VALUES ('New User', 'new@example.com', 'hash_here', 'student')
RETURNING *;

-- Update a user
UPDATE users 
SET name = 'Updated Name' 
WHERE email = 'new@example.com'
RETURNING *;

-- Delete a user
DELETE FROM users 
WHERE email = 'new@example.com'
RETURNING *;

-- View active connections
SELECT * FROM pg_stat_activity 
WHERE datname = current_database();

-- Get table counts
SELECT 
  (SELECT COUNT(*) FROM users) AS users_count,
  (SELECT COUNT(*) FROM students) AS students_count,
  (SELECT COUNT(*) FROM teachers) AS teachers_count,
  (SELECT COUNT(*) FROM classes) AS classes_count;
```

## 9. Monitoring Tools

For long-term monitoring of your database connection:

1. **Connection Monitor:** Use our provided connection_monitor.js
2. **Database Logs:** Check PostgreSQL logs for connection issues
3. **Application Logs:** Implement logging in your app for database operations

## 10. Database Best Practices

When working with the database:

1. **Use Transactions:** For operations that modify multiple tables
2. **Handle Errors:** Always catch and handle database errors
3. **Use Parameterized Queries:** To prevent SQL injection
4. **Connection Pooling:** Don't create unnecessary connections
5. **Close Connections:** Always release connections after use 