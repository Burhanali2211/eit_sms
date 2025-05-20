
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
    DROP TABLE IF EXISTS system_health_history CASCADE;
    DROP TABLE IF EXISTS system_health CASCADE;
    DROP TABLE IF EXISTS system_logs CASCADE;
    DROP TABLE IF EXISTS audit_trail CASCADE;
    DROP TABLE IF EXISTS backup_schedules CASCADE;
    DROP TABLE IF EXISTS system_backups CASCADE;
    DROP TABLE IF EXISTS dashboard_settings CASCADE;
    DROP TABLE IF EXISTS system_configuration CASCADE;
    
    -- School resource tables
    DROP TABLE IF EXISTS lab_resources CASCADE;
    DROP TABLE IF EXISTS club_members CASCADE;
    DROP TABLE IF EXISTS club_activities CASCADE;
    DROP TABLE IF EXISTS library_items CASCADE;
    
    -- Administrative tables
    DROP TABLE IF EXISTS admission_applications CASCADE;
    DROP TABLE IF EXISTS financial_record_categories CASCADE;
    DROP TABLE IF EXISTS budget_categories CASCADE;
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
    DROP TABLE IF EXISTS user_preferences CASCADE;
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
    DROP VIEW IF EXISTS user_activity_dashboard_view CASCADE;
    DROP VIEW IF EXISTS configuration_dashboard_view CASCADE;
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

-- User Preferences Table
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  theme VARCHAR(50) DEFAULT 'system',
  notifications_enabled BOOLEAN DEFAULT TRUE,
  email_notifications BOOLEAN DEFAULT TRUE,
  display_mode VARCHAR(50) DEFAULT 'default',
  date_format VARCHAR(50) DEFAULT 'MM/DD/YYYY',
  time_format VARCHAR(50) DEFAULT '12h',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create all the tables from dashboard_schema.sql with appropriate modifications for Supabase
-- ... (include all table definitions from dashboard_schema.sql here) ...
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
  event_type VARCHAR(50) DEFAULT 'general',
  color VARCHAR(50),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Event Participants Junction Table
CREATE TABLE event_participants (
  event_id UUID REFERENCES calendar_events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'going' CHECK (status IN ('going', 'maybe', 'declined')),
  PRIMARY KEY (event_id, user_id)
);

-- Notifications Table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  category VARCHAR(50) DEFAULT 'general',
  priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
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
  category VARCHAR(100),
  payer_payee VARCHAR(255),
  payment_method VARCHAR(100),
  reference_number VARCHAR(100),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Budget Categories Table
CREATE TABLE budget_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  budget_amount NUMERIC(15,2) DEFAULT 0,
  fiscal_year VARCHAR(9) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Financial Records Categories Junction
CREATE TABLE financial_record_categories (
  record_id UUID REFERENCES financial_records(id) ON DELETE CASCADE,
  category_id UUID REFERENCES budget_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (record_id, category_id)
);

-- Admission Applications Table
CREATE TABLE admission_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_name VARCHAR(255) NOT NULL,
  parent_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  grade VARCHAR(20) NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'waitlisted', 'interview')),
  application_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  processed_by UUID REFERENCES users(id),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Library Items Table
CREATE TABLE library_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  isbn VARCHAR(20),
  category VARCHAR(100) NOT NULL,
  subcategory VARCHAR(100),
  publisher VARCHAR(255),
  publication_year INTEGER,
  available BOOLEAN DEFAULT TRUE,
  total_copies INTEGER NOT NULL DEFAULT 1,
  available_copies INTEGER NOT NULL DEFAULT 1,
  location VARCHAR(100),
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
  max_members INTEGER,
  fee NUMERIC(10,2) DEFAULT 0,
  start_date DATE,
  end_date DATE,
  status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'inactive', 'planned', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  coordinator_id UUID REFERENCES users(id)
);

-- Club Members Junction Table
CREATE TABLE club_members (
  club_id UUID REFERENCES club_activities(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'member',
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
  purchase_date DATE,
  cost NUMERIC(10,2),
  supplier VARCHAR(255),
  last_maintenance DATE,
  next_maintenance DATE,
  status VARCHAR(50) DEFAULT 'operational',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- System Backups Table
CREATE TABLE system_backups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  backup_date DATE NOT NULL,
  backup_time TIME NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('full', 'incremental', 'differential')),
  size VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  hash VARCHAR(255),
  status VARCHAR(50) NOT NULL CHECK (status IN ('completed', 'failed', 'in-progress', 'verified')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  notes TEXT
);

-- Backup Schedules Table
CREATE TABLE backup_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  frequency VARCHAR(50) NOT NULL CHECK (frequency IN ('daily', 'weekly', 'monthly', 'custom')),
  retention VARCHAR(50) NOT NULL,
  scheduled_time TIME NOT NULL,
  days_of_week VARCHAR(50),
  last_run TIMESTAMP WITH TIME ZONE,
  next_run TIMESTAMP WITH TIME ZONE NOT NULL,
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- System Logs Table
CREATE TABLE system_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  level VARCHAR(50) NOT NULL CHECK (level IN ('info', 'warning', 'error', 'debug', 'critical')),
  message TEXT NOT NULL,
  source VARCHAR(255) NOT NULL,
  ip_address VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_id UUID REFERENCES users(id)
);

