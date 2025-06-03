
/**
 * Dashboard data routes
 */

const express = require('express');
const { pool } = require('../config/database');
const router = express.Router();

// Get dashboard stats by role
router.get('/stats/:role/:userId?', async (req, res) => {
  try {
    const { role, userId } = req.params;
    let result;

    switch (role) {
      case 'student':
        result = await pool.query(`
          SELECT metric, value, label, description 
          FROM student_dashboard_view 
          WHERE user_id = $1
        `, [userId]);
        break;
        
      case 'teacher':
        result = await pool.query(`
          SELECT metric, value, label, description 
          FROM teacher_dashboard_view 
          WHERE user_id = $1
        `, [userId]);
        break;
        
      case 'admin':
      case 'super-admin':
      case 'principal':
        result = await pool.query(`
          SELECT metric, value, label, description 
          FROM admin_dashboard_view
        `);
        break;
        
      default:
        return res.status(400).json({ error: 'Invalid role' });
    }
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get notifications for a user
router.get('/notifications/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(`
      SELECT * FROM notifications 
      WHERE user_id = $1 
      ORDER BY created_at DESC 
      LIMIT 10
    `, [userId]);
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get calendar events for a user
router.get('/events/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(`
      SELECT * FROM events 
      WHERE is_public = true OR created_by = $1
      ORDER BY start_date ASC 
      LIMIT 20
    `, [userId]);
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark notification as read
router.put('/notifications/:notificationId/read', async (req, res) => {
  try {
    const { notificationId } = req.params;
    const result = await pool.query(`
      UPDATE notifications 
      SET is_read = true, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `, [notificationId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error marking notification as read:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
