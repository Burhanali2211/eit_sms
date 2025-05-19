
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StatusBadgeProps } from "./types";
import { getStatusConfig } from "./status-config";

// Export the StatusType as a type-only export
export type { StatusType } from "./types";

export function StatusBadge({ 
  status, 
  className, 
  showIcon = true,
  label
}: StatusBadgeProps) {
  const config = getStatusConfig(status, label);

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

export default StatusBadge;
