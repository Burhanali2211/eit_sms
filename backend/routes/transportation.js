
/**
 * Transportation management routes
 */

const express = require('express');
const { pool } = require('../config/database');
const router = express.Router();

// Get all bus routes with stops
router.get('/routes', async (req, res) => {
  try {
    const routesResult = await pool.query(`
      SELECT * FROM bus_routes ORDER BY route_name
    `);
    
    const routes = routesResult.rows;
    
    // Get stops for each route
    for (let route of routes) {
      const stopsResult = await pool.query(`
        SELECT bs.*, COUNT(st.student_id) as student_count
        FROM bus_stops bs
        LEFT JOIN student_transportation st ON bs.id = st.stop_id
        WHERE bs.route_id = $1
        GROUP BY bs.id
        ORDER BY bs.stop_order
      `, [route.id]);
      route.stops = stopsResult.rows;
    }
    
    res.json(routes);
  } catch (err) {
    console.error('Error fetching bus routes:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update bus location
router.post('/location', async (req, res) => {
  try {
    const { route_id, latitude, longitude, speed, heading, driver_status } = req.body;
    
    // Insert new location record
    await pool.query(`
      INSERT INTO bus_locations (route_id, latitude, longitude, speed, heading, driver_status)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [route_id, latitude, longitude, speed, heading, driver_status]);
    
    // Update current location in bus_routes table
    await pool.query(`
      UPDATE bus_routes 
      SET current_latitude = $1, current_longitude = $2, last_location_update = NOW()
      WHERE id = $3
    `, [latitude, longitude, route_id]);
    
    res.json({ message: 'Location updated successfully' });
  } catch (err) {
    console.error('Error updating bus location:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get latest bus locations
router.get('/locations', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT ON (route_id) 
        bl.*, br.route_name, br.driver_name, br.vehicle_number
      FROM bus_locations bl
      JOIN bus_routes br ON bl.route_id = br.id
      ORDER BY route_id, timestamp DESC
    `);
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching bus locations:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get students for a route
router.get('/routes/:routeId/students', async (req, res) => {
  try {
    const { routeId } = req.params;
    
    const result = await pool.query(`
      SELECT s.student_id, u.name, st.pickup_time, st.dropoff_time, bs.name as stop_name
      FROM student_transportation st
      JOIN students s ON st.student_id = s.id
      JOIN users u ON s.user_id = u.id
      LEFT JOIN bus_stops bs ON st.stop_id = bs.id
      WHERE st.route_id = $1
      ORDER BY u.name
    `, [routeId]);
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching route students:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
