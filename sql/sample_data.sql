
-- Insert sample data for EduSync Dashboard

-- Demo Users (with password 'password123' - in a real system use proper hashing)
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

-- Students
INSERT INTO students (id, user_id, roll_number, grade, section, attendance_percentage, performance_grade) VALUES
('11111111-aaaa-aaaa-aaaa-111111111111', '44444444-4444-4444-4444-444444444444', '10A01', '10', 'A', 92, 'A'),
('22222222-aaaa-aaaa-aaaa-222222222222', uuid_generate_v4(), '10A02', '10', 'A', 96, 'A+'),
('33333333-aaaa-aaaa-aaaa-333333333333', uuid_generate_v4(), '10B01', '10', 'B', 88, 'B+'),
('44444444-aaaa-aaaa-aaaa-444444444444', uuid_generate_v4(), '10B02', '10', 'B', 94, 'A-'),
('55555555-aaaa-aaaa-aaaa-555555555555', uuid_generate_v4(), '10C01', '10', 'C', 90, 'B');

-- Teachers
INSERT INTO teachers (id, user_id, subject) VALUES
('11111111-bbbb-bbbb-bbbb-111111111111', '33333333-3333-3333-3333-333333333333', 'Mathematics'),
('22222222-bbbb-bbbb-bbbb-222222222222', uuid_generate_v4(), 'Science'),
('33333333-bbbb-bbbb-bbbb-333333333333', uuid_generate_v4(), 'English'),
('44444444-bbbb-bbbb-bbbb-444444444444', uuid_generate_v4(), 'History'),
('55555555-bbbb-bbbb-bbbb-555555555555', uuid_generate_v4(), 'Computer Science');

-- Classes
INSERT INTO classes (id, name, grade, section, academic_year) VALUES
('11111111-cccc-cccc-cccc-111111111111', 'Class 10A', '10', 'A', '2024-2025'),
('22222222-cccc-cccc-cccc-222222222222', 'Class 10B', '10', 'B', '2024-2025'),
('33333333-cccc-cccc-cccc-333333333333', 'Class 10C', '10', 'C', '2024-2025'),
('44444444-cccc-cccc-cccc-444444444444', 'Class 11A', '11', 'A', '2024-2025'),
('55555555-cccc-cccc-cccc-555555555555', 'Class 11B', '11', 'B', '2024-2025');

-- Teacher Classes
INSERT INTO teacher_classes (teacher_id, class_id) VALUES
('11111111-bbbb-bbbb-bbbb-111111111111', '11111111-cccc-cccc-cccc-111111111111'),
('11111111-bbbb-bbbb-bbbb-111111111111', '22222222-cccc-cccc-cccc-222222222222'),
('11111111-bbbb-bbbb-bbbb-111111111111', '44444444-cccc-cccc-cccc-444444444444'),
('22222222-bbbb-bbbb-bbbb-222222222222', '11111111-cccc-cccc-cccc-111111111111'),
('22222222-bbbb-bbbb-bbbb-222222222222', '33333333-cccc-cccc-cccc-333333333333'),
('22222222-bbbb-bbbb-bbbb-222222222222', '55555555-cccc-cccc-cccc-555555555555'),
('33333333-bbbb-bbbb-bbbb-333333333333', '22222222-cccc-cccc-cccc-222222222222'),
('33333333-bbbb-bbbb-bbbb-333333333333', '33333333-cccc-cccc-cccc-333333333333'),
('44444444-bbbb-bbbb-bbbb-444444444444', '11111111-cccc-cccc-cccc-111111111111'),
('44444444-bbbb-bbbb-bbbb-444444444444', '44444444-cccc-cccc-cccc-444444444444'),
('55555555-bbbb-bbbb-bbbb-555555555555', '22222222-cccc-cccc-cccc-222222222222'),
('55555555-bbbb-bbbb-bbbb-555555555555', '55555555-cccc-cccc-cccc-555555555555');

-- Courses
INSERT INTO courses (id, name, code, description) VALUES
('11111111-dddd-dddd-dddd-111111111111', 'Mathematics', 'MATH101', 'Basic principles of algebra, geometry, and calculus'),
('22222222-dddd-dddd-dddd-222222222222', 'English Literature', 'ENG101', 'Study of classic literary works and authors'),
('33333333-dddd-dddd-dddd-333333333333', 'Physics', 'PHYS101', 'Fundamentals of mechanics, thermodynamics, and optics'),
('44444444-dddd-dddd-dddd-444444444444', 'Computer Science', 'CS101', 'Introduction to programming and computer basics');

