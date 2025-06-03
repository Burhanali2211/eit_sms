
-- EduSync Sample Data Insertion Script
-- Run this after creating core tables

\c edusync;

-- Insert sample users with bcrypt hashed passwords (password: "password123")
INSERT INTO users (email, password_hash, name, role, phone, address, avatar_url) VALUES
('admin@edusync.com', '$2b$10$8K1p/a0dWWgY1NzHJjFQqOe8X0Y8Rz2lNj8x9qE7vB3pD1mZ5nL2c', 'John Admin', 'admin', '+1234567890', '123 Admin St', 'https://api.dicebear.com/7.x/avatars/svg?seed=admin'),
('principal@edusync.com', '$2b$10$8K1p/a0dWWgY1NzHJjFQqOe8X0Y8Rz2lNj8x9qE7vB3pD1mZ5nL2c', 'Sarah Principal', 'principal', '+1234567891', '456 Principal Ave', 'https://api.dicebear.com/7.x/avatars/svg?seed=principal'),
('teacher@edusync.com', '$2b$10$8K1p/a0dWWgY1NzHJjFQqOe8X0Y8Rz2lNj8x9qE7vB3pD1mZ5nL2c', 'Mike Teacher', 'teacher', '+1234567892', '789 Teacher Rd', 'https://api.dicebear.com/7.x/avatars/svg?seed=teacher'),
('student@edusync.com', '$2b$10$8K1p/a0dWWgY1NzHJjFQqOe8X0Y8Rz2lNj8x9qE7vB3pD1mZ5nL2c', 'Emma Student', 'student', '+1234567893', '321 Student St', 'https://api.dicebear.com/7.x/avatars/svg?seed=student'),
('parent@edusync.com', '$2b$10$8K1p/a0dWWgY1NzHJjFQqOe8X0Y8Rz2lNj8x9qE7vB3pD1mZ5nL2c', 'Robert Parent', 'parent', '+1234567894', '654 Parent Ave', 'https://api.dicebear.com/7.x/avatars/svg?seed=parent'),
('financial@edusync.com', '$2b$10$8K1p/a0dWWgY1NzHJjFQqOe8X0Y8Rz2lNj8x9qE7vB3pD1mZ5nL2c', 'Lisa Financial', 'financial', '+1234567895', '987 Financial Blvd', 'https://api.dicebear.com/7.x/avatars/svg?seed=financial'),
('library@edusync.com', '$2b$10$8K1p/a0dWWgY1NzHJjFQqOe8X0Y8Rz2lNj8x9qE7vB3pD1mZ5nL2c', 'David Librarian', 'library', '+1234567896', '147 Library St', 'https://api.dicebear.com/7.x/avatars/svg?seed=library'),
('labs@edusync.com', '$2b$10$8K1p/a0dWWgY1NzHJjFQqOe8X0Y8Rz2lNj8x9qE7vB3pD1mZ5nL2c', 'Anna Lab Manager', 'labs', '+1234567897', '258 Lab Ave', 'https://api.dicebear.com/7.x/avatars/svg?seed=labs');

-- Insert sample school
INSERT INTO schools (name, address, phone, email, principal_id) 
SELECT 'EduSync High School', '123 Education Blvd, Learning City', '+1234567800', 'info@edusync.com', id 
FROM users WHERE email = 'principal@edusync.com';

-- Insert sample departments
INSERT INTO departments (name, description, head_id, school_id) 
SELECT 'Mathematics', 'Mathematics Department', u.id, s.id
FROM users u, schools s 
WHERE u.email = 'teacher@edusync.com' AND s.name = 'EduSync High School';

INSERT INTO departments (name, description, school_id) 
SELECT 'Science', 'Science Department', s.id
FROM schools s 
WHERE s.name = 'EduSync High School';

