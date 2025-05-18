
# EduSync School Management System

EduSync is a comprehensive school management system designed to streamline educational workflows, enhance communication between students, teachers, and administrators, and provide powerful tools for managing all aspects of school operations.

## Key Features

- **Multi-User Roles**: Support for students, teachers, principals, administrators, and specialized staff
- **Dashboard Analytics**: Role-specific dashboards with relevant information and statistics
- **Course Management**: Manage courses, classes, and academic resources
- **Grade Tracking**: Record and analyze student performance
- **Attendance Monitoring**: Track and report on student attendance
- **School Resources**: Manage libraries, labs, clubs and other school resources
- **Dark Mode Support**: Comfortable viewing experience in any lighting condition
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack

- React with TypeScript
- TailwindCSS for styling
- Shadcn UI component library
- React Router for navigation
- React Query for data fetching
- Lucide icons

## Demo Accounts

Use these credentials to test different roles in the system:

- **Student**: student@edusync.com / password123
- **Teacher**: teacher@edusync.com / password123
- **Principal**: principal@edusync.com / password123
- **Admin**: admin@edusync.com / password123

---

# Supabase to PostgreSQL Migration Guide

This guide provides step-by-step instructions for migrating the EduSync application from Supabase to a standard PostgreSQL setup.

## Table of Contents

