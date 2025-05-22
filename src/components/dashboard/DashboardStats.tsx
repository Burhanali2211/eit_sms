import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/dashboard/StatCard";
import { DashboardStat } from "@/types/dashboard";

interface DashboardStatsProps {
  stats: DashboardStat[];
  isStatsLoading: boolean;
}

const DashboardStats = ({ stats, isStatsLoading }: DashboardStatsProps) => {
  if (isStatsLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array(4).fill(0).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-1/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-1/2 mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats && stats.length > 0 ? stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      )) : (
        <Card className="col-span-4">
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">No statistics available. Please check database connection.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardStats;
