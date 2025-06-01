
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Settings, Database, Shield, Bell, Mail, Globe } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SystemSettings = () => {
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "System settings have been updated successfully.",
    });
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="System Settings" description="Configure system-wide settings and preferences" />
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              System Configuration
            </CardTitle>
            <CardDescription>Manage system-wide settings and configurations</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="general" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="database">Database</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="school-name">School Name</Label>
                    <Input id="school-name" placeholder="EduSync Academy" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="school-address">School Address</Label>
                    <Input id="school-address" placeholder="123 Education St, Learning City" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+1 (555) 123-4567" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Contact Email</Label>
                      <Input id="email" placeholder="contact@edusync.com" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable maintenance mode to prevent user access
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto Backup</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically backup data daily
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Require 2FA for admin accounts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Session Timeout</Label>
                      <p className="text-sm text-muted-foreground">
                        Auto logout after inactivity
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="session-duration">Session Duration (minutes)</Label>
                    <Input id="session-duration" type="number" placeholder="30" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="password-policy">Minimum Password Length</Label>
                    <Input id="password-policy" type="number" placeholder="8" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Password Complexity</Label>
                      <p className="text-sm text-muted-foreground">
                        Require special characters and numbers
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send notifications via email
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send urgent notifications via SMS
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send browser push notifications
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Attendance Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Alert parents about attendance issues
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="email" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="smtp-server">SMTP Server</Label>
                    <Input id="smtp-server" placeholder="smtp.gmail.com" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="smtp-port">SMTP Port</Label>
                      <Input id="smtp-port" placeholder="587" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="smtp-username">Username</Label>
                      <Input id="smtp-username" placeholder="admin@edusync.com" />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="smtp-password">Password</Label>
                    <Input id="smtp-password" type="password" placeholder="••••••••" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Use TLS/SSL</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable secure email transmission
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Button variant="outline">Test Email Configuration</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="database" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="db-host">Database Host</Label>
                    <Input id="db-host" placeholder="localhost" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="db-port">Port</Label>
                      <Input id="db-port" placeholder="5432" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="db-name">Database Name</Label>
                      <Input id="db-name" placeholder="edusync" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="db-username">Username</Label>
                      <Input id="db-username" placeholder="postgres" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="db-password">Password</Label>
                      <Input id="db-password" type="password" placeholder="••••••••" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Connection Pooling</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable database connection pooling
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Button variant="outline">Test Database Connection</Button>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end pt-6">
              <Button onClick={handleSaveSettings}>
                Save All Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SystemSettings;
