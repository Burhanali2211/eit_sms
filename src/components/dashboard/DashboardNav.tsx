import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { 
  Home, Users, BookOpen, Calendar, Settings, Bell, User, 
  GraduationCap, Building, DollarSign, UserCheck, 
  Beaker, Book, Activity, Database, Shield, Cpu,
  FileText, BarChart3, Bus
} from "lucide-react";
import { cn } from "@/lib/utils";

const DashboardNav = () => {
  const { user } = useAuth();

  // Define menu items based on roles
  const menuItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
      roles: ["student", "teacher", "admin", "principal", "financial", "admission", "school-admin", "labs", "club", "library", "super-admin"]
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
      roles: ["student", "teacher", "admin", "principal", "financial", "admission", "school-admin", "labs", "club", "library", "super-admin"]
    },
    {
      title: "Calendar",
      href: "/dashboard/calendar",
      icon: Calendar,
      roles: ["student", "teacher", "admin", "principal", "financial", "admission", "school-admin", "labs", "club", "library", "super-admin"]
    },
    {
      title: "Notifications",
      href: "/dashboard/notifications",
      icon: Bell,
      roles: ["student", "teacher", "admin", "principal", "financial", "admission", "school-admin", "labs", "club", "library", "super-admin"]
    },
    
    // School Management
    {
      title: "School Overview",
      href: "/dashboard/school-overview",
      icon: Building,
      roles: ["principal", "super-admin"]
    },
    {
      title: "Staff Management",
      href: "/dashboard/staff",
      icon: Users,
      roles: ["principal", "school-admin", "super-admin"]
    },
    {
      title: "Transportation",
      href: "/dashboard/transportation",
      icon: Bus,
      roles: ["admin", "principal", "super-admin", "school-admin"]
    },
    
    // Academic
    {
      title: "Classes",
      href: "/dashboard/classes",
      icon: BookOpen,
      roles: ["teacher", "principal", "school-admin"]
    },
    {
      title: "Grades",
      href: "/dashboard/grades",
      icon: GraduationCap,
      roles: ["teacher", "principal", "super-admin"]
    },
    {
      title: "Courses",
      href: "/dashboard/courses",
      icon: Book,
      roles: ["student", "teacher", "principal"]
    },
    {
      title: "Attendance",
      href: "/dashboard/attendance",
      icon: UserCheck,
      roles: ["student", "teacher", "principal"]
    },
    
    // Administrative
    {
      title: "User Management",
      href: "/dashboard/users",
      icon: Users,
      roles: ["admin", "super-admin"]
    },
    {
      title: "Finance",
      href: "/dashboard/finance",
      icon: DollarSign,
      roles: ["financial", "principal", "super-admin"]
    },
    {
      title: "Admissions",
      href: "/dashboard/admissions",
      icon: UserCheck,
      roles: ["admission", "principal", "super-admin"]
    },
    
    // Resources
    {
      title: "Library",
      href: "/dashboard/library",
      icon: Book,
      roles: ["library", "principal", "super-admin"]
    },
    {
      title: "Lab Resources",
      href: "/dashboard/labs",
      icon: Beaker,
      roles: ["labs", "principal", "super-admin"]
    },
    {
      title: "Club Activities",
      href: "/dashboard/clubs",
      icon: Activity,
      roles: ["club", "principal", "super-admin"]
    },
    
    // System (Super Admin only)
    {
      title: "System Health",
      href: "/dashboard/system-health",
      icon: Cpu,
      roles: ["super-admin"]
    },
    {
      title: "System Database",
      href: "/dashboard/system-database",
      icon: Database,
      roles: ["super-admin"]
    },
    {
      title: "Audit Trail",
      href: "/dashboard/audit-trail",
      icon: Shield,
      roles: ["super-admin"]
    },
    {
      title: "System Logs",
      href: "/dashboard/system-logs",
      icon: FileText,
      roles: ["super-admin"]
    },
    {
      title: "Backup & Recovery",
      href: "/dashboard/backup-recovery",
      icon: Database,
      roles: ["super-admin"]
    },
    {
      title: "System Monitoring",
      href: "/dashboard/system-monitoring",
      icon: BarChart3,
      roles: ["super-admin"]
    },
    {
      title: "Configuration",
      href: "/dashboard/configuration",
      icon: Settings,
      roles: ["super-admin"]
    },
    
    // Settings (always last)
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      roles: ["student", "teacher", "admin", "principal", "financial", "admission", "school-admin", "labs", "club", "library", "super-admin"]
    }
  ];

  // Filter menu items based on user role
  const visibleMenuItems = menuItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  return (
    <SidebarMenu>
      {visibleMenuItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton asChild>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )
                }
              >
                <IconComponent className="h-4 w-4" />
                {item.title}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};

export default DashboardNav;
