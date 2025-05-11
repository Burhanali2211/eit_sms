
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStat } from "@/types/dashboard";
import { ArrowDown, ArrowUp } from "lucide-react";

const StatCard = ({ title, value, description, change, increasing }: DashboardStat) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {change && (
          <div className={`flex items-center ${increasing ? 'text-green-500' : 'text-red-500'}`}>
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
          <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-1 rounded-full ${increasing ? 'bg-green-500' : 'bg-amber-500'}`} 
              style={{ width: typeof value === 'string' && value.endsWith('%') 
                ? value 
                : '75%' }}
            ></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