-- Insert sample classes
INSERT INTO classes (name, grade, section, subject, teacher_id, department_id, room_number, capacity)
SELECT 'Mathematics 10A', '10', 'A', 'Mathematics', u.id, d.id, 'Room 101', 30
FROM users u, departments d
WHERE u.email = 'teacher@edusync.com' AND d.name = 'Mathematics';

-- Insert sample students
INSERT INTO students (user_id, student_id, grade, section, class_id, parent_contact, attendance, gpa)
SELECT u.id, 'STU001', '10', 'A', c.id, '+1234567894', 95.50, 3.75
FROM users u, classes c
WHERE u.email = 'student@edusync.com' AND c.name = 'Mathematics 10A';

-- Insert sample teachers
INSERT INTO teachers (user_id, employee_id, subject, qualification, experience_years)
SELECT u.id, 'TEA001', 'Mathematics', 'M.Sc Mathematics', 8
FROM users u
WHERE u.email = 'teacher@edusync.com';

-- Insert sample events
INSERT INTO events (title, description, start_date, end_date, location, event_type, color, created_by, is_public)
SELECT 
  'Mathematics Quiz', 
  'Monthly mathematics assessment for Grade 10', 
  CURRENT_TIMESTAMP + INTERVAL '1 day', 
  CURRENT_TIMESTAMP + INTERVAL '1 day 2 hours', 
  'Room 101', 
  'exam', 
  '#ef4444', 
  u.id, 
  true
FROM users u WHERE u.email = 'teacher@edusync.com';

INSERT INTO events (title, description, start_date, end_date, location, event_type, color, created_by, is_public)
SELECT 
  'Science Fair', 
  'Annual science project exhibition', 
  CURRENT_TIMESTAMP + INTERVAL '7 days', 
  CURRENT_TIMESTAMP + INTERVAL '7 days 8 hours', 
  'Main Hall', 
  'event', 
  '#10b981', 
  u.id, 
  true
FROM users u WHERE u.email = 'principal@edusync.com';

INSERT INTO events (title, description, start_date, end_date, location, event_type, color, created_by, is_public)
SELECT 
  'Parent-Teacher Conference', 
  'Quarterly parent-teacher meeting', 
  CURRENT_TIMESTAMP + INTERVAL '3 days', 
  CURRENT_TIMESTAMP + INTERVAL '3 days 4 hours', 
  'Conference Hall', 
  'meeting', 
  '#3b82f6', 
  u.id, 
  true
FROM users u WHERE u.email = 'principal@edusync.com';

-- Insert sample notifications
INSERT INTO notifications (title, message, type, created_by, action_url)
SELECT 
  'Welcome to EduSync!', 
  'Welcome to the EduSync platform. Explore all the features available to you.', 
  'info', 
  u.id, 
  '/dashboard'
FROM users u WHERE u.email = 'admin@edusync.com';

INSERT INTO notifications (title, message, type, created_by, action_url)
SELECT 
  'Upcoming Math Quiz', 
  'Don''t forget about the mathematics quiz scheduled for tomorrow in Room 101.', 
  'warning', 
  u.id, 
  '/dashboard/calendar'
FROM users u WHERE u.email = 'teacher@edusync.com';

INSERT INTO notifications (title, message, type, created_by, action_url)
SELECT 
  'Science Fair Registration', 
  'Science fair registration is now open. Register your projects by the deadline.', 
  'success', 
  u.id, 
  '/dashboard/events'
FROM users u WHERE u.email = 'principal@edusync.com';

-- Create user notifications for all users
INSERT INTO user_notifications (notification_id, user_id, is_read)
SELECT n.id, u.id, false
FROM notifications n
CROSS JOIN users u;

-- Mark some notifications as read for variety
UPDATE user_notifications 
SET is_read = true, read_at = CURRENT_TIMESTAMP 
WHERE user_id IN (SELECT id FROM users WHERE email IN ('admin@edusync.com', 'teacher@edusync.com'))
AND notification_id = (SELECT id FROM notifications WHERE title = 'Welcome to EduSync!' LIMIT 1);

SELECT 'Sample data inserted successfully!' as message;
