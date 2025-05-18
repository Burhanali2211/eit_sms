
-- EduSync School Management System: Supabase to PostgreSQL Migration Script
-- This script replicates the Supabase schema structure and includes sample data for development

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing tables if they exist (in reverse order of dependency)
DO $$ 
BEGIN
    -- System tables
    DROP TABLE IF EXISTS system_services CASCADE;
    DROP TABLE IF EXISTS system_health CASCADE;
    DROP TABLE IF EXISTS system_logs CASCADE;
    DROP TABLE IF EXISTS backup_schedules CASCADE;
    DROP TABLE IF EXISTS system_backups CASCADE;
    
    -- School resource tables
    DROP TABLE IF EXISTS lab_resources CASCADE;
    DROP TABLE IF EXISTS club_members CASCADE;
    DROP TABLE IF EXISTS club_activities CASCADE;
    DROP TABLE IF EXISTS library_items CASCADE;
    
    -- Administrative tables
    DROP TABLE IF EXISTS admission_applications CASCADE;
    DROP TABLE IF EXISTS financial_records CASCADE;
    DROP TABLE IF EXISTS user_notifications CASCADE;
    DROP TABLE IF EXISTS notifications CASCADE;
    DROP TABLE IF EXISTS event_participants CASCADE;
    DROP TABLE IF EXISTS calendar_events CASCADE;
    DROP TABLE IF EXISTS student_assignments CASCADE;
    DROP TABLE IF EXISTS assignments CASCADE;
    DROP TABLE IF EXISTS student_course_progress CASCADE;
    DROP TABLE IF EXISTS class_courses CASCADE;
    DROP TABLE IF EXISTS course_materials CASCADE;
    DROP TABLE IF EXISTS courses CASCADE;
    DROP TABLE IF EXISTS teacher_classes CASCADE;
    DROP TABLE IF EXISTS classes CASCADE;
    DROP TABLE IF EXISTS teachers CASCADE;
    DROP TABLE IF EXISTS students CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    
    -- Drop views if they exist
    DROP VIEW IF EXISTS student_dashboard_view CASCADE;
    DROP VIEW IF EXISTS teacher_dashboard_view CASCADE;
    DROP VIEW IF EXISTS financial_dashboard_view CASCADE;
    DROP VIEW IF EXISTS admission_dashboard_view CASCADE;
    DROP VIEW IF EXISTS library_dashboard_view CASCADE;
    DROP VIEW IF EXISTS lab_resources_dashboard_view CASCADE;
    DROP VIEW IF EXISTS club_activities_dashboard_view CASCADE;
    DROP VIEW IF EXISTS system_health_dashboard_view CASCADE;
    DROP VIEW IF EXISTS backup_dashboard_view CASCADE;
END $$;

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'teacher', 'principal', 'admin', 'financial', 'admission', 'school-admin', 'labs', 'club', 'library', 'super-admin')),
  avatar VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Students Table
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  roll_number VARCHAR(50) NOT NULL UNIQUE,
  grade VARCHAR(20) NOT NULL,
  section VARCHAR(20) NOT NULL,
  attendance_percentage NUMERIC(5,2) DEFAULT 0,
  performance_grade VARCHAR(5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Teachers Table
CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Classes Table
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  grade VARCHAR(20) NOT NULL,
  section VARCHAR(20) NOT NULL,
  academic_year VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(grade, section, academic_year)
);

-- Teacher Classes Junction Table
CREATE TABLE teacher_classes (
  teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  PRIMARY KEY (teacher_id, class_id)
);

-- Courses Table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Course Materials Table
CREATE TABLE course_materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  file_size VARCHAR(50) NOT NULL,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Class Courses Junction Table
CREATE TABLE class_courses (
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES teachers(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (class_id, course_id)
);

-- Student Course Progress Table
CREATE TABLE student_course_progress (
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  progress_percentage NUMERIC(5,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (student_id, course_id)
);

-- Assignments Table
CREATE TABLE assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Student Assignments Table
CREATE TABLE student_assignments (
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL CHECK (status IN ('not_started', 'pending', 'completed')),
  grade VARCHAR(5),
  submission_date TIMESTAMP WITH TIME ZONE,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (student_id, assignment_id)
);

-- Calendar Events Table
CREATE TABLE calendar_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  event_end_time TIME,
  is_all_day BOOLEAN DEFAULT FALSE,
  location VARCHAR(255),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Event Participants Junction Table
CREATE TABLE event_participants (
  event_id UUID REFERENCES calendar_events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, user_id)
);

-- Notifications Table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_read BOOLEAN DEFAULT FALSE
);

