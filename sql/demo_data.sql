-- Demo data for SchoolVista - Minimal set for testing
-- Password for all users is 'password123' (this is a hashed version)
-- For a real system, generate proper secure passwords

-- Insert demo users (all passwords are 'password123' in this example)
INSERT INTO users (id, name, email, password_hash, role, created_at, updated_at) VALUES
('11111111-1111-1111-1111-111111111111', 'Admin User', 'admin@schoolvista.example', '$2a$10$dYh0kp1Ks7HAh3e0yT0wPOiXQ1jZFjIHK/m0gE/EZQzY4f/i.pKA2', 'admin', NOW(), NOW()),
('22222222-2222-2222-2222-222222222222', 'Teacher One', 'teacher1@schoolvista.example', '$2a$10$dYh0kp1Ks7HAh3e0yT0wPOiXQ1jZFjIHK/m0gE/EZQzY4f/i.pKA2', 'teacher', NOW(), NOW()),
('33333333-3333-3333-3333-333333333333', 'Student One', 'student1@schoolvista.example', '$2a$10$dYh0kp1Ks7HAh3e0yT0wPOiXQ1jZFjIHK/m0gE/EZQzY4f/i.pKA2', 'student', NOW(), NOW()),
('44444444-4444-4444-4444-444444444444', 'Principal', 'principal@schoolvista.example', '$2a$10$dYh0kp1Ks7HAh3e0yT0wPOiXQ1jZFjIHK/m0gE/EZQzY4f/i.pKA2', 'principal', NOW(), NOW()),
('55555555-5555-5555-5555-555555555555', 'Finance Admin', 'finance@schoolvista.example', '$2a$10$dYh0kp1Ks7HAh3e0yT0wPOiXQ1jZFjIHK/m0gE/EZQzY4f/i.pKA2', 'financial', NOW(), NOW()),
('66666666-6666-6666-6666-666666666666', 'Library Admin', 'library@schoolvista.example', '$2a$10$dYh0kp1Ks7HAh3e0yT0wPOiXQ1jZFjIHK/m0gE/EZQzY4f/i.pKA2', 'library', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert demo teachers
INSERT INTO teachers (id, user_id, subject, created_at, updated_at) VALUES
('a1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'Mathematics', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert demo students
INSERT INTO students (id, user_id, roll_number, grade, section, attendance_percentage, created_at, updated_at) VALUES
('b1111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'S0001', '10', 'A', 93.5, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert demo classes
INSERT INTO classes (id, name, grade, section, academic_year, created_at, updated_at) VALUES
('c1111111-1111-1111-1111-111111111111', 'Class 10-A', '10', 'A', '2025-2026', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert teacher-class relationships
INSERT INTO teacher_classes (teacher_id, class_id) VALUES
('a1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111')
ON CONFLICT DO NOTHING;

-- Insert demo courses
INSERT INTO courses (id, name, code, description, created_at, updated_at) VALUES
('d1111111-1111-1111-1111-111111111111', 'Advanced Mathematics', 'MATH-101', 'Advanced mathematics course for high school students', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert class-course relationships
INSERT INTO class_courses (class_id, course_id, teacher_id) VALUES
('c1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111')
ON CONFLICT DO NOTHING;

-- Insert demo assignments
INSERT INTO assignments (id, course_id, title, description, due_date, created_by, created_at, updated_at) VALUES
('e1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'Week 1 Assignment', 'Complete problems 1-10 from Chapter 1', '2025-09-15', '22222222-2222-2222-2222-222222222222', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert student assignments
INSERT INTO student_assignments (student_id, assignment_id, status, grade, submission_date, created_at, updated_at) VALUES
('b1111111-1111-1111-1111-111111111111', 'e1111111-1111-1111-1111-111111111111', 'completed', 'A', '2025-09-14', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert sample notifications
INSERT INTO notifications (id, title, message, created_at, is_read) VALUES
('f1111111-1111-1111-1111-111111111111', 'Welcome to SchoolVista', 'Welcome to the SchoolVista platform. This is a demo notification.', NOW(), false)
ON CONFLICT DO NOTHING;

-- Link notifications to users
INSERT INTO user_notifications (notification_id, user_id, is_read) VALUES
('f1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', false),
('f1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', false),
('f1111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', false)
ON CONFLICT DO NOTHING;

-- Insert demo calendar events
INSERT INTO calendar_events (id, title, description, event_date, event_time, event_end_time, is_all_day, location, created_by, created_at, updated_at) VALUES
('g1111111-1111-1111-1111-111111111111', 'School Opening Day', 'First day of the new academic year', '2025-09-01', '08:00:00', '14:00:00', true, 'Main Campus', '11111111-1111-1111-1111-111111111111', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert event participants
INSERT INTO event_participants (event_id, user_id, status) VALUES
('g1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'going'),
('g1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'going'),
('g1111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'going')
ON CONFLICT DO NOTHING;

-- Insert demo financial records
INSERT INTO financial_records (id, type, amount, record_date, status, description, created_by, created_at, updated_at) VALUES
('h1111111-1111-1111-1111-111111111111', 'fee', 1500.00, '2025-09-01', 'paid', 'Tuition fee for Fall Semester', '55555555-5555-5555-5555-555555555555', NOW(), NOW()),
('i1111111-1111-1111-1111-111111111111', 'expense', 500.00, '2025-09-05', 'paid', 'School supplies', '55555555-5555-5555-5555-555555555555', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert library items
INSERT INTO library_items (id, title, author, isbn, category, total_copies, available_copies, created_at, updated_at) VALUES
('j1111111-1111-1111-1111-111111111111', 'Advanced Mathematics Textbook', 'John Smith', '978-3-16-148410-0', 'Textbook', 10, 9, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert user preferences
INSERT INTO user_preferences (user_id, theme, notifications_enabled, email_notifications, display_mode) VALUES
('11111111-1111-1111-1111-111111111111', 'dark', true, true, 'default'),
('22222222-2222-2222-2222-222222222222', 'light', true, true, 'default'),
('33333333-3333-3333-3333-333333333333', 'system', true, true, 'default')
ON CONFLICT DO NOTHING;

-- Insert system logs for demo
INSERT INTO system_logs (id, timestamp, level, message, source) VALUES
('k1111111-1111-1111-1111-111111111111', NOW(), 'info', 'System initialized with demo data', 'Migration Script')
ON CONFLICT DO NOTHING; 