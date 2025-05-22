import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

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
  database: process.env.VITE_PG_DATABASE || envConfig.VITE_PG_DATABASE || 'edusync',
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

// Helper function to hash password
async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// Helper function to generate UUID
function generateId() {
  return uuidv4();
}

// School settings data
async function insertSchoolSettings(client) {
  try {
    const schoolId = generateId();
    await client.query(`
      INSERT INTO school_settings (
        id, school_name, address, phone, email, website, logo_url,
        school_colors, timezone, currency, attendance_calculation_method,
        grading_scale, created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW()
      )
    `, [
      schoolId,
      'Lincoln International Academy',
      '1234 Education Lane, Knowledge City, KC 54321',
      '+1-555-123-4567',
      'info@lincolninternational.edu',
      'www.lincolninternational.edu',
      '/images/school-logo.png',
      JSON.stringify({
        primary: '#3f51b5',
        secondary: '#f50057',
        accent: '#ff4081',
        background: '#f5f5f5'
      }),
      'America/New_York',
      'USD',
      'daily',
      JSON.stringify({
        'A': { min: 90, max: 100 },
        'B': { min: 80, max: 89 },
        'C': { min: 70, max: 79 },
        'D': { min: 60, max: 69 },
        'F': { min: 0, max: 59 }
      })
    ]);
    console.log('✅ School settings inserted');
    return schoolId;
  } catch (err) {
    console.error('❌ Error inserting school settings:', err.message);
    throw err;
  }
}

// Academic years and terms
async function insertAcademicYearsAndTerms(client) {
  try {
    // Insert academic years
    const academicYearIds = [];
    const academicYears = [
      { year_name: '2024-2025', start_date: '2024-08-15', end_date: '2025-05-31' },
      { year_name: '2025-2026', start_date: '2025-08-15', end_date: '2026-05-31', is_current: true }
    ];
    
    for (const year of academicYears) {
      const yearId = generateId();
      academicYearIds.push(yearId);
      
      await client.query(`
        INSERT INTO academic_years (
          id, year_name, start_date, end_date, is_current, created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, NOW(), NOW()
        )
      `, [
        yearId,
        year.year_name,
        year.start_date,
        year.end_date,
        year.is_current || false
      ]);
      console.log(`✅ Academic year inserted: ${year.year_name}`);
      
      // Insert terms for each academic year
      if (year.is_current) {
        const terms = [
          { term_name: 'Fall Term', start_date: '2025-08-15', end_date: '2025-12-20', is_current: true },
          { term_name: 'Spring Term', start_date: '2026-01-05', end_date: '2026-05-31', is_current: false }
        ];
        
        for (const term of terms) {
          const termId = generateId();
          await client.query(`
            INSERT INTO school_terms (
              id, academic_year_id, term_name, start_date, end_date, 
              is_current, created_at, updated_at
            ) VALUES (
              $1, $2, $3, $4, $5, $6, NOW(), NOW()
            )
          `, [
            termId,
            yearId,
            term.term_name,
            term.start_date,
            term.end_date,
            term.is_current
          ]);
          console.log(`✅ Term inserted: ${term.term_name}`);
        }
      }
    }
    
    return academicYearIds;
  } catch (err) {
    console.error('❌ Error inserting academic years and terms:', err.message);
    throw err;
  }
}

