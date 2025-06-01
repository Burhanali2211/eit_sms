
/**
 * Academic management routes (classes, grades, attendance)
 */

const express = require('express');
const { pool } = require('../config/database');
const router = express.Router();

// Get all classes
router.get('/classes', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*, u.name as teacher_name, d.name as department_name,
             COUNT(e.student_id) as student_count
      FROM classes c
      LEFT JOIN users u ON c.teacher_id = u.id
      LEFT JOIN departments d ON c.department_id = d.id
      LEFT JOIN enrollments e ON c.id = e.class_id AND e.status = 'active'
      GROUP BY c.id, u.name, d.name
      ORDER BY c.grade, c.section, c.name
    `);
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching classes:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get students in a class
router.get('/classes/:classId/students', async (req, res) => {
  try {
    const { classId } = req.params;
    
    const result = await pool.query(`
      SELECT s.id, s.student_id, u.name, s.grade, s.section, s.attendance, s.gpa
      FROM enrollments e
      JOIN students s ON e.student_id = s.id
      JOIN users u ON s.user_id = u.id
      WHERE e.class_id = $1 AND e.status = 'active'
      ORDER BY u.name
    `, [classId]);
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching class students:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get grades for a student
router.get('/students/:studentId/grades', async (req, res) => {
  try {
    const { studentId } = req.params;
    
    const result = await pool.query(`
      SELECT g.*, a.title as assignment_title, a.assignment_type, c.name as class_name
      FROM grades g
      JOIN assignments a ON g.assignment_id = a.id
      JOIN classes c ON a.class_id = c.id
      WHERE g.student_id = $1
      ORDER BY g.graded_at DESC
    `, [studentId]);
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching student grades:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark attendance
router.post('/attendance', async (req, res) => {
  try {
    const { student_id, class_id, date, status, notes, marked_by } = req.body;
    
    const result = await pool.query(`
      INSERT INTO attendance (student_id, class_id, date, status, notes, marked_by)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (student_id, class_id, date)
      DO UPDATE SET status = $4, notes = $5, marked_by = $6, updated_at = NOW()
      RETURNING *
    `, [student_id, class_id, date, status, notes, marked_by]);
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error marking attendance:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
