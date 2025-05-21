
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
