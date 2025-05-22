import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const { Pool } = pg;

// Load environment variables
dotenv.config();

// Read the .env file if it exists
let envConfig = {};
if (fs.existsSync('.env')) {
  const envFile = fs.readFileSync('.env', 'utf8');
  envFile.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      envConfig[key.trim()] = value.trim();
    }
  });
}

// Database configuration from .env file
const dbConfig = {
  host: process.env.VITE_PG_HOST || envConfig.VITE_PG_HOST || 'localhost',
  port: parseInt(process.env.VITE_PG_PORT || envConfig.VITE_PG_PORT || '5432'),
  database: process.env.VITE_PG_DATABASE || envConfig.VITE_PG_DATABASE || 'schoolvista',
  user: process.env.VITE_PG_USER || envConfig.VITE_PG_USER || 'postgres',
  password: process.env.VITE_PG_PASSWORD || envConfig.VITE_PG_PASSWORD || 'postgres',
  ssl: (process.env.VITE_PG_SSL === 'true' || envConfig.VITE_PG_SSL === 'true') 
    ? { rejectUnauthorized: false } 
    : false
};

console.log('Database configuration:');
console.log({
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  user: dbConfig.user,
  password: '********', // Masked for security
  ssl: dbConfig.ssl
});

// Create a new pool
const pool = new Pool(dbConfig);

// Demo Data 
const demoData = {
  // Users demo data with various roles
  users: [
    {
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Admin User',
      email: 'admin@schoolvista.example',
      password_hash: '$2a$10$dYh0kp1Ks7HAh3e0yT0wPOiXQ1jZFjIHK/m0gE/EZQzY4f/i.pKA2', // password123
      role: 'admin',
      avatar: '/avatars/admin.png'
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Teacher One',
      email: 'teacher1@schoolvista.example',
      password_hash: '$2a$10$dYh0kp1Ks7HAh3e0yT0wPOiXQ1jZFjIHK/m0gE/EZQzY4f/i.pKA2',
      role: 'teacher',
      avatar: '/avatars/teacher1.png'
    },
    {
      id: '33333333-3333-3333-3333-333333333333',
      name: 'Student One',
      email: 'student1@schoolvista.example',
      password_hash: '$2a$10$dYh0kp1Ks7HAh3e0yT0wPOiXQ1jZFjIHK/m0gE/EZQzY4f/i.pKA2',
      role: 'student',
      avatar: '/avatars/student1.png'
    },
    {
      id: '44444444-4444-4444-4444-444444444444',
      name: 'Principal Jones',
      email: 'principal@schoolvista.example',
      password_hash: '$2a$10$dYh0kp1Ks7HAh3e0yT0wPOiXQ1jZFjIHK/m0gE/EZQzY4f/i.pKA2',
      role: 'principal',
      avatar: '/avatars/principal.png'
    },
    {
      id: '55555555-5555-5555-5555-555555555555',
      name: 'Finance Admin',
      email: 'finance@schoolvista.example',
      password_hash: '$2a$10$dYh0kp1Ks7HAh3e0yT0wPOiXQ1jZFjIHK/m0gE/EZQzY4f/i.pKA2',
      role: 'financial',
      avatar: '/avatars/finance.png'
    },
    {
      id: '66666666-6666-6666-6666-666666666666',
      name: 'Library Admin',
      email: 'library@schoolvista.example',
      password_hash: '$2a$10$dYh0kp1Ks7HAh3e0yT0wPOiXQ1jZFjIHK/m0gE/EZQzY4f/i.pKA2',
      role: 'library',
      avatar: '/avatars/library.png'
    },
    {
      id: '77777777-7777-7777-7777-777777777777',
      name: 'Science Teacher',
      email: 'science@schoolvista.example',
      password_hash: '$2a$10$dYh0kp1Ks7HAh3e0yT0wPOiXQ1jZFjIHK/m0gE/EZQzY4f/i.pKA2',
      role: 'teacher',
      avatar: '/avatars/teacher2.png'
    }
  ],
  
  // Teachers demo data
  teachers: [
    {
      id: 'a1111111-1111-1111-1111-111111111111',
      user_id: '22222222-2222-2222-2222-222222222222',
      subject: 'Mathematics'
    },
    {
      id: 'a2222222-2222-2222-2222-222222222222',
      user_id: '77777777-7777-7777-7777-777777777777',
      subject: 'Science'
    }
  ],
  
  // Students demo data
  students: [
    {
      id: 'b1111111-1111-1111-1111-111111111111',
      user_id: '33333333-3333-3333-3333-333333333333',
      roll_number: 'S0001',
      grade: '10',
      section: 'A',
      attendance_percentage: 93.5
    }
  ],
  
  // Classes demo data
  classes: [
    {
      id: 'c1111111-1111-1111-1111-111111111111',
      name: 'Class 10-A',
      grade: '10',
      section: 'A',
      academic_year: '2025-2026'
    }
  ],
  
  // Courses demo data
  courses: [
    {
      id: 'd1111111-1111-1111-1111-111111111111',
      name: 'Advanced Mathematics',
      code: 'MATH-101',
      description: 'Advanced mathematics course for high school students'
    },
    {
      id: 'd2222222-2222-2222-2222-222222222222',
      name: 'Physics Fundamentals',
      code: 'PHYS-101',
      description: 'Introduction to physics principles'
    }
  ],
  
  // Assignments demo data
  assignments: [
    {
      id: 'e1111111-1111-1111-1111-111111111111',
      course_id: 'd1111111-1111-1111-1111-111111111111',
      title: 'Week 1 Assignment',
      description: 'Complete problems 1-10 from Chapter 1',
      due_date: '2025-09-15',
      created_by: '22222222-2222-2222-2222-222222222222'
    }
  ],
  
  // Notifications demo data
  notifications: [
    {
      id: 'f1111111-1111-1111-1111-111111111111',
      title: 'Welcome to SchoolVista',
      message: 'Welcome to the SchoolVista platform. This is a demo notification.',
      category: 'System',
      priority: 'normal'
    }
  ]
};

