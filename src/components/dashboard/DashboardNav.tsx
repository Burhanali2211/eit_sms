
import { useAuth } from "@/contexts/AuthContext";
import { MenuItem } from "@/types/dashboard";
import { 
  Home, 
  Book, 
  Users, 
  Calendar, 
  Clock, 
  User, 
  Bell, 
  Settings,
  BookOpen,
  GraduationCap,
  Briefcase,
  LayoutDashboard,
  FileText,
  Database,
  Monitor,
  Gauge,
  FileArchive,
  Bug,
  Info,
  History,
  DatabaseBackup
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const DashboardNav = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  // Define all navigation items with role-based access
  const allNavItems: MenuItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
      role: ["student", "teacher", "principal", "admin", "financial", "admission", "school-admin", "labs", "club", "library", "super-admin"],
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
      role: ["student", "teacher", "principal", "admin", "financial", "admission", "school-admin", "labs", "club", "library", "super-admin"],
    },
    {
      title: "Notifications",
      href: "/dashboard/notifications",
      icon: Bell,
      role: ["student", "teacher", "principal", "admin", "financial", "admission", "school-admin", "labs", "club", "library", "super-admin"],
    },
    {
      title: "Calendar",
      href: "/dashboard/calendar",
      icon: Calendar,
      role: ["student", "teacher", "principal", "admin", "financial", "admission", "school-admin", "labs", "club", "library", "super-admin"],
    },
    // Student specific
    {
      title: "Courses",
      href: "/dashboard/courses",
      icon: Book,
      role: ["student"],
    },
    {
      title: "Attendance",
      href: "/dashboard/attendance",
      icon: Clock,
      role: ["student", "teacher", "school-admin"],
    },
    // Teacher specific
    {
      title: "Classes",
      href: "/dashboard/classes",
      icon: Users,
      role: ["teacher", "principal", "school-admin"],
    },
    {
      title: "Grades",
      href: "/dashboard/grades",
      icon: FileText,
      role: ["teacher", "principal"],
    },
    // Principal specific
    {
      title: "School Overview",
      href: "/dashboard/school-overview",
      icon: LayoutDashboard,
      role: ["principal", "super-admin"],
    },
    {
      title: "Staff",
      href: "/dashboard/staff",
      icon: Users,
      role: ["principal", "school-admin", "super-admin"],
    },
    // Admin roles
    {
      title: "User Management",
      href: "/dashboard/users",
      icon: Users,
      role: ["admin", "super-admin"],
    },
    {
      title: "System",
      href: "/dashboard/system",
      icon: Settings,
      role: ["admin", "super-admin"],
    },
    // Super admin specific
    {
      title: "System Logs",
      href: "/dashboard/logs",
      icon: Bug,
      role: ["admin", "super-admin"],
    },
    {
      title: "Audit Trail",
      href: "/dashboard/audit",
      icon: History,
      role: ["admin", "super-admin"],
    },
    {
      title: "System Health",
      href: "/dashboard/health",
      icon: Gauge,
      role: ["admin", "super-admin"],
    },
    {
      title: "Backup & Recovery",
      href: "/dashboard/backup",
      icon: DatabaseBackup,
      role: ["admin", "super-admin"],
    },
    {
      title: "System Monitoring",
      href: "/dashboard/monitoring",
      icon: Monitor,
      role: ["admin", "super-admin"],
    },
    // Financial admin
    {
      title: "Finance",
      href: "/dashboard/finance",
      icon: Briefcase,
      role: ["financial", "principal", "super-admin"],
    },
    // Admission admin
    {
      title: "Admissions",
      href: "/dashboard/admissions",
      icon: GraduationCap,
      role: ["admission", "principal", "super-admin"],
    },
    // School admin
    {
      title: "School Management",
      href: "/dashboard/school-management",
      icon: Briefcase,
      role: ["school-admin", "principal", "super-admin"],
    },
    // Labs admin
    {
      title: "Lab Resources",
      href: "/dashboard/labs",
      icon: Monitor,
      role: ["labs", "principal", "super-admin"],
    },
    // Club admin
    {
      title: "Clubs & Activities",
      href: "/dashboard/clubs",
      icon: Users,
      role: ["club", "principal", "super-admin"],
    },
    // Library admin
    {
      title: "Library",
      href: "/dashboard/library",
      icon: BookOpen,
      role: ["library", "principal", "super-admin"],
    },
    // Super admin
    {
      title: "System Database",
      href: "/dashboard/database",
      icon: Database,
      role: ["super-admin"],
    }
  ];
  
  // Filter items based on user role
  const navItems = allNavItems.filter((item) => 
    item.role.includes(user.role)
  );

  return (
    <nav className="space-y-1 px-2 py-3">
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            cn(
              "flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
              isActive
                ? "bg-school-primary/10 text-school-primary font-semibold"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )
          }
        >
          {item.icon && (
            <span className="mr-3 w-5 h-5 flex items-center justify-center">
              {React.createElement(item.icon)}
            </span>
          )}
          <span>{item.title}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default DashboardNav;
