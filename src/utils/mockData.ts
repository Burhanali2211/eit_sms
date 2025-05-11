
import { 
  Notification, 
  CalendarEvent, 
  Student, 
  Teacher, 
  FinancialRecord,
  AdmissionApplication,
  LibraryItem,
  ClubActivity,
  LabResource
} from "@/types/dashboard";

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Exam Schedule Posted",
    message: "The final exam schedule for this semester has been posted.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    title: "Fee Payment Reminder",
    message: "This is a reminder to pay your term fees before the 15th of this month.",
    time: "1 day ago",
    read: true,
  },
  {
    id: "3",
    title: "New Course Material Available",
    message: "New course materials for Mathematics have been uploaded.",
    time: "2 days ago",
    read: true,
  },
  {
    id: "4",
    title: "School Event Announced",
    message: "Annual Sports Day will be held on the 20th of next month.",
    time: "3 days ago",
    read: false,
  },
  {
    id: "5",
    title: "Parent-Teacher Meeting",
    message: "Parent-teacher meeting scheduled for next Friday.",
    time: "4 days ago",
    read: true,
  },
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Math Quiz",
    date: "May 12, 2025",
    time: "10:00 AM",
  },
  {
    id: "2",
    title: "Science Project Due",
    date: "May 14, 2025",
    time: "11:59 PM",
  },
  {
    id: "3",
    title: "School Assembly",
    date: "May 15, 2025",
    time: "09:00 AM",
  },
  {
    id: "4",
    title: "Sports Day",
    date: "May 20, 2025",
    time: "All Day",
  },
  {
    id: "5",
    title: "Career Counseling",
    date: "May 22, 2025",
    time: "02:00 PM",
  },
];

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

export const mockLibraryItems: LibraryItem[] = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    available: true,
  },
  {
    id: "2",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    available: false,
    dueDate: "2025-05-10",
    borrowedBy: "Alex Johnson",
  },
  {
    id: "3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Fiction",
    available: true,
  },
  {
    id: "4",
    title: "The Elements of Style",
    author: "William Strunk Jr.",
    category: "Reference",
    available: false,
    dueDate: "2025-05-12",
    borrowedBy: "Emily Davis",
  },
  {
    id: "5",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Computer Science",
    available: true,
  },
];

export const mockClubActivities: ClubActivity[] = [
  {
    id: "1",
    name: "Chess Club",
    description: "Weekly chess tournaments and practice sessions",
    schedule: "Every Monday, 3:00 PM",
    location: "Recreation Hall",
    members: 18,
    status: "active",
  },
  {
    id: "2",
    name: "Debate Society",
    description: "Platform for students to enhance public speaking skills",
    schedule: "Every Wednesday, 4:00 PM",
    location: "Auditorium",
    members: 24,
    status: "active",
  },
  {
    id: "3",
    name: "Science Club",
    description: "Experiments, projects, and science fairs",
    schedule: "Every Tuesday, 3:30 PM",
    location: "Science Lab",
    members: 16,
    status: "active",
  },
  {
    id: "4",
    name: "Photography Club",
    description: "Learn photography techniques and participate in competitions",
    schedule: "Every Friday, 3:00 PM",
    location: "Art Room",
    members: 12,
    status: "inactive",
  },
  {
    id: "5",
    name: "Sports Team",
    description: "Various sports training and inter-school competitions",
    schedule: "Every Thursday, 4:00 PM",
    location: "Sports Ground",
    members: 30,
    status: "active",
  },
];

export const mockLabResources: LabResource[] = [
  {
    id: "1",
    name: "Microscope",
    type: "Biology Lab",
    quantity: 15,
    available: 12,
    location: "Biology Lab, Cabinet 3",
    lastMaintenance: "2025-03-15",
  },
  {
    id: "2",
    name: "Test Tubes",
    type: "Chemistry Lab",
    quantity: 50,
    available: 42,
    location: "Chemistry Lab, Drawer 2",
    lastMaintenance: "2025-03-20",
  },
  {
    id: "3",
    name: "Computer Workstation",
    type: "Computer Lab",
    quantity: 25,
    available: 25,
    location: "Computer Lab",
    lastMaintenance: "2025-03-10",
  },
  {
    id: "4",
    name: "Bunsen Burner",
    type: "Chemistry Lab",
    quantity: 20,
    available: 18,
    location: "Chemistry Lab, Cabinet 1",
    lastMaintenance: "2025-03-25",
  },
  {
    id: "5",
    name: "Physics Experiment Kit",
    type: "Physics Lab",
    quantity: 10,
    available: 8,
    location: "Physics Lab, Shelf 4",
    lastMaintenance: "2025-03-18",
  },
];