1. [Overview](#overview)
2. [Exporting Data from Supabase](#exporting-data-from-supabase)
3. [Setting Up PostgreSQL](#setting-up-postgresql)
4. [Importing Schema and Data](#importing-schema-and-data)
5. [Application Configuration](#application-configuration)
6. [Authentication](#authentication)
7. [Storage](#storage)
8. [Realtime Functionality](#realtime-functionality)
9. [Troubleshooting](#troubleshooting)

## Overview

This migration involves transitioning from Supabase's managed PostgreSQL service to a self-hosted or other cloud-provided PostgreSQL database. The key components to migrate include:

- Database schema and data
- Authentication system
- File storage
- API functionality

## Exporting Data from Supabase

1. **Generate Database Schema**:
   - From Supabase Dashboard, go to SQL Editor
   - Run: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`
   - For each table, generate its schema using: `SELECT column_name, data_type, character_maximum_length, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'table_name' ORDER BY ordinal_position;`

2. **Export Data**:
   - Use the Supabase CLI:
     ```bash
     supabase db remote commit
     ```
   - Alternatively, use the dashboard to download a full database dump:
     ```bash
     PGPASSWORD=postgres_password pg_dump --host localhost --port 5432 --username postgres --format c --no-owner --no-privileges --file=dump.sql your_database_name
     ```

3. **Export RLS Policies**:
   - Run: `SELECT * FROM pg_policies;` to list all policies
   - Document each policy for recreation

## Setting Up PostgreSQL

### Local Development Setup with Docker

1. **Install Docker**: Download and install from [docker.com](https://docker.com)

2. **Launch PostgreSQL Container**:
   ```bash
   docker run --name edusync-postgres -e POSTGRES_PASSWORD=your_password -e POSTGRES_DB=edusync -p 5432:5432 -d postgres:14
   ```

3. **Install PostgreSQL Client** (optional):
   - On Ubuntu: `sudo apt-get install postgresql-client`
   - On macOS: `brew install postgresql`
   - On Windows: Install pgAdmin or use the command-line client from PostgreSQL installation

### Cloud Options

Alternative cloud-hosted PostgreSQL services:

1. **Amazon RDS for PostgreSQL**
   - Sign up for AWS
   - Create a new RDS instance with PostgreSQL
   - Configure security groups to allow access

2. **Google Cloud SQL for PostgreSQL**
   - Sign up for Google Cloud
   - Create a new Cloud SQL instance
   - Configure network access

3. **DigitalOcean Managed Databases**
   - Create a PostgreSQL database cluster
   - Configure firewall rules
   - Get connection details from dashboard

## Importing Schema and Data

1. **Use the Migration Script**:
   - The script `supabase-to-postgresql.sql` is provided in this repository
   - It contains the complete database schema with indexes, views, and functions
   - Run the script against your new PostgreSQL database:
     ```bash
     psql -h localhost -U postgres -d edusync -f supabase-to-postgresql.sql
     ```

2. **Import Data** (if you have a separate data dump):
   ```bash
   pg_restore --no-owner --no-privileges -h localhost -U postgres -d edusync path/to/dump.sql
   ```

3. **Verify Import**:
   ```bash
   psql -h localhost -U postgres -d edusync -c "SELECT COUNT(*) FROM users;"
   ```

## Application Configuration

1. **Update Database Connection**:
   - Locate the database connection configuration in your code
   - Update it to use the new PostgreSQL connection:

   ```javascript
   // Old Supabase connection
   const supabase = createClient('SUPABASE_URL', 'SUPABASE_KEY');
   
   // New PostgreSQL connection using pg
   const { Pool } = require('pg');
   const pool = new Pool({
     host: 'localhost',
     user: 'postgres',
     password: 'your_password',
     database: 'edusync',
     port: 5432,
   });

   // Example query
   const getUsers = async () => {
     const { rows } = await pool.query('SELECT * FROM users');
     return rows;
   };
   ```

2. **Update Environment Variables**:
   - Create a `.env` file with the new database connection details:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=edusync
   ```

## Authentication

Since Supabase provides built-in authentication, you'll need to replace it with an alternative:

### Option 1: JWT with PostgreSQL

1. **Install Required Packages**:
   ```bash
   npm install jsonwebtoken bcrypt
   ```

2. **Create Authentication Middleware**:
   ```javascript
   const jwt = require('jsonwebtoken');
   
   const authenticateToken = (req, res, next) => {
     const authHeader = req.headers['authorization'];
     const token = authHeader && authHeader.split(' ')[1];
     
     if (!token) return res.sendStatus(401);
     
     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
       if (err) return res.sendStatus(403);
       req.user = user;
       next();
     });
   };
   ```

3. **Implement Login Functionality**:
   ```javascript
   const bcrypt = require('bcrypt');
   const jwt = require('jsonwebtoken');
   
   const login = async (req, res) => {
     const { email, password } = req.body;
     
     try {
       // Get user from database
       const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
       const user = rows[0];
       
       if (!user) {
         return res.status(400).json({ error: 'User not found' });
       }
       
       // Check password
       const isValid = await bcrypt.compare(password, user.password_hash);
       
       if (!isValid) {
         return res.status(400).json({ error: 'Invalid password' });
       }
       
       // Generate token
       const token = jwt.sign(
         { id: user.id, email: user.email, role: user.role },
         process.env.JWT_SECRET,
         { expiresIn: '24h' }
       );
       
       res.json({ user: { id: user.id, email: user.email, role: user.role }, token });
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   };
   ```

### Option 2: Use a Third-Party Auth Provider

1. **Auth0**:
   - Sign up at [auth0.com](https://auth0.com)
   - Configure your application and APIs
   - Implement the Auth0 SDK in your application

2. **Firebase Authentication**:
   - Set up a Firebase project
   - Enable email/password authentication
   - Implement Firebase Authentication SDK

## Storage

Replacing Supabase Storage:

### Option 1: Local File System + Express

1. **Create Upload Endpoint**:
   ```javascript
   const multer = require('multer');
   const path = require('path');
   
   const storage = multer.diskStorage({
     destination: function (req, file, cb) {
       cb(null, 'uploads/');
     },
     filename: function (req, file, cb) {
       cb(null, Date.now() + path.extname(file.originalname));
     }
   });
   
   const upload = multer({ storage: storage });
   
   app.post('/upload', upload.single('file'), (req, res) => {
     res.json({
       fileName: req.file.filename,
       filePath: `/uploads/${req.file.filename}`
     });
   });
   ```

2. **Serve Static Files**:
   ```javascript
   app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
   ```

### Option 2: Cloud Storage Services

1. **AWS S3**:
   ```bash
   npm install aws-sdk
   ```

   ```javascript
   const AWS = require('aws-sdk');
   
   const s3 = new AWS.S3({
     accessKeyId: process.env.AWS_ACCESS_KEY,
     secretAccessKey: process.env.AWS_SECRET_KEY
   });
   
   const uploadToS3 = (fileData, fileName) => {
     return s3.upload({
       Bucket: process.env.S3_BUCKET,
       Key: fileName,
       Body: fileData
     }).promise();
   };
   ```

2. **Google Cloud Storage**:
   ```bash
   npm install @google-cloud/storage
   ```

   ```javascript
   const { Storage } = require('@google-cloud/storage');
   
   const storage = new Storage({ keyFilename: 'path/to/key.json' });
   const bucket = storage.bucket(process.env.GCS_BUCKET);
   
   const uploadToGCS = (fileData, fileName) => {
     const file = bucket.file(fileName);
     return file.save(fileData);
   };
   ```

## Realtime Functionality

Replacing Supabase's realtime subscriptions:

### Option 1: WebSockets with Socket.io

1. **Set Up Server**:
   ```bash
   npm install socket.io
   ```

   ```javascript
   const http = require('http');
   const server = http.createServer(app);
   const io = require('socket.io')(server);
   
   io.on('connection', (socket) => {
     console.log('New client connected');
     
     socket.on('joinRoom', (room) => {
       socket.join(room);
     });
     
     socket.on('disconnect', () => {
       console.log('Client disconnected');
     });
   });
   
   // Emit events when data changes
   const notifyDataChange = (room, data) => {
     io.to(room).emit('dataUpdate', data);
   };
   ```

### Option 2: PostgreSQL Listen/Notify

1. **Create Database Trigger**:
   ```sql
   CREATE OR REPLACE FUNCTION notify_data_change()
   RETURNS trigger AS $$
   BEGIN
     PERFORM pg_notify('data_change', row_to_json(NEW)::text);
     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql;
   
   CREATE TRIGGER users_notify_trigger
   AFTER INSERT OR UPDATE ON users
   FOR EACH ROW EXECUTE PROCEDURE notify_data_change();
   ```

2. **Set Up Listener**:
   ```javascript
   const { Client } = require('pg');
   
   const client = new Client({
     connectionString: process.env.DATABASE_URL,
   });
   
   client.connect();
   
   client.query('LISTEN data_change');
   
   client.on('notification', (msg) => {
     const payload = JSON.parse(msg.payload);
     // Handle the notification
     io.to('data_updates').emit('update', payload);
   });
   ```

## Troubleshooting

### Connection Issues

- **Check Firewall Settings**: Ensure your PostgreSQL port (5432) is open
- **Verify Connection String**: Double-check host, port, username, password, and database name
- **Test Connection**:
  ```bash
  psql -h hostname -U username -d database -p 5432
  ```

### Data Migration Issues

- **Character Encoding**: Ensure both databases use UTF-8
- **Constraints**: Temporarily disable foreign key constraints during import:
  ```sql
  SET CONSTRAINTS ALL DEFERRED;
  -- Import data
  SET CONSTRAINTS ALL IMMEDIATE;
  ```
- **Large Tables**: Split large migrations into smaller batches

### Authentication Problems

- **JWT Expiry**: Check token expiration time
- **Password Hashing**: Ensure you're using the same hashing algorithm as before
- **Role-Based Access**: Verify roles are correctly migrated and implemented

### Performance Issues

- **Analyze and Vacuum**: Run maintenance after migration:
  ```sql
  ANALYZE;
  VACUUM ANALYZE;
  ```
- **Indexes**: Ensure indexes are properly created:
  ```sql
  EXPLAIN ANALYZE SELECT * FROM your_table WHERE your_column = 'value';
  ```
- **Connection Pooling**: Implement PgBouncer for connection management

## License

This project is licensed under the MIT License - see the LICENSE file for details.



thehsdjkfllsd;fj;lsdafsdaf