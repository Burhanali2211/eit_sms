import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import http from 'http';

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

// Create a pool
const pool = new Pool(dbConfig);

// Variables to track connections
let lastConnections = [];
let connectionHistory = [];
const MAX_HISTORY = 20;

// Store connection counts for stats
let totalConnectionsCount = 0;
let appConnectionsCount = 0;
let startTime = Date.now();

// Get active connections
async function getActiveConnections() {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT pid, datname as database, usename as user, 
             application_name, client_addr, state, 
             query, backend_start, query_start
      FROM pg_stat_activity 
      WHERE datname = current_database()
    `);
    return result.rows;
  } finally {
    client.release();
  }
}

// Check for new connections
async function checkNewConnections() {
  try {
    const currentConnections = await getActiveConnections();
    
    // Compare with previous connections to find new ones
    const newConnections = currentConnections.filter(conn => {
      return !lastConnections.some(oldConn => oldConn.pid === conn.pid);
    });
    
    // Add new connections to history
    if (newConnections.length > 0) {
      totalConnectionsCount += newConnections.length;
      
      // Count application connections (connections that might be from your app)
      const newAppConnections = newConnections.filter(conn => 
        conn.application_name === 'SchoolVista' || 
        conn.application_name.includes('vite') ||
        conn.application_name.includes('react') ||
        conn.application_name === '' // Empty app name could be your application
      );
      
      appConnectionsCount += newAppConnections.length;
      
      // Log new connections
      newConnections.forEach(conn => {
        const timestamp = new Date().toISOString();
        const connInfo = {
          timestamp,
          pid: conn.pid,
          user: conn.user,
          database: conn.database,
          app: conn.application_name || 'N/A',
          query: (conn.query || '').substring(0, 100) // Truncate long queries
        };
        
        connectionHistory.unshift(connInfo);
        console.log(`New connection at ${timestamp}: ${conn.user}@${conn.database} (${conn.application_name || 'N/A'})`);
      });
      
      // Trim history to max size
      if (connectionHistory.length > MAX_HISTORY) {
        connectionHistory = connectionHistory.slice(0, MAX_HISTORY);
      }
    }
    
    // Store current connections for next comparison
    lastConnections = currentConnections;
    
  } catch (err) {
    console.error('Error checking connections:', err.message);
  }
}

// Create a simple HTTP server to view connection stats in a browser
const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(404);
    res.end();
    return;
  }
  
  const runtime = ((Date.now() - startTime) / 1000).toFixed(0);
  const minutes = Math.floor(runtime / 60);
  const seconds = runtime % 60;
  
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>PostgreSQL Connection Monitor</title>
      <meta http-equiv="refresh" content="5">
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; line-height: 1.6; }
        h1, h2 { color: #333; }
        .stats { display: flex; gap: 20px; margin-bottom: 20px; }
        .stat-box { background: #f5f5f5; padding: 15px; border-radius: 5px; min-width: 200px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f2f2f2; }
        tr:hover { background-color: #f5f5f5; }
        .query { max-width: 400px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      </style>
    </head>
    <body>
      <h1>PostgreSQL Connection Monitor</h1>
      <p>Monitoring database: <strong>${dbConfig.database}</strong> at <strong>${dbConfig.host}:${dbConfig.port}</strong></p>
      <p>Runtime: ${minutes}m ${seconds}s (Refreshes every 5 seconds)</p>
      
      <div class="stats">
        <div class="stat-box">
          <h3>Total Connections</h3>
          <p>${totalConnectionsCount}</p>
        </div>
        <div class="stat-box">
          <h3>App Connections</h3>
          <p>${appConnectionsCount}</p>
        </div>
        <div class="stat-box">
          <h3>Current Connections</h3>
          <p>${lastConnections.length}</p>
        </div>
      </div>
      
      <h2>Current Connections</h2>
      <table>
        <tr>
          <th>PID</th>
          <th>User</th>
          <th>Database</th>
          <th>Application</th>
          <th>State</th>
          <th>Query</th>
        </tr>
        ${lastConnections.map(conn => `
          <tr>
            <td>${conn.pid}</td>
            <td>${conn.user}</td>
            <td>${conn.database}</td>
            <td>${conn.application_name || 'N/A'}</td>
            <td>${conn.state || 'N/A'}</td>
            <td class="query">${(conn.query || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
          </tr>
        `).join('')}
      </table>
      
      <h2>Connection History (Last ${connectionHistory.length})</h2>
      <table>
        <tr>
          <th>Time</th>
          <th>PID</th>
          <th>User</th>
          <th>Database</th>
          <th>Application</th>
          <th>Query</th>
        </tr>
        ${connectionHistory.map(conn => `
          <tr>
            <td>${conn.timestamp}</td>
            <td>${conn.pid}</td>
            <td>${conn.user}</td>
            <td>${conn.database}</td>
            <td>${conn.app}</td>
            <td class="query">${(conn.query || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
          </tr>
        `).join('')}
      </table>
    </body>
    </html>
  `);
  res.end();
});

// Start the application
async function startMonitoring() {
  // Check if database is accessible first
  try {
    const client = await pool.connect();
    console.log(`✅ Connected to PostgreSQL database: ${dbConfig.database}`);
    client.release();
    
    // Start the monitoring loop
    console.log('📊 Starting connection monitoring...');
    setInterval(checkNewConnections, 2000);
    
    // Start the web server for viewing stats
    const PORT = 3333;
    server.listen(PORT, () => {
      console.log(`🌐 Connection monitor dashboard available at http://localhost:${PORT}`);
      console.log('📋 To stop the monitor, press Ctrl+C');
    });
    
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    console.error('Cannot start monitoring. Please check your database connection settings.');
    process.exit(1);
  }
}

// Run the app
startMonitoring(); 