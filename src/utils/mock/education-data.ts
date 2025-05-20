
/**
 * Education-related mock data
 */

import { Student, Teacher, FinancialRecord, AdmissionApplication } from "@/types/dashboard";

export const mockStudents: Student[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    grade: "10",
    section: "A",
    rollNumber: "10A01",
    attendance: 92,
    performanceGrade: "A",
  },
  {
    id: "2",
    name: "Samantha Lee",
    email: "samantha@example.com",
    grade: "10",
    section: "A",
    rollNumber: "10A02",
    attendance: 96,
    performanceGrade: "A+",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    grade: "10",
    section: "B",
    rollNumber: "10B01",
    attendance: 88,
    performanceGrade: "B+",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    grade: "10",
    section: "B",
    rollNumber: "10B02",
    attendance: 94,
    performanceGrade: "A-",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david@example.com",
    grade: "10",
    section: "C",
    rollNumber: "10C01",
    attendance: 90,
    performanceGrade: "B",
  },
];

export const mockTeachers: Teacher[] = [
  {
    id: "1",
    name: "Professor Smith",
    email: "smith@example.com",
    subject: "Mathematics",
    classes: ["10A", "10B", "11A"],
  },
  {
    id: "2",
    name: "Dr. Williams",
    email: "williams@example.com",
    subject: "Science",
    classes: ["10A", "10C", "11B"],
  },
  {
    id: "3",
    name: "Ms. Johnson",
    email: "johnson@example.com",
    subject: "English",
    classes: ["10B", "10C", "11C"],
  },
  {
    id: "4",
    name: "Mr. Anderson",
    email: "anderson@example.com",
    subject: "History",
    classes: ["10A", "11A", "12A"],
  },
  {
    id: "5",
    name: "Mrs. Thompson",
    email: "thompson@example.com",
    subject: "Computer Science",
    classes: ["10B", "11B", "12B"],
  },
];

export const mockFinancialRecords: FinancialRecord[] = [
  {
    id: "1",
    type: "fee",
    amount: 5000,
    date: "2025-04-10",
    status: "paid",
    description: "Term 1 Tuition Fee - Alex Johnson",
  },
  {
    id: "2",
    type: "fee",
    amount: 5000,
    date: "2025-04-12",
    status: "pending",
    description: "Term 1 Tuition Fee - Samantha Lee",
  },
  {
    id: "3",
    type: "expense",
    amount: 2500,
    date: "2025-04-15",
    status: "paid",
    description: "Lab Equipment Purchase",
  },
  {
    id: "4",
    type: "salary",
    amount: 4500,
    date: "2025-04-30",
    status: "pending",
    description: "Teacher Salary - April 2025",
  },
  {
    id: "5",
    type: "fee",
    amount: 5000,
    date: "2025-04-01",
    status: "overdue",
    description: "Term 1 Tuition Fee - David Wilson",
  },
];

export const mockAdmissionApplications: AdmissionApplication[] = [
  {
    id: "1",
    studentName: "Olivia Martinez",
    parentName: "Robert Martinez",
    email: "rmartinez@example.com",
    phone: "555-123-4567",
    grade: "9",
    status: "pending",
    submittedAt: "2025-04-05",
  },
  {
    id: "2",
    studentName: "Noah Thompson",
    parentName: "Laura Thompson",
    email: "lthompson@example.com",
    phone: "555-234-5678",
    grade: "10",
    status: "approved",
    submittedAt: "2025-04-03",
  },
  {
    id: "3",
    studentName: "Emma Wilson",
    parentName: "James Wilson",
    email: "jwilson@example.com",
    phone: "555-345-6789",
    grade: "11",
    status: "rejected",
    submittedAt: "2025-04-02",
  },
  {
    id: "4",
    studentName: "Liam Anderson",
    parentName: "Patricia Anderson",
    email: "panderson@example.com",
    phone: "555-456-7890",
    grade: "9",
    status: "pending",
    submittedAt: "2025-04-06",
  },
  {
    id: "5",
    studentName: "Ava Johnson",
    parentName: "Michael Johnson",
    email: "mjohnson@example.com",
    phone: "555-567-8901",
    grade: "10",
    status: "pending",
    submittedAt: "2025-04-07",
  },
];
