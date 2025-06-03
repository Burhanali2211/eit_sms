
/**
 * Calendar and events routes
 */

const express = require('express');
const { pool } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Apply authentication to all routes
router.use(authenticateToken);

// Get events
router.get('/events', async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    let query = `
      SELECT * FROM events 
      WHERE (is_public = true OR created_by = $1)
    `;
    const params = [req.user.id];
    
    if (start_date && end_date) {
      query += ` AND start_date >= $2 AND end_date <= $3`;
      params.push(start_date, end_date);
    }
    
    query += ` ORDER BY start_date ASC`;
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create event
router.post('/events', async (req, res) => {
  try {
    const { title, description, start_date, end_date, location, event_type, is_public = true } = req.body;
    
    const result = await pool.query(`
      INSERT INTO events (title, description, start_date, end_date, location, event_type, created_by, is_public)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [title, description, start_date, end_date, location, event_type, req.user.id, is_public]);
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update event
router.put('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, start_date, end_date, location, event_type, is_public } = req.body;
    
    const result = await pool.query(`
      UPDATE events 
      SET title = $1, description = $2, start_date = $3, end_date = $4, 
          location = $5, event_type = $6, is_public = $7, updated_at = NOW()
      WHERE id = $8 AND (created_by = $9 OR $10 IN ('admin', 'principal'))
      RETURNING *
    `, [title, description, start_date, end_date, location, event_type, is_public, id, req.user.id, req.user.role]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found or unauthorized' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete event
router.delete('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(`
      DELETE FROM events 
      WHERE id = $1 AND (created_by = $2 OR $3 IN ('admin', 'principal'))
      RETURNING id
    `, [id, req.user.id, req.user.role]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found or unauthorized' });
    }
    
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
