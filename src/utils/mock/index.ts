import { mockCalendarEvents } from './calendar-data';
import { toast } from '@/hooks/use-toast';

// Export mock data structures
export * from './calendar-data';

// Generic function to simulate database operations
export async function mockDatabaseOperation(operation: string, data?: any, delay = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Mock ${operation} operation:`, data);
      resolve({ success: true, data });
    }, delay);
  });
}

// Mock data for dashboard
export const mockDashboardStats = {
  student: [
    { title: 'Attendance', value: '92%', description: 'This month', icon: 'calendar', trend: 'up', trendValue: '3%' },
    { title: 'Assignments', value: '12', description: 'Tasks completed', icon: 'book', trend: 'up', trendValue: '2' },
    { title: 'Average Grade', value: 'A-', description: 'Current semester', icon: 'award', trend: 'stable', trendValue: '' },
    { title: 'Upcoming Tests', value: '3', description: 'This week', icon: 'clipboard', trend: 'down', trendValue: '1' },
  ],
  teacher: [
    { title: 'Classes', value: '8', description: 'This semester', icon: 'users', trend: 'stable', trendValue: '' },
    { title: 'Students', value: '243', description: 'In your classes', icon: 'user', trend: 'up', trendValue: '15' },
    { title: 'Assignments', value: '21', description: 'To be graded', icon: 'clipboard', trend: 'up', trendValue: '5' },
    { title: 'Attendance', value: '96%', description: 'This week', icon: 'check-circle', trend: 'up', trendValue: '2%' },
  ],
  admin: [
    { title: 'Total Students', value: '1,234', description: 'Currently enrolled', icon: 'users', trend: 'up', trendValue: '8%' },
    { title: 'Teachers', value: '87', description: 'Faculty members', icon: 'user', trend: 'up', trendValue: '2' },
    { title: 'Classes', value: '64', description: 'Active classes', icon: 'book', trend: 'stable', trendValue: '' },
    { title: 'Revenue', value: '$124,500', description: 'This quarter', icon: 'dollar-sign', trend: 'up', trendValue: '12%' },
  ],
  principal: [
    { title: 'School Rank', value: '#12', description: 'In district', icon: 'award', trend: 'up', trendValue: '2' },
    { title: 'Graduation Rate', value: '94%', description: 'Last academic year', icon: 'award', trend: 'up', trendValue: '3%' },
    { title: 'Attendance', value: '91%', description: 'School average', icon: 'calendar', trend: 'stable', trendValue: '' },
    { title: 'Budget Status', value: 'On track', description: 'Current fiscal year', icon: 'dollar-sign', trend: 'stable', trendValue: '' },
  ],
};

// Mock notifications
export const mockNotifications = [
  { id: '1', title: 'Assignment Deadline', message: 'Math homework due in 2 days', time: '2 hours ago', read: false, type: 'deadline' },
  { id: '2', title: 'Test Reminder', message: 'Science test tomorrow', time: '5 hours ago', read: true, type: 'reminder' },
  { id: '3', title: 'Grade Posted', message: 'Your English essay was graded', time: 'Yesterday', read: false, type: 'grade' },
  { id: '4', title: 'School Event', message: 'Annual Sports Day next week', time: '2 days ago', read: true, type: 'event' },
  { id: '5', title: 'Attendance Alert', message: 'You were marked absent yesterday', time: '3 days ago', read: true, type: 'alert' },
];

// Mock financial records
export const mockFinancialRecords = [
  { id: '1', description: 'Tuition Fee - Grade 10', amount: 5000, type: 'fee', date: '2023-05-15', status: 'paid' },
  { id: '2', description: 'Library Fee', amount: 500, type: 'fee', date: '2023-05-20', status: 'paid' },
  { id: '3', description: 'Teacher Salary - Mrs. Johnson', amount: 4000, type: 'salary', date: '2023-05-28', status: 'paid' },
  { id: '4', description: 'Building Maintenance', amount: 2500, type: 'expense', date: '2023-05-12', status: 'paid' },
  { id: '5', description: 'Lab Equipment Purchase', amount: 3000, type: 'expense', date: '2023-05-18', status: 'pending' },
  { id: '6', description: 'Tuition Fee - Grade 11', amount: 5200, type: 'fee', date: '2023-06-01', status: 'pending' },
  { id: '7', description: 'Sports Equipment', amount: 1800, type: 'expense', date: '2023-05-25', status: 'paid' },
  { id: '8', description: 'Administrative Staff Salary', amount: 3500, type: 'salary', date: '2023-05-28', status: 'paid' },
  { id: '9', description: 'Technology Fee', amount: 800, type: 'fee', date: '2023-06-05', status: 'pending' },
  { id: '10', description: 'Field Trip Collection', amount: 1200, type: 'fee', date: '2023-06-10', status: 'pending' }
];

// Mock students data - updating to include grade and section
export const mockStudents = [
  { id: '1', name: 'John Smith', grade: '10', section: 'A', rollNumber: '10A-01', email: 'john@school.com', attendance: 95, performanceGrade: 'A', status: 'active' },
  { id: '2', name: 'Emily Johnson', grade: '10', section: 'A', rollNumber: '10A-02', email: 'emily@school.com', attendance: 88, performanceGrade: 'B+', status: 'active' },
  { id: '3', name: 'Michael Brown', grade: '10', section: 'A', rollNumber: '10A-03', email: 'michael@school.com', attendance: 92, performanceGrade: 'A-', status: 'active' },
  { id: '4', name: 'Jessica Davis', grade: '10', section: 'A', rollNumber: '10A-04', email: 'jessica@school.com', attendance: 78, performanceGrade: 'C+', status: 'warning' },
  { id: '5', name: 'Daniel Wilson', grade: '10', section: 'A', rollNumber: '10A-05', email: 'daniel@school.com', attendance: 85, performanceGrade: 'B', status: 'active' },
  { id: '6', name: 'Sarah Thompson', grade: '10', section: 'A', rollNumber: '10A-06', email: 'sarah@school.com', attendance: 90, performanceGrade: 'A-', status: 'active' },
  { id: '7', name: 'David Martinez', grade: '10', section: 'A', rollNumber: '10A-07', email: 'david@school.com', attendance: 65, performanceGrade: 'D+', status: 'at-risk' },
  { id: '8', name: 'Sophia Garcia', grade: '10', section: 'A', rollNumber: '10A-08', email: 'sophia@school.com', attendance: 98, performanceGrade: 'A+', status: 'active' }
];

// Function to handle response with toast notifications
export function handleMockResponse(action: string, success = true, item?: string) {
  setTimeout(() => {
    if (success) {
      toast({
        title: `${action} Successful`,
        description: item ? `${item} was successfully ${action.toLowerCase()}ed.` : `Operation completed successfully.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: `${action} Failed`,
        description: `There was a problem with your request. Please try again.`,
      });
    }
  }, 500);
  
  return { success };
}

// Helper function to get role-specific dashboard stats
export const getRoleDashboardStats = (role: string) => {
  switch (role) {
    case 'student':
      return mockDashboardStats.student;
    case 'teacher':
      return mockDashboardStats.teacher;
    case 'admin':
    case 'super-admin':
      return mockDashboardStats.admin;
    case 'principal':
      return mockDashboardStats.principal;
    default:
      return [];
  }
};