-- Audit Trail Table
CREATE TABLE audit_trail (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(50) NOT NULL CHECK (action IN ('create', 'update', 'delete', 'restore', 'login', 'logout', 'add-user', 'remove-user')),
  table_name VARCHAR(100) NOT NULL,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(50),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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

-- System Health History Table
CREATE TABLE system_health_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  description TEXT,
  status VARCHAR(50) NOT NULL CHECK (status IN ('online', 'offline', 'degraded', 'maintenance')),
  response_time INTEGER NOT NULL,
  uptime_percentage NUMERIC(5,2) DEFAULT 100.0,
  last_incident TIMESTAMP WITH TIME ZONE,
  is_critical BOOLEAN DEFAULT FALSE,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Dashboard Settings Table
CREATE TABLE dashboard_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  layout JSONB,
  visible_widgets JSONB,
  refresh_interval INTEGER DEFAULT 300,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- System Configuration Table
CREATE TABLE system_configuration (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL DEFAULT 'string',
  is_secure BOOLEAN DEFAULT FALSE,
  is_editable BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_financial_records_type ON financial_records(type);
CREATE INDEX idx_financial_records_status ON financial_records(status);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_system_logs_level ON system_logs(level);
CREATE INDEX idx_system_logs_created_at ON system_logs(created_at);
CREATE INDEX idx_audit_trail_action ON audit_trail(action);
CREATE INDEX idx_audit_trail_timestamp ON audit_trail(timestamp);
CREATE INDEX idx_system_health_history_recorded_at ON system_health_history(recorded_at);

-- Supabase specific - create audit trigger function
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Create audit trail logging function
CREATE OR REPLACE FUNCTION log_audit_trail()
RETURNS TRIGGER AS $$
DECLARE
  old_values JSONB = NULL;
  new_values JSONB = NULL;
BEGIN
  IF (TG_OP = 'UPDATE') THEN
    old_values = to_jsonb(OLD);
    new_values = to_jsonb(NEW);
  ELSIF (TG_OP = 'INSERT') THEN
    new_values = to_jsonb(NEW);
  ELSIF (TG_OP = 'DELETE') THEN
    old_values = to_jsonb(OLD);
  END IF;

  INSERT INTO audit_trail (
    user_id,
    action,
    table_name,
    record_id,
    old_values,
    new_values,
    ip_address
  ) VALUES (
    auth.uid(),
    CASE 
      WHEN TG_OP = 'INSERT' THEN 'create'
      WHEN TG_OP = 'UPDATE' THEN 'update'
      WHEN TG_OP = 'DELETE' THEN 'delete'
      ELSE TG_OP
    END,
    TG_TABLE_NAME,
    CASE 
      WHEN TG_OP = 'DELETE' THEN OLD.id
      ELSE NEW.id
    END,
    old_values,
    new_values,
    request.header('X-Forwarded-For')
  );
  
  RETURN NULL;
END;
$$ language 'plpgsql' SECURITY DEFINER;

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
CREATE TRIGGER update_dashboard_settings_timestamp BEFORE UPDATE ON dashboard_settings FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_system_configuration_timestamp BEFORE UPDATE ON system_configuration FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER update_user_preferences_timestamp BEFORE UPDATE ON user_preferences FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

-- Add audit trail triggers to key tables
CREATE TRIGGER users_audit_trail AFTER INSERT OR UPDATE OR DELETE ON users
  FOR EACH ROW EXECUTE PROCEDURE log_audit_trail();
  
CREATE TRIGGER financial_records_audit_trail AFTER INSERT OR UPDATE OR DELETE ON financial_records
  FOR EACH ROW EXECUTE PROCEDURE log_audit_trail();
  
CREATE TRIGGER admission_applications_audit_trail AFTER INSERT OR UPDATE OR DELETE ON admission_applications
  FOR EACH ROW EXECUTE PROCEDURE log_audit_trail();
  
CREATE TRIGGER system_configuration_audit_trail AFTER UPDATE OR DELETE ON system_configuration
  FOR EACH ROW EXECUTE PROCEDURE log_audit_trail();

-- Create the dashboard views
-- ... (include all view definitions from database_views.sql here) ...
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

-- All additional views from database_views.sql follow here
-- ... other views ...

-- RLS Policies for Supabase
-- Enable row level security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
-- Continue for all tables...

-- Create policies for users table
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (auth.uid() = id);
    
CREATE POLICY "Admins can view all users" ON users
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'super-admin', 'principal', 'school-admin'))
    );

CREATE POLICY "Admins can update users" ON users
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'super-admin'))
    );

-- Create policies for students table
CREATE POLICY "Students can view their own data" ON students
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND id = user_id)
    );
    
CREATE POLICY "Teachers can view their students" ON students
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM teachers t 
            JOIN teacher_classes tc ON t.id = tc.teacher_id
            JOIN classes c ON tc.class_id = c.id
            WHERE t.user_id = auth.uid() AND students.grade = c.grade AND students.section = c.section
        )
    );

CREATE POLICY "Admins can view all students" ON students
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'super-admin', 'principal', 'school-admin'))
    );
