
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  change?: string | number;
  increasing?: boolean;
}

const StatCard = ({ title, value, description, change, increasing }: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {change && (
          <div className={cn(
            "flex items-center",
            increasing ? "text-emerald-500 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"
          )}>
            {increasing ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
        {change && increasing !== undefined && (
          <div className="mt-4 h-1 w-full bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                "h-1 rounded-full",
                increasing
                  ? "bg-emerald-500 dark:bg-emerald-400"
                  : "bg-amber-500 dark:bg-amber-400"
              )}
              style={{
                width: typeof value === 'string' && value.endsWith('%')
                  ? value
                  : '75%'
              }}
            ></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
