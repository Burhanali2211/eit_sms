
-- EduSync Dashboard Database Schema

-- Enable UUID extension for unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

-- Indexes for performance
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_financial_records_type ON financial_records(type);
CREATE INDEX idx_financial_records_status ON financial_records(status);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_system_logs_level ON system_logs(level);
CREATE INDEX idx_system_logs_created_at ON system_logs(created_at);

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
