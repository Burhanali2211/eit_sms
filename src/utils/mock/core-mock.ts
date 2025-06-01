/**
 * Core mock data utilities
 */

import { DashboardStat, UserRole } from "@/types/dashboard";
import { shouldUseMockData } from '../database';
import { fetchFromView } from '../database';

// Get role-specific dashboard stats
export const getRoleDashboardStats = (role: UserRole): DashboardStat[] => {
  // For now, always return mock data since this is a synchronous function
  // Database fetching should be handled separately in the component
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
export const getMockStatsForRole = (role: UserRole): DashboardStat[] => {
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