// Users with various roles
async function insertUsers(client) {
  try {
    // Common password for all test users
    const password = 'Password123!';
    const passwordHash = await hashPassword(password);
    
    const adminUserIds = [];
    const teacherUserIds = [];
    const studentUserIds = [];
    const allUserIds = [];
    
    // Create admin users
    const adminUsers = [
      { name: 'Admin User', email: 'admin@lincolnacademy.edu', role: 'admin', avatar: '/avatars/admin1.png' },
      { name: 'Sarah Johnson', email: 'sjohnson@lincolnacademy.edu', role: 'principal', avatar: '/avatars/principal1.png' },
      { name: 'Michael Chen', email: 'mchen@lincolnacademy.edu', role: 'school-admin', avatar: '/avatars/admin2.png' }
    ];
    
    for (const admin of adminUsers) {
      const userId = generateId();
      adminUserIds.push(userId);
      allUserIds.push(userId);
      
      await client.query(`
        INSERT INTO users (
          id, name, email, password_hash, role, avatar, created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, NOW(), NOW()
        )
      `, [
        userId,
        admin.name,
        admin.email,
        passwordHash,
        admin.role,
        admin.avatar
      ]);
      console.log(`✅ Admin user inserted: ${admin.name}`);
    }
    
    // Create teacher users
    const teacherUsers = [
      { name: 'David Wilson', email: 'dwilson@lincolnacademy.edu', role: 'teacher', avatar: '/avatars/teacher1.png' },
      { name: 'Emily Brooks', email: 'ebrooks@lincolnacademy.edu', role: 'teacher', avatar: '/avatars/teacher2.png' },
      { name: 'Robert Martinez', email: 'rmartinez@lincolnacademy.edu', role: 'teacher', avatar: '/avatars/teacher3.png' },
      { name: 'Jennifer Lee', email: 'jlee@lincolnacademy.edu', role: 'teacher', avatar: '/avatars/teacher4.png' },
      { name: 'Thomas Anderson', email: 'tanderson@lincolnacademy.edu', role: 'teacher', avatar: '/avatars/teacher5.png' }
    ];
    
    for (const teacher of teacherUsers) {
      const userId = generateId();
      teacherUserIds.push(userId);
      allUserIds.push(userId);
      
      await client.query(`
        INSERT INTO users (
          id, name, email, password_hash, role, avatar, created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, NOW(), NOW()
        )
      `, [
        userId,
        teacher.name,
        teacher.email,
        passwordHash,
        teacher.role,
        teacher.avatar
      ]);
      console.log(`✅ Teacher user inserted: ${teacher.name}`);
    }
    
    // Create student users
    const studentUsers = [
      { name: 'Alex Johnson', email: 'ajohnson@student.lincolnacademy.edu', role: 'student', avatar: '/avatars/student1.png' },
      { name: 'Sophia Garcia', email: 'sgarcia@student.lincolnacademy.edu', role: 'student', avatar: '/avatars/student2.png' },
      { name: 'Ethan Brown', email: 'ebrown@student.lincolnacademy.edu', role: 'student', avatar: '/avatars/student3.png' },
      { name: 'Olivia Davis', email: 'odavis@student.lincolnacademy.edu', role: 'student', avatar: '/avatars/student4.png' },
      { name: 'Noah Wilson', email: 'nwilson@student.lincolnacademy.edu', role: 'student', avatar: '/avatars/student5.png' },
      { name: 'Emma Martinez', email: 'emartinez@student.lincolnacademy.edu', role: 'student', avatar: '/avatars/student6.png' },
      { name: 'William Taylor', email: 'wtaylor@student.lincolnacademy.edu', role: 'student', avatar: '/avatars/student7.png' },
      { name: 'Ava Anderson', email: 'aanderson@student.lincolnacademy.edu', role: 'student', avatar: '/avatars/student8.png' },
      { name: 'James Thomas', email: 'jthomas@student.lincolnacademy.edu', role: 'student', avatar: '/avatars/student9.png' },
      { name: 'Isabella Moore', email: 'imoore@student.lincolnacademy.edu', role: 'student', avatar: '/avatars/student10.png' }
    ];
    
    for (const student of studentUsers) {
      const userId = generateId();
      studentUserIds.push(userId);
      allUserIds.push(userId);
      
      await client.query(`
        INSERT INTO users (
          id, name, email, password_hash, role, avatar, created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, NOW(), NOW()
        )
      `, [
        userId,
        student.name,
        student.email,
        passwordHash,
        student.role,
        student.avatar
      ]);
      console.log(`✅ Student user inserted: ${student.name}`);
    }
    
    // Create other staff users
    const staffUsers = [
      { name: 'Patricia Adams', email: 'padams@lincolnacademy.edu', role: 'financial', avatar: '/avatars/financial.png' },
      { name: 'Gregory White', email: 'gwhite@lincolnacademy.edu', role: 'admission', avatar: '/avatars/admission.png' },
      { name: 'Nancy Clark', email: 'nclark@lincolnacademy.edu', role: 'library', avatar: '/avatars/library.png' }
    ];
    
    for (const staff of staffUsers) {
      const userId = generateId();
      allUserIds.push(userId);
      
      await client.query(`
        INSERT INTO users (
          id, name, email, password_hash, role, avatar, created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, NOW(), NOW()
        )
      `, [
        userId,
        staff.name,
        staff.email,
        passwordHash,
        staff.role,
        staff.avatar
      ]);
      console.log(`✅ Staff user inserted: ${staff.name}`);
    }
    
    return { adminUserIds, teacherUserIds, studentUserIds, allUserIds };
  } catch (err) {
    console.error('❌ Error inserting users:', err.message);
    throw err;
  }
}

// Teachers data
async function insertTeachers(client, teacherUserIds) {
  try {
    const teacherIds = [];
    const subjects = [
      'Mathematics', 
      'English Literature', 
      'Physics', 
      'History', 
      'Computer Science'
    ];
    
    for (let i = 0; i < teacherUserIds.length; i++) {
      const teacherId = generateId();
      teacherIds.push(teacherId);
      
      await client.query(`
        INSERT INTO teachers (
          id, user_id, subject, created_at, updated_at
        ) VALUES (
          $1, $2, $3, NOW(), NOW()
        )
      `, [
        teacherId,
        teacherUserIds[i],
        subjects[i]
      ]);
      console.log(`✅ Teacher inserted: ${subjects[i]}`);
    }
    
    return teacherIds;
  } catch (err) {
    console.error('❌ Error inserting teachers:', err.message);
    throw err;
  }
}

// Students data
async function insertStudents(client, studentUserIds) {
  try {
    const studentIds = [];
    const grades = ['9', '10', '11', '12'];
    const sections = ['A', 'B', 'C'];
    
    for (let i = 0; i < studentUserIds.length; i++) {
      const studentId = generateId();
      studentIds.push(studentId);
      
      const grade = grades[Math.floor(i / 3)]; // Distribute students across grades
      const section = sections[i % 3]; // Distribute students across sections
      const rollNumber = `S${grade}${section}${String(i + 1).padStart(3, '0')}`;
      const attendancePercentage = 85 + Math.floor(Math.random() * 15); // 85-100%
      
      await client.query(`
        INSERT INTO students (
          id, user_id, roll_number, grade, section, 
          attendance_percentage, created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, NOW(), NOW()
        )
      `, [
        studentId,
        studentUserIds[i],
        rollNumber,
        grade,
        section,
        attendancePercentage
      ]);
      console.log(`✅ Student inserted: ${rollNumber}`);
    }
    
    return studentIds;
  } catch (err) {
    console.error('❌ Error inserting students:', err.message);
    throw err;
  }
}

