
-- Migration script from Supabase to PostgreSQL
-- This script will set up the database schema for the EduSync dashboard

-- Enable UUID extension for unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Include the main database schema
\i dashboard_schema.sql

-- Include the dashboard views
\i database_views.sql

-- Include sample data (optional, comment out if not needed)
-- \i sample_data.sql

-- Create login function (previously provided by Supabase Auth)
CREATE OR REPLACE FUNCTION public.login(
  email_input TEXT,
  password_input TEXT
) RETURNS TABLE (
  id UUID,
  name TEXT,
  email TEXT,
  role TEXT,
  token TEXT
) AS $$
DECLARE
  user_record RECORD;
  valid_password BOOLEAN;
BEGIN
  -- Find the user
  SELECT * INTO user_record FROM users WHERE email = email_input;
  
  -- Check if user exists
  IF user_record IS NULL THEN
    RETURN;
  END IF;
  
  -- In production, use a proper password checking method
  -- This is just a placeholder
  SELECT password_input = user_record.password_hash INTO valid_password;
  
  IF valid_password THEN
    RETURN QUERY 
      SELECT 
        user_record.id, 
        user_record.name, 
        user_record.email, 
        user_record.role,
        encode(digest(user_record.id::text || now()::text, 'sha256'), 'hex') as token;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Session management table (to replace Supabase Auth)
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ip_address TEXT,
  user_agent TEXT
);

-- Create session function
CREATE OR REPLACE FUNCTION public.create_session(
  user_id_input UUID,
  token_input TEXT,
  expires_in_hours INTEGER DEFAULT 24
) RETURNS UUID AS $$
DECLARE
  session_id UUID;
BEGIN
  INSERT INTO sessions (
    user_id,
    token,
    expires_at
  ) VALUES (
    user_id_input,
    token_input,
    CURRENT_TIMESTAMP + (expires_in_hours || ' hours')::INTERVAL
  ) RETURNING id INTO session_id;
  
  RETURN session_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Validate session function
CREATE OR REPLACE FUNCTION public.validate_session(
  token_input TEXT
) RETURNS TABLE (
  user_id UUID,
  name TEXT,
  email TEXT,
  role TEXT
) AS $$
BEGIN
  RETURN QUERY
    SELECT
      u.id,
      u.name,
      u.email,
      u.role
    FROM
      sessions s
      JOIN users u ON s.user_id = u.id
    WHERE
      s.token = token_input
      AND s.expires_at > CURRENT_TIMESTAMP;
      
  -- Delete expired sessions
  DELETE FROM sessions WHERE expires_at <= CURRENT_TIMESTAMP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for sessions
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);

COMMIT;
