
// Example code to connect to the database from a Node.js backend

const { Pool } = require('pg');

// Database connection configuration
const pool = new Pool({
  user: 'edusync_user',
  host: 'localhost',
  database: 'edusync_db',
  password: 'secure_password',
  port: 5432,
});

// Example query functions for dashboard data

// Get student dashboard stats
const getStudentDashboardStats = async (studentId) => {
  const query = `
    SELECT * FROM student_dashboard_view
    WHERE student_id = $1
  `;
  
  try {
    const result = await pool.query(query, [studentId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching student dashboard stats:', error);
    throw error;
  }
};

// Get teacher dashboard stats
const getTeacherDashboardStats = async (teacherId) => {
  const query = `
    SELECT * FROM teacher_dashboard_view
    WHERE teacher_id = $1
  `;
  
  try {
    const result = await pool.query(query, [teacherId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching teacher dashboard stats:', error);
    throw error;
  }
};

// Get financial dashboard stats
const getFinancialDashboardStats = async () => {
  const query = `SELECT * FROM financial_dashboard_view`;
  
  try {
    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching financial dashboard stats:', error);
    throw error;
  }
};

// Get notifications for a user
const getUserNotifications = async (userId) => {
  const query = `
    SELECT n.id, n.title, n.message, n.created_at, un.is_read 
    FROM notifications n
    JOIN user_notifications un ON n.id = un.notification_id
    WHERE un.user_id = $1
    ORDER BY n.created_at DESC
    LIMIT 10
  `;
  
  try {
    const result = await pool.query(query, [userId]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching user notifications:', error);
    throw error;
  }
};

// Get calendar events for a user
const getUserCalendarEvents = async (userId) => {
  const query = `
    SELECT e.id, e.title, e.description, 
           to_char(e.event_date, 'Month DD, YYYY') as date,
           to_char(e.event_time, 'HH24:MI') as time
    FROM calendar_events e
    JOIN event_participants ep ON e.id = ep.event_id
    WHERE ep.user_id = $1 AND e.event_date >= CURRENT_DATE
    ORDER BY e.event_date, e.event_time
    LIMIT 5
  `;
  
  try {
    const result = await pool.query(query, [userId]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw error;
  }
};

module.exports = {
  getStudentDashboardStats,
  getTeacherDashboardStats,
  getFinancialDashboardStats,
  getUserNotifications,
  getUserCalendarEvents
};
