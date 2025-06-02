
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, Users, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const DataAnalyticsWidget = () => {
  const { user } = useAuth();

  // Mock data for different roles
  const getAnalyticsData = () => {
    switch (user?.role) {
      case 'student':
        return {
          gradeData: [
            { subject: 'Math', grade: 85 },
            { subject: 'Science', grade: 92 },
            { subject: 'English', grade: 78 },
            { subject: 'History', grade: 88 },
            { subject: 'Art', grade: 95 }
          ],
          attendanceData: [
            { month: 'Jan', percentage: 95 },
            { month: 'Feb', percentage: 92 },
            { month: 'Mar', percentage: 98 },
            { month: 'Apr', percentage: 85 },
            { month: 'May', percentage: 90 }
          ],
          performanceMetrics: {
            averageGrade: 87.6,
            attendance: 94,
            assignmentsCompleted: 24,
            totalAssignments: 26
          }
        };
      case 'teacher':
        return {
          classData: [
            { class: '10A', average: 82 },
            { class: '10B', average: 78 },
            { class: '11A', average: 85 },
            { class: '11B', average: 80 }
          ],
          attendanceData: [
            { month: 'Jan', percentage: 88 },
            { month: 'Feb', percentage: 92 },
            { month: 'Mar', percentage: 85 },
            { month: 'Apr', percentage: 90 },
            { month: 'May', percentage: 87 }
          ],
          performanceMetrics: {
            totalStudents: 120,
            averageAttendance: 88.4,
            assignmentsGraded: 85,
            pendingGrades: 15
          }
        };
      default:
        return {
          enrollmentData: [
            { grade: 'Grade 6', students: 45 },
            { grade: 'Grade 7', students: 52 },
            { grade: 'Grade 8', students: 48 },
            { grade: 'Grade 9', students: 55 },
            { grade: 'Grade 10', students: 42 }
          ],
          performanceData: [
            { month: 'Jan', performance: 78 },
            { month: 'Feb', performance: 82 },
            { month: 'Mar', performance: 79 },
            { month: 'Apr', performance: 85 },
            { month: 'May', performance: 88 }
          ],
          performanceMetrics: {
            totalStudents: 242,
            averagePerformance: 82.4,
            teacherCount: 18,
            activeClasses: 12
          }
        };
    }
  };

  const data = getAnalyticsData();
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const MetricCard = ({ title, value, change, icon: Icon, trend }: any) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <div className="flex items-center gap-1 mt-1">
                {trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span className={`text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {change}%
                </span>
              </div>
            )}
          </div>
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );

  // Helper function to get chart data for performance tab
  const getPerformanceChartData = () => {
    if (user?.role === 'student') {
      return data.gradeData;
    } else if (user?.role === 'teacher') {
      return data.classData;
    } else {
      return data.enrollmentData;
    }
  };

  // Helper function to get chart data key for performance tab
  const getPerformanceDataKey = () => {
    if (user?.role === 'student') {
      return 'grade';
    } else if (user?.role === 'teacher') {
      return 'average';
    } else {
      return 'students';
    }
  };

  // Helper function to get chart data key for x-axis
  const getPerformanceXAxisKey = () => {
    if (user?.role === 'student') {
      return 'subject';
    } else if (user?.role === 'teacher') {
      return 'class';
    } else {
      return 'grade';
    }
  };

  // Helper function to get trends chart data
  const getTrendsChartData = () => {
    if (data.attendanceData) {
      return data.attendanceData;
    } else {
      return data.performanceData || [];
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Analytics & Insights
          </CardTitle>
          <Button size="sm" variant="outline">
            View Full Report
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {user?.role === 'student' && (
                <>
                  <MetricCard
                    title="Average Grade"
                    value={`${data.performanceMetrics.averageGrade}%`}
                    change={2.4}
                    trend="up"
                    icon={BookOpen}
                  />
                  <MetricCard
                    title="Attendance"
                    value={`${data.performanceMetrics.attendance}%`}
                    change={1.2}
                    trend="up"
                    icon={Users}
                  />
                  <MetricCard
                    title="Completed"
                    value={`${data.performanceMetrics.assignmentsCompleted}/${data.performanceMetrics.totalAssignments}`}
                    icon={BookOpen}
                  />
                  <MetricCard
                    title="Rank"
                    value="#12"
                    change={3}
                    trend="up"
                    icon={TrendingUp}
                  />
                </>
              )}
              
              {user?.role === 'teacher' && (
                <>
                  <MetricCard
                    title="Total Students"
                    value={data.performanceMetrics.totalStudents}
                    icon={Users}
                  />
                  <MetricCard
                    title="Avg Attendance"
                    value={`${data.performanceMetrics.averageAttendance}%`}
                    change={1.8}
                    trend="up"
                    icon={BarChart3}
                  />
                  <MetricCard
                    title="Graded"
                    value={data.performanceMetrics.assignmentsGraded}
                    icon={BookOpen}
                  />
                  <MetricCard
                    title="Pending"
                    value={data.performanceMetrics.pendingGrades}
                    icon={TrendingDown}
                  />
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getPerformanceChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={getPerformanceXAxisKey()} />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey={getPerformanceDataKey()} 
                    fill="#3b82f6" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getTrendsChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="percentage" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DataAnalyticsWidget;
