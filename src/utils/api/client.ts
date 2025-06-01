
/**
 * API client for EduSync backend
 * Handles all HTTP requests to the backend server
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      return { 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  // Generic CRUD operations
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // User operations
  async getUsers() {
    return this.get('/users');
  }

  async createUser(userData: any) {
    return this.post('/users', userData);
  }

  async updateUser(id: string, userData: any) {
    return this.put(`/users/${id}`, userData);
  }

  async deleteUser(id: string) {
    return this.delete(`/users/${id}`);
  }

  // Transportation operations
  async getBusRoutes() {
    return this.get('/transportation/routes');
  }

  async updateBusLocation(locationData: any) {
    return this.post('/transportation/location', locationData);
  }

  async getBusLocations() {
    return this.get('/transportation/locations');
  }

  // Academic operations
  async getClasses() {
    return this.get('/academic/classes');
  }

  async getClassStudents(classId: string) {
    return this.get(`/academic/classes/${classId}/students`);
  }

  async markAttendance(attendanceData: any) {
    return this.post('/academic/attendance', attendanceData);
  }
}

export const apiClient = new ApiClient();
export default apiClient;
