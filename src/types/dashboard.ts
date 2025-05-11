
export type UserRole = "student" | "teacher" | "principal" | "admin" | "financial" | "admission" | "school-admin" | "labs" | "club" | "library" | "super-admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export interface MenuItem {
  title: string;
  href: string;
  icon: React.ComponentType;
  items?: MenuItem[];
  role: UserRole[];
}

export interface DashboardStat {
  title: string;
  value: string | number;
  description: string;
  change?: string | number;
  increasing?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  section: string;
  rollNumber: string;
  attendance: number;
  performanceGrade: string;
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
  type: 'fee' | 'expense' | 'salary';
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
}

export interface AdmissionApplication {
  id: string;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  grade: string;
  status: 'pending' | 'approved' | 'rejected';
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
  status: 'active' | 'inactive';
}

export interface LabResource {
  id: string;
  name: string;
  type: string;
  quantity: number;
  available: number;
  location: string;
  lastMaintenance?: string;
}
