import React from "react";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Info, 
  AlertCircle,
  FilePlus,
  FileX,
  PenLine,
  Undo,
  User,
  UserPlus,
  UserMinus
} from "lucide-react";
import { cn } from "@/lib/utils";

type StatusType = 
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

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  showIcon?: boolean;
  label?: string;
}

export function StatusBadge({ 
  status, 
  className, 
  showIcon = true,
  label
}: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "online":
        return {
          variant: "success" as const,
          icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />,
          label: label || "Online"
        };
      case "active":
        return {
          variant: "success" as const,
          icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />,
          label: label || "Active"
        };
      case "offline":
        return {
          variant: "error" as const,
          icon: <XCircle className="h-3.5 w-3.5 mr-1" />,
          label: label || "Offline"
        };
      case "inactive":
        return {
          variant: "error" as const,
          icon: <XCircle className="h-3.5 w-3.5 mr-1" />,
          label: label || "Inactive"
        };
      case "degraded":
        return {
          variant: "warning" as const,
          icon: <AlertTriangle className="h-3.5 w-3.5 mr-1" />,
          label: label || "Degraded"
        };
      case "pending":
        return {
          variant: "warning" as const,
          icon: <Clock className="h-3.5 w-3.5 mr-1" />,
          label: label || "Pending"
        };
      case "processing":
        return {
          variant: "warning" as const,
          icon: <Clock className="h-3.5 w-3.5 mr-1" />,
          label: label || "Processing"
        };
      case "approved":
        return {
          variant: "success" as const,
          icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />,
          label: label || "Approved"
        };
      case "rejected":
        return {
          variant: "error" as const,
          icon: <XCircle className="h-3.5 w-3.5 mr-1" />,
          label: label || "Rejected"
        };
      case "on-leave":
        return {
          variant: "info" as const,
          icon: <Info className="h-3.5 w-3.5 mr-1" />,
          label: label || "On Leave"
        };
      case "error":
        return {
          variant: "error" as const,
          icon: <AlertCircle className="h-3.5 w-3.5 mr-1" />,
          label: label || "Error"
        };
      case "warning":
        return {
          variant: "warning" as const,
          icon: <AlertTriangle className="h-3.5 w-3.5 mr-1" />,
          label: label || "Warning"
        };
      case "info":
        return {
          variant: "info" as const,
          icon: <Info className="h-3.5 w-3.5 mr-1" />,
          label: label || "Info"
        };
      case "success":
        return {
          variant: "success" as const,
          icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />,
          label: label || "Success"
        };
      case "create":
        return {
          variant: "success" as const,
          icon: <FilePlus className="h-3.5 w-3.5 mr-1" />,
          label: label || "Created"
        };
      case "update":
        return {
          variant: "info" as const,
          icon: <PenLine className="h-3.5 w-3.5 mr-1" />,
          label: label || "Updated"
        };
      case "delete":
        return {
          variant: "error" as const,
          icon: <FileX className="h-3.5 w-3.5 mr-1" />,
          label: label || "Deleted"
        };
      case "restore":
        return {
          variant: "secondary" as const,
          icon: <Undo className="h-3.5 w-3.5 mr-1" />,
          label: label || "Restored"
        };
      case "login":
        return {
          variant: "secondary" as const,
          icon: <User className="h-3.5 w-3.5 mr-1" />,
          label: label || "Login"
        };
      case "logout":
        return {
          variant: "secondary" as const,
          icon: <User className="h-3.5 w-3.5 mr-1" />,
          label: label || "Logout"
        };
      case "add-user":
        return {
          variant: "success" as const,
          icon: <UserPlus className="h-3.5 w-3.5 mr-1" />,
          label: label || "Added User"
        };
      case "remove-user":
        return {
          variant: "warning" as const,
          icon: <UserMinus className="h-3.5 w-3.5 mr-1" />,
          label: label || "Removed User"
        };
      case "paid":
        return {
          variant: "success" as const,
          icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />,
          label: label || "Paid"
        };
      case "overdue":
        return {
          variant: "error" as const,
          icon: <AlertCircle className="h-3.5 w-3.5 mr-1" />,
          label: label || "Overdue"
        };
      default:
        return {
          variant: "default" as const,
          icon: <Info className="h-3.5 w-3.5 mr-1" />,
          label: label || status.charAt(0).toUpperCase() + status.slice(1)
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge 
      variant={config.variant} 
      className={cn("flex items-center", className)}
    >
      {showIcon && config.icon}
      {config.label}
    </Badge>
  );
}
