
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import { getRoleDashboardStats, mockCalendarEvents, mockNotifications } from "@/utils/mockData";

const Dashboard = () => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
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

  // Get role-specific dashboard stats
  const stats = getRoleDashboardStats(user.role);
  
  return (
    <DashboardLayout>
      <DashboardHeader title="Dashboard" />
      
      <main className="flex-1 overflow-auto bg-gray-50 p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCalendarEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.date} • {event.time}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockNotifications.slice(0, 3).map((notification) => (
                  <div key={notification.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">{notification.time}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Role-specific dashboard content */}
        {user.role === 'student' && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Mathematics', 'English Literature', 'Physics', 'Computer Science'].map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="w-2 h-10 bg-school-primary rounded-full mr-4"></div>
                      <div>
                        <h3 className="font-medium">{course}</h3>
                        <p className="text-sm text-muted-foreground">Next class: Tomorrow, 10:00 AM</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {user.role === 'teacher' && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>My Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['10A - Mathematics', '10B - Mathematics', '11A - Mathematics', '11B - Mathematics'].map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="w-2 h-10 bg-school-secondary rounded-full mr-4"></div>
                      <div>
                        <h3 className="font-medium">{course}</h3>
                        <p className="text-sm text-muted-foreground">Next class: Tomorrow, 11:00 AM</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {(user.role === 'principal' || user.role === 'admin' || user.role === 'super-admin') && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>School Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-100 rounded-lg text-center">
                  <h3 className="text-xl font-bold">1,250</h3>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg text-center">
                  <h3 className="text-xl font-bold">85</h3>
                  <p className="text-sm text-muted-foreground">Faculty &amp; Staff</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg text-center">
                  <h3 className="text-xl font-bold">40</h3>
                  <p className="text-sm text-muted-foreground">Classrooms</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg text-center">
                  <h3 className="text-xl font-bold">12</h3>
                  <p className="text-sm text-muted-foreground">Labs &amp; Facilities</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </DashboardLayout>
  );
};

export default Dashboard;
