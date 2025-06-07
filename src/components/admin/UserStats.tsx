
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX, Clock } from "lucide-react";

interface UserStatsProps {
  users: any[];
}

const UserStats = ({ users }: UserStatsProps) => {
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === "Active").length;
  const inactiveUsers = users.filter(user => user.status === "Inactive").length;
  const recentLogins = users.filter(user => 
    user.lastLogin && user.lastLogin !== "Never"
  ).length;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: UserCheck,
      color: "text-green-600"
    },
    {
      title: "Inactive Users", 
      value: inactiveUsers,
      icon: UserX,
      color: "text-red-600"
    },
    {
      title: "Recent Logins",
      value: recentLogins,
      icon: Clock,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default UserStats;
