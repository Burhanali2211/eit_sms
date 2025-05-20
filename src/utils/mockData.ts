
import { 
  Notification, 
  CalendarEvent, 
  Student, 
  Teacher, 
  FinancialRecord,
  AdmissionApplication,
  LibraryItem,
  ClubActivity,
  LabResource,
  User,
  UserRole,
  DashboardStat
} from "@/types/dashboard";
import { fetchData, fetchFromView, shouldUseMockData } from './db-connection';

// Enhanced mock data now with proper database fetching fallbacks
// In a real application, this would be replaced with real data from the database

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Assignment Posted',
    message: 'Mathematics: Algebra Assignment 3 has been posted.',
    time: '2 hours ago',
    read: false
  },
  {
    id: '2',
    title: 'Upcoming Exam',
    message: 'Reminder: Science exam scheduled for next Monday.',
    time: 'Yesterday',
    read: true
  },
  {
    id: '3',
    title: 'Holiday Announcement',
    message: 'School will be closed on May 15th for Staff Development Day.',
    time: '3 days ago',
    read: false
  },
  {
    id: '4',
    title: 'Parent-Teacher Meeting',
    message: 'Parent-teacher conferences scheduled for next week.',
    time: '1 week ago',
    read: true
  },
  {
    id: '5',
    title: 'Library Books Due',
    message: 'Please return your borrowed library books by Friday.',
    time: '1 week ago',
    read: true
  }
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Math Quiz',
    date: 'May 12, 2025',
    time: '10:00 AM'
  },
  {
    id: '2',
    title: 'Science Project Due',
    date: 'May 14, 2025',
    time: '3:00 PM'
  },
  {
    id: '3',
    title: 'School Assembly',
    date: 'May 15, 2025',
    time: '9:00 AM'
  },
  {
    id: '4',
    title: 'Sports Day',
    date: 'May 20, 2025',
    time: '8:00 AM'
  },
  {
    id: '5',
    title: 'Career Counseling',
    date: 'May 22, 2025',
    time: '2:00 PM'
  }
];

