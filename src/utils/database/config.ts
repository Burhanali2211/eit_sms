
/**
 * Database configuration
 * 
 * Manages the connection configuration for Supabase
 */

import { createClient } from '@supabase/supabase-js';

// Environment variables that would be set in production
// For development, these can be hard-coded or loaded from .env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || true;

// Create Supabase client only if valid URL and key are provided
export const supabase = (SUPABASE_URL && SUPABASE_URL !== 'your_supabase_url' && SUPABASE_KEY && SUPABASE_KEY !== 'your_supabase_anon_key') 
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

/**
 * Determines if the app should use mock data instead of real database data
 * This is useful during development or when database is not available
 */
export const shouldUseMockData = (): boolean => {
  return USE_MOCK_DATA || !supabase;
};
