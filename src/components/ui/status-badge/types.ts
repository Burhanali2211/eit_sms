
import { LucideIcon } from "lucide-react";

export type StatusType = 
  | "online" 
  | "offline" 
  | "degraded" 
  | "pending" 
  | "approved" 
  | "rejected" 
  | "active" 
  | "inactive" 
  | "on-leave"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "create"
  | "update"
  | "delete"
  | "restore"
  | "login"
  | "logout"
  | "add-user"
  | "remove-user"
  | "paid"
  | "overdue"
  | "processing";

export interface StatusConfigItem {
  variant: "default" | "destructive" | "outline" | "secondary" | "error" | "success" | "warning" | "info";
  icon: JSX.Element;
  label: string;
}

export interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  showIcon?: boolean;
  label?: string;
}