// Classes data
async function insertClasses(client) {
  try {
    const classIds = [];
    const classes = [
      { name: 'Class 9-A', grade: '9', section: 'A', academic_year: '2025-2026' },
      { name: 'Class 9-B', grade: '9', section: 'B', academic_year: '2025-2026' },
      { name: 'Class 9-C', grade: '9', section: 'C', academic_year: '2025-2026' },
      { name: 'Class 10-A', grade: '10', section: 'A', academic_year: '2025-2026' },
      { name: 'Class 10-B', grade: '10', section: 'B', academic_year: '2025-2026' },
      { name: 'Class 10-C', grade: '10', section: 'C', academic_year: '2025-2026' },
      { name: 'Class 11-A', grade: '11', section: 'A', academic_year: '2025-2026' },
      { name: 'Class 11-B', grade: '11', section: 'B', academic_year: '2025-2026' },
      { name: 'Class 12-A', grade: '12', section: 'A', academic_year: '2025-2026' },
      { name: 'Class 12-B', grade: '12', section: 'B', academic_year: '2025-2026' }
    ];
    
    for (const cls of classes) {
      const classId = generateId();
      classIds.push(classId);
      
      await client.query(`
        INSERT INTO classes (
          id, name, grade, section, academic_year, created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, NOW(), NOW()
        )
      `, [
        classId,
        cls.name,
        cls.grade,
        cls.section,
        cls.academic_year
      ]);
      console.log(`✅ Class inserted: ${cls.name}`);
    }
    
    return classIds;
  } catch (err) {
    console.error('❌ Error inserting classes:', err.message);
    throw err;
  }
}

// Courses data
async function insertCourses(client) {
  try {
    const courseIds = [];
    const courses = [
      { 
        name: 'Advanced Mathematics', 
        code: 'MATH-101',
        description: 'Advanced mathematics course covering algebra, calculus, and statistics'
      },
      { 
        name: 'English Literature', 
        code: 'ENG-101',
        description: 'Study of classic and contemporary literature and writing skills'
      },
      { 
        name: 'Physics', 
        code: 'PHY-101',
        description: 'Introduction to physics principles, mechanics, and thermodynamics'
      },
      { 
        name: 'Biology', 
        code: 'BIO-101',
        description: 'Study of living organisms, cell biology, genetics, and ecosystems'
      },
      { 
        name: 'Chemistry', 
        code: 'CHEM-101',
        description: 'Introduction to chemical principles, atoms, molecules, and reactions'
      },
      { 
        name: 'World History', 
        code: 'HIST-101',
        description: 'Study of major historical periods, figures, and events globally'
      },
      { 
        name: 'Computer Science', 
        code: 'CS-101',
        description: 'Introduction to programming, algorithms, and computer architecture'
      },
      { 
        name: 'Art & Design', 
        code: 'ART-101',
        description: 'Exploration of various art forms, techniques, and art history'
      },
      { 
        name: 'Physical Education', 
        code: 'PE-101',
        description: 'Development of physical fitness, sports skills, and health education'
      },
      { 
        name: 'Economics', 
        code: 'ECON-101',
        description: 'Introduction to economic principles, markets, and policy'
      }
    ];
    
    for (const course of courses) {
      const courseId = generateId();
      courseIds.push(courseId);
      
      await client.query(`
        INSERT INTO courses (
          id, name, code, description, created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, NOW(), NOW()
        )
      `, [
        courseId,
        course.name,
        course.code,
        course.description
      ]);
      console.log(`✅ Course inserted: ${course.name}`);
    }
    
    return courseIds;
  } catch (err) {
    console.error('❌ Error inserting courses:', err.message);
    throw err;
  }
}

// Teacher-class relationships
async function insertTeacherClassRelationships(client, teacherIds, classIds) {
  try {
    // Assign each teacher to multiple classes with appropriate distribution
    let relationshipsInserted = 0;
    
    // Create a map of grade to classes
    const gradeToClassMap = {};
    
    for (let i = 0; i < classIds.length; i++) {
      const classId = classIds[i];
      
      // Get class details
      const classResult = await client.query(
        'SELECT grade FROM classes WHERE id = $1',
        [classId]
      );
      
      if (classResult.rows.length > 0) {
        const grade = classResult.rows[0].grade;
        if (!gradeToClassMap[grade]) {
          gradeToClassMap[grade] = [];
        }
        gradeToClassMap[grade].push(classId);
      }
    }
    
    // Distribute teachers across classes
    for (let i = 0; i < teacherIds.length; i++) {
      const teacherId = teacherIds[i];
      
      // Get teacher subject to determine appropriate classes
      const teacherResult = await client.query(
        'SELECT subject FROM teachers WHERE id = $1',
        [teacherId]
      );
      
      if (teacherResult.rows.length > 0) {
        const subject = teacherResult.rows[0].subject;
        
        // Assign teacher to classes based on subject compatibility
        // Math teacher focuses on higher grades, Language teacher on lower grades, etc.
        let targetGrades;
        
        if (subject === 'Mathematics') {
          targetGrades = ['11', '12', '10'];
        } else if (subject === 'English Literature') {
          targetGrades = ['9', '10', '11'];
        } else if (subject === 'Physics') {
          targetGrades = ['11', '12'];
        } else if (subject === 'History') {
          targetGrades = ['9', '10', '12'];
        } else {
          // Default distribution
          targetGrades = ['9', '10', '11', '12'];
        }
        
        // Assign to classes in target grades
        for (const grade of targetGrades) {
          const classesInGrade = gradeToClassMap[grade] || [];
          
          for (const classId of classesInGrade) {
            try {
              await client.query(`
                INSERT INTO teacher_classes (teacher_id, class_id)
                VALUES ($1, $2)
                ON CONFLICT DO NOTHING
              `, [teacherId, classId]);
              
              relationshipsInserted++;
              console.log(`✅ Teacher-class relationship inserted: Teacher ${i+1} -> Class ${classId}`);
              
              // Limit number of classes per teacher
              if (relationshipsInserted % 3 === 0) {
                break;
              }
            } catch (err) {
              console.log(`⚠️ Error inserting teacher-class relationship: ${err.message}`);
            }
          }
        }
      }
    }
    
    console.log(`✅ Inserted ${relationshipsInserted} teacher-class relationships`);
    return relationshipsInserted;
  } catch (err) {
    console.error('❌ Error inserting teacher-class relationships:', err.message);
    throw err;
  }
}

