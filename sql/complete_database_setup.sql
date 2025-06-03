
-- EduSync Complete Database Setup Script
-- Run this script on your PostgreSQL database to create all necessary tables and data

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS student_fees CASCADE;
DROP TABLE IF EXISTS fee_structures CASCADE;
DROP TABLE IF EXISTS lab_reservations CASCADE;
DROP TABLE IF EXISTS lab_equipment CASCADE;
DROP TABLE IF EXISTS library_checkouts CASCADE;
DROP TABLE IF EXISTS library_books CASCADE;
DROP TABLE IF EXISTS bus_locations CASCADE;
DROP TABLE IF EXISTS student_transportation CASCADE;
DROP TABLE IF EXISTS bus_stops CASCADE;
DROP TABLE IF EXISTS bus_routes CASCADE;
DROP TABLE IF EXISTS attendance CASCADE;
DROP TABLE IF EXISTS grades CASCADE;
DROP TABLE IF EXISTS assignments CASCADE;
DROP TABLE IF EXISTS enrollments CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS classes CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS schools CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table (core authentication and user management)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'super-admin', 'principal', 'school-admin', 'teacher', 'student', 'parent', 'financial', 'library', 'labs')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    avatar_url TEXT,
    phone VARCHAR(20),
    address TEXT,
    date_of_birth DATE,
    emergency_contact VARCHAR(255),
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Schools table
CREATE TABLE schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    principal_id UUID REFERENCES users(id),
    established_date DATE,
    website VARCHAR(255),
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Departments table
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    head_id UUID REFERENCES users(id),
    school_id UUID REFERENCES schools(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Classes table
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    grade VARCHAR(10) NOT NULL,
    section VARCHAR(10) NOT NULL,
    subject VARCHAR(255),
    teacher_id UUID REFERENCES users(id),
    department_id UUID REFERENCES departments(id),
    room_number VARCHAR(50),
    capacity INTEGER DEFAULT 30,
    schedule JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Students table
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    student_id VARCHAR(50) UNIQUE NOT NULL,
    grade VARCHAR(10) NOT NULL,
    section VARCHAR(10) NOT NULL,
    class_id UUID REFERENCES classes(id),
    enrollment_date DATE DEFAULT CURRENT_DATE,
    parent_contact VARCHAR(255),
    medical_info TEXT,
    attendance DECIMAL(5,2) DEFAULT 0.00,
    gpa DECIMAL(3,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transportation tables
CREATE TABLE bus_routes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    route_name VARCHAR(255) NOT NULL,
    driver_name VARCHAR(255) NOT NULL,
    driver_contact VARCHAR(20) NOT NULL,
    vehicle_number VARCHAR(50) NOT NULL,
    capacity INTEGER DEFAULT 40,
    is_active BOOLEAN DEFAULT true,
    estimated_arrival TIME,
    current_latitude DECIMAL(10, 8),
    current_longitude DECIMAL(11, 8),
    last_location_update TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE bus_stops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    estimated_time TIME,
    route_id UUID REFERENCES bus_routes(id) ON DELETE CASCADE,
    stop_order INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) CHECK (type IN ('info', 'warning', 'error', 'success')),
    is_read BOOLEAN DEFAULT false,
    action_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events/Calendar table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(255),
    event_type VARCHAR(50),
    created_by UUID REFERENCES users(id),
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_students_grade_section ON students(grade, section);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read);

-- Insert sample data
INSERT INTO users (email, password_hash, name, role, phone, address) VALUES
('admin@edusync.com', '$2b$10$example_hash', 'John Admin', 'admin', '+1234567890', '123 Admin St'),
('teacher@edusync.com', '$2b$10$example_hash', 'Sarah Teacher', 'teacher', '+1234567891', '456 Teacher Ave'),
('student@edusync.com', '$2b$10$example_hash', 'Mike Student', 'student', '+1234567892', '789 Student Rd');

-- Insert sample school
INSERT INTO schools (name, address, phone, email) VALUES
('EduSync High School', '123 Education Blvd, Learning City', '+1234567800', 'info@edusync.com');

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, type) 
SELECT id, 'Welcome to EduSync', 'Welcome to the EduSync platform!', 'info'
FROM users;

-- Insert sample events
INSERT INTO events (title, description, start_date, end_date, location, event_type, is_public)
VALUES 
('Math Quiz', 'Monthly math assessment', NOW() + INTERVAL '1 day', NOW() + INTERVAL '1 day 2 hours', 'Room 101', 'exam', true),
('Science Fair', 'Annual science project exhibition', NOW() + INTERVAL '7 days', NOW() + INTERVAL '7 days 8 hours', 'Main Hall', 'event', true);

-- Insert sample bus routes
INSERT INTO bus_routes (route_name, driver_name, driver_contact, vehicle_number, capacity, is_active)
VALUES 
('Route A - Downtown', 'Bob Driver', '+1234567810', 'BUS-001', 40, true),
('Route B - Suburbs', 'Alice Driver', '+1234567811', 'BUS-002', 35, true);

-- Create dashboard views
CREATE OR REPLACE VIEW student_dashboard_view AS
SELECT 
    u.id as user_id,
    'total_classes' as metric,
    COALESCE(COUNT(DISTINCT c.id), 0) as value,
    'Enrolled Classes' as label,
    'Classes you are enrolled in' as description
FROM users u
LEFT JOIN students s ON u.id = s.user_id
LEFT JOIN classes c ON s.class_id = c.id
WHERE u.role = 'student'
GROUP BY u.id
UNION ALL
SELECT 
    u.id as user_id,
    'attendance' as metric,
    COALESCE(s.attendance, 0) as value,
    'Attendance %' as label,
    'Your attendance percentage' as description
FROM users u
LEFT JOIN students s ON u.id = s.user_id
WHERE u.role = 'student';

CREATE OR REPLACE VIEW teacher_dashboard_view AS
SELECT 
    u.id as user_id,
    'total_classes' as metric,
    COALESCE(COUNT(DISTINCT c.id), 0) as value,
    'Classes Teaching' as label,
    'Classes you are teaching' as description
FROM users u
LEFT JOIN classes c ON u.id = c.teacher_id
WHERE u.role = 'teacher'
GROUP BY u.id
UNION ALL
SELECT 
    u.id as user_id,
    'total_students' as metric,
    COALESCE(COUNT(DISTINCT s.id), 0) as value,
    'Total Students' as label,
    'Students in your classes' as description
FROM users u
LEFT JOIN classes c ON u.id = c.teacher_id
LEFT JOIN students s ON c.id = s.class_id
WHERE u.role = 'teacher'
GROUP BY u.id;

CREATE OR REPLACE VIEW admin_dashboard_view AS
SELECT 
    'total_users' as metric,
    COUNT(*) as value,
    'Total Users' as label,
    'Total users in the system' as description
FROM users
UNION ALL
SELECT 
    'total_students' as metric,
    COUNT(*) as value,
    'Total Students' as label,
    'Total students enrolled' as description
FROM students
UNION ALL
SELECT 
    'total_teachers' as metric,
    COUNT(*) as value,
    'Total Teachers' as label,
    'Total teachers in the system' as description
FROM users WHERE role = 'teacher';

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON departments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bus_routes_updated_at BEFORE UPDATE ON bus_routes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMIT;
