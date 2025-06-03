
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
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('authToken');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...options.headers as Record<string, string>,
      };

      if (this.token) {
        headers['Authorization'] = `Bearer ${this.token}`;
      }

      const response = await fetch(url, {
        ...options,
        headers,
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

  // Authentication operations
  async login(email: string, password: string) {
    return this.post('/auth/login', { email, password });
  }

  async register(userData: any) {
    return this.post('/auth/register', userData);
  }

  async verifyToken(token: string) {
    return this.post('/auth/verify', { token });
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

  // Dashboard operations
  async getDashboardStats(role: string, userId?: string) {
    const endpoint = userId ? `/dashboard/stats/${role}/${userId}` : `/dashboard/stats/${role}`;
    return this.get(endpoint);
  }

  async getNotifications(userId: string) {
    return this.get(`/dashboard/notifications/${userId}`);
  }

  async getEvents(userId: string) {
    return this.get(`/dashboard/events/${userId}`);
  }

  async markNotificationRead(notificationId: string) {
    return this.put(`/dashboard/notifications/${notificationId}/read`, {});
  }

  // Calendar operations
  async getCalendarEvents(startDate?: string, endDate?: string) {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.get(`/calendar/events${query}`);
  }

  async createEvent(eventData: any) {
    return this.post('/calendar/events', eventData);
  }

  async updateEvent(id: string, eventData: any) {
    return this.put(`/calendar/events/${id}`, eventData);
  }

  async deleteEvent(id: string) {
    return this.delete(`/calendar/events/${id}`);
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