-- Course Materials
INSERT INTO course_materials (id, course_id, name, type, file_path, file_size, uploaded_by) VALUES
('11111111-eeee-eeee-eeee-111111111111', '11111111-dddd-dddd-dddd-111111111111', 'Algebra Fundamentals', 'PDF', '/materials/math/algebra-fundamentals.pdf', '1.2 MB', '33333333-3333-3333-3333-333333333333'),
('22222222-eeee-eeee-eeee-222222222222', '11111111-dddd-dddd-dddd-111111111111', 'Calculus Introduction', 'PDF', '/materials/math/calculus-intro.pdf', '2.5 MB', '33333333-3333-3333-3333-333333333333'),
('33333333-eeee-eeee-eeee-333333333333', '11111111-dddd-dddd-dddd-111111111111', 'Weekly Problems Set', 'PDF', '/materials/math/weekly-problems.pdf', '0.8 MB', '33333333-3333-3333-3333-333333333333'),
('44444444-eeee-eeee-eeee-444444444444', '22222222-dddd-dddd-dddd-222222222222', 'Shakespeare Analysis', 'PDF', '/materials/english/shakespeare.pdf', '3.1 MB', '33333333-bbbb-bbbb-bbbb-333333333333'),
('55555555-eeee-eeee-eeee-555555555555', '22222222-dddd-dddd-dddd-222222222222', 'Essay Guidelines', 'DOC', '/materials/english/essay-guidelines.doc', '0.5 MB', '33333333-bbbb-bbbb-bbbb-333333333333'),
('66666666-eeee-eeee-eeee-666666666666', '33333333-dddd-dddd-dddd-333333333333', 'Mechanics Notes', 'PDF', '/materials/physics/mechanics.pdf', '2.4 MB', '22222222-bbbb-bbbb-bbbb-222222222222'),
('77777777-eeee-eeee-eeee-777777777777', '33333333-dddd-dddd-dddd-333333333333', 'Lab Experiment Guide', 'PDF', '/materials/physics/lab-guide.pdf', '1.6 MB', '22222222-bbbb-bbbb-bbbb-222222222222'),
('88888888-eeee-eeee-eeee-888888888888', '33333333-dddd-dddd-dddd-333333333333', 'Formula Sheet', 'PDF', '/materials/physics/formulas.pdf', '0.3 MB', '22222222-bbbb-bbbb-bbbb-222222222222'),
('99999999-eeee-eeee-eeee-999999999999', '44444444-dddd-dddd-dddd-444444444444', 'Algorithm Basics', 'PDF', '/materials/cs/algorithms.pdf', '1.8 MB', '55555555-bbbb-bbbb-bbbb-555555555555'),
('aaaaaaaa-eeee-eeee-eeee-aaaaaaaaaaaa', '44444444-dddd-dddd-dddd-444444444444', 'Programming Exercises', 'ZIP', '/materials/cs/programming.zip', '4.2 MB', '55555555-bbbb-bbbb-bbbb-555555555555'),
('bbbbbbbb-eeee-eeee-eeee-bbbbbbbbbbbb', '44444444-dddd-dddd-dddd-444444444444', 'Project Guidelines', 'DOC', '/materials/cs/project-guidelines.doc', '0.7 MB', '55555555-bbbb-bbbb-bbbb-555555555555');

-- Student Course Progress
INSERT INTO student_course_progress (student_id, course_id, progress_percentage) VALUES
('11111111-aaaa-aaaa-aaaa-111111111111', '11111111-dddd-dddd-dddd-111111111111', 65),
('11111111-aaaa-aaaa-aaaa-111111111111', '22222222-dddd-dddd-dddd-222222222222', 78),
('11111111-aaaa-aaaa-aaaa-111111111111', '33333333-dddd-dddd-dddd-333333333333', 42),
('11111111-aaaa-aaaa-aaaa-111111111111', '44444444-dddd-dddd-dddd-444444444444', 89);

