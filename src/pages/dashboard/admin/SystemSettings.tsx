
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { AlertTriangle, Check, Server, Shield, Upload, Database, Globe, Mail, Bell } from "lucide-react";

const SystemSettings = () => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [backupsEnabled, setBackupsEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  
  const [smtpSettings, setSmtpSettings] = useState({
    host: "smtp.edusync.com",
    port: "587",
    username: "notifications@edusync.com",
    password: "••••••••••••",
    fromEmail: "no-reply@edusync.com",
  });

  const [formChanged, setFormChanged] = useState(false);

  const handleSaveGeneral = () => {
    toast({
      title: "Settings Saved",
      description: "General settings have been updated successfully.",
    });
    setFormChanged(false);
  };

  const handleSaveEmail = () => {
    toast({
      title: "Email Settings Saved",
      description: "SMTP settings have been updated successfully.",
    });
    setFormChanged(false);
  };

  const handleMaintenanceMode = () => {
    setMaintenanceMode(!maintenanceMode);
    toast({
      title: maintenanceMode ? "Maintenance Mode Disabled" : "Maintenance Mode Enabled",
      description: maintenanceMode 
        ? "The system is now accessible to all users." 
        : "The system is now in maintenance mode. Only admins can access.",
      variant: maintenanceMode ? "default" : "destructive",
    });
  };

  const handleBackupNow = () => {
    toast({
      title: "Backup Started",
      description: "System backup has been initiated. You will be notified when complete.",
    });
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="System Settings" />
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <Tabs defaultValue="general">
          <div className="mb-6">
            <TabsList className="w-full grid grid-cols-4 max-w-2xl">
              <TabsTrigger value="general">
                <Server className="h-4 w-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger value="email">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </TabsTrigger>
              <TabsTrigger value="security">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="maintenance">
                <Database className="h-4 w-4 mr-2" />
                Maintenance
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="general" className="space-y-6">
            {maintenanceMode && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6 flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-800">Maintenance Mode Active</h3>
                  <p className="text-yellow-700 text-sm">The system is currently in maintenance mode. Only administrators can access the system.</p>
                </div>
              </div>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic system settings and functionality.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications" className="font-medium">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Enable or disable all system email notifications.
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={emailEnabled}
                      onCheckedChange={(checked) => {
                        setEmailEnabled(checked);
                        setFormChanged(true);
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications" className="font-medium">
                        Push Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Enable or disable in-app notifications for all users.
                      </p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notificationsEnabled}
                      onCheckedChange={(checked) => {
                        setNotificationsEnabled(checked);
                        setFormChanged(true);
                      }}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">System Branding</h3>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="system-name">System Name</Label>
                      <Input
                        id="system-name"
                        defaultValue="EduSync Academy"
                        onChange={() => setFormChanged(true)}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="system-url">System URL</Label>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input
                          id="system-url"
                          defaultValue="https://edusync.academy"
                          onChange={() => setFormChanged(true)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="logo">Logo</Label>
                      <div className="flex items-center space-x-4">
                        <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center text-muted-foreground">
                          Logo
                        </div>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveGeneral}
                    disabled={!formChanged}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>
                  Configure email delivery settings for system notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="smtp-host">SMTP Host</Label>
                      <Input
                        id="smtp-host"
                        value={smtpSettings.host}
                        onChange={(e) => {
                          setSmtpSettings({...smtpSettings, host: e.target.value});
                          setFormChanged(true);
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="smtp-port">SMTP Port</Label>
                      <Input
                        id="smtp-port"
                        value={smtpSettings.port}
                        onChange={(e) => {
                          setSmtpSettings({...smtpSettings, port: e.target.value});
                          setFormChanged(true);
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="smtp-username">SMTP Username</Label>
                      <Input
                        id="smtp-username"
                        value={smtpSettings.username}
                        onChange={(e) => {
                          setSmtpSettings({...smtpSettings, username: e.target.value});
                          setFormChanged(true);
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="smtp-password">SMTP Password</Label>
                      <Input
                        id="smtp-password"
                        type="password"
                        value={smtpSettings.password}
                        onChange={(e) => {
                          setSmtpSettings({...smtpSettings, password: e.target.value});
                          setFormChanged(true);
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="from-email">From Email Address</Label>
                    <Input
                      id="from-email"
                      value={smtpSettings.fromEmail}
                      onChange={(e) => {
                        setSmtpSettings({...smtpSettings, fromEmail: e.target.value});
                        setFormChanged(true);
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <Label htmlFor="test-email" className="font-medium">
                        Test Email Configuration
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Send a test email to verify your settings
                      </p>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: "Test Email Sent",
                          description: "A test email has been sent to the system administrator.",
                        });
                      }}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send Test
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveEmail}
                    disabled={!formChanged}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security settings for the system.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="two-factor" className="font-medium">
                        Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Require two-factor authentication for all admin users.
                      </p>
                    </div>
                    <Switch
                      id="two-factor"
                      checked={twoFactorEnabled}
                      onCheckedChange={(checked) => {
                        setTwoFactorEnabled(checked);
                        toast({
                          title: checked ? "2FA Enabled" : "2FA Disabled",
                          description: checked 
                            ? "Two-factor authentication is now required for admin users." 
                            : "Two-factor authentication requirement has been removed.",
                          variant: checked ? "default" : "destructive",
                        });
                      }}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Password Policy</h3>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="min-length">Minimum Password Length</Label>
                      <Input
                        id="min-length"
                        type="number"
                        defaultValue={8}
                        min={6}
                        max={32}
                        onChange={() => setFormChanged(true)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="require-upper" className="font-medium">
                          Require Uppercase Letters
                        </Label>
                      </div>
                      <Switch
                        id="require-upper"
                        defaultChecked={true}
                        onCheckedChange={() => setFormChanged(true)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="require-number" className="font-medium">
                          Require Numbers
                        </Label>
                      </div>
                      <Switch
                        id="require-number"
                        defaultChecked={true}
                        onCheckedChange={() => setFormChanged(true)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="require-special" className="font-medium">
                          Require Special Characters
                        </Label>
                      </div>
                      <Switch
                        id="require-special"
                        defaultChecked={false}
                        onCheckedChange={() => setFormChanged(true)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Session Settings</h3>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <Input
                        id="session-timeout"
                        type="number"
                        defaultValue={30}
                        min={5}
                        onChange={() => setFormChanged(true)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      toast({
                        title: "Security Settings Updated",
                        description: "Your security settings have been saved.",
                      });
                      setFormChanged(false);
                    }}
                    disabled={!formChanged}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance</CardTitle>
                <CardDescription>
                  System maintenance and backup settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4 flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-amber-800">Warning</h3>
                    <p className="text-amber-700 text-sm">Some actions on this page may affect system availability. Proceed with caution.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">Maintenance Mode</h3>
                      <p className="text-sm text-muted-foreground">
                        When enabled, only administrators can access the system. All other users will see a maintenance message.
                      </p>
                    </div>
                    <Button 
                      variant={maintenanceMode ? "destructive" : "outline"}
                      onClick={handleMaintenanceMode}
                    >
                      {maintenanceMode ? "Disable" : "Enable"} Maintenance Mode
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-base font-medium mb-2">System Backup</h3>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <Label htmlFor="auto-backup" className="font-medium">
                          Automatic Backups
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Create daily backups of the system database.
                        </p>
                      </div>
                      <Switch
                        id="auto-backup"
                        checked={backupsEnabled}
                        onCheckedChange={setBackupsEnabled}
                      />
                    </div>
                    
                    {backupsEnabled && (
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="grid gap-2">
                          <Label htmlFor="backup-time">Backup Time</Label>
                          <Input
                            id="backup-time"
                            type="time"
                            defaultValue="02:00"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="retention-days">Retention Period (days)</Label>
                          <Input
                            id="retention-days"
                            type="number"
                            defaultValue={30}
                            min={1}
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Manual Backup</h4>
                        <p className="text-sm text-muted-foreground">
                          Create a backup of the system right now.
                        </p>
                      </div>
                      <Button variant="outline" onClick={handleBackupNow}>
                        Backup Now
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-base font-medium mb-2">System Logs</h3>
                    <div className="flex items-end justify-between mb-4">
                      <div className="grid gap-2 flex-1 max-w-xs">
                        <Label htmlFor="log-level">Log Level</Label>
                        <select
                          id="log-level"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          defaultValue="info"
                        >
                          <option value="error">Error</option>
                          <option value="warn">Warning</option>
                          <option value="info">Info</option>
                          <option value="debug">Debug</option>
                        </select>
                      </div>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "Logs Downloaded",
                            description: "System logs have been downloaded.",
                          });
                        }}
                      >
                        Download Logs
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      toast({
                        title: "Maintenance Settings Saved",
                        description: "Your maintenance settings have been updated.",
                      });
                    }}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SystemSettings;