// Get role-specific dashboard stats
export const getRoleDashboardStats = async (role: UserRole): Promise<DashboardStat[]> => {
  // Try to fetch from database if not using mock data
  if (!shouldUseMockData()) {
    try {
      // Determine which view to use based on role
      let viewName = '';
      
      switch(role) {
        case 'student':
          viewName = 'student_dashboard_view';
          break;
        case 'teacher':
          viewName = 'teacher_dashboard_view';
          break;
        case 'financial':
          viewName = 'financial_dashboard_view';
          break;
        case 'admission':
          viewName = 'admission_dashboard_view';
          break;
        case 'library':
          viewName = 'library_dashboard_view';
          break;
        case 'labs':
          viewName = 'lab_resources_dashboard_view';
          break;
        case 'club':
          viewName = 'club_activities_dashboard_view';
          break;
        case 'admin':
        case 'super-admin':
          viewName = 'system_health_dashboard_view';
          break;
        default:
          // Fall back to mock data for other roles
          return getMockStatsForRole(role);
      }
      
      // Fetch data from the appropriate view
      const viewData = await fetchFromView(viewName, {}, {});
      
      // Transform the view data into DashboardStat objects
      if (viewData) {
        return transformViewDataToStats(viewData, role);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats from database:', error);
      // Fall back to mock data on error
    }
  }
  
  // Return mock data if database fetch failed or mock mode is enabled
  return getMockStatsForRole(role);
};

// Helper function to transform database view data to dashboard stats
const transformViewDataToStats = (viewData: any, role: UserRole): DashboardStat[] => {
  // Default stats in case transformation fails
  const defaultStats = getMockStatsForRole(role);
  
  try {
    if (!viewData || typeof viewData !== 'object') {
      return defaultStats;
    }

    // Transform based on role-specific views
    switch(role) {
      case 'student':
        return [
          {
            title: 'Attendance',
            value: `${viewData.attendance_percentage}%`,
            description: 'Current attendance rate',
            change: '+2%',
            increasing: true
          },
          {
            title: 'Pending Assignments',
            value: viewData.pending_assignments || 0,
            description: 'Due this week',
            change: viewData.pending_assignments > 3 ? 'High' : 'Low',
            increasing: viewData.pending_assignments > 3
          },
          {
            title: 'Overdue Assignments',
            value: viewData.overdue_assignments || 0,
            description: 'Need attention',
            change: viewData.overdue_assignments > 0 ? 'Action needed' : 'All good',
            increasing: viewData.overdue_assignments > 0
          },
          {
            title: 'Upcoming Events',
            value: viewData.upcoming_events || 0,
            description: 'On your calendar',
            change: '',
            increasing: false
          }
        ];

      case 'financial':
        return [
          {
            title: 'Monthly Revenue',
            value: viewData.monthly_revenue ? `$${viewData.monthly_revenue.toLocaleString()}` : '$0',
            description: 'Current month',
            change: '+5%',
            increasing: true
          },
          {
            title: 'Monthly Expenses',
            value: viewData.monthly_expenses ? `$${viewData.monthly_expenses.toLocaleString()}` : '$0',
            description: 'Current month',
            change: '-2%',
            increasing: false
          },
          {
            title: 'Pending Fees',
            value: viewData.pending_fees ? `$${viewData.pending_fees.toLocaleString()}` : '$0',
            description: 'Awaiting payment',
            change: viewData.pending_transactions || 0,
            increasing: (viewData.pending_transactions || 0) > 10
          },
          {
            title: 'Current Balance',
            value: viewData.current_balance ? `$${viewData.current_balance.toLocaleString()}` : '$0',
            description: 'Available funds',
            change: '',
            increasing: (viewData.current_balance || 0) > 0
          }
        ];
        
      // Add other role transformations as needed
      
      default:
        return defaultStats;
    }
  } catch (error) {
    console.error('Error transforming view data to stats:', error);
    return defaultStats;
  }
};

// Mock stats based on user role
const getMockStatsForRole = (role: UserRole): DashboardStat[] => {
  switch(role) {
    case 'student':
      return [
        {
          title: 'Attendance',
          value: '92%',
          description: 'Current attendance rate',
          change: '+2%',
          increasing: true
        },
        {
          title: 'Assignments',
          value: '4',
          description: 'Pending tasks',
          change: '2 due soon',
          increasing: false
        },
        {
          title: 'Performance',
          value: 'A',
          description: 'Current grade',
          change: 'Stable',
          increasing: true
        },
        {
          title: 'Upcoming Events',
          value: '3',
          description: 'On your calendar',
          change: '',
          increasing: false
        }
      ];
      
    case 'teacher':
      return [
        {
          title: 'Classes',
          value: '5',
          description: 'Teaching load',
          change: '',
          increasing: false
        },
        {
          title: 'Students',
          value: '127',
          description: 'Total students',
          change: '+3',
          increasing: true
        },
        {
          title: 'Avg. Attendance',
          value: '88%',
          description: 'This week',
          change: '-2%',
          increasing: false
        },
        {
          title: 'Pending Grading',
          value: '22',
          description: 'Need review',
          change: '',
          increasing: false
        }
      ];
      
    case 'principal':
      return [
        {
          title: 'Teachers',
          value: '28',
          description: 'Total staff',
          change: '',
          increasing: false
        },
        {
          title: 'Students',
          value: '517',
          description: 'Total enrollment',
          change: '+12',
          increasing: true
        },
        {
          title: 'Attendance',
          value: '91%',
          description: 'School average',
          change: '+1%',
          increasing: true
        },
        {
          title: 'Performance',
          value: 'B+',
          description: 'School average grade',
          change: 'Improving',
          increasing: true
        }
      ];
      
    case 'admin':
      return [
        {
          title: 'System Health',
          value: '98.5%',
          description: 'Overall status',
          change: 'Healthy',
          increasing: true
        },
        {
          title: 'Users',
          value: '578',
          description: 'Active accounts',
          change: '+15',
          increasing: true
        },
        {
          title: 'Disk Usage',
          value: '48%',
          description: 'Storage capacity',
          change: '+2%',
          increasing: false
        },
        {
          title: 'CPU Load',
          value: '32%',
          description: 'Average usage',
          change: 'Normal',
          increasing: false
        }
      ];
      
    case 'financial':
      return [
        {
          title: 'Monthly Revenue',
          value: '$127,500',
          description: 'Current month',
          change: '+5%',
          increasing: true
        },
        {
          title: 'Monthly Expenses',
          value: '$98,750',
          description: 'Current month',
          change: '-2%',
          increasing: false
        },
        {
          title: 'Pending Fees',
          value: '$45,200',
          description: 'Awaiting payment',
          change: '12 transactions',
          increasing: true
        },
        {
          title: 'Current Balance',
          value: '$284,300',
          description: 'Available funds',
          change: '',
          increasing: false
        }
      ];
      
    case 'admission':
      return [
        {
          title: 'New Applications',
          value: '37',
          description: 'This week',
          change: '+12',
          increasing: true
        },
        {
          title: 'Acceptance Rate',
          value: '76%',
          description: 'Current cycle',
          change: '+3%',
          increasing: true
        },
        {
          title: 'Pending Reviews',
          value: '18',
          description: 'Awaiting decision',
          change: '',
          increasing: false
        },
        {
          title: 'Enrollment',
          value: '92%',
          description: 'Of capacity',
          change: '',
          increasing: false
        }
      ];
      
    case 'school-admin':
      return [
        {
          title: 'Classes',
          value: '32',
          description: 'Active classes',
          change: '',
          increasing: false
        },
        {
          title: 'Teachers',
          value: '28',
          description: 'Faculty members',
          change: '',
          increasing: false
        },
        {
          title: 'Students',
          value: '517',
          description: 'Enrolled students',
          change: '',
          increasing: false
        },
        {
          title: 'Attendance',
          value: '91%',
          description: 'School average',
          change: '',
          increasing: false
        }
      ];
      
    case 'labs':
      return [
        {
          title: 'Lab Resources',
          value: '243',
          description: 'Total equipment',
          change: '+12',
          increasing: true
        },
        {
          title: 'Utilization',
          value: '67%',
          description: 'Resource usage',
          change: '+5%',
          increasing: true
        },
        {
          title: 'Maintenance Due',
          value: '14',
          description: 'Require attention',
          change: '',
          increasing: false
        },
        {
          title: 'Equipment Value',
          value: '$127K',
          description: 'Total investment',
          change: '',
          increasing: false
        }
      ];
      
    case 'club':
      return [
        {
          title: 'Active Clubs',
          value: '15',
          description: 'Currently running',
          change: '',
          increasing: false
        },
        {
          title: 'Members',
          value: '285',
          description: 'Total participants',
          change: '+12',
          increasing: true
        },
        {
          title: 'Participation Rate',
          value: '58%',
          description: 'Student involvement',
          change: '+3%',
          increasing: true
        },
        {
          title: 'Events',
          value: '7',
          description: 'Upcoming activities',
          change: '',
          increasing: false
        }
      ];
      
    case 'library':
      return [
        {
          title: 'Books',
          value: '8,542',
          description: 'Total collection',
          change: '+34',
          increasing: true
        },
        {
          title: 'Checked Out',
          value: '327',
          description: 'Currently borrowed',
          change: '',
          increasing: false
        },
        {
          title: 'New Acquisitions',
          value: '52',
          description: 'Added this month',
          change: '',
          increasing: false
        },
        {
          title: 'Overdue',
          value: '18',
          description: 'Past due date',
          change: '-4',
          increasing: false
        }
      ];
      
    case 'super-admin':
      return [
        {
          title: 'System Health',
          value: '98.5%',
          description: 'Overall status',
          change: 'Stable',
          increasing: true
        },
        {
          title: 'Backup Status',
          value: 'Success',
          description: 'Last backup 2h ago',
          change: '',
          increasing: true
        },
        {
          title: 'Active Services',
          value: '17/18',
          description: 'Online services',
          change: '1 degraded',
          increasing: false
        },
        {
          title: 'Server Load',
          value: '32%',
          description: 'Average CPU',
          change: 'Normal',
          increasing: false
        }
      ];
      
    default:
      return [
        {
          title: 'Overview',
          value: 'N/A',
          description: 'No specific data',
          change: '',
          increasing: false
        },
        {
          title: 'Status',
          value: 'Active',
          description: 'Current state',
          change: '',
          increasing: true
        },
        {
          title: 'Notifications',
          value: '3',
          description: 'Unread alerts',
          change: '',
          increasing: false
        },
        {
          title: 'Events',
          value: '5',
          description: 'Upcoming',
          change: '',
          increasing: false
        }
      ];
  }
};

// Function to fetch user preferences from database or return defaults
export const getUserPreferences = async (userId: string) => {
  const defaultPreferences = {
    theme: 'system',
    notificationsEnabled: true,
    emailNotifications: true,
    displayMode: 'default'
  };
  
  if (shouldUseMockData()) {
    return defaultPreferences;
  }
  
  try {
    const preferences = await fetchData('user_preferences', defaultPreferences, {
      filter: { user_id: userId }
    });
    
    return {
      theme: preferences.theme || 'system',
      notificationsEnabled: preferences.notificationsEnabled || true,
      emailNotifications: preferences.emailNotifications || true,
      displayMode: preferences.displayMode || 'default'
    };
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return defaultPreferences;
  }
};

// Function to fetch system configuration
export const getSystemConfig = async () => {
  const defaultConfig = {
    siteName: 'EduSync School Management',
    primaryColor: '#3b82f6',
    secondaryColor: '#10b981',
    enableNotifications: true,
    maxFileUploadSize: 10,
    schoolContact: {
      phone: '555-123-4567',
      email: 'contact@edusync.example.com',
      address: '123 Education St, Learning City, 12345'
    }
  };
  
  if (shouldUseMockData()) {
    return defaultConfig;
  }
  
  try {
    const configData = await fetchData('system_configuration', [], {});
    
    if (!Array.isArray(configData) || configData.length === 0) {
      return defaultConfig;
    }
    
    // Transform array of key-value pairs to object
    const config = configData.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
    
    return {
      siteName: config.site_name || defaultConfig.siteName,
      primaryColor: config.theme_primary_color || defaultConfig.primaryColor,
      secondaryColor: config.theme_secondary_color || defaultConfig.secondaryColor,
      enableNotifications: config.enable_notifications === 'true',
      maxFileUploadSize: parseInt(config.max_file_upload_size || '10'),
      schoolContact: {
        phone: config.school_phone || defaultConfig.schoolContact.phone,
        email: config.school_email || defaultConfig.schoolContact.email,
        address: config.school_address || defaultConfig.schoolContact.address
      }
    };
  } catch (error) {
    console.error('Error fetching system configuration:', error);
    return defaultConfig;
  }
};

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