-- Calendar Events
INSERT INTO calendar_events (id, title, event_date, event_time, created_by) VALUES
('11111111-ffff-ffff-ffff-111111111111', 'Math Quiz', '2025-05-12', '10:00:00', '33333333-3333-3333-3333-333333333333'),
('22222222-ffff-ffff-ffff-222222222222', 'Science Project Due', '2025-05-14', '23:59:00', '22222222-bbbb-bbbb-bbbb-222222222222'),
('33333333-ffff-ffff-ffff-333333333333', 'School Assembly', '2025-05-15', '09:00:00', '22222222-2222-2222-2222-222222222222'),
('44444444-ffff-ffff-ffff-444444444444', 'Sports Day', '2025-05-20', '08:00:00', '77777777-7777-7777-7777-777777777777'),
('55555555-ffff-ffff-ffff-555555555555', 'Career Counseling', '2025-05-22', '14:00:00', '22222222-2222-2222-2222-222222222222');

-- Notifications
INSERT INTO notifications (id, title, message, created_at, is_read) VALUES
('11111111-gggg-gggg-gggg-111111111111', 'Exam Schedule Posted', 'The final exam schedule for this semester has been posted.', '2025-05-18 10:00:00', FALSE),
('22222222-gggg-gggg-gggg-222222222222', 'Fee Payment Reminder', 'This is a reminder to pay your term fees before the 15th of this month.', '2025-05-17 14:30:00', TRUE),
('33333333-gggg-gggg-gggg-333333333333', 'New Course Material Available', 'New course materials for Mathematics have been uploaded.', '2025-05-16 09:15:00', TRUE),
('44444444-gggg-gggg-gggg-444444444444', 'School Event Announced', 'Annual Sports Day will be held on the 20th of next month.', '2025-05-15 11:20:00', FALSE),
('55555555-gggg-gggg-gggg-555555555555', 'Parent-Teacher Meeting', 'Parent-teacher meeting scheduled for next Friday.', '2025-05-14 15:45:00', TRUE);

-- User Notifications
INSERT INTO user_notifications (notification_id, user_id, is_read) VALUES
('11111111-gggg-gggg-gggg-111111111111', '44444444-4444-4444-4444-444444444444', FALSE),
('22222222-gggg-gggg-gggg-222222222222', '44444444-4444-4444-4444-444444444444', TRUE),
('33333333-gggg-gggg-gggg-333333333333', '44444444-4444-4444-4444-444444444444', TRUE),
('44444444-gggg-gggg-gggg-444444444444', '44444444-4444-4444-4444-444444444444', FALSE),
('55555555-gggg-gggg-gggg-555555555555', '44444444-4444-4444-4444-444444444444', TRUE);

-- Financial Records
INSERT INTO financial_records (id, type, amount, record_date, status, description, created_by) VALUES
('11111111-hhhh-hhhh-hhhh-111111111111', 'fee', 5000, '2025-04-10', 'paid', 'Term 1 Tuition Fee - Alex Johnson', '55555555-5555-5555-5555-555555555555'),
('22222222-hhhh-hhhh-hhhh-222222222222', 'fee', 5000, '2025-04-12', 'pending', 'Term 1 Tuition Fee - Samantha Lee', '55555555-5555-5555-5555-555555555555'),
('33333333-hhhh-hhhh-hhhh-333333333333', 'expense', 2500, '2025-04-15', 'paid', 'Lab Equipment Purchase', '55555555-5555-5555-5555-555555555555'),
('44444444-hhhh-hhhh-hhhh-444444444444', 'salary', 4500, '2025-04-30', 'pending', 'Teacher Salary - April 2025', '55555555-5555-5555-5555-555555555555'),
('55555555-hhhh-hhhh-hhhh-555555555555', 'fee', 5000, '2025-04-01', 'overdue', 'Term 1 Tuition Fee - David Wilson', '55555555-5555-5555-5555-555555555555');

-- Admission Applications
INSERT INTO admission_applications (id, student_name, parent_name, email, phone, grade, status, submitted_at) VALUES
('11111111-iiii-iiii-iiii-111111111111', 'Olivia Martinez', 'Robert Martinez', 'rmartinez@example.com', '555-123-4567', '9', 'pending', '2025-04-05'),
('22222222-iiii-iiii-iiii-222222222222', 'Noah Thompson', 'Laura Thompson', 'lthompson@example.com', '555-234-5678', '10', 'approved', '2025-04-03'),
('33333333-iiii-iiii-iiii-333333333333', 'Emma Wilson', 'James Wilson', 'jwilson@example.com', '555-345-6789', '11', 'rejected', '2025-04-02'),
('44444444-iiii-iiii-iiii-444444444444', 'Liam Anderson', 'Patricia Anderson', 'panderson@example.com', '555-456-7890', '9', 'pending', '2025-04-06'),
('55555555-iiii-iiii-iiii-555555555555', 'Ava Johnson', 'Michael Johnson', 'mjohnson@example.com', '555-567-8901', '10', 'pending', '2025-04-07');