export const getRoleDashboardStats = (role: string) => {
  const defaultStats = [
    {
      title: "Attendance Rate",
      value: "94%",
      description: "+2% from last month",
      increasing: true,
    },
    {
      title: "Current Grade Average",
      value: "B+",
      description: "Improvement from B",
      increasing: true,
    },
    {
      title: "Assignments Due",
      value: "3",
      description: "Due this week",
      increasing: false,
    },
    {
      title: "Your Rank",
      value: "14 / 120",
      description: "Top 15% of class",
      increasing: true,
    },
  ];

  const roleStats = {
    student: defaultStats,
    teacher: [
      {
        title: "Classes",
        value: "5",
        description: "Active classes",
      },
      {
        title: "Students",
        value: "125",
        description: "Total students",
      },
      {
        title: "Attendance",
        value: "92%",
        description: "Average attendance",
        increasing: true,
      },
      {
        title: "Performance",
        value: "B+",
        description: "Class average",
        increasing: true,
      },
    ],
    principal: [
      {
        title: "Total Students",
        value: "1,250",
        description: "+50 from last year",
        increasing: true,
      },
      {
        title: "Total Staff",
        value: "85",
        description: "Teachers and support staff",
      },
      {
        title: "Attendance Rate",
        value: "93%",
        description: "+1% from last month",
        increasing: true,
      },
      {
        title: "Budget Utilization",
        value: "78%",
        description: "Of annual budget",
      },
    ],
    admin: [
      {
        title: "System Uptime",
        value: "99.8%",
        description: "Last 30 days",
        increasing: true,
      },
      {
        title: "Active Users",
        value: "1,435",
        description: "+120 since last month",
        increasing: true,
      },
      {
        title: "Pending Issues",
        value: "8",
        description: "Technical support tickets",
        increasing: false,
      },
      {
        title: "Data Storage",
        value: "68%",
        description: "Of total capacity used",
        increasing: true,
      },
    ],
    financial: [
      {
        title: "Revenue",
        value: "$125,000",
        description: "This month",
        increasing: true,
      },
      {
        title: "Expenses",
        value: "$95,000",
        description: "This month",
        increasing: false,
      },
      {
        title: "Fee Collection",
        value: "87%",
        description: "Of total dues",
        increasing: true,
      },
      {
        title: "Pending Invoices",
        value: "23",
        description: "To be processed",
        increasing: false,
      },
    ],
    admission: [
      {
        title: "Applications",
        value: "45",
        description: "New this week",
        increasing: true,
      },
      {
        title: "Acceptance Rate",
        value: "72%",
        description: "Last admission cycle",
        increasing: true,
      },
      {
        title: "Pending Reviews",
        value: "18",
        description: "Applications to review",
        increasing: false,
      },
      {
        title: "Enrollment",
        value: "92%",
        description: "Of capacity filled",
        increasing: true,
      },
    ],
    "school-admin": [
      {
        title: "Staff Attendance",
        value: "96%",
        description: "This month",
        increasing: true,
      },
      {
        title: "Open Positions",
        value: "3",
        description: "Faculty openings",
        increasing: false,
      },
      {
        title: "Events",
        value: "8",
        description: "Planned this month",
        increasing: true,
      },
      {
        title: "Resource Utilization",
        value: "84%",
        description: "Of facilities in use",
        increasing: true,
      },
    ],
    labs: [
      {
        title: "Lab Resources",
        value: "145",
        description: "Total inventory items",
      },
      {
        title: "Utilization",
        value: "76%",
        description: "Of lab capacity",
        increasing: true,
      },
      {
        title: "Maintenance",
        value: "5",
        description: "Items due for maintenance",
        increasing: false,
      },
      {
        title: "Lab Sessions",
        value: "28",
        description: "Scheduled this week",
        increasing: true,
      },
    ],
    club: [
      {
        title: "Active Clubs",
        value: "12",
        description: "Running this semester",
      },
      {
        title: "Student Participation",
        value: "65%",
        description: "Of student body",
        increasing: true,
      },
      {
        title: "Upcoming Events",
        value: "7",
        description: "This month",
        increasing: true,
      },
      {
        title: "Budget Allocation",
        value: "$12,500",
        description: "For club activities",
        increasing: true,
      },
    ],
    library: [
      {
        title: "Total Books",
        value: "8,750",
        description: "In collection",
      },
      {
        title: "Borrowed Books",
        value: "342",
        description: "Currently checked out",
        increasing: false,
      },
      {
        title: "New Acquisitions",
        value: "45",
        description: "Added this month",
        increasing: true,
      },
      {
        title: "Overdue Returns",
        value: "18",
        description: "Past due date",
        increasing: false,
      },
    ],
    "super-admin": [
      {
        title: "System Health",
        value: "100%",
        description: "All systems operational",
        increasing: true,
      },
      {
        title: "Database Size",
        value: "75%",
        description: "Of allocated space",
        increasing: true,
      },
      {
        title: "API Requests",
        value: "25,400",
        description: "Last 24 hours",
        increasing: true,
      },
      {
        title: "Error Rate",
        value: "0.02%",
        description: "System errors",
        increasing: false,
      },
    ],
  };

  return roleStats[role as keyof typeof roleStats] || defaultStats;
};
