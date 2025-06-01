import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardEvents from "@/components/dashboard/DashboardEvents";
import DashboardNotifications from "@/components/dashboard/DashboardNotifications";
import RoleBasedContent from "@/components/dashboard/RoleBasedContent";
import { useDatabaseView, useDatabaseTable } from "@/hooks/use-database-connection";
import { DashboardStat } from "@/types/dashboard";
import { getRoleDashboardStats } from "@/utils/mock/core-mock";

const Dashboard = () => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Fetch dashboard stats based on user role with proper typing and fallback
  const { data: dbStats, isLoading: isStatsLoading } = useDatabaseView<DashboardStat[]>(
    `${user?.role}_dashboard_view`,
    [], // Default empty array
    { user_id: user?.id },
    60000 // Refresh every minute
  );

  // Use database stats if available, otherwise fall back to mock data
  const stats: DashboardStat[] = dbStats && dbStats.length > 0 
    ? dbStats 
    : user?.role 
      ? getRoleDashboardStats(user.role) 
      : [];

  // Fetch events and notifications from database
  const { data: events = [] } = useDatabaseTable('calendar_events', {
    filter: { user_id: user?.id },
    refreshInterval: 60000
  });

  const { data: notifications = [] } = useDatabaseTable('notifications', {
    filter: { user_id: user?.id },
    refreshInterval: 60000
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <DashboardHeader title="Dashboard" />

      <main className="flex-1 overflow-auto dashboard-content p-6">
        <DashboardStats stats={stats} isStatsLoading={isStatsLoading} />

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-6">
          <DashboardEvents events={events} />
          <DashboardNotifications notifications={notifications} />
        </div>

        {/* Role-specific dashboard content */}
        <RoleBasedContent role={user.role} />
      </main>
    </DashboardLayout>
  );
};

export default Dashboard;
