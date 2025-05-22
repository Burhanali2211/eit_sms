-- Additional tables and views for SchoolVista Dashboard
-- This script adds tables that are referenced in the UI but missing from the main schema

-- Enable extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- System Activity Logs Table (for SystemLogs.tsx)
CREATE TABLE IF NOT EXISTS system_activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  log_type VARCHAR(50) NOT NULL CHECK (log_type IN ('info', 'warning', 'error', 'critical', 'security')),
  action VARCHAR(255) NOT NULL,
  details TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  occurred_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on log type for faster filtering
CREATE INDEX IF NOT EXISTS idx_system_activity_logs_type ON system_activity_logs(log_type);
CREATE INDEX IF NOT EXISTS idx_system_activity_logs_occurred_at ON system_activity_logs(occurred_at);

-- Curriculum Data Table (for course planning)
CREATE TABLE IF NOT EXISTS curriculum_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  grade VARCHAR(20) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  term VARCHAR(50) NOT NULL,
  topic VARCHAR(255) NOT NULL,
  description TEXT,
  learning_outcomes TEXT[],
  resources TEXT[],
  assessment_methods TEXT[],
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- School Calendar Academic Years
CREATE TABLE IF NOT EXISTS academic_years (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year_name VARCHAR(100) NOT NULL UNIQUE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_current BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_dates CHECK (end_date > start_date)
);

-- School Terms (Semesters)
CREATE TABLE IF NOT EXISTS school_terms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  academic_year_id UUID REFERENCES academic_years(id) ON DELETE CASCADE,
  term_name VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_current BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_term_dates CHECK (end_date > start_date)
);

-- School Configuration Settings
CREATE TABLE IF NOT EXISTS school_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_name VARCHAR(255) NOT NULL,
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(255),
  website VARCHAR(255),
  logo_url VARCHAR(255),
  school_colors JSONB,
  timezone VARCHAR(50) DEFAULT 'UTC',
  currency VARCHAR(10) DEFAULT 'USD',
  attendance_calculation_method VARCHAR(50) DEFAULT 'daily',
  grading_scale JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Student Attendance Table
CREATE TABLE IF NOT EXISTS student_attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  attendance_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused')),
  notes TEXT,
  recorded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, class_id, attendance_date)
);

-- Student Grades Table
CREATE TABLE IF NOT EXISTS student_grades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  term_id UUID REFERENCES school_terms(id) ON DELETE CASCADE,
  grade_value VARCHAR(5) NOT NULL,
  score NUMERIC(5,2),
  comments TEXT,
  graded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, course_id, term_id)
);

-- Communication Messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  sender_id UUID REFERENCES users(id) ON DELETE SET NULL,
  message_type VARCHAR(50) NOT NULL CHECK (message_type IN ('email', 'sms', 'notification', 'announcement')),
  attachment_urls TEXT[],
  is_draft BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Message Recipients Junction Table
CREATE TABLE IF NOT EXISTS message_recipients (
  message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES users(id) ON DELETE CASCADE,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY (message_id, recipient_id)
);

