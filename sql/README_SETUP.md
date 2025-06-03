
# EduSync Database Setup Guide

This guide will help you set up the complete PostgreSQL database for the EduSync dashboard application.

## Prerequisites

1. **PostgreSQL** installed and running on your system
2. **psql** command line tool available
3. **Node.js** for the backend server
4. **Admin/Superuser** access to PostgreSQL

## Quick Setup (Recommended)

Run this single command to set up everything:

```bash
psql -U postgres -f sql/setup_complete_database.sql
```

## Manual Setup (Step by Step)

If you prefer to run each script individually:

```bash
# 1. Initialize database and extensions
psql -U postgres -f sql/00_initialize_database.sql

# 2. Create all core tables
psql -U postgres -f sql/01_create_core_tables.sql

# 3. Insert sample data
psql -U postgres -f sql/02_insert_sample_data.sql

# 4. Create dashboard views
psql -U postgres -f sql/03_create_dashboard_views.sql
```

## Environment Configuration

1. **Update your `.env` file** with your PostgreSQL credentials:

```env
# PostgreSQL Database Credentials
VITE_PG_HOST=localhost
VITE_PG_PORT=5432
VITE_PG_DATABASE=edusync
VITE_PG_USER=postgres
VITE_PG_PASSWORD=your_password_here

# Backend Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=edusync
DB_USER=postgres
DB_PASSWORD=your_password_here

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

2. **Backend .env file** (create `backend/.env`):

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=edusync
DB_USER=postgres
DB_PASSWORD=your_password_here
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

## Test User Accounts

After setup, you can login with these test accounts (password: `password123`):

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@edusync.com | password123 |
| Principal | principal@edusync.com | password123 |
| Teacher | teacher@edusync.com | password123 |
| Student | student@edusync.com | password123 |
| Parent | parent@edusync.com | password123 |
| Financial | financial@edusync.com | password123 |
| Library | library@edusync.com | password123 |
| Labs | labs@edusync.com | password123 |

## Starting the Application

1. **Install backend dependencies:**
```bash
cd backend
npm install
```

2. **Start the backend server:**
```bash
cd backend
npm start
```

3. **Start the frontend:** (if using Vite)
```bash
npm run dev
```

## Verification

1. **Check database connection:**
```bash
psql -U postgres -d edusync -c "SELECT name, email, role FROM users;"
```

2. **Test API endpoints:**
```bash
curl http://localhost:3001/api/health
```

3. **Access the dashboard:**
Open `http://localhost:8080` in your browser

## Database Structure

The setup creates the following main tables:

- **users** - User accounts and authentication
- **schools** - School information
- **departments** - Academic departments
- **classes** - Class/course information
- **students** - Student profiles and academic data
- **teachers** - Teacher profiles and subjects
- **events** - Calendar events and activities
- **notifications** - System notifications
- **user_notifications** - User-specific notification tracking

## Dashboard Views

Special views created for dashboard statistics:

- **student_dashboard_stats** - Student-specific metrics
- **teacher_dashboard_stats** - Teacher-specific metrics
- **admin_dashboard_stats** - Administrative overview
- **recent_activity** - Recent system activity
- **system_health** - Basic system health metrics

## Troubleshooting

### Common Issues:

1. **Connection refused:**
   - Make sure PostgreSQL is running
   - Check your credentials in `.env`
   - Verify the database exists

2. **Permission denied:**
   - Make sure you have superuser access
   - Try running with `sudo` if needed

3. **Database already exists:**
   - The scripts handle existing databases
   - Drop and recreate if needed: `DROP DATABASE IF EXISTS edusync;`

4. **Backend won't start:**
   - Check `backend/.env` file exists
   - Verify all dependencies installed: `npm install`
   - Check console for database connection errors

### Getting Help:

- Check the console logs for detailed error messages
- Verify all environment variables are set correctly
- Test database connection manually with `psql`

## Next Steps

After successful setup:

1. Explore the dashboard with different user roles
2. Test calendar functionality (create/edit events)
3. Check notifications system
4. Customize the sample data for your needs
5. Add more features as required

The database is now ready for full dashboard functionality!
