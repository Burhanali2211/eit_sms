
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardNotificationsProps {
  notifications: any[];
}

const DashboardNotifications = ({ notifications }: DashboardNotificationsProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Recent Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications && notifications.length > 0 ? notifications.slice(0, 3).map((notification: any) => (
            <div key={notification.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{notification.title}</p>
                <p className="text-sm text-muted-foreground">{notification.time}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          )) : (
            <div className="text-center py-4 text-muted-foreground">
              No recent notifications
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardNotifications;