-- Library Items
INSERT INTO library_items (id, title, author, category, available, due_date, borrowed_by) VALUES
('11111111-jjjj-jjjj-jjjj-111111111111', 'To Kill a Mockingbird', 'Harper Lee', 'Fiction', TRUE, NULL, NULL),
('22222222-jjjj-jjjj-jjjj-222222222222', 'A Brief History of Time', 'Stephen Hawking', 'Science', FALSE, '2025-05-10', '44444444-4444-4444-4444-444444444444'),
('33333333-jjjj-jjjj-jjjj-333333333333', 'Pride and Prejudice', 'Jane Austen', 'Fiction', TRUE, NULL, NULL),
('44444444-jjjj-jjjj-jjjj-444444444444', 'The Elements of Style', 'William Strunk Jr.', 'Reference', FALSE, '2025-05-12', '33333333-3333-3333-3333-333333333333'),
('55555555-jjjj-jjjj-jjjj-555555555555', 'Introduction to Algorithms', 'Thomas H. Cormen', 'Computer Science', TRUE, NULL, NULL);

-- Club Activities
INSERT INTO club_activities (id, name, description, schedule, location, member_count, status, coordinator_id) VALUES
('11111111-kkkk-kkkk-kkkk-111111111111', 'Chess Club', 'Weekly chess tournaments and practice sessions', 'Every Monday, 3:00 PM', 'Recreation Hall', 18, 'active', '99999999-9999-9999-9999-999999999999'),
('22222222-kkkk-kkkk-kkkk-222222222222', 'Debate Society', 'Platform for students to enhance public speaking skills', 'Every Wednesday, 4:00 PM', 'Auditorium', 24, 'active', '99999999-9999-9999-9999-999999999999'),
('33333333-kkkk-kkkk-kkkk-333333333333', 'Science Club', 'Experiments, projects, and science fairs', 'Every Tuesday, 3:30 PM', 'Science Lab', 16, 'active', '99999999-9999-9999-9999-999999999999'),
('44444444-kkkk-kkkk-kkkk-444444444444', 'Photography Club', 'Learn photography techniques and participate in competitions', 'Every Friday, 3:00 PM', 'Art Room', 12, 'inactive', '99999999-9999-9999-9999-999999999999'),
('55555555-kkkk-kkkk-kkkk-555555555555', 'Sports Team', 'Various sports training and inter-school competitions', 'Every Thursday, 4:00 PM', 'Sports Ground', 30, 'active', '99999999-9999-9999-9999-999999999999');

-- Lab Resources
INSERT INTO lab_resources (id, name, type, quantity, available, location, last_maintenance) VALUES
('11111111-llll-llll-llll-111111111111', 'Microscope', 'Biology Lab', 15, 12, 'Biology Lab, Cabinet 3', '2025-03-15'),
('22222222-llll-llll-llll-222222222222', 'Test Tubes', 'Chemistry Lab', 50, 42, 'Chemistry Lab, Drawer 2', '2025-03-20'),
('33333333-llll-llll-llll-333333333333', 'Computer Workstation', 'Computer Lab', 25, 25, 'Computer Lab', '2025-03-10'),
('44444444-llll-llll-llll-444444444444', 'Bunsen Burner', 'Chemistry Lab', 20, 18, 'Chemistry Lab, Cabinet 1', '2025-03-25'),
('55555555-llll-llll-llll-555555555555', 'Physics Experiment Kit', 'Physics Lab', 10, 8, 'Physics Lab, Shelf 4', '2025-03-18');

-- System Backups
INSERT INTO system_backups (id, name, backup_date, backup_time, type, size, status) VALUES
('11111111-mmmm-mmmm-mmmm-111111111111', 'Full System Backup', '2025-05-17', '23:00:00', 'full', '1.2 GB', 'completed'),
('22222222-mmmm-mmmm-mmmm-222222222222', 'Database Backup', '2025-05-17', '18:00:00', 'full', '450 MB', 'completed'),
('33333333-mmmm-mmmm-mmmm-333333333333', 'User Data Backup', '2025-05-17', '12:00:00', 'incremental', '85 MB', 'completed'),
('44444444-mmmm-mmmm-mmmm-444444444444', 'Content Files Backup', '2025-05-16', '23:00:00', 'incremental', '124 MB', 'completed'),
('55555555-mmmm-mmmm-mmmm-555555555555', 'Configuration Backup', '2025-05-16', '18:00:00', 'full', '12 MB', 'completed'),
('66666666-mmmm-mmmm-mmmm-666666666666', 'Full System Backup', '2025-05-16', '03:00:00', 'full', '1.1 GB', 'failed'),
('77777777-mmmm-mmmm-mmmm-777777777777', 'Media Library Backup', '2025-05-15', '23:00:00', 'incremental', '340 MB', 'completed');

-- Backup Schedules
INSERT INTO backup_schedules (id, name, frequency, retention, scheduled_time, last_run, next_run, enabled) VALUES
('11111111-nnnn-nnnn-nnnn-111111111111', 'Full System Backup', 'daily', '7 days', '23:00:00', '2025-05-17 23:00:00', '2025-05-18 23:00:00', TRUE),
('22222222-nnnn-nnnn-nnnn-222222222222', 'Database Backup', 'daily', '14 days', '18:00:00', '2025-05-17 18:00:00', '2025-05-18 18:00:00', TRUE),
('33333333-nnnn-nnnn-nnnn-333333333333', 'User Data Backup', 'daily', '7 days', '12:00:00', '2025-05-17 12:00:00', '2025-05-18 12:00:00', TRUE),
('44444444-nnnn-nnnn-nnnn-444444444444', 'Configuration Backup', 'weekly', '30 days', '18:00:00', '2025-05-16 18:00:00', '2025-05-23 18:00:00', TRUE),
('55555555-nnnn-nnnn-nnnn-555555555555', 'Media Library Backup', 'weekly', '14 days', '23:00:00', '2025-05-15 23:00:00', '2025-05-22 23:00:00', FALSE);

-- System Health
INSERT INTO system_health (id, status, cpu_usage, memory_usage, disk_usage, network_usage) VALUES
('11111111-oooo-oooo-oooo-111111111111', 'healthy', 32.0, 45.0, 65.0, 28.0);

-- System Services
INSERT INTO system_services (id, name, status, response_time, last_incident) VALUES
('11111111-pppp-pppp-pppp-111111111111', 'Database', 'online', 12, NULL),
('22222222-pppp-pppp-pppp-222222222222', 'Authentication', 'online', 8, NULL),
('33333333-pppp-pppp-pppp-333333333333', 'Storage', 'online', 15, NULL),
('44444444-pppp-pppp-pppp-444444444444', 'Email', 'degraded', 450, '2025-05-18 14:00:00'),
('55555555-pppp-pppp-pppp-555555555555', 'API Gateway', 'online', 22, NULL),
('66666666-pppp-pppp-pppp-666666666666', 'Backup Service', 'online', 30, NULL),
('77777777-pppp-pppp-pppp-777777777777', 'Search', 'online', 25, NULL),
('88888888-pppp-pppp-pppp-888888888888', 'Notification', 'online', 18, NULL);

-- System Logs
INSERT INTO system_logs (id, level, message, source, created_at, user_id) VALUES
('11111111-qqqq-qqqq-qqqq-111111111111', 'info', 'System backup completed successfully', 'Backup Service', '2025-05-17 23:05:12', '11111111-1111-1111-1111-111111111111'),
('22222222-qqqq-qqqq-qqqq-222222222222', 'warning', 'High CPU usage detected', 'System Monitor', '2025-05-17 14:33:27', NULL),
('33333333-qqqq-qqqq-qqqq-333333333333', 'error', 'Database connection timeout', 'Database Service', '2025-05-16 03:12:45', NULL),
('44444444-qqqq-qqqq-qqqq-444444444444', 'info', 'User login successful', 'Authentication Service', '2025-05-18 08:22:15', '44444444-4444-4444-4444-444444444444'),
('55555555-qqqq-qqqq-qqqq-555555555555', 'warning', 'Disk space running low', 'Storage Service', '2025-05-17 19:45:10', NULL);