-- User Notifications Junction Table
CREATE TABLE user_notifications (
  notification_id UUID REFERENCES notifications(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY (notification_id, user_id)
);

-- Financial Records Table
CREATE TABLE financial_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(50) NOT NULL CHECK (type IN ('fee', 'expense', 'salary')),
  amount NUMERIC(15,2) NOT NULL,
  record_date DATE NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('paid', 'pending', 'overdue')),
  description TEXT NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Admission Applications Table
CREATE TABLE admission_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_name VARCHAR(255) NOT NULL,
  parent_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  grade VARCHAR(20) NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  processed_by UUID REFERENCES users(id)
);

-- Library Items Table
CREATE TABLE library_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  due_date DATE,
  borrowed_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Club Activities Table
CREATE TABLE club_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  schedule VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  member_count INTEGER DEFAULT 0,
  status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  coordinator_id UUID REFERENCES users(id)
);

-- Club Members Junction Table
CREATE TABLE club_members (
  club_id UUID REFERENCES club_activities(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (club_id, student_id)
);

-- Lab Resources Table
CREATE TABLE lab_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  quantity INTEGER NOT NULL,
  available INTEGER NOT NULL,
  location VARCHAR(255) NOT NULL,
  last_maintenance DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- System Backups Table
CREATE TABLE system_backups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  backup_date DATE NOT NULL,
  backup_time TIME NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('full', 'incremental')),
  size VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('completed', 'failed', 'in-progress')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  notes TEXT
);

-- Backup Schedules Table
CREATE TABLE backup_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  frequency VARCHAR(50) NOT NULL CHECK (frequency IN ('daily', 'weekly', 'monthly')),
  retention VARCHAR(50) NOT NULL,
  scheduled_time TIME NOT NULL,
  last_run TIMESTAMP WITH TIME ZONE,
  next_run TIMESTAMP WITH TIME ZONE NOT NULL,
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- System Logs Table
CREATE TABLE system_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  level VARCHAR(50) NOT NULL CHECK (level IN ('info', 'warning', 'error', 'debug')),
  message TEXT NOT NULL,
  source VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_id UUID REFERENCES users(id)
);

-- System Health Table
CREATE TABLE system_health (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  status VARCHAR(50) NOT NULL CHECK (status IN ('healthy', 'warning', 'critical')),
  cpu_usage NUMERIC(5,2) NOT NULL,
  memory_usage NUMERIC(5,2) NOT NULL,
  disk_usage NUMERIC(5,2) NOT NULL,
  network_usage NUMERIC(5,2) NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- System Services Table
CREATE TABLE system_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('online', 'offline', 'degraded')),
  response_time INTEGER NOT NULL,
  last_incident TIMESTAMP WITH TIME ZONE,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create audit trigger function
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Add update triggers to all tables with updated_at column
CREATE TRIGGER update_users_timestamp BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_students_timestamp BEFORE UPDATE ON students FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_teachers_timestamp BEFORE UPDATE ON teachers FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_classes_timestamp BEFORE UPDATE ON classes FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_courses_timestamp BEFORE UPDATE ON courses FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_course_materials_timestamp BEFORE UPDATE ON course_materials FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_student_course_progress_timestamp BEFORE UPDATE ON student_course_progress FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_assignments_timestamp BEFORE UPDATE ON assignments FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_student_assignments_timestamp BEFORE UPDATE ON student_assignments FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_calendar_events_timestamp BEFORE UPDATE ON calendar_events FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_financial_records_timestamp BEFORE UPDATE ON financial_records FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_admission_applications_timestamp BEFORE UPDATE ON admission_applications FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_library_items_timestamp BEFORE UPDATE ON library_items FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_club_activities_timestamp BEFORE UPDATE ON club_activities FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_lab_resources_timestamp BEFORE UPDATE ON lab_resources FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_backup_schedules_timestamp BEFORE UPDATE ON backup_schedules FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

-- Create indexes for performance
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_financial_records_type ON financial_records(type);
CREATE INDEX idx_financial_records_status ON financial_records(status);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_system_logs_level ON system_logs(level);
CREATE INDEX idx_system_logs_created_at ON system_logs(created_at);

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

