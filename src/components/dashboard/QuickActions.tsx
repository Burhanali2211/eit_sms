
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Users, 
  Calendar, 
  Bell, 
  Settings, 
  Plus,
  FileText,
  MessageSquare,
  Clock
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const QuickActions = () => {
  const { user } = useAuth();

  const getQuickActions = () => {
    switch (user?.role) {
      case 'student':
        return [
          { icon: Calendar, label: 'View Schedule', action: () => navigateTo('/dashboard/calendar') },
          { icon: FileText, label: 'Submit Assignment', action: () => toast({ title: 'Assignment submission opened' }) },
          { icon: MessageSquare, label: 'Message Teacher', action: () => toast({ title: 'Messaging system opened' }) },
          { icon: Bell, label: 'Check Notifications', action: () => navigateTo('/dashboard/notifications') }
        ];
      case 'teacher':
        return [
          { icon: Users, label: 'Take Attendance', action: () => toast({ title: 'Attendance module opened' }) },
          { icon: Plus, label: 'Create Assignment', action: () => toast({ title: 'Assignment creation opened' }) },
          { icon: FileText, label: 'Grade Papers', action: () => navigateTo('/dashboard/teacher/grades') },
          { icon: MessageSquare, label: 'Message Students', action: () => toast({ title: 'Student messaging opened' }) }
        ];
      case 'principal':
      case 'admin':
        return [
          { icon: Users, label: 'Manage Staff', action: () => navigateTo('/dashboard/staff') },
          { icon: Settings, label: 'System Settings', action: () => navigateTo('/dashboard/settings') },
          { icon: FileText, label: 'Generate Reports', action: () => toast({ title: 'Report generation opened' }) },
          { icon: Bell, label: 'Send Announcements', action: () => toast({ title: 'Announcement system opened' }) }
        ];
      default:
        return [
          { icon: Calendar, label: 'View Calendar', action: () => navigateTo('/dashboard/calendar') },
          { icon: Settings, label: 'Settings', action: () => navigateTo('/dashboard/settings') },
          { icon: Bell, label: 'Notifications', action: () => navigateTo('/dashboard/notifications') },
          { icon: FileText, label: 'View Reports', action: () => toast({ title: 'Reports opened' }) }
        ];
    }
  };

  const navigateTo = (path: string) => {
    window.location.href = path;
  };

  const actions = getQuickActions();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-primary/5"
              onClick={action.action}
            >
              <action.icon className="h-5 w-5" />
              <span className="text-sm text-center">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
