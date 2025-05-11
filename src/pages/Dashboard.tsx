
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Book, Calendar, ChevronRight, Clock, Home, LogOut, Settings, User, Users } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("student"); // This would come from authentication

  // Mock data for dashboard
  const upcomingEvents = [
    { id: 1, title: "Math Quiz", date: "May 12, 2025", time: "10:00 AM" },
    { id: 2, title: "Science Project Due", date: "May 14, 2025", time: "11:59 PM" },
    { id: 3, title: "School Assembly", date: "May 15, 2025", time: "09:00 AM" },
  ];

  const recentNotifications = [
    { id: 1, title: "Exam Schedule Posted", time: "2 hours ago" },
    { id: 2, title: "Fee Payment Reminder", time: "1 day ago" },
    { id: 3, title: "New Course Material Available", time: "2 days ago" },
  ];

  // Role-based navigation menus
  const getNavigation = () => {
    const commonItems = [
      { icon: Home, name: "Dashboard", path: "/dashboard" },
      { icon: Bell, name: "Notifications", path: "/dashboard/notifications" },
      { icon: Calendar, name: "Calendar", path: "/dashboard/calendar" },
      { icon: User, name: "Profile", path: "/dashboard/profile" },
    ];

    const roleSpecificItems = {
      student: [
        { icon: Book, name: "Courses", path: "/dashboard/courses" },
        { icon: Clock, name: "Attendance", path: "/dashboard/attendance" },
      ],
      teacher: [
        { icon: Users, name: "Classes", path: "/dashboard/classes" },
        { icon: Book, name: "Grades", path: "/dashboard/grades" },
      ],
      admin: [
        { icon: Users, name: "Users", path: "/dashboard/users" },
        { icon: Settings, name: "System", path: "/dashboard/system" },
      ],
      principal: [
        { icon: Users, name: "Staff", path: "/dashboard/staff" },
        { icon: Settings, name: "School Settings", path: "/dashboard/settings" },
      ],
    };

    return [...commonItems, ...(roleSpecificItems[role as keyof typeof roleSpecificItems] || [])];
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="bg-white border-r">
          <SidebarHeader className="px-6 py-4">
            <div className="flex items-center">
              <h2 className="text-xl font-bold text-school-primary">
                EduSync<span className="text-school-secondary">Academy</span>
              </h2>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {getNavigation().map((item, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton asChild>
                        <Link to={item.path} className="flex items-center">
                          <item.icon className="h-5 w-5 mr-3" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="px-6 py-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-sm">
                  <p className="font-medium">User Name</p>
                  <p className="text-xs text-muted-foreground capitalize">{role}</p>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto bg-gray-50 p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Attendance Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94%</div>
                  <p className="text-xs text-muted-foreground">
                    +2% from last month
                  </p>
                  <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-1 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Current Grade Average
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">B+</div>
                  <p className="text-xs text-muted-foreground">
                    Improvement from B
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Assignments Due
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    Due this week
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Your Rank
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">14 / 120</div>
                  <p className="text-xs text-muted-foreground">
                    Top 15% of class
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
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
                    {recentNotifications.map((notification) => (
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
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
