
-- EduSync Complete Database Setup Script
-- This script sets up the entire database from scratch
-- Make sure PostgreSQL is running and you have superuser access

-- Run all setup scripts in order
\echo 'Starting EduSync database setup...'
\echo ''

\echo 'Step 1: Initializing database...'
\i 00_initialize_database.sql
\echo ''

\echo 'Step 2: Creating core tables...'
\i 01_create_core_tables.sql
\echo ''

\echo 'Step 3: Inserting sample data...'
\i 02_insert_sample_data.sql
\echo ''

\echo 'Step 4: Creating dashboard views...'
\i 03_create_dashboard_views.sql
\echo ''

\echo 'EduSync database setup completed successfully!'
\echo ''
\echo 'You can now:'
\echo '1. Start your backend server: cd backend && npm start'
\echo '2. Access the application at: http://localhost:8080'
\echo '3. Login with test credentials:'
\echo '   - Admin: admin@edusync.com / password123'
\echo '   - Teacher: teacher@edusync.com / password123'
\echo '   - Student: student@edusync.com / password123'
\echo ''
