
-- EduSync Dashboard Views Creation Script
-- Creates views for dashboard statistics and data

\c edusync;

-- Student Dashboard Stats View
CREATE OR REPLACE VIEW student_dashboard_stats AS
SELECT 
    u.id as user_id,
    u.name as student_name,
    s.grade,
    s.section,
    s.attendance,
    s.gpa,
    (SELECT COUNT(*) FROM events e 
     JOIN event_participants ep ON e.id = ep.event_id 
     WHERE ep.user_id = u.id AND e.start_date >= CURRENT_DATE) as upcoming_events,
    (SELECT COUNT(*) FROM user_notifications un 
     WHERE un.user_id = u.id AND un.is_read = false) as unread_notifications,
    (SELECT COUNT(*) FROM classes c WHERE c.id = s.class_id) as enrolled_classes
FROM users u
JOIN students s ON u.id = s.user_id
WHERE u.role = 'student';

-- Teacher Dashboard Stats View
CREATE OR REPLACE VIEW teacher_dashboard_stats AS
SELECT 
    u.id as user_id,
    u.name as teacher_name,
    t.subject,
    t.experience_years,
    (SELECT COUNT(*) FROM classes c WHERE c.teacher_id = u.id) as classes_teaching,
    (SELECT COUNT(DISTINCT s.id) FROM classes c 
     JOIN students s ON c.id = s.class_id 
     WHERE c.teacher_id = u.id) as total_students,
    (SELECT AVG(s.attendance) FROM classes c 
     JOIN students s ON c.id = s.class_id 
     WHERE c.teacher_id = u.id) as avg_class_attendance,
    (SELECT COUNT(*) FROM events e WHERE e.created_by = u.id AND e.start_date >= CURRENT_DATE) as upcoming_events,
    (SELECT COUNT(*) FROM user_notifications un 
     WHERE un.user_id = u.id AND un.is_read = false) as unread_notifications
FROM users u
JOIN teachers t ON u.id = t.user_id
WHERE u.role = 'teacher';

-- Admin Dashboard Stats View
CREATE OR REPLACE VIEW admin_dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM users) as total_users,
    (SELECT COUNT(*) FROM users WHERE role = 'student') as total_students,
    (SELECT COUNT(*) FROM users WHERE role = 'teacher') as total_teachers,
    (SELECT COUNT(*) FROM classes) as total_classes,
    (SELECT COUNT(*) FROM events WHERE start_date >= CURRENT_DATE) as upcoming_events,
    (SELECT COUNT(*) FROM notifications WHERE created_at >= CURRENT_DATE) as todays_notifications,
    (SELECT AVG(s.attendance) FROM students s) as avg_attendance,
    (SELECT COUNT(*) FROM users WHERE last_login >= CURRENT_DATE - INTERVAL '7 days') as active_users_week;

-- Financial Dashboard Stats View (placeholder for future financial module)
CREATE OR REPLACE VIEW financial_dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM users WHERE role = 'student') as total_students,
    0 as total_fees_collected,
    0 as pending_payments,
    0 as monthly_revenue,
    (SELECT COUNT(*) FROM classes) as billable_classes;

-- Library Dashboard Stats View (placeholder for future library module)
CREATE OR REPLACE VIEW library_dashboard_stats AS
SELECT 
    0 as total_books,
    0 as books_issued,
    0 as overdue_books,
    (SELECT COUNT(*) FROM users WHERE role = 'student') as total_members;

-- Labs Dashboard Stats View (placeholder for future lab module)
CREATE OR REPLACE VIEW labs_dashboard_stats AS
SELECT 
    0 as total_equipment,
    0 as equipment_in_use,
    0 as maintenance_pending,
    (SELECT COUNT(*) FROM classes) as lab_sessions_scheduled;

-- Recent Activity View
CREATE OR REPLACE VIEW recent_activity AS
SELECT 
    'user_registration' as activity_type,
    u.name as activity_description,
    u.created_at as activity_time,
    u.id as related_id
FROM users u
WHERE u.created_at >= CURRENT_DATE - INTERVAL '7 days'

UNION ALL

SELECT 
    'event_creation' as activity_type,
    e.title as activity_description,
    e.created_at as activity_time,
    e.id as related_id
FROM events e
WHERE e.created_at >= CURRENT_DATE - INTERVAL '7 days'

UNION ALL

SELECT 
    'notification_sent' as activity_type,
    n.title as activity_description,
    n.created_at as activity_time,
    n.id as related_id
FROM notifications n
WHERE n.created_at >= CURRENT_DATE - INTERVAL '7 days'

ORDER BY activity_time DESC
LIMIT 20;

-- System Health View (basic system metrics)
CREATE OR REPLACE VIEW system_health AS
SELECT 
    (SELECT COUNT(*) FROM users WHERE last_login >= CURRENT_DATE) as daily_active_users,
    (SELECT COUNT(*) FROM events WHERE created_at >= CURRENT_DATE) as events_created_today,
    (SELECT COUNT(*) FROM notifications WHERE created_at >= CURRENT_DATE) as notifications_sent_today,
    (SELECT COUNT(*) FROM user_notifications WHERE is_read = false) as unread_notifications_total,
    CURRENT_TIMESTAMP as last_updated;

SELECT 'Dashboard views created successfully!' as message;
