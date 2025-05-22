# SchoolVista Database Management Guide

This guide explains how to manage, monitor, and maintain your PostgreSQL database for the SchoolVista application.

## Database Status Summary

Based on our analysis, your SchoolVista database is:

- ✅ **Connected and working**: We successfully connected to your `edusync` PostgreSQL database
- ✅ **Schema complete**: All 30 expected tables are present (along with 2 views)  
- ✅ **Structure valid**: Tables have correct primary keys and foreign key relationships
- ⚠️ **Empty data**: Tables currently have no records (except for academic_years, school_terms, and school_settings)

## Database Management Tools

We've created several Node.js scripts to help you manage your database:

1. **database_test.js** - Tests database connection and CRUD operations
   ```
   node database_test.js
   ```

2. **check_tables.js** - Validates database structure and generates fix scripts if needed
   ```
   node check_tables.js
   ```

3. **connection_monitor.js** - Monitors real-time connections to your database
   ```
   node connection_monitor.js
   ```
   
4. **database_load_demo_data.js** - Loads sample data for testing
   ```
   node database_load_demo_data.js
   ```

## Loading Demo Data

To make your application fully functional, load the demo data:

```bash
node database_load_demo_data.js
```

This will populate your database with:
- User accounts (admin, teacher, student, etc.)
- Classes, courses, and assignments
- Sample relationships (teacher-class, student-assignment, etc.)
- All demo accounts use password: `password123`

## Database Connection in Your Application

The application uses a dual-layer approach to data:

1. **PostgreSQL** as the primary data source
2. **Mock data** as a fallback if the database is unavailable

To ensure your application uses the database, make sure:
- Your `.env` file contains correct PostgreSQL credentials
- Your database is running and accessible
- The `shouldUseMockData()` function in your application returns `false`

## Database Structure

Your database has a complete set of tables necessary for a school management system:

### Core Tables
- **users** - User accounts across all roles
- **students** - Student-specific information
- **teachers** - Teacher-specific information
- **classes** - School classes by grade and section
- **courses** - Academic courses offered

### Relationship Tables
- **teacher_classes** - Links teachers to classes
- **class_courses** - Links classes to courses
- **student_assignments** - Tracks student assignments

### Additional Features
- **academic_years**, **school_terms** - Academic calendar
- **financial_records** - Financial tracking
- **library_items** - Library management
- **transportation_routes** - Transportation management
- **dashboard_widgets** - User dashboard customization

## Monitoring Database Activity

1. **Using connection_monitor.js**:
   - Start the monitor: `node connection_monitor.js`
   - Open http://localhost:3333 in your browser
   - Watch for connections when your application is used

2. **Using PostgreSQL Commands**:
   - View active connections: 
     ```sql
     SELECT * FROM pg_stat_activity WHERE datname = current_database();
     ```
   - View table record counts:
     ```sql
     SELECT 
       (SELECT COUNT(*) FROM users) AS users_count,
       (SELECT COUNT(*) FROM students) AS students_count,
       (SELECT COUNT(*) FROM classes) AS classes_count;
     ```

## Backup and Restore

Regularly backup your database:

```bash
# Backup
pg_dump -U postgres -d edusync > edusync_backup_$(date +%Y%m%d).sql

# Restore
psql -U postgres -d edusync < edusync_backup_20250521.sql
```

## Common Issues and Solutions

1. **Empty Tables**: If tables are empty, run `database_load_demo_data.js`

2. **Connection Failed**: 
   - Check if PostgreSQL is running
   - Verify credentials in `.env` file 
   - Ensure firewall allows connection

3. **Missing Tables**:
   - Run `check_tables.js` to identify issues
   - Apply any generated fix scripts

4. **Application Using Mock Data**:
   - Check console logs for "Using mock data" messages
   - Verify database connection is established
   - Look for database-related errors in logs

## Database Scaling Considerations

As your SchoolVista application grows:

1. **Connection Pooling**: The application already uses connection pooling for efficiency

2. **Index Optimization**: Add indexes for commonly queried columns
   ```sql
   CREATE INDEX idx_students_grade ON students(grade);
   CREATE INDEX idx_users_role ON users(role);
   ```

3. **Query Optimization**: Monitor slow queries and optimize them

4. **Regular Maintenance**: Schedule regular VACUUM and ANALYZE operations
   ```sql
   VACUUM ANALYZE;
   ```

## Next Steps

1. **Load Demo Data**: Run `database_load_demo_data.js`
2. **Test Application**: Log in with demo accounts to verify database integration
3. **Monitor Connections**: Use `connection_monitor.js` while testing
4. **Regular Backups**: Implement regular backup schedule 