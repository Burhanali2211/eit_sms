
export type UserRole = 'student' | 'teacher' | 'principal' | 'admin' | 'financial' | 
                       'admission' | 'school-admin' | 'labs' | 'club' | 'library' | 'super-admin';

export interface MenuItem {
  title: string;
  href: string;
  icon?: any;
  role: UserRole[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Student {
  id: string;
  name: string;
  email?: string; // Added this property to fix mock data errors
  rollNumber: string;
  grade?: string;
  section?: string;
  attendance: number;
  performanceGrade?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  userId?: string;
  createdAt?: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  location?: string;
  userId?: string;
  createdAt?: string;
}

export interface ClassData {
  id: string | number;
  name: string;
  subject: string;
  grade?: string;
  section?: string;
  students?: number;
  schedule?: string;
  room?: string;
  teacherId?: string;
}

export interface LabResource {
  id: string;
  name: string;
  type: string;
  quantity: number;
  available: number;
  lastMaintenance: string | Date;
  location?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewResource {
  name: string;
  type: string;
  quantity: number;
  available: number;
  location?: string;
  description?: string;
}

// Add the missing types referenced in errors
export interface DashboardStat {
  title: string;
  value: string | number;
  description: string;
  change?: string | number;
  increasing?: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  classes: string[];
}

export interface FinancialRecord {
  id: string;
  type: string;
  amount: number;
  date: string;
  status: string;
  description: string;
}

export interface AdmissionApplication {
  id: string;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  grade: string;
  status: string;
  submittedAt: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  author: string;
  category: string;
  available: boolean;
  dueDate?: string;
  borrowedBy?: string;
}

export interface ClubActivity {
  id: string;
  name: string;
  description: string;
  schedule: string;
  location: string;
  members: number;
  status: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  endTime?: string;
  allDay?: boolean;
  location?: string;
  color?: string;
}
