
-- Create views for dashboard display data

-- Student Dashboard View
CREATE OR REPLACE VIEW student_dashboard_view AS
SELECT 
    s.id as student_id, 
    u.id as user_id,
    u.name,
    u.email,
    s.roll_number,
    s.grade,
    s.section,
    s.attendance_percentage,
    s.performance_grade,
    (SELECT COUNT(*) FROM student_assignments sa JOIN assignments a ON sa.assignment_id = a.id 
     WHERE sa.student_id = s.id AND sa.status = 'pending' AND a.due_date >= CURRENT_DATE) as pending_assignments,
    (SELECT COUNT(*) FROM student_assignments sa JOIN assignments a ON sa.assignment_id = a.id 
     WHERE sa.student_id = s.id AND a.due_date < CURRENT_DATE AND sa.status != 'completed') as overdue_assignments,
    (SELECT COUNT(*) FROM calendar_events e JOIN event_participants ep ON e.id = ep.event_id 
     WHERE ep.user_id = u.id AND e.event_date >= CURRENT_DATE) as upcoming_events,
    (SELECT COUNT(*) FROM user_notifications un WHERE un.user_id = u.id AND un.is_read = FALSE) as unread_notifications
FROM 
    students s
JOIN 
    users u ON s.user_id = u.id;

-- Teacher Dashboard View
CREATE OR REPLACE VIEW teacher_dashboard_view AS
SELECT 
    t.id as teacher_id, 
    u.id as user_id,
    u.name,
    u.email,
    t.subject,
    (SELECT COUNT(*) FROM teacher_classes tc WHERE tc.teacher_id = t.id) as class_count,
    (SELECT COUNT(*) FROM teacher_classes tc 
     JOIN classes c ON tc.class_id = c.id 
     JOIN students s ON s.grade = c.grade AND s.section = c.section) as student_count,
    (SELECT AVG(s.attendance_percentage) FROM teacher_classes tc 
     JOIN classes c ON tc.class_id = c.id 
     JOIN students s ON s.grade = c.grade AND s.section = c.section
     WHERE tc.teacher_id = t.id) as average_attendance,
    (SELECT COUNT(*) FROM calendar_events e JOIN event_participants ep ON e.id = ep.event_id 
     WHERE ep.user_id = u.id AND e.event_date >= CURRENT_DATE) as upcoming_events,
    (SELECT COUNT(*) FROM user_notifications un WHERE un.user_id = u.id AND un.is_read = FALSE) as unread_notifications
FROM 
    teachers t
JOIN 
    users u ON t.user_id = u.id;

-- Financial Dashboard View
CREATE OR REPLACE VIEW financial_dashboard_view AS
SELECT
    (SELECT SUM(amount) FROM financial_records WHERE type = 'fee' AND record_date >= date_trunc('month', CURRENT_DATE)) as monthly_revenue,
    (SELECT SUM(amount) FROM financial_records WHERE (type = 'expense' OR type = 'salary') AND record_date >= date_trunc('month', CURRENT_DATE)) as monthly_expenses,
    (SELECT SUM(amount) FROM financial_records WHERE type = 'fee' AND status = 'paid') - 
    (SELECT SUM(amount) FROM financial_records WHERE (type = 'expense' OR type = 'salary') AND status = 'paid') as current_balance,
    (SELECT SUM(amount) FROM financial_records WHERE type = 'fee' AND status IN ('pending', 'overdue')) as pending_fees,
    (SELECT COUNT(*) FROM financial_records WHERE status = 'pending') as pending_transactions;

