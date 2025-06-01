
-- Sample data for EduSync database
-- Run this after running complete_schema.sql

-- Insert sample school
INSERT INTO schools (id, name, address, phone, email, established_date, website) VALUES
('11111111-1111-1111-1111-111111111111', 'EduSync High School', '123 Education Street, Learning City, LC 12345', '+1-555-0100', 'info@edusync-high.edu', '1995-08-15', 'https://edusync-high.edu');

-- Insert sample users
INSERT INTO users (id, email, password_hash, name, role, phone, address) VALUES
('22222222-2222-2222-2222-222222222222', 'admin@edusync.com', '$2b$10$example_hash_admin', 'Admin User', 'admin', '+1-555-0101', '123 Admin St'),
('33333333-3333-3333-3333-333333333333', 'principal@edusync.com', '$2b$10$example_hash_principal', 'Principal Smith', 'principal', '+1-555-0102', '456 Principal Ave'),
('44444444-4444-4444-4444-444444444444', 'teacher@edusync.com', '$2b$10$example_hash_teacher', 'Teacher Johnson', 'teacher', '+1-555-0103', '789 Teacher Blvd'),
('55555555-5555-5555-5555-555555555555', 'student@edusync.com', '$2b$10$example_hash_student', 'Student Wilson', 'student', '+1-555-0104', '321 Student Rd'),
('66666666-6666-6666-6666-666666666666', 'parent@edusync.com', '$2b$10$example_hash_parent', 'Parent Davis', 'parent', '+1-555-0105', '654 Parent St'),
('77777777-7777-7777-7777-777777777777', 'librarian@edusync.com', '$2b$10$example_hash_librarian', 'Librarian Brown', 'library', '+1-555-0106', '987 Library Lane'),
('88888888-8888-8888-8888-888888888888', 'lab@edusync.com', '$2b$10$example_hash_lab', 'Lab Manager Green', 'labs', '+1-555-0107', '147 Lab Street');

-- Update school with principal
UPDATE schools SET principal_id = '33333333-3333-3333-3333-333333333333' WHERE id = '11111111-1111-1111-1111-111111111111';

-- Insert departments
INSERT INTO departments (id, name, description, head_id, school_id) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Mathematics', 'Mathematics Department', '44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Science', 'Science Department', '44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'English', 'English Department', '44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111');

-- Insert classes
INSERT INTO classes (id, name, grade, section, subject, teacher_id, department_id, room_number, capacity) VALUES
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Math 101', '10', 'A', 'Mathematics', '44444444-4444-4444-4444-444444444444', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Room 101', 30),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Physics 101', '10', 'A', 'Physics', '44444444-4444-4444-4444-444444444444', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Room 201', 25),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'English 101', '10', 'A', 'English', '44444444-4444-4444-4444-444444444444', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Room 301', 28);

-- Insert teachers
INSERT INTO teachers (id, user_id, employee_id, department_id, qualification, experience_years, hire_date) VALUES
('gggggggg-gggg-gggg-gggg-gggggggggggg', '44444444-4444-4444-4444-444444444444', 'EMP001', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'M.Ed Mathematics', 5, '2020-08-15');

-- Insert students
INSERT INTO students (id, user_id, student_id, grade, section, class_id, parent_contact) VALUES
('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', '55555555-5555-5555-5555-555555555555', 'STU001', '10', 'A', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '+1-555-0105');

-- Insert bus routes
INSERT INTO bus_routes (id, route_name, driver_name, driver_contact, vehicle_number, capacity, current_latitude, current_longitude) VALUES
('iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', 'Route A - Downtown', 'John Smith', '+1-555-0201', 'SCH-001', 40, 40.7128, -74.0060),
('jjjjjjjj-jjjj-jjjj-jjjj-jjjjjjjjjjjj', 'Route B - Suburbs', 'Sarah Johnson', '+1-555-0202', 'SCH-002', 35, 40.7058, -74.0100);

-- Insert bus stops
INSERT INTO bus_stops (id, name, latitude, longitude, route_id, stop_order, estimated_time) VALUES
('kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk', 'Main Street', 40.7138, -74.0050, 'iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', 1, '08:15:00'),
('llllllll-llll-llll-llll-llllllllllll', 'Oak Avenue', 40.7068, -74.0110, 'jjjjjjjj-jjjj-jjjj-jjjj-jjjjjjjjjjjj', 1, '08:20:00');

-- Insert library books
INSERT INTO library_books (id, isbn, title, author, publisher, publication_year, category, total_copies, available_copies) VALUES
('mmmmmmmm-mmmm-mmmm-mmmm-mmmmmmmmmmmm', '978-0134685991', 'Effective Java', 'Joshua Bloch', 'Addison-Wesley', 2017, 'Programming', 3, 2),
('nnnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnnnn', '978-0321356680', 'Effective C++', 'Scott Meyers', 'Addison-Wesley', 2005, 'Programming', 2, 1);

-- Insert lab equipment
INSERT INTO lab_equipment (id, name, description, category, total_quantity, available_quantity, location, condition) VALUES
('oooooooo-oooo-oooo-oooo-oooooooooooo', 'Microscope', 'Digital Microscope with 1000x magnification', 'Biology', 10, 8, 'Biology Lab 1', 'excellent'),
('pppppppp-pppp-pppp-pppp-pppppppppppp', 'Oscilloscope', 'Digital Storage Oscilloscope', 'Physics', 5, 4, 'Physics Lab 1', 'good');

-- Insert notifications
INSERT INTO notifications (id, user_id, title, message, type) VALUES
('qqqqqqqq-qqqq-qqqq-qqqq-qqqqqqqqqqqq', '55555555-5555-5555-5555-555555555555', 'Welcome to EduSync', 'Welcome to the EduSync school management system!', 'info'),
('rrrrrrrr-rrrr-rrrr-rrrr-rrrrrrrrrrrr', '44444444-4444-4444-4444-444444444444', 'New Assignment', 'Please grade the recent Math 101 assignment.', 'info');