// Class-course relationships
async function insertClassCourseRelationships(client, classIds, courseIds, teacherIds) {
  try {
    // Each class should have multiple courses
    let relationshipsInserted = 0;
    
    // Get courses with subjects
    const courses = [];
    for (const courseId of courseIds) {
      const courseResult = await client.query(
        'SELECT name FROM courses WHERE id = $1',
        [courseId]
      );
      
      if (courseResult.rows.length > 0) {
        courses.push({
          id: courseId,
          name: courseResult.rows[0].name
        });
      }
    }
    
    // Get teachers with subjects
    const teachersWithSubjects = [];
    for (const teacherId of teacherIds) {
      const teacherResult = await client.query(
        'SELECT t.id, t.subject, u.name FROM teachers t JOIN users u ON t.user_id = u.id WHERE t.id = $1',
        [teacherId]
      );
      
      if (teacherResult.rows.length > 0) {
        teachersWithSubjects.push({
          id: teacherId,
          subject: teacherResult.rows[0].subject,
          name: teacherResult.rows[0].name
        });
      }
    }
    
    // Map subject names to course IDs
    const subjectToCourseMap = {
      'Mathematics': courses.filter(c => c.name.includes('Math')).map(c => c.id),
      'English Literature': courses.filter(c => c.name.includes('English')).map(c => c.id),
      'Physics': courses.filter(c => c.name.includes('Physics')).map(c => c.id),
      'History': courses.filter(c => c.name.includes('History')).map(c => c.id),
      'Computer Science': courses.filter(c => c.name.includes('Computer')).map(c => c.id)
    };
    
    // Fallback for any subject without a direct match
    for (const subject in subjectToCourseMap) {
      if (subjectToCourseMap[subject].length === 0) {
        // Assign a random course if no direct match
        subjectToCourseMap[subject] = [courseIds[Math.floor(Math.random() * courseIds.length)]];
      }
    }
    
    // Assign courses to classes with appropriate teachers
    for (const classId of classIds) {
      // Get class details
      const classResult = await client.query(
        'SELECT grade, section FROM classes WHERE id = $1',
        [classId]
      );
      
      if (classResult.rows.length === 0) continue;
      
      const classGrade = classResult.rows[0].grade;
      
      // Assign 4-6 courses per class
      const numCourses = 4 + Math.floor(Math.random() * 3);
      const assignedCourses = new Set();
      
      // First, assign courses based on teacher subjects
      for (const teacher of teachersWithSubjects) {
        // Check if teacher is assigned to this class
        const teacherClassResult = await client.query(
          'SELECT 1 FROM teacher_classes WHERE teacher_id = $1 AND class_id = $2',
          [teacher.id, classId]
        );
        
        if (teacherClassResult.rows.length > 0) {
          // Teacher teaches this class, assign their subject course
          const subjectCourses = subjectToCourseMap[teacher.subject] || [];
          
          if (subjectCourses.length > 0) {
            const courseId = subjectCourses[0];
            
            try {
              await client.query(`
                INSERT INTO class_courses (class_id, course_id, teacher_id, created_at)
                VALUES ($1, $2, $3, NOW())
                ON CONFLICT DO NOTHING
              `, [classId, courseId, teacher.id]);
              
              assignedCourses.add(courseId);
              relationshipsInserted++;
              console.log(`✅ Class-course relationship inserted: Class ${classId} -> Course ${courseId} (Teacher: ${teacher.name})`);
            } catch (err) {
              console.log(`⚠️ Error inserting class-course relationship: ${err.message}`);
            }
          }
        }
      }
      
      // Fill up to the desired number of courses
      let attemptsLeft = courseIds.length;
      while (assignedCourses.size < numCourses && attemptsLeft > 0) {
        const courseId = courseIds[Math.floor(Math.random() * courseIds.length)];
        
        if (!assignedCourses.has(courseId)) {
          // Find a teacher for this course
          let teacherId = teacherIds[Math.floor(Math.random() * teacherIds.length)];
          
          try {
            await client.query(`
              INSERT INTO class_courses (class_id, course_id, teacher_id, created_at)
              VALUES ($1, $2, $3, NOW())
              ON CONFLICT DO NOTHING
            `, [classId, courseId, teacherId]);
            
            assignedCourses.add(courseId);
            relationshipsInserted++;
            console.log(`✅ Class-course relationship inserted: Class ${classId} -> Course ${courseId}`);
          } catch (err) {
            console.log(`⚠️ Error inserting class-course relationship: ${err.message}`);
          }
        }
        
        attemptsLeft--;
      }
    }
    
    console.log(`✅ Inserted ${relationshipsInserted} class-course relationships`);
    return relationshipsInserted;
  } catch (err) {
    console.error('❌ Error inserting class-course relationships:', err.message);
    throw err;
  }
}

// Assignments data
async function insertAssignments(client, courseIds, teacherIds) {
  try {
    const assignmentIds = [];
    let insertedCount = 0;
    
    // Define assignment types
    const assignmentTypes = [
      'Quiz', 'Homework', 'Project', 'Essay', 'Presentation', 'Lab Report', 'Research Paper'
    ];
    
    // Create assignments for each course
    for (const courseId of courseIds) {
      // Get course details
      const courseResult = await client.query(
        'SELECT name FROM courses WHERE id = $1',
        [courseId]
      );
      
      if (courseResult.rows.length === 0) continue;
      
      const courseName = courseResult.rows[0].name;
      
      // Find teachers for this course
      const teacherResult = await client.query(
        'SELECT DISTINCT tc.teacher_id FROM class_courses cc JOIN teacher_classes tc ON cc.class_id = tc.class_id WHERE cc.course_id = $1',
        [courseId]
      );
      
      let teacherId;
      let userId;
      
      if (teacherResult.rows.length > 0) {
        teacherId = teacherResult.rows[0].teacher_id;
        
        // Get the user_id for this teacher
        const userResult = await client.query(
          'SELECT user_id FROM teachers WHERE id = $1',
          [teacherId]
        );
        
        if (userResult.rows.length > 0) {
          userId = userResult.rows[0].user_id;
        } else {
          // Fallback to a random teacher's user ID
          const randomTeacherResult = await client.query(
            'SELECT user_id FROM teachers LIMIT 1'
          );
          userId = randomTeacherResult.rows[0].user_id;
        }
      } else {
        // Fallback to a random teacher's user ID
        const randomTeacherResult = await client.query(
          'SELECT user_id FROM teachers LIMIT 1'
        );
        userId = randomTeacherResult.rows[0].user_id;
      }
      
      // Create 3-5 assignments per course
      const numAssignments = 3 + Math.floor(Math.random() * 3);
      
      for (let i = 0; i < numAssignments; i++) {
        const assignmentId = generateId();
        assignmentIds.push(assignmentId);
        
        // Get assignment type
        const assignmentType = assignmentTypes[Math.floor(Math.random() * assignmentTypes.length)];
        
        // Create assignment title and description
        const title = `${assignmentType} ${i+1}: ${courseName}`;
        const description = `Complete the ${assignmentType.toLowerCase()} on the topics covered in the ${courseName} course. ${
          assignmentType === 'Quiz' ? 'Answer all questions with detailed explanations.' :
          assignmentType === 'Project' ? 'Work in groups of 3-4 and submit a final report.' :
          assignmentType === 'Essay' ? 'Write a 1000-word essay analyzing the given topic.' :
          'Follow the instructions provided in class and submit your work before the due date.'
        }`;
        
        // Due dates vary based on assignment number
        let dueMonth = 9 + i; // September + assignment number (0-4)
        let dueYear = 2025;
        
        // Handle month overflow
        if (dueMonth > 12) {
          dueYear += Math.floor(dueMonth / 12);
          dueMonth = dueMonth % 12;
          // If month becomes 0 after modulo, set it to December (12)
          if (dueMonth === 0) dueMonth = 12;
        }
        
        const dueDay = 10 + Math.floor(Math.random() * 15); // 10-25th of the month
        const dueDate = `${dueYear}-${dueMonth.toString().padStart(2, '0')}-${dueDay.toString().padStart(2, '0')}`;
        
        await client.query(`
          INSERT INTO assignments (
            id, course_id, title, description, due_date, 
            created_by, created_at, updated_at
          ) VALUES (
            $1, $2, $3, $4, $5, $6, NOW(), NOW()
          )
        `, [
          assignmentId,
          courseId,
          title,
          description,
          dueDate,
          userId
        ]);
        
        insertedCount++;
        console.log(`✅ Assignment inserted: ${title}`);
      }
    }
    
    console.log(`✅ Inserted ${insertedCount} assignments`);
    return assignmentIds;
  } catch (err) {
    console.error('❌ Error inserting assignments:', err.message);
    throw err;
  }
}

// Student assignments data
async function insertStudentAssignments(client, studentIds, assignmentIds) {
  try {
    let relationshipsInserted = 0;
    
    // Create student-assignment mappings
    for (const studentId of studentIds) {
      // Get student details
      const studentResult = await client.query(
        'SELECT s.grade, s.section, u.name FROM students s JOIN users u ON s.user_id = u.id WHERE s.id = $1',
        [studentId]
      );
      
      if (studentResult.rows.length === 0) continue;
      
      const studentGrade = studentResult.rows[0].grade;
      const studentName = studentResult.rows[0].name;
      
      // For each student, assign 60-80% of assignments from their courses
      const eligibleAssignments = [];
      
      // Get classes for this student's grade
      const classesResult = await client.query(
        'SELECT id FROM classes WHERE grade = $1',
        [studentGrade]
      );
      
      const classIds = classesResult.rows.map(row => row.id);
      
      // Get courses for these classes
      for (const classId of classIds) {
        const coursesResult = await client.query(
          'SELECT course_id FROM class_courses WHERE class_id = $1',
          [classId]
        );
        
        const courseIds = coursesResult.rows.map(row => row.course_id);
        
        // Get assignments for these courses
        for (const courseId of courseIds) {
          const assignmentsResult = await client.query(
            'SELECT id FROM assignments WHERE course_id = $1',
            [courseId]
          );
          
          const assignments = assignmentsResult.rows.map(row => row.id);
          eligibleAssignments.push(...assignments);
        }
      }
      
      // If no eligible assignments found, assign some random ones
      if (eligibleAssignments.length === 0) {
        // Take 30% of random assignments
        const numAssignments = Math.max(1, Math.floor(assignmentIds.length * 0.3));
        const randomAssignments = [...assignmentIds]
          .sort(() => 0.5 - Math.random())
          .slice(0, numAssignments);
        
        eligibleAssignments.push(...randomAssignments);
      }
      
      // Assign 70-90% of eligible assignments to student
      const assignmentCompletionRate = 0.7 + Math.random() * 0.2;
      const assignmentsToComplete = Math.max(1, Math.floor(eligibleAssignments.length * assignmentCompletionRate));
      
      // Shuffle and select assignments
      const selectedAssignments = [...eligibleAssignments]
        .sort(() => 0.5 - Math.random())
        .slice(0, assignmentsToComplete);
      
      // Insert student assignments with varied status
      for (const assignmentId of selectedAssignments) {
        // Get assignment details
        const assignmentResult = await client.query(
          'SELECT due_date, title FROM assignments WHERE id = $1',
          [assignmentId]
        );
        
        if (assignmentResult.rows.length === 0) continue;
        
        const dueDate = new Date(assignmentResult.rows[0].due_date);
        const now = new Date();
        const isPastDue = dueDate < now;
        
        // Determine status and grade based on due date and random factors
        let status;
        let grade;
        let submissionDate;
        
        const randomFactor = Math.random();
        
        if (isPastDue) {
          if (randomFactor < 0.8) {
            status = 'completed';
            grade = calculateRandomGrade();
            
            // Submission date before due date
            const submissionDays = Math.floor(Math.random() * 7); // 0-6 days before due date
            const submission = new Date(dueDate);
            submission.setDate(submission.getDate() - submissionDays);
            submissionDate = submission.toISOString().split('T')[0];
          } else if (randomFactor < 0.9) {
            status = 'pending';
            grade = null;
            
            // Submission date after due date
            const lateDays = 1 + Math.floor(Math.random() * 5); // 1-5 days late
            const submission = new Date(dueDate);
            submission.setDate(submission.getDate() + lateDays);
            submissionDate = submission.toISOString().split('T')[0];
          } else {
            status = 'not_started';
            grade = null;
            submissionDate = null;
          }
        } else {
          if (randomFactor < 0.3) {
            status = 'completed';
            grade = calculateRandomGrade();
            
            // Early submission
            const earlyDays = Math.floor(Math.random() * 5) + 1; // 1-5 days early
            const today = new Date();
            const submission = new Date(Math.max(today.getTime(), dueDate.getTime() - earlyDays * 86400000));
            submissionDate = submission.toISOString().split('T')[0];
          } else if (randomFactor < 0.8) {
            status = 'pending';
            grade = null;
            submissionDate = null;
          } else {
            status = 'not_started';
            grade = null;
            submissionDate = null;
          }
        }
        
        // Insert student assignment
        try {
          await client.query(`
            INSERT INTO student_assignments (
              student_id, assignment_id, status, grade, 
              submission_date, created_at, updated_at
            ) VALUES (
              $1, $2, $3, $4, $5, NOW(), NOW()
            )
            ON CONFLICT DO NOTHING
          `, [
            studentId,
            assignmentId,
            status,
            grade,
            submissionDate
          ]);
          
          relationshipsInserted++;
          console.log(`✅ Student assignment inserted: ${studentName} -> ${assignmentResult.rows[0].title} (${status})`);
        } catch (err) {
          console.log(`⚠️ Error inserting student assignment: ${err.message}`);
        }
      }
    }
    
    console.log(`✅ Inserted ${relationshipsInserted} student assignments`);
    return relationshipsInserted;
  } catch (err) {
    console.error('❌ Error inserting student assignments:', err.message);
    throw err;
  }
}

