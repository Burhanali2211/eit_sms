
# EduSync Database Schema Updates

This document outlines the core schema design and recent updates to the EduSync database system.

## Core Database Design

The EduSync database follows a normalized design with several key entity groups:

1. **Users and Authentication**
   - Users, roles, and permissions

2. **Academic Structure**
   - Students, teachers, classes, courses, and assignments

3. **Administrative**
   - Financial records, admission applications, system management

4. **Resources**
   - Library items, lab resources, club activities

5. **System Management**
   - System health, backups, logs, and monitoring

## Recent Schema Updates

### 1. Added User Preferences Table
```sql
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  theme VARCHAR(50) DEFAULT 'system',
  notifications_enabled BOOLEAN DEFAULT TRUE,
  email_notifications BOOLEAN DEFAULT TRUE,
  display_mode VARCHAR(50) DEFAULT 'default',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Enhanced System Health Monitoring
Added more detailed metrics and historical data storage for system performance analysis.

### 3. Integrated Audit Logging
All changes to critical tables are now automatically logged with user information, timestamp, and the nature of the change.

## Dashboard Data Flow

Dashboard components now directly map to database views and tables:

1. **Student Dashboard**: Uses `student_dashboard_view`
2. **Teacher Dashboard**: Uses `teacher_dashboard_view`
3. **Admin Dashboards**: Use role-specific views like `financial_dashboard_view`

## Working with Dashboard Data

All dashboard statistics are pre-calculated using database views, making frontend development simpler and more efficient.

## Migration Path

When transitioning from mock data to database-driven data:

1. Replace each mock data function with a corresponding database query
2. Implement proper error handling and loading states
3. Update component state management to reflect database data structure
