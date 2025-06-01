
# EduSync Backend Setup Guide

This guide will help you set up the EduSync backend API server with PostgreSQL database.

## Prerequisites

- Node.js 16+ installed
- PostgreSQL 12+ installed and running
- npm or yarn package manager

## Quick Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Database Setup**
   ```bash
   # Create database
   createdb edusync
   
   # Run schema creation
   psql -d edusync -f ../sql/complete_schema.sql
   
   # Add sample data (optional)
   psql -d edusync -f ../sql/sample_data.sql
   ```

3. **Environment Configuration**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env with your database credentials
   nano .env
   ```

4. **Start the Server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## Environment Variables

Update the `.env` file with your configuration:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=edusync
DB_USER=postgres
DB_PASSWORD=your_password

PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:8080
JWT_SECRET=your_secret_key
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### User Management
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Transportation
- `GET /api/transportation/routes` - Get all bus routes
- `POST /api/transportation/location` - Update bus location
- `GET /api/transportation/locations` - Get latest bus locations
- `GET /api/transportation/routes/:id/students` - Get students on route

### Academic
- `GET /api/academic/classes` - Get all classes
- `GET /api/academic/classes/:id/students` - Get students in class
- `GET /api/academic/students/:id/grades` - Get student grades
- `POST /api/academic/attendance` - Mark attendance

## Testing the Connection

1. Start the backend server
2. Visit `http://localhost:3001/health`
3. You should see: `{"status":"OK","timestamp":"...","service":"EduSync Backend API"}`

## Database Schema

The complete schema includes 24 tables covering:
- User management and authentication
- Academic records (classes, grades, attendance)
- Transportation (bus tracking, routes, stops)
- Library management
- Lab equipment management
- Financial management
- Notifications and events

## Security Features

- Helmet.js for security headers
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Password hashing with bcrypt
- Input validation and sanitization

## Development

- Use `npm run dev` for development with auto-reload
- Check logs for database connection status
- API documentation available at endpoints
- Error handling with detailed logging

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a process manager like PM2
3. Set up reverse proxy (nginx)
4. Configure SSL certificates
5. Set up database backups
6. Monitor server performance

## Troubleshooting

- Check database connection in server logs
- Verify environment variables are correct
- Ensure PostgreSQL is running
- Check port availability (default: 3001)
- Review CORS settings if frontend can't connect
