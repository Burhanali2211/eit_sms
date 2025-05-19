
export interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  showIcon?: boolean;
  label?: string;
}

export type StatusType = 
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
  | 'online'
  | 'offline'
  | 'degraded'
  | 'approved'
  | 'rejected'
  | 'on-leave'
  | 'create'
  | 'update'
  | 'delete'
  | 'restore'
  | 'login'
  | 'logout'
  | 'add-user'
  | 'remove-user'
  | 'paid'
  | 'overdue';

export interface StatusConfigItem {
  variant: 'default' | 'success' | 'error' | 'warning' | 'info' | 'secondary';
  icon: React.ReactNode;
  label: string;
}
