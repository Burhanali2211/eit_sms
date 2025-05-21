
/**
 * Main database connection hook
 * 
 * This hook centralizes database connection logic and re-exports database hooks
 */

import { useState, useEffect } from 'react';
import { checkDatabaseConnection, DB_CONFIG } from '@/utils/db-connection';
import { toast } from '@/hooks/use-toast';

// Import the database operation hooks
import { useDatabaseTable } from './database/use-database-table';
import { useDatabaseView } from './database/use-database-view';

// Re-export hooks for components to use
export { useDatabaseTable, useDatabaseView };

/**
 * Hook to check and manage database connectivity
 * @returns Connection status and environment info
 */
export function useDatabaseConnection() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    const checkConnection = async () => {
      setIsChecking(true);
      try {
        const connected = await checkDatabaseConnection();
        setIsConnected(connected);
        
        if (connected) {
          console.log('Successfully connected to database');
        } else {
          console.warn('Database connection failed');
          toast({
            title: 'Database Connection Failed',
            description: 'Could not connect to the database. Some features may not work correctly.',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error checking database connection:', error);
        setIsConnected(false);
      } finally {
        setIsChecking(false);
      }
    };
    
    checkConnection();
  }, []);
  
  return {
    isConnected,
    isChecking,
    environment: DB_CONFIG.environment,
    appName: DB_CONFIG.appName
  };
}