-- Other dashboard views...
-- ... keep existing views for the other dashboards (admission, library, lab resources, club activities, system health, backup)

-- Insert sample demo data
-- Users - password is 'password123' (in a real system use proper hashing)
INSERT INTO users (id, name, email, password_hash, role, created_at) VALUES
('11111111-1111-1111-1111-111111111111', 'Admin User', 'admin@edusync.com', '$2a$10$kIqR/PvYsJa4ViN3YU46E.QcfV2PFEZvNvf6zSMeRULm0UwjPnT6W', 'super-admin', '2025-04-01'),
('22222222-2222-2222-2222-222222222222', 'Principal Smith', 'principal@edusync.com', '$2a$10$kIqR/PvYsJa4ViN3YU46E.QcfV2PFEZvNvf6zSMeRULm0UwjPnT6W', 'principal', '2025-04-01'),
('33333333-3333-3333-3333-333333333333', 'Teacher Johnson', 'teacher@edusync.com', '$2a$10$kIqR/PvYsJa4ViN3YU46E.QcfV2PFEZvNvf6zSMeRULm0UwjPnT6W', 'teacher', '2025-04-02'),
('44444444-4444-4444-4444-444444444444', 'Student Alex', 'student@edusync.com', '$2a$10$kIqR/PvYsJa4ViN3YU46E.QcfV2PFEZvNvf6zSMeRULm0UwjPnT6W', 'student', '2025-04-03'),
('55555555-5555-5555-5555-555555555555', 'Finance Manager', 'finance@edusync.com', '$2a$10$kIqR/PvYsJa4ViN3YU46E.QcfV2PFEZvNvf6zSMeRULm0UwjPnT6W', 'financial', '2025-04-04'),
('66666666-6666-6666-6666-666666666666', 'Admission Officer', 'admission@edusync.com', '$2a$10$kIqR/PvYsJa4ViN3YU46E.QcfV2PFEZvNvf6zSMeRULm0UwjPnT6W', 'admission', '2025-04-05'),
('77777777-7777-7777-7777-777777777777', 'School Admin', 'schooladmin@edusync.com', '$2a$10$kIqR/PvYsJa4ViN3YU46E.QcfV2PFEZvNvf6zSMeRULm0UwjPnT6W', 'school-admin', '2025-04-06'),
('88888888-8888-8888-8888-888888888888', 'Lab Manager', 'labs@edusync.com', '$2a$10$kIqR/PvYsJa4ViN3YU46E.QcfV2PFEZvNvf6zSMeRULm0UwjPnT6W', 'labs', '2025-04-07'),
('99999999-9999-9999-9999-999999999999', 'Club Coordinator', 'clubs@edusync.com', '$2a$10$kIqR/PvYsJa4ViN3YU46E.QcfV2PFEZvNvf6zSMeRULm0UwjPnT6W', 'club', '2025-04-08'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Librarian', 'library@edusync.com', '$2a$10$kIqR/PvYsJa4ViN3YU46E.QcfV2PFEZvNvf6zSMeRULm0UwjPnT6W', 'library', '2025-04-09');

-- Continue with the rest of the sample data inserts from the existing mock data
-- ... insert students, teachers, classes, courses, etc.

-- Create RLS (Row Level Security) policies similar to Supabase
-- Enable row level security on tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
-- Continue for all tables...

-- Create policies for different user roles
-- For example, a policy for users to see only their own data:
CREATE POLICY user_see_own ON users
    FOR SELECT
    USING (id = current_user_id() OR current_user_is_admin());

-- Function to check if current user is an admin
CREATE OR REPLACE FUNCTION current_user_is_admin()
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM users 
        WHERE id = current_user_id() 
        AND role IN ('admin', 'super-admin')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get current user ID (will need to be implemented based on your authentication method)
CREATE OR REPLACE FUNCTION current_user_id()
RETURNS uuid AS $$
BEGIN
    -- This would need to be adjusted based on how you implement authentication
    -- In Supabase this would use auth.uid()
    RETURN NULL; -- Placeholder
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Additional functions for authentication
-- These would need to be implemented based on your authentication system
-- For example, functions to check user roles:
CREATE OR REPLACE FUNCTION is_teacher()
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM users 
        WHERE id = current_user_id() 
        AND role = 'teacher'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comment explaining how to extend these functions
COMMENT ON FUNCTION current_user_id() IS 'Replace this function with your actual authentication implementation';