-- Admission Dashboard View
CREATE OR REPLACE VIEW admission_dashboard_view AS
SELECT
    (SELECT COUNT(*) FROM admission_applications WHERE submitted_at >= CURRENT_DATE - INTERVAL '7 days') as new_applications_this_week,
    (SELECT COUNT(*) FROM admission_applications WHERE status = 'approved') * 100.0 / 
    NULLIF((SELECT COUNT(*) FROM admission_applications WHERE status IN ('approved', 'rejected')), 0) as acceptance_rate,
    (SELECT COUNT(*) FROM admission_applications WHERE status = 'pending') as pending_reviews,
    (SELECT COUNT(*) FROM students) * 100.0 / 
    (SELECT COALESCE(MAX(capacity), 1) FROM (VALUES(1350)) as school_capacity(capacity)) as enrollment_percentage;

-- Library Dashboard View
CREATE OR REPLACE VIEW library_dashboard_view AS
SELECT
    (SELECT COUNT(*) FROM library_items) as total_books,
    (SELECT COUNT(*) FROM library_items WHERE NOT available) as checked_out_books,
    (SELECT COUNT(*) FROM library_items WHERE created_at >= date_trunc('month', CURRENT_DATE)) as new_acquisitions,
    (SELECT COUNT(*) FROM library_items WHERE NOT available AND due_date < CURRENT_DATE) as overdue_books;

-- Lab Resources Dashboard View
CREATE OR REPLACE VIEW lab_resources_dashboard_view AS
SELECT
    (SELECT COUNT(*) FROM lab_resources) as total_resources,
    (SELECT SUM(available) * 100.0 / NULLIF(SUM(quantity), 0) FROM lab_resources) as utilization_percentage,
    (SELECT COUNT(*) FROM lab_resources WHERE last_maintenance < CURRENT_DATE - INTERVAL '90 days') as maintenance_due_items;

-- Club Activities Dashboard View
CREATE OR REPLACE VIEW club_activities_dashboard_view AS
SELECT
    (SELECT COUNT(*) FROM club_activities WHERE status = 'active') as active_clubs,
    (SELECT SUM(member_count) * 100.0 / NULLIF((SELECT COUNT(*) FROM students), 0) FROM club_activities) as participation_percentage,
    (SELECT COUNT(*) FROM calendar_events e 
     WHERE e.event_date >= CURRENT_DATE 
     AND e.event_date <= CURRENT_DATE + INTERVAL '30 days'
     AND EXISTS (SELECT 1 FROM club_activities ca WHERE ca.name ILIKE '%' || e.title || '%')) as upcoming_events;

-- System Health Dashboard View
CREATE OR REPLACE VIEW system_health_dashboard_view AS
SELECT
    sh.status,
    sh.cpu_usage,
    sh.memory_usage,
    sh.disk_usage,
    sh.network_usage,
    (SELECT COUNT(*) FROM system_services WHERE status = 'online') as online_services,
    (SELECT COUNT(*) FROM system_services WHERE status = 'degraded') as degraded_services,
    (SELECT COUNT(*) FROM system_services WHERE status = 'offline') as offline_services,
    (SELECT MIN(response_time) FROM system_services) as min_response_time,
    (SELECT AVG(response_time) FROM system_services) as avg_response_time,
    (SELECT MAX(response_time) FROM system_services) as max_response_time
FROM
    system_health sh
ORDER BY
    sh.recorded_at DESC
LIMIT 1;

-- Backup Dashboard View
CREATE OR REPLACE VIEW backup_dashboard_view AS
SELECT
    (SELECT COUNT(*) FROM system_backups) as total_backups,
    (SELECT to_char(MAX(backup_date || ' ' || backup_time), 'YYYY-MM-DD HH24:MI:SS') FROM system_backups WHERE status = 'completed') as latest_backup,
    (SELECT COUNT(*) FROM system_backups WHERE status = 'completed' AND backup_date >= CURRENT_DATE - INTERVAL '7 days') as successful_backups_last_week,
    (SELECT COUNT(*) FROM system_backups WHERE status = 'failed' AND backup_date >= CURRENT_DATE - INTERVAL '7 days') as failed_backups_last_week,
    (SELECT COUNT(*) FROM backup_schedules WHERE enabled = true) as active_schedules;
