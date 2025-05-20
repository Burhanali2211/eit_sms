
export interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  showIcon?: boolean;
  label?: string;
}

export type StatusType = 
  // General statuses
  | 'active'
  | 'inactive'
  | 'pending'
  | 'processing'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'new'
  | 'draft'
  | 'archived'

  // System statuses
  | 'online'
  | 'offline'
  | 'degraded'
  | 'healthy'
  | 'critical'
  | 'maintenance'
  | 'verified'

  // User statuses
  | 'approved'
  | 'rejected'
  | 'waitlisted'
  | 'interview'
  | 'on-leave'
  | 'completed'

  // Operational statuses
  | 'create'
  | 'update'
  | 'delete'
  | 'restore'
  | 'login'
  | 'logout'
  | 'add-user'
  | 'remove-user'
  | 'operational'
  | 'not_started'

  // Financial statuses
  | 'paid'
  | 'overdue'
  | 'in-progress';

export interface StatusConfigItem {
  variant: 'default' | 'success' | 'error' | 'warning' | 'info' | 'secondary';
  icon: React.ReactNode;
  label: string;
}
