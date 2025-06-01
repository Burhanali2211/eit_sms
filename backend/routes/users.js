
/**
 * User management routes
 */

const express = require('express');
const bcrypt = require('bcrypt');
const { pool } = require('../config/database');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, email, name, role, status, phone, last_login, created_at 
      FROM users 
      ORDER BY created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT id, email, name, role, status, phone, address, date_of_birth, 
             emergency_contact, last_login, created_at 
      FROM users 
      WHERE id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const { email, password, name, role, phone, address } = req.body;
    
    // Check if user already exists
    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    
    // Hash password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);
    
    const result = await pool.query(`
      INSERT INTO users (email, password_hash, name, role, phone, address)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, email, name, role, status, phone, created_at
    `, [email, password_hash, name, role, phone, address]);
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, phone, address, status } = req.body;
    
    const result = await pool.query(`
      UPDATE users 
      SET name = $1, role = $2, phone = $3, address = $4, status = $5, updated_at = NOW()
      WHERE id = $6
      RETURNING id, email, name, role, status, phone, updated_at
    `, [name, role, phone, address, status, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
