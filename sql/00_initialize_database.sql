
-- EduSync Database Initialization Script
-- This script creates the database and user if they don't exist
-- Run this first as a superuser (postgres)

-- Create database if it doesn't exist
SELECT 'CREATE DATABASE edusync'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'edusync')\gexec

-- Connect to the edusync database
\c edusync;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create a function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Success message
SELECT 'Database edusync initialized successfully!' as message;