// First check the notification constraints
async function checkNotificationTable() {
  const client = await pool.connect();
  try {
    // Check the notification table's priority constraint
    const priorityResult = await client.query(`
      SELECT pg_get_constraintdef(c.oid) as constraint_def
      FROM pg_constraint c
      JOIN pg_namespace n ON n.oid = c.connamespace
      JOIN pg_class cl ON cl.oid = c.conrelid
      WHERE n.nspname = 'public'
      AND cl.relname = 'notifications'
      AND c.conname LIKE '%priority%'
    `);
    
    if (priorityResult.rows.length > 0) {
      console.log('\n📋 Notification priority constraint:');
      console.log(priorityResult.rows[0].constraint_def);
      return priorityResult.rows[0].constraint_def;
    } else {
      return null;
    }
  } catch (err) {
    console.error('Error checking notification constraints:', err.message);
    return null;
  } finally {
    client.release();
  }
}

// Function to insert demo data into the database
async function loadDemoData() {
  // First check notification constraints
  const notificationConstraint = await checkNotificationTable();
  
  // Adjust notification priorities if needed based on the constraint
  if (notificationConstraint) {
    const match = notificationConstraint.match(/CHECK \(\(\(priority\)::text = ANY \(\(ARRAY\[(.*)\]\)::text\[\]\)\)\)/);
    if (match) {
      const allowedValues = match[1].split(',').map(v => 
        v.trim().replace(/^'|'$/g, '') // Remove quotes
      );
      console.log('Allowed priority values:', allowedValues);
      
      // Update notification priorities to use allowed values
      if (allowedValues.length > 0) {
        demoData.notifications.forEach(notification => {
          if (!allowedValues.includes(notification.priority)) {
            const oldPriority = notification.priority;
            notification.priority = allowedValues[0]; // Use the first allowed value
            console.log(`Changed notification priority from '${oldPriority}' to '${notification.priority}'`);
          }
        });
      }
    }
  }
  
  // Process each data type in a separate transaction
  console.log('🔄 Loading demo data...');
  
  // Insert users
  console.log('\n📤 Inserting users...');
  let usersInserted = 0;
  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      for (const user of demoData.users) {
        try {
          await client.query(`
            INSERT INTO users (id, name, email, password_hash, role, avatar, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
            ON CONFLICT (id) DO UPDATE 
            SET name = $2, email = $3, role = $5, avatar = $6, updated_at = NOW()
          `, [user.id, user.name, user.email, user.password_hash, user.role, user.avatar]);
          usersInserted++;
        } catch (err) {
          console.log(`⚠️ Error inserting user: ${user.email}. Error: ${err.message}`);
        }
      }
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('❌ Error in users transaction:', err.message);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
  console.log(`✅ Inserted ${usersInserted} users`);
  
  // Insert teachers
  console.log('\n📤 Inserting teachers...');
  let teachersInserted = 0;
  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      for (const teacher of demoData.teachers) {
        try {
          await client.query(`
            INSERT INTO teachers (id, user_id, subject, created_at, updated_at)
            VALUES ($1, $2, $3, NOW(), NOW())
            ON CONFLICT (id) DO UPDATE 
            SET user_id = $2, subject = $3, updated_at = NOW()
          `, [teacher.id, teacher.user_id, teacher.subject]);
          teachersInserted++;
        } catch (err) {
          console.log(`⚠️ Error inserting teacher: ${teacher.id}. Error: ${err.message}`);
        }
      }
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('❌ Error in teachers transaction:', err.message);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
  console.log(`✅ Inserted ${teachersInserted} teachers`);
  
  // Insert students
  console.log('\n📤 Inserting students...');
  let studentsInserted = 0;
  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      for (const student of demoData.students) {
        try {
          await client.query(`
            INSERT INTO students (id, user_id, roll_number, grade, section, attendance_percentage, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
            ON CONFLICT (id) DO UPDATE 
            SET user_id = $2, roll_number = $3, grade = $4, section = $5, attendance_percentage = $6, updated_at = NOW()
          `, [student.id, student.user_id, student.roll_number, student.grade, student.section, student.attendance_percentage]);
          studentsInserted++;
        } catch (err) {
          console.log(`⚠️ Error inserting student: ${student.id}. Error: ${err.message}`);
        }
      }
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('❌ Error in students transaction:', err.message);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
  console.log(`✅ Inserted ${studentsInserted} students`);
  
  // Insert classes
  console.log('\n📤 Inserting classes...');
  let classesInserted = 0;
  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      for (const cls of demoData.classes) {
        try {
          await client.query(`
            INSERT INTO classes (id, name, grade, section, academic_year, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
            ON CONFLICT (id) DO UPDATE 
            SET name = $2, grade = $3, section = $4, academic_year = $5, updated_at = NOW()
          `, [cls.id, cls.name, cls.grade, cls.section, cls.academic_year]);
          classesInserted++;
        } catch (err) {
          console.log(`⚠️ Error inserting class: ${cls.id}. Error: ${err.message}`);
        }
      }
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('❌ Error in classes transaction:', err.message);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
  console.log(`✅ Inserted ${classesInserted} classes`);
  
  // Insert courses
  console.log('\n📤 Inserting courses...');
  let coursesInserted = 0;
  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      for (const course of demoData.courses) {
        try {
          await client.query(`
            INSERT INTO courses (id, name, code, description, created_at, updated_at)
            VALUES ($1, $2, $3, $4, NOW(), NOW())
            ON CONFLICT (id) DO UPDATE 
            SET name = $2, code = $3, description = $4, updated_at = NOW()
          `, [course.id, course.name, course.code, course.description]);
          coursesInserted++;
        } catch (err) {
          console.log(`⚠️ Error inserting course: ${course.id}. Error: ${err.message}`);
        }
      }
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('❌ Error in courses transaction:', err.message);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
  console.log(`✅ Inserted ${coursesInserted} courses`);
  
  // Insert relationship between teacher and class
  console.log('\n📤 Inserting teacher-class relationships...');
  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(`
        INSERT INTO teacher_classes (teacher_id, class_id)
        VALUES ('a1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111')
        ON CONFLICT DO NOTHING
      `);
      await client.query('COMMIT');
      console.log('✅ Inserted teacher-class relationship');
    } catch (err) {
      await client.query('ROLLBACK');
      console.log(`⚠️ Error inserting teacher-class relationship: ${err.message}`);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
  
  // Insert relationship between class and course
  console.log('\n📤 Inserting class-course relationships...');
  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(`
        INSERT INTO class_courses (class_id, course_id, teacher_id)
        VALUES ('c1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111')
        ON CONFLICT DO NOTHING
      `);
      await client.query('COMMIT');
      console.log('✅ Inserted class-course relationship');
    } catch (err) {
      await client.query('ROLLBACK');
      console.log(`⚠️ Error inserting class-course relationship: ${err.message}`);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
  
  // Insert assignments
  console.log('\n📤 Inserting assignments...');
  let assignmentsInserted = 0;
  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      for (const assignment of demoData.assignments) {
        try {
          await client.query(`
            INSERT INTO assignments (id, course_id, title, description, due_date, created_by, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
            ON CONFLICT (id) DO UPDATE 
            SET course_id = $2, title = $3, description = $4, due_date = $5, created_by = $6, updated_at = NOW()
          `, [assignment.id, assignment.course_id, assignment.title, assignment.description, assignment.due_date, assignment.created_by]);
          assignmentsInserted++;
        } catch (err) {
          console.log(`⚠️ Error inserting assignment: ${assignment.id}. Error: ${err.message}`);
        }
      }
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('❌ Error in assignments transaction:', err.message);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
  console.log(`✅ Inserted ${assignmentsInserted} assignments`);
  
  // Insert student assignment relationship
  console.log('\n📤 Inserting student assignments...');
  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(`
        INSERT INTO student_assignments (student_id, assignment_id, status, grade, submission_date, created_at, updated_at)
        VALUES ('b1111111-1111-1111-1111-111111111111', 'e1111111-1111-1111-1111-111111111111', 'completed', 'A', '2025-09-14', NOW(), NOW())
        ON CONFLICT DO NOTHING
      `);
      await client.query('COMMIT');
      console.log('✅ Inserted student assignment');
    } catch (err) {
      await client.query('ROLLBACK');
      console.log(`⚠️ Error inserting student assignment: ${err.message}`);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
  
  // Insert notifications
  console.log('\n📤 Inserting notifications...');
  let notificationsInserted = 0;
  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      for (const notification of demoData.notifications) {
        try {
          // First, check if the notification table has a priority column
          const hasPriorityColumn = await client.query(`
            SELECT EXISTS (
              SELECT 1 
              FROM information_schema.columns 
              WHERE table_schema = 'public' 
              AND table_name = 'notifications' 
              AND column_name = 'priority'
            )
          `);
          
          let query;
          let params;
          
          if (hasPriorityColumn.rows[0].exists) {
            query = `
              INSERT INTO notifications (id, title, message, category, priority, created_at, is_read)
              VALUES ($1, $2, $3, $4, $5, NOW(), false)
              ON CONFLICT (id) DO UPDATE 
              SET title = $2, message = $3, category = $4, priority = $5
            `;
            params = [notification.id, notification.title, notification.message, notification.category, notification.priority];
          } else {
            // If priority column doesn't exist, don't include it
            query = `
              INSERT INTO notifications (id, title, message, category, created_at, is_read)
              VALUES ($1, $2, $3, $4, NOW(), false)
              ON CONFLICT (id) DO UPDATE 
              SET title = $2, message = $3, category = $4
            `;
            params = [notification.id, notification.title, notification.message, notification.category];
          }
          
          await client.query(query, params);
          notificationsInserted++;
        } catch (err) {
          console.log(`⚠️ Error inserting notification: ${notification.id}. Error: ${err.message}`);
        }
      }
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('❌ Error in notifications transaction:', err.message);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
  console.log(`✅ Inserted ${notificationsInserted} notifications`);
  
  // Link notifications to users
  console.log('\n📤 Linking notifications to users...');
  let notificationLinksInserted = 0;
  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      // Link notification to all demo users
      for (const user of demoData.users) {
        try {
          await client.query(`
            INSERT INTO user_notifications (notification_id, user_id, is_read)
            VALUES ('f1111111-1111-1111-1111-111111111111', $1, false)
            ON CONFLICT DO NOTHING
          `, [user.id]);
          notificationLinksInserted++;
        } catch (err) {
          console.log(`⚠️ Error linking notification to user ${user.id}: ${err.message}`);
        }
      }
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('❌ Error in notification links transaction:', err.message);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
  console.log(`✅ Linked notifications to ${notificationLinksInserted} users`);
  
  console.log('\n✅ Demo data loading completed!');
  await pool.end();
}

// Execute the load demo data function
console.log('🚀 SchoolVista Demo Data Loader');
console.log('==============================\n');
loadDemoData(); 