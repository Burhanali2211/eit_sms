
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RoleBasedContent from "@/components/dashboard/RoleBasedContent";
import QuickActions from "@/components/dashboard/QuickActions";
import RealTimeNotifications from "@/components/dashboard/RealTimeNotifications";
import EnhancedCalendarWidget from "@/components/dashboard/EnhancedCalendarWidget";
import DataAnalyticsWidget from "@/components/dashboard/DataAnalyticsWidget";
import { useDatabaseView, useDatabaseTable } from "@/hooks/use-database-connection";
import { DashboardStat } from "@/types/dashboard";
import { getRoleDashboardStats } from "@/utils/mock/core-mock";
import { flattenDashboardStats } from "@/utils/type-guards";

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
  const stats: DashboardStat[] = (() => {
    console.log('Raw dbStats from database:', dbStats);
    
    // Try to use database stats first
    const validDbStats = flattenDashboardStats(dbStats);
    if (validDbStats.length > 0) {
      console.log('Using database stats:', validDbStats);
      return validDbStats;
    }
    
    // Fall back to mock data
    const mockStats = user?.role ? getRoleDashboardStats(user.role) : [];
    console.log('Using mock stats for role', user?.role, ':', mockStats);
    return mockStats;
  })();

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

      <main className="flex-1 overflow-auto dashboard-content p-6 space-y-6">
        {/* Main Stats */}
        <DashboardStats stats={stats} isStatsLoading={isStatsLoading} />

        {/* Enhanced Dashboard Grid */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Quick Actions */}
          <QuickActions />
          
          {/* Real-time Notifications */}
          <RealTimeNotifications />
          
          {/* Enhanced Calendar */}
          <EnhancedCalendarWidget />
        </div>

        {/* Analytics Widget - Full Width */}
        <div className="grid gap-6 grid-cols-1">
          <DataAnalyticsWidget />
        </div>

        {/* Role-specific dashboard content */}
        <RoleBasedContent role={user.role} />
      </main>
    </DashboardLayout>
  );
};

export default Dashboard;
