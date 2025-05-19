
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
  | 'archived';
