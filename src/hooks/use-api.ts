
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
}

export function useApi<T>(
  apiCall: () => Promise<any>,
  dependencies: any[] = [],
  options: UseApiOptions = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiCall();
      
      if (response.error) {
        setError(response.error);
        if (options.onError) {
          options.onError(response.error);
        } else {
          toast({
            title: 'Error',
            description: response.error,
            variant: 'destructive',
          });
        }
      } else {
        setData(response.data);
        if (options.onSuccess) {
          options.onSuccess(response.data);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      if (options.onError) {
        options.onError(errorMessage);
      } else {
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

  return { data, loading, error, execute, refetch: execute };
}

// Specific hooks for common operations
export function useUsers() {
  return useApi(() => apiClient.getUsers(), []);
}

export function useBusRoutes() {
  return useApi(() => apiClient.getBusRoutes(), []);
}

export function useClasses() {
  return useApi(() => apiClient.getClasses(), []);
}

export function useClassStudents(classId: string) {
  return useApi(() => apiClient.getClassStudents(classId), [classId]);
}
