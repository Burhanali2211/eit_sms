
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  AlertTriangle, 
  Check, 
  Server, 
  Shield, 
  Upload, 
  Database, 
  Globe, 
  Mail, 
  Bell, 
  Users, 
  BookOpen,
  FileText,
  Calendar,
  Settings,
  BarChart,
  HardDrive,
  RefreshCw,
  Lock,
  Clock,
  Trash2,
  Download
} from "lucide-react";

const SystemSettings = () => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [backupsEnabled, setBackupsEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [analyticsModeEnabled, setAnalyticsModeEnabled] = useState(true);
  const [apiAccessEnabled, setApiAccessEnabled] = useState(true);
  const [fileStorageType, setFileStorageType] = useState("local");
  const [systemVersion, setSystemVersion] = useState("2.5.7");
  const [dbCapacityUsed, setDbCapacityUsed] = useState(42);
  const [storageUsed, setStorageUsed] = useState(68);
  const [cpuUsage, setCpuUsage] = useState(37);
  const [memoryUsage, setMemoryUsage] = useState(53);
  
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

  const updateSystemVersion = () => {
    toast({
      title: "Update Started",
      description: "System update has been initiated. This may take a few minutes.",
    });
    
    // Simulate update process
    setTimeout(() => {
      setSystemVersion("2.6.0");
      toast({
        title: "Update Complete",
        description: "System has been updated to version 2.6.0.",
      });
    }, 3000);
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="System Settings" description="Configure and manage system-wide settings" />
      <div className="flex-1 overflow-auto bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="md:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>System Version</span>
                    <span className="font-mono">{systemVersion}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Status</span>
                    <Badge className="bg-green-500">{maintenanceMode ? "Maintenance" : "Online"}</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Uptime</span>
                    <span>99.8%</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Database</span>
                      <span>{dbCapacityUsed}%</span>
                    </div>
                    <Progress value={dbCapacityUsed} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Storage</span>
                      <span>{storageUsed}%</span>
                    </div>
                    <Progress value={storageUsed} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU</span>
                      <span>{cpuUsage}%</span>
                    </div>
                    <Progress value={cpuUsage} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory</span>
                      <span>{memoryUsage}%</span>
                    </div>
                    <Progress value={memoryUsage} className="h-2" />
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={updateSystemVersion}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Check for Updates
                </Button>
              </CardContent>
            </Card>

            <div className="md:col-span-3">
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="w-full grid grid-cols-5 mb-6">
                  <TabsTrigger value="general" className="flex items-center gap-2">
                    <Server className="h-4 w-4" />
                    <span className="hidden sm:inline">General</span>
                  </TabsTrigger>
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span className="hidden sm:inline">Email</span>
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span className="hidden sm:inline">Security</span>
                  </TabsTrigger>
                  <TabsTrigger value="maintenance" className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    <span className="hidden sm:inline">Maintenance</span>
                  </TabsTrigger>
                  <TabsTrigger value="integrations" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Integrations</span>
                  </TabsTrigger>
                </TabsList>

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

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="analytics" className="font-medium">
                              Analytics Tracking
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Track usage statistics and analytics for the platform.
                            </p>
                          </div>
                          <Switch
                            id="analytics"
                            checked={analyticsModeEnabled}
                            onCheckedChange={(checked) => {
                              setAnalyticsModeEnabled(checked);
                              setFormChanged(true);
                            }}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="api-access" className="font-medium">
                              API Access
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Allow external applications to access the system API.
                            </p>
                          </div>
                          <Switch
                            id="api-access"
                            checked={apiAccessEnabled}
                            onCheckedChange={(checked) => {
                              setApiAccessEnabled(checked);
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

                          <div className="grid gap-2">
                            <Label htmlFor="favicon">Favicon</Label>
                            <div className="flex items-center space-x-4">
                              <div className="h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center text-muted-foreground">
                                Favicon
                              </div>
                              <Button variant="outline" size="sm">
                                <Upload className="h-4 w-4 mr-2" />
                                Upload
                              </Button>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">File Storage</h3>
                          
                          <div className="space-y-2">
                            <Label>Storage Type</Label>
                            <RadioGroup 
                              value={fileStorageType} 
                              onValueChange={setFileStorageType}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-3 space-y-0">
                                <RadioGroupItem value="local" id="storage-local" />
                                <Label htmlFor="storage-local" className="font-normal">
                                  Local Storage
                                </Label>
                              </div>
                              <div className="flex items-center space-x-3 space-y-0">
                                <RadioGroupItem value="s3" id="storage-s3" />
                                <Label htmlFor="storage-s3" className="font-normal">
                                  Amazon S3
                                </Label>
                              </div>
                              <div className="flex items-center space-x-3 space-y-0">
                                <RadioGroupItem value="gcs" id="storage-gcs" />
                                <Label htmlFor="storage-gcs" className="font-normal">
                                  Google Cloud Storage
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                          
                          {fileStorageType !== "local" && (
                            <div className="grid gap-4 mt-2">
                              <div className="grid gap-2">
                                <Label>API Key</Label>
                                <Input type="password" placeholder="Enter API key" />
                              </div>
                              <div className="grid gap-2">
                                <Label>Bucket Name</Label>
                                <Input placeholder="Enter bucket name" />
                              </div>
                              <div className="grid gap-2">
                                <Label>Region</Label>
                                <Input placeholder="Enter region" />
                              </div>
                            </div>
                          )}
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

                  <Card>
                    <CardHeader>
                      <CardTitle>Regional Settings</CardTitle>
                      <CardDescription>
                        Configure timezone, date formats, and other regional settings.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Default Timezone</Label>
                          <Select defaultValue="America/New_York">
                            <SelectTrigger id="timezone">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <ScrollArea className="h-80">
                                <SelectItem value="America/New_York">New York (UTC-05:00)</SelectItem>
                                <SelectItem value="America/Chicago">Chicago (UTC-06:00)</SelectItem>
                                <SelectItem value="America/Denver">Denver (UTC-07:00)</SelectItem>
                                <SelectItem value="America/Los_Angeles">Los Angeles (UTC-08:00)</SelectItem>
                                <SelectItem value="Europe/London">London (UTC+00:00)</SelectItem>
                                <SelectItem value="Europe/Paris">Paris (UTC+01:00)</SelectItem>
                                <SelectItem value="Asia/Tokyo">Tokyo (UTC+09:00)</SelectItem>
                                <SelectItem value="Australia/Sydney">Sydney (UTC+11:00)</SelectItem>
                              </ScrollArea>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="date-format">Date Format</Label>
                          <Select defaultValue="MM/DD/YYYY">
                            <SelectTrigger id="date-format">
                              <SelectValue placeholder="Select date format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                              <SelectItem value="DD-MMM-YYYY">DD-MMM-YYYY</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="time-format">Time Format</Label>
                          <Select defaultValue="12h">
                            <SelectTrigger id="time-format">
                              <SelectValue placeholder="Select time format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12h">12 hour (AM/PM)</SelectItem>
                              <SelectItem value="24h">24 hour</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="currency">Currency</Label>
                          <Select defaultValue="USD">
                            <SelectTrigger id="currency">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD - US Dollar</SelectItem>
                              <SelectItem value="EUR">EUR - Euro</SelectItem>
                              <SelectItem value="GBP">GBP - British Pound</SelectItem>
                              <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                              <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                              <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button>
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

                        <Separator />

                        <div className="space-y-2">
                          <Label>Email Encryption</Label>
                          <RadioGroup defaultValue="tls" className="flex flex-col space-y-1">
                            <div className="flex items-center space-x-3 space-y-0">
                              <RadioGroupItem value="tls" id="tls" />
                              <Label htmlFor="tls" className="font-normal">
                                TLS (Recommended)
                              </Label>
                            </div>
                            <div className="flex items-center space-x-3 space-y-0">
                              <RadioGroupItem value="ssl" id="ssl" />
                              <Label htmlFor="ssl" className="font-normal">
                                SSL
                              </Label>
                            </div>
                            <div className="flex items-center space-x-3 space-y-0">
                              <RadioGroupItem value="none" id="none" />
                              <Label htmlFor="none" className="font-normal">
                                None
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-base font-medium">Email Templates</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <Button variant="outline" className="justify-start">
                              <FileText className="mr-2 h-4 w-4" />
                              Welcome Email
                            </Button>
                            <Button variant="outline" className="justify-start">
                              <FileText className="mr-2 h-4 w-4" />
                              Password Reset
                            </Button>
                            <Button variant="outline" className="justify-start">
                              <FileText className="mr-2 h-4 w-4" />
                              Account Verification
                            </Button>
                            <Button variant="outline" className="justify-start">
                              <FileText className="mr-2 h-4 w-4" />
                              Notification Digest
                            </Button>
                          </div>
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

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="password-history" className="font-medium">
                                Password History
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Prevent reuse of previous passwords
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Input
                                id="password-history"
                                type="number"
                                defaultValue={3}
                                min={0}
                                max={10}
                                className="w-16"
                              />
                              <span className="text-sm text-muted-foreground">passwords</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="password-expiry" className="font-medium">
                                Password Expiration
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Force password change after period
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Input
                                id="password-expiry"
                                type="number"
                                defaultValue={90}
                                min={0}
                                max={365}
                                className="w-16"
                              />
                              <span className="text-sm text-muted-foreground">days</span>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
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

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="concurrent-sessions" className="font-medium">
                                Limit Concurrent Sessions
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Limit users to a single active session
                              </p>
                            </div>
                            <Switch
                              id="concurrent-sessions"
                              defaultChecked={false}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="ip-restriction" className="font-medium">
                                IP Address Restriction
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Restrict login based on IP address
                              </p>
                            </div>
                            <Switch
                              id="ip-restriction"
                              defaultChecked={false}
                            />
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Advanced Security</h3>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="force-ssl" className="font-medium">
                                Force HTTPS/SSL
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Require secure connections for all users
                              </p>
                            </div>
                            <Switch
                              id="force-ssl"
                              defaultChecked={true}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="account-lockout" className="font-medium">
                                Account Lockout
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Lock account after failed login attempts
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Input
                                id="account-lockout"
                                type="number"
                                defaultValue={5}
                                min={1}
                                max={10}
                                className="w-16"
                              />
                              <span className="text-sm text-muted-foreground">attempts</span>
                            </div>
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

                          <div className="space-y-2 mb-4">
                            <Label htmlFor="backup-location">Backup Location</Label>
                            <Select defaultValue="local">
                              <SelectTrigger id="backup-location">
                                <SelectValue placeholder="Select backup location" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="local">Local Storage</SelectItem>
                                <SelectItem value="cloud">Cloud Storage</SelectItem>
                                <SelectItem value="ftp">FTP Server</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
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

                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Recent Backups</h4>
                            <div className="border rounded-md overflow-hidden">
                              <div className="grid grid-cols-5 bg-muted p-2 text-xs font-medium">
                                <div>Date</div>
                                <div>Time</div>
                                <div>Size</div>
                                <div>Type</div>
                                <div className="text-right">Actions</div>
                              </div>
                              <div className="divide-y">
                                <div className="grid grid-cols-5 p-2 text-sm items-center">
                                  <div>2025-05-17</div>
                                  <div>02:00 AM</div>
                                  <div>458 MB</div>
                                  <div>Automatic</div>
                                  <div className="text-right space-x-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="grid grid-cols-5 p-2 text-sm items-center">
                                  <div>2025-05-16</div>
                                  <div>02:00 AM</div>
                                  <div>455 MB</div>
                                  <div>Automatic</div>
                                  <div className="text-right space-x-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="grid grid-cols-5 p-2 text-sm items-center">
                                  <div>2025-05-15</div>
                                  <div>10:30 AM</div>
                                  <div>460 MB</div>
                                  <div>Manual</div>
                                  <div className="text-right space-x-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-base font-medium mb-2">System Logs</h3>
                          <div className="flex items-end justify-between mb-4">
                            <div className="grid gap-2 flex-1 max-w-xs">
                              <Label htmlFor="log-level">Log Level</Label>
                              <Select defaultValue="info">
                                <SelectTrigger id="log-level">
                                  <SelectValue placeholder="Select log level" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="error">Error</SelectItem>
                                  <SelectItem value="warn">Warning</SelectItem>
                                  <SelectItem value="info">Info</SelectItem>
                                  <SelectItem value="debug">Debug</SelectItem>
                                </SelectContent>
                              </Select>
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

                          <div className="space-y-2">
                            <Label htmlFor="log-retention">Log Retention Period (days)</Label>
                            <Input
                              id="log-retention"
                              type="number"
                              defaultValue={30}
                              min={1}
                              className="max-w-xs"
                            />
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-base font-medium">Database Maintenance</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <Button variant="outline" className="justify-start">
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Optimize Database
                            </Button>
                            <Button variant="outline" className="justify-start">
                              <HardDrive className="mr-2 h-4 w-4" />
                              Purge Temporary Files
                            </Button>
                            <Button variant="outline" className="justify-start">
                              <Clock className="mr-2 h-4 w-4" />
                              Clear Session Data
                            </Button>
                            <Button variant="outline" className="justify-start">
                              <BarChart className="mr-2 h-4 w-4" />
                              Reset Analytics Data
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="scheduled-maintenance">Scheduled Maintenance Window</Label>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="maintenance-day" className="text-sm">Day</Label>
                              <Select defaultValue="sunday">
                                <SelectTrigger id="maintenance-day">
                                  <SelectValue placeholder="Select day" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="sunday">Sunday</SelectItem>
                                  <SelectItem value="monday">Monday</SelectItem>
                                  <SelectItem value="tuesday">Tuesday</SelectItem>
                                  <SelectItem value="wednesday">Wednesday</SelectItem>
                                  <SelectItem value="thursday">Thursday</SelectItem>
                                  <SelectItem value="friday">Friday</SelectItem>
                                  <SelectItem value="saturday">Saturday</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="maintenance-time" className="text-sm">Time</Label>
                              <Input
                                id="maintenance-time"
                                type="time"
                                defaultValue="03:00"
                              />
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Scheduled maintenance tasks will run during this time window.
                          </p>
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

                <TabsContent value="integrations" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Third-Party Integrations</CardTitle>
                      <CardDescription>
                        Configure connections to external services and platforms.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between border p-4 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
                              <Globe className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-medium">Google Workspace</h3>
                              <p className="text-sm text-muted-foreground">
                                Connect with Google Calendar, Drive, and Classroom
                              </p>
                            </div>
                          </div>
                          <div>
                            <Button variant="outline">Configure</Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border p-4 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
                              <Users className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-medium">Microsoft Teams</h3>
                              <p className="text-sm text-muted-foreground">
                                Integrate with Microsoft Teams for collaboration
                              </p>
                            </div>
                          </div>
                          <div>
                            <Button variant="outline">Configure</Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border p-4 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
                              <Bell className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-medium">SMS Gateway</h3>
                              <p className="text-sm text-muted-foreground">
                                Configure SMS notifications via Twilio or similar providers
                              </p>
                            </div>
                          </div>
                          <div>
                            <Button variant="outline">Configure</Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border p-4 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
                              <BookOpen className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-medium">LMS Integration</h3>
                              <p className="text-sm text-muted-foreground">
                                Connect with Canvas, Moodle, or Blackboard
                              </p>
                            </div>
                          </div>
                          <div>
                            <Button variant="outline">Configure</Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border p-4 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
                              <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-medium">Payment Gateway</h3>
                              <p className="text-sm text-muted-foreground">
                                Configure payment processing for fees and other transactions
                              </p>
                            </div>
                          </div>
                          <div>
                            <Button variant="outline">Configure</Button>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-base font-medium">API Configuration</h3>
                          <div className="grid gap-2">
                            <Label htmlFor="api-url">API Base URL</Label>
                            <Input
                              id="api-url"
                              defaultValue="https://api.edusync.academy/v1"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="allow-cors" className="font-medium">
                                Allow CORS
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Enable Cross-Origin Resource Sharing
                              </p>
                            </div>
                            <Switch
                              id="allow-cors"
                              defaultChecked={true}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="webhook-url">Webhook URL</Label>
                            <Input
                              id="webhook-url"
                              placeholder="Enter webhook URL for third-party notifications"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button>
                          <Check className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SystemSettings;