// Helper function to calculate random grade
function calculateRandomGrade(min = 0.7, max = 1.0) {
  // Generate a random score between min and max (70-100%)
  const score = min + Math.random() * (max - min);
  const percentage = Math.round(score * 100);
  
  // Convert to letter grade
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
}

// Notifications data
async function insertNotifications(client, userIds) {
  try {
    const notificationIds = [];
    
    // Common notifications for all users
    const commonNotifications = [
      {
        title: 'Welcome to Lincoln International Academy',
        message: 'Welcome to the new school management system. Please complete your profile setup.',
        category: 'System',
        priority: 'high'
      },
      {
        title: 'School Calendar Updated',
        message: 'The school calendar for the 2025-2026 academic year has been updated. Please check for important dates.',
        category: 'Announcement',
        priority: 'normal'
      },
      {
        title: 'System Maintenance Notice',
        message: 'The system will undergo maintenance this weekend. Some features may be temporarily unavailable.',
        category: 'System',
        priority: 'low'
      }
    ];
    
    // Insert common notifications
    for (const notification of commonNotifications) {
      const notificationId = generateId();
      notificationIds.push(notificationId);
      
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
            INSERT INTO notifications (
              id, title, message, category, priority, created_at, is_read
            ) VALUES (
              $1, $2, $3, $4, $5, NOW(), false
            )
          `;
          params = [
            notificationId,
            notification.title,
            notification.message,
            notification.category,
            notification.priority
          ];
        } else {
          // If priority column doesn't exist, don't include it
          query = `
            INSERT INTO notifications (
              id, title, message, category, created_at, is_read
            ) VALUES (
              $1, $2, $3, $4, NOW(), false
            )
          `;
          params = [
            notificationId,
            notification.title,
            notification.message,
            notification.category
          ];
        }
        
        await client.query(query, params);
        console.log(`✅ Notification inserted: ${notification.title}`);
        
        // Link notification to all users
        for (const userId of userIds) {
          await client.query(`
            INSERT INTO user_notifications (
              notification_id, user_id, is_read
            ) VALUES (
              $1, $2, false
            )
            ON CONFLICT DO NOTHING
          `, [notificationId, userId]);
        }
        
        console.log(`✅ Notification linked to ${userIds.length} users`);
      } catch (err) {
        console.log(`⚠️ Error inserting notification: ${err.message}`);
      }
    }
    
    return notificationIds;
  } catch (err) {
    console.error('❌ Error inserting notifications:', err.message);
    throw err;
  }
}

// Calendar events
async function insertCalendarEvents(client, userIds) {
  try {
    const eventIds = [];
    
    // Create some school-wide calendar events
    const schoolEvents = [
      {
        title: 'First Day of School',
        description: 'Welcome back to school! First day of the new academic year.',
        event_date: '2025-08-15',
        event_time: '08:00:00',
        event_end_time: '15:00:00',
        is_all_day: true,
        location: 'School Campus',
        event_type: 'school'
      },
      {
        title: 'Parent-Teacher Conference',
        description: 'Mid-term parent-teacher conference for all grades.',
        event_date: '2025-10-25',
        event_time: '13:00:00',
        event_end_time: '19:00:00',
        is_all_day: false,
        location: 'School Auditorium',
        event_type: 'school'
      },
      {
        title: 'Winter Break',
        description: 'Winter break - No classes.',
        event_date: '2025-12-20',
        event_time: '00:00:00',
        event_end_time: '23:59:59',
        is_all_day: true,
        location: 'N/A',
        event_type: 'holiday'
      },
      {
        title: 'Science Fair',
        description: 'Annual science fair showcasing student projects.',
        event_date: '2026-03-15',
        event_time: '09:00:00',
        event_end_time: '16:00:00',
        is_all_day: false,
        location: 'School Gymnasium',
        event_type: 'school'
      },
      {
        title: 'Final Exams',
        description: 'End of year final examinations.',
        event_date: '2026-05-15',
        event_time: '08:30:00',
        event_end_time: '14:30:00',
        is_all_day: false,
        location: 'Classrooms',
        event_type: 'academic'
      },
      {
        title: 'Graduation Ceremony',
        description: 'Graduation ceremony for 12th grade students.',
        event_date: '2026-06-10',
        event_time: '10:00:00',
        event_end_time: '13:00:00',
        is_all_day: false,
        location: 'School Auditorium',
        event_type: 'school'
      }
    ];
    
    // Insert school events
    for (const event of schoolEvents) {
      const eventId = generateId();
      eventIds.push(eventId);
      
      await client.query(`
        INSERT INTO calendar_events (
          id, title, description, event_date, event_time, event_end_time,
          is_all_day, location, event_type, created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()
        )
      `, [
        eventId,
        event.title,
        event.description,
        event.event_date,
        event.event_time,
        event.event_end_time,
        event.is_all_day,
        event.location,
        event.event_type
      ]);
      
      console.log(`✅ Calendar event inserted: ${event.title}`);
      
      // Add all users as participants for school-wide events
      for (const userId of userIds) {
        await client.query(`
          INSERT INTO event_participants (
            event_id, user_id, status
          ) VALUES (
            $1, $2, 'going'
          )
          ON CONFLICT DO NOTHING
        `, [eventId, userId]);
      }
      
      console.log(`✅ Added ${userIds.length} participants to event: ${event.title}`);
    }
    
    return eventIds;
  } catch (err) {
    console.error('❌ Error inserting calendar events:', err.message);
    throw err;
  }
}

// Attendance records
async function insertAttendanceRecords(client, studentIds, classIds) {
  try {
    let attendanceRecordsInserted = 0;
    
    // Get academic year information
    const academicYearResult = await client.query(
      "SELECT * FROM academic_years WHERE is_current = true"
    );
    
    if (academicYearResult.rows.length === 0) {
      console.log('⚠️ No current academic year found. Skipping attendance records.');
      return 0;
    }
    
    const academicYear = academicYearResult.rows[0];
    const startDate = new Date(academicYear.start_date);
    const today = new Date();
    
    // Create a map of students to their classes based on grade
    const studentClassMap = {};
    
    for (const studentId of studentIds) {
      // Get student grade
      const studentResult = await client.query(
        'SELECT grade, section FROM students WHERE id = $1',
        [studentId]
      );
      
      if (studentResult.rows.length === 0) continue;
      
      const studentGrade = studentResult.rows[0].grade;
      const studentSection = studentResult.rows[0].section;
      
      // Find matching classes
      const matchingClasses = [];
      
      for (const classId of classIds) {
        const classResult = await client.query(
          'SELECT * FROM classes WHERE id = $1 AND grade = $2 AND section = $3',
          [classId, studentGrade, studentSection]
        );
        
        if (classResult.rows.length > 0) {
          matchingClasses.push(classId);
        }
      }
      
      studentClassMap[studentId] = matchingClasses;
    }
    
    // Generate attendance records for each student for school days between start date and today
    // Limit to 30 days to avoid too many records
    const maxDays = 30;
    const schoolDays = [];
    
    let currentDate = new Date(startDate);
    let daysAdded = 0;
    
    while (currentDate <= today && daysAdded < maxDays) {
      // Skip weekends (0 = Sunday, 6 = Saturday)
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        schoolDays.push(new Date(currentDate));
        daysAdded++;
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Default to 30 days of attendance if no start date is available
    if (schoolDays.length === 0) {
      currentDate = new Date();
      for (let i = 0; i < maxDays; i++) {
        currentDate.setDate(currentDate.getDate() - 1);
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          schoolDays.push(new Date(currentDate));
        }
      }
    }
    
    // Create attendance records
    for (const studentId in studentClassMap) {
      const classIds = studentClassMap[studentId];
      
      if (classIds.length === 0) continue;
      
      const classId = classIds[0]; // Take the first matching class
      
      // Generate attendance for each school day
      for (const day of schoolDays) {
        const attendanceId = generateId();
        const date = day.toISOString().split('T')[0];
        
        // Random attendance with 85-95% present rate
        const isPresent = Math.random() < 0.9;
        const status = isPresent ? 'present' : (Math.random() < 0.7 ? 'absent' : 'late');
        
        // Note for absences or late arrivals
        let note = null;
        if (status === 'absent') {
          const reasons = [
            'Medical appointment',
            'Sick leave',
            'Family emergency',
            'Excused absence',
            'Unexcused absence'
          ];
          note = reasons[Math.floor(Math.random() * reasons.length)];
        } else if (status === 'late') {
          note = `Late arrival by ${5 + Math.floor(Math.random() * 15)} minutes`;
        }
        
        await client.query(`
          INSERT INTO student_attendance (
            id, student_id, class_id, attendance_date, status, 
            notes, created_at, updated_at
          ) VALUES (
            $1, $2, $3, $4, $5, $6, NOW(), NOW()
          )
          ON CONFLICT DO NOTHING
        `, [
          attendanceId,
          studentId,
          classId,
          date,
          status,
          note
        ]);
        
        attendanceRecordsInserted++;
      }
    }
    
    console.log(`✅ Inserted ${attendanceRecordsInserted} attendance records`);
    return attendanceRecordsInserted;
  } catch (err) {
    console.error('❌ Error inserting attendance records:', err.message);
    throw err;
  }
}

// Student grades
async function insertGrades(client, studentIds, courseIds) {
  try {
    let gradesInserted = 0;
    
    // Get term information
    const termsResult = await client.query(
      "SELECT * FROM school_terms ORDER BY start_date DESC LIMIT 2"
    );
    
    if (termsResult.rows.length === 0) {
      console.log('⚠️ No terms found. Skipping grades.');
      return 0;
    }
    
    const terms = termsResult.rows;
    
    // Create a map of students to their courses
    for (const studentId of studentIds) {
      // Get student details
      const studentResult = await client.query(
        'SELECT grade, section FROM students WHERE id = $1',
        [studentId]
      );
      
      if (studentResult.rows.length === 0) continue;
      
      const studentGrade = studentResult.rows[0].grade;
      
      // Get classes for this student's grade
      const classesResult = await client.query(
        'SELECT id FROM classes WHERE grade = $1',
        [studentGrade]
      );
      
      const classIds = classesResult.rows.map(row => row.id);
      
      // Get courses for these classes
      const studentCourses = [];
      
      for (const classId of classIds) {
        const coursesResult = await client.query(
          'SELECT course_id FROM class_courses WHERE class_id = $1',
          [classId]
        );
        
        studentCourses.push(...coursesResult.rows.map(row => row.course_id));
      }
      
      // If no courses found, use a subset of random courses
      if (studentCourses.length === 0) {
        studentCourses.push(...courseIds.slice(0, 5));
      }
      
      // Create grades for each course and term
      for (const courseId of studentCourses) {
        for (const term of terms) {
          const gradeId = generateId();
          
          // Generate grade values with variation between terms
          const baseLetterGrade = calculateRandomGrade();
          const baseGradeValue = letterToNumeric(baseLetterGrade);
          
          // Second term grades tend to improve slightly
          const isSecondTerm = term === terms[0];
          const finalGradeValue = isSecondTerm 
            ? Math.min(100, baseGradeValue + Math.floor(Math.random() * 8))
            : baseGradeValue;
          
          const letterGrade = numericToLetter(finalGradeValue);
          
          await client.query(`
            INSERT INTO student_grades (
              id, student_id, course_id, term_id, grade_value,
              created_at, updated_at
            ) VALUES (
              $1, $2, $3, $4, $5, NOW(), NOW()
            )
            ON CONFLICT DO NOTHING
          `, [
            gradeId,
            studentId,
            courseId,
            term.id,
            letterGrade
          ]);
          
          gradesInserted++;
        }
      }
    }
    
    console.log(`✅ Inserted ${gradesInserted} grade records`);
    return gradesInserted;
  } catch (err) {
    console.error('❌ Error inserting grades:', err.message);
    throw err;
  }
}

// Helper function to convert letter grade to numeric
function letterToNumeric(letter) {
  switch (letter) {
    case 'A': return 95;
    case 'B': return 85;
    case 'C': return 75;
    case 'D': return 65;
    case 'F': return 55;
    default: return 0;
  }
}

// Helper function to convert numeric to letter grade
function numericToLetter(numeric) {
  if (numeric >= 90) return 'A';
  if (numeric >= 80) return 'B';
  if (numeric >= 70) return 'C';
  if (numeric >= 60) return 'D';
  return 'F';
}

// Main function to load real data
async function loadRealData() {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Loading real data...');
    await client.query('BEGIN');
    
    // Load school settings
    console.log('\n📤 Inserting school settings...');
    const schoolId = await insertSchoolSettings(client);
    
    // Load academic years and terms
    console.log('\n📤 Inserting academic years and terms...');
    const academicYearIds = await insertAcademicYearsAndTerms(client);
    
    // Load users with various roles
    console.log('\n📤 Inserting users...');
    const userIds = await insertUsers(client);
    
    // Load teachers
    console.log('\n📤 Inserting teachers...');
    const teacherIds = await insertTeachers(client, userIds.teacherUserIds);
    
    // Load students
    console.log('\n📤 Inserting students...');
    const studentIds = await insertStudents(client, userIds.studentUserIds);
    
    // Load classes
    console.log('\n📤 Inserting classes...');
    const classIds = await insertClasses(client);
    
    // Load courses
    console.log('\n📤 Inserting courses...');
    const courseIds = await insertCourses(client);
    
    // Create relationships
    console.log('\n📤 Creating teacher-class relationships...');
    await insertTeacherClassRelationships(client, teacherIds, classIds);
    
    console.log('\n📤 Creating class-course relationships...');
    await insertClassCourseRelationships(client, classIds, courseIds, teacherIds);
    
    // Assignments
    console.log('\n📤 Inserting assignments...');
    const assignmentIds = await insertAssignments(client, courseIds, teacherIds);
    
    // Student assignments
    console.log('\n📤 Creating student-assignment relationships...');
    await insertStudentAssignments(client, studentIds, assignmentIds);
    
    // Generate notifications
    console.log('\n📤 Inserting notifications...');
    await insertNotifications(client, userIds.allUserIds);
    
    // Add calendar events
    console.log('\n📤 Inserting calendar events...');
    await insertCalendarEvents(client, userIds.allUserIds);
    
    // Create attendance records
    console.log('\n📤 Inserting attendance records...');
    await insertAttendanceRecords(client, studentIds, classIds);
    
    // Create grades
    console.log('\n📤 Inserting grades...');
    await insertGrades(client, studentIds, courseIds);
    
    await client.query('COMMIT');
    console.log('\n✅ Data loading completed!');
    
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Error loading data:', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

// Execute the function
console.log('🚀 SchoolVista Real Data Loader');
console.log('===============================\n');
loadRealData(); 