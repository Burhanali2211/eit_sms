
/**
 * React hooks for API operations
 */

import { useState, useEffect } from 'react';
import { apiClient } from '@/utils/api/client';
import { toast } from '@/hooks/use-toast';

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  retryCount?: number;
  retryDelay?: number;
}

export function useApi<T>(
  apiCall: () => Promise<any>,
  dependencies: any[] = [],
  options: UseApiOptions = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryAttempt, setRetryAttempt] = useState(0);

  const execute = async (showToast = true) => {
    setLoading(true);
    setError(null);

    try {
      console.log('Executing API call...');
      const response = await apiCall();
      
      if (response.error) {
        throw new Error(response.error);
      } else {
        setData(response.data);
        setRetryAttempt(0);
        if (options.onSuccess) {
          options.onSuccess(response.data);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      
      // Retry logic
      if (options.retryCount && retryAttempt < options.retryCount) {
        console.log(`Retrying API call... (${retryAttempt + 1}/${options.retryCount})`);
        setRetryAttempt(prev => prev + 1);
        setTimeout(() => {
          execute(false);
        }, options.retryDelay || 1000);
        return;
      }
      
      if (options.onError) {
        options.onError(errorMessage);
      } else if (showToast) {
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.immediate !== false) {
      execute();
    }
  }, dependencies);

  return { 
    data, 
    loading, 
    error, 
    execute, 
    refetch: execute,
    retry: () => execute(true),
    retryAttempt
  };
}

// Enhanced specific hooks for common operations
export function useUsers() {
  return useApi(() => apiClient.getUsers(), [], {
    retryCount: 3,
    retryDelay: 2000
  });
}

export function useBusRoutes() {
  return useApi(() => apiClient.getBusRoutes(), [], {
    retryCount: 2,
    retryDelay: 1500
  });
}

export function useClasses() {
  return useApi(() => apiClient.getClasses(), [], {
    retryCount: 3,
    retryDelay: 2000
  });
}

export function useClassStudents(classId: string) {
  return useApi(() => apiClient.getClassStudents(classId), [classId], {
    retryCount: 2,
    retryDelay: 1000
  });
}

// Real-time data hook with automatic refresh
export function useRealTimeData<T>(
  apiCall: () => Promise<any>,
  refreshInterval: number = 30000,
  dependencies: any[] = []
) {
  const { data, loading, error, execute } = useApi<T>(apiCall, dependencies, {
    immediate: true,
    retryCount: 2
  });

  useEffect(() => {
    if (refreshInterval > 0) {
      const interval = setInterval(() => {
        execute(false); // Don't show toast for automatic refreshes
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [refreshInterval, execute]);

  return { data, loading, error, refresh: execute };
}