-- Staff Schedule
CREATE TABLE IF NOT EXISTS staff_schedule (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  class_id UUID REFERENCES classes(id),
  course_id UUID REFERENCES courses(id),
  room VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Dashboard Widgets Configuration
CREATE TABLE IF NOT EXISTS dashboard_widgets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  widget_type VARCHAR(100) NOT NULL,
  widget_title VARCHAR(255) NOT NULL,
  widget_data JSONB,
  position_x INTEGER NOT NULL,
  position_y INTEGER NOT NULL,
  width INTEGER NOT NULL DEFAULT 1,
  height INTEGER NOT NULL DEFAULT 1,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Transportation Routes
CREATE TABLE IF NOT EXISTS transportation_routes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  route_name VARCHAR(255) NOT NULL,
  vehicle_id VARCHAR(50),
  driver_name VARCHAR(255),
  driver_contact VARCHAR(100),
  route_stops JSONB,
  departure_time TIME,
  return_time TIME,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Transportation Assignments
CREATE TABLE IF NOT EXISTS transportation_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  route_id UUID REFERENCES transportation_routes(id) ON DELETE CASCADE,
  pickup_stop VARCHAR(255),
  dropoff_stop VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create views for dashboard display

-- School Overview Dashboard View
CREATE OR REPLACE VIEW school_overview_dashboard_view AS
SELECT
    (SELECT COUNT(*) FROM students) as total_students,
    (SELECT COUNT(*) FROM teachers) as total_teachers,
    (SELECT COUNT(*) FROM classes) as total_classes,
    (SELECT COUNT(*) FROM courses) as total_courses,
    (SELECT AVG(attendance_percentage) FROM students) as average_attendance,
    (SELECT jsonb_object_agg(grade, cnt) FROM (SELECT grade, COUNT(*) as cnt FROM students GROUP BY grade) as grade_counts) as students_by_grade,
    (SELECT jsonb_object_agg(subject, cnt) FROM (SELECT subject, COUNT(*) as cnt FROM teachers GROUP BY subject) as subject_counts) as teachers_by_subject,
    (SELECT jsonb_object_agg(status, cnt) FROM (SELECT status, COUNT(*) as cnt FROM student_assignments GROUP BY status) as assignment_status) as assignments_by_status;

-- Staff Dashboard View
CREATE OR REPLACE VIEW staff_dashboard_view AS
SELECT
    (SELECT COUNT(*) FROM users WHERE role IN ('teacher', 'admin', 'principal', 'financial', 'admission', 'library')) as total_staff,
    (SELECT jsonb_object_agg(role, cnt) FROM (SELECT role, COUNT(*) as cnt FROM users WHERE role IN ('teacher', 'admin', 'principal', 'financial', 'admission', 'library') GROUP BY role) as role_counts) as staff_by_role,
    (SELECT jsonb_object_agg(subject, cnt) FROM (SELECT subject, COUNT(*) as cnt FROM teachers GROUP BY subject) as subject_counts) as teachers_by_subject,
    (SELECT jsonb_object_agg(to_char(created_at, 'YYYY-MM'), cnt) FROM (SELECT DATE_TRUNC('month', created_at) as created_at, COUNT(*) as cnt FROM users WHERE role IN ('teacher', 'admin', 'principal', 'financial', 'admission', 'library') GROUP BY DATE_TRUNC('month', created_at) ORDER BY DATE_TRUNC('month', created_at) DESC LIMIT 12) as monthly_counts) as staff_hiring_trend;

-- Update trigger for new tables
CREATE TRIGGER update_curriculum_data_timestamp BEFORE UPDATE ON curriculum_data FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_academic_years_timestamp BEFORE UPDATE ON academic_years FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_school_terms_timestamp BEFORE UPDATE ON school_terms FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_school_settings_timestamp BEFORE UPDATE ON school_settings FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_student_attendance_timestamp BEFORE UPDATE ON student_attendance FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_student_grades_timestamp BEFORE UPDATE ON student_grades FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_messages_timestamp BEFORE UPDATE ON messages FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_staff_schedule_timestamp BEFORE UPDATE ON staff_schedule FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_dashboard_widgets_timestamp BEFORE UPDATE ON dashboard_widgets FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_transportation_routes_timestamp BEFORE UPDATE ON transportation_routes FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_transportation_assignments_timestamp BEFORE UPDATE ON transportation_assignments FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

-- Add audit trail triggers for important tables
CREATE TRIGGER school_settings_audit_trail AFTER INSERT OR UPDATE OR DELETE ON school_settings
  FOR EACH ROW EXECUTE PROCEDURE log_audit_trail();

CREATE TRIGGER student_grades_audit_trail AFTER INSERT OR UPDATE OR DELETE ON student_grades
  FOR EACH ROW EXECUTE PROCEDURE log_audit_trail();

-- Insert default demo school settings
INSERT INTO school_settings 
(school_name, address, phone, email, website, logo_url, school_colors, timezone, currency, grading_scale)
VALUES 
('SchoolVista Academy', '123 Education Street, Knowledge City', '+1-555-123-4567', 'info@schoolvista.example.com', 'https://schoolvista.example.com', 
 '/assets/logo.png', 
 '{"primary": "#4f46e5", "secondary": "#0ea5e9", "accent": "#f59e0b", "text": "#1e293b", "background": "#f8fafc"}',
 'America/New_York', 'USD',
 '{"A": {"min": 90, "max": 100}, "B": {"min": 80, "max": 89}, "C": {"min": 70, "max": 79}, "D": {"min": 60, "max": 69}, "F": {"min": 0, "max": 59}}'
)
ON CONFLICT DO NOTHING;

-- Insert current academic year if it doesn't exist
INSERT INTO academic_years 
(year_name, start_date, end_date, is_current)
VALUES 
('2025-2026', '2025-08-01', '2026-06-30', true)
ON CONFLICT DO NOTHING;

-- Insert school terms
INSERT INTO school_terms 
(academic_year_id, term_name, start_date, end_date, is_current)
VALUES 
((SELECT id FROM academic_years WHERE is_current = true LIMIT 1), 'Fall Semester', '2025-08-01', '2025-12-20', true),
((SELECT id FROM academic_years WHERE is_current = true LIMIT 1), 'Spring Semester', '2026-01-05', '2026-06-30', false)
ON CONFLICT DO NOTHING; 