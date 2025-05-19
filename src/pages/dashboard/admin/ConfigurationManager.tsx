
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Settings, 
  Layout, 
  Bell, 
  Shield, 
  Database, 
  Mail, 
  CalendarIcon,
  Save,
  Upload,
  Download,
  Info,
  Clock,
  Lock,
  Users
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const ConfigurationSection = ({ 
  title, 
  description, 
  children,
  icon: Icon
}: { 
  title: string; 
  description: string; 
  children: React.ReactNode;
  icon: React.ElementType;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Card className="mb-6 border shadow-sm">
      <CollapsibleTrigger 
        asChild 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full cursor-pointer hover:bg-muted/40 transition-colors"
      >
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription className="text-sm">{description}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={isOpen ? "active" : "inactive"} />
          </div>
        </CardHeader>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CardContent className="pt-0 pb-4 px-6">
          {children}
        </CardContent>
      </CollapsibleContent>
    </Card>
  );
};

const ConfigSetting = ({ 
  title, 
  description, 
  children 
}: { 
  title: string; 
  description: string; 
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
};

const ConfigurationManager = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = (section: string) => {
    setIsLoading(true);
    
    // Simulate saving configuration
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Configuration Saved",
        description: `${section} settings have been updated successfully.`,
      });
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="container py-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Configuration Manager</h1>
            <p className="text-muted-foreground">Manage and configure system-wide settings.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleSave("All")}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="default" size="sm" onClick={() => handleSave("All")}>
              <Save className="h-4 w-4 mr-2" />
              Save All
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <div className="flex overflow-auto pb-2">
            <TabsList className="h-9">
              <TabsTrigger value="general" className="text-xs sm:text-sm px-3">
                <Settings className="h-4 w-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger value="appearance" className="text-xs sm:text-sm px-3">
                <Layout className="h-4 w-4 mr-2" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs sm:text-sm px-3">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="text-xs sm:text-sm px-3">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="integrations" className="text-xs sm:text-sm px-3">
                <Database className="h-4 w-4 mr-2" />
                Integrations
              </TabsTrigger>
              <TabsTrigger value="advanced" className="text-xs sm:text-sm px-3">
                <Settings className="h-4 w-4 mr-2" />
                Advanced
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[calc(100vh-230px)]">
            <TabsContent value="general" className="space-y-4 pr-4">
              <ConfigurationSection 
                title="System Information" 
                description="Basic system configuration settings" 
                icon={Info}
              >
                <div className="space-y-4">
                  <ConfigSetting 
                    title="School Name" 
                    description="The name of your educational institution"
                  >
                    <Input defaultValue="Lovable Academy" className="w-[250px]" />
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="Academic Year" 
                    description="Current academic year setting"
                  >
                    <Input defaultValue="2023-2024" className="w-[250px]" />
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="System Email" 
                    description="Email used for system notifications"
                  >
                    <Input defaultValue="admin@lovableacademy.edu" className="w-[250px]" />
                  </ConfigSetting>
                  <Separator />
                  <div className="flex justify-end mt-4">
                    <Button 
                      onClick={() => handleSave("System Information")} 
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </ConfigurationSection>

              <ConfigurationSection 
                title="Regional Settings" 
                description="Configure timezone, date format, and language" 
                icon={Clock}
              >
                <div className="space-y-4">
                  <ConfigSetting 
                    title="Timezone" 
                    description="System default timezone"
                  >
                    <Input defaultValue="UTC-5 (Eastern Time)" className="w-[250px]" />
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="Date Format" 
                    description="Default date display format"
                  >
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="mm-dd-yyyy" name="dateFormat" defaultChecked />
                        <Label htmlFor="mm-dd-yyyy">MM/DD/YYYY</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="dd-mm-yyyy" name="dateFormat" />
                        <Label htmlFor="dd-mm-yyyy">DD/MM/YYYY</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="yyyy-mm-dd" name="dateFormat" />
                        <Label htmlFor="yyyy-mm-dd">YYYY-MM-DD</Label>
                      </div>
                    </div>
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="Language" 
                    description="System default language"
                  >
                    <Input defaultValue="English (US)" className="w-[250px]" />
                  </ConfigSetting>
                  <Separator />
                  <div className="flex justify-end mt-4">
                    <Button 
                      onClick={() => handleSave("Regional Settings")} 
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </ConfigurationSection>

              <ConfigurationSection 
                title="Feature Toggles" 
                description="Enable or disable system features" 
                icon={Settings}
              >
                <div className="space-y-4">
                  <ConfigSetting 
                    title="Student Portal" 
                    description="Enable student access to the online portal"
                  >
                    <Switch defaultChecked />
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="Parent Portal" 
                    description="Enable parent access to monitor student progress"
                  >
                    <Switch defaultChecked />
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="Online Assignments" 
                    description="Allow teachers to create and grade online assignments"
                  >
                    <Switch defaultChecked />
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="Attendance Tracking" 
                    description="Enable automated attendance tracking system"
                  >
                    <Switch defaultChecked />
                  </ConfigSetting>
                  <Separator />
                  <div className="flex justify-end mt-4">
                    <Button 
                      onClick={() => handleSave("Feature Toggles")} 
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </ConfigurationSection>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-4 pr-4">
              <ConfigurationSection 
                title="Theme Settings" 
                description="Configure visual appearance of the application" 
                icon={Layout}
              >
                <div className="space-y-4">
                  <ConfigSetting 
                    title="Dark Mode Default" 
                    description="Set dark mode as the default theme"
                  >
                    <Switch />
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="Primary Color" 
                    description="Main color used throughout the application"
                  >
                    <div className="flex flex-wrap gap-2">
                      {["#1E40AF", "#047857", "#7E22CE", "#B91C1C", "#0369A1", "#000000"].map(color => (
                        <div 
                          key={color} 
                          className="w-8 h-8 rounded-full cursor-pointer border hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="School Logo" 
                    description="Upload your school logo (Recommended: 200x200px)"
                  >
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">Upload Logo</Button>
                      <Button variant="ghost" size="sm">Remove</Button>
                    </div>
                  </ConfigSetting>
                  <Separator />
                  <div className="flex justify-end mt-4">
                    <Button 
                      onClick={() => handleSave("Appearance Settings")} 
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </ConfigurationSection>

              <ConfigurationSection 
                title="Dashboard Layout" 
                description="Configure the default dashboard layout for users" 
                icon={Layout}
              >
                <div className="space-y-4">
                  <ConfigSetting 
                    title="Compact View" 
                    description="Use a more compact layout for dashboard elements"
                  >
                    <Switch />
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="Show Quick Actions" 
                    description="Display quick action buttons on the dashboard"
                  >
                    <Switch defaultChecked />
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="Widget Arrangement" 
                    description="Choose default widget arrangement order"
                  >
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-muted/50 rounded border">
                        <span className="text-muted-foreground">1</span>
                        <span>Calendar</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-muted/50 rounded border">
                        <span className="text-muted-foreground">2</span>
                        <span>Notifications</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-muted/50 rounded border">
                        <span className="text-muted-foreground">3</span>
                        <span>Recent Activities</span>
                      </div>
                    </div>
                  </ConfigSetting>
                  <Separator />
                  <div className="flex justify-end mt-4">
                    <Button 
                      onClick={() => handleSave("Dashboard Layout")} 
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </ConfigurationSection>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4 pr-4">
              <ConfigurationSection 
                title="Email Notifications" 
                description="Configure system email notification settings" 
                icon={Mail}
              >
                <div className="space-y-4">
                  <ConfigSetting 
                    title="SMTP Server" 
                    description="Email server settings for sending notifications"
                  >
                    <Input defaultValue="smtp.example.com" className="w-[250px]" />
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="SMTP Port" 
                    description="Port number for the SMTP server"
                  >
                    <Input defaultValue="587" className="w-[250px]" />
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="Enable TLS" 
                    description="Use Transport Layer Security for email"
                  >
                    <Switch defaultChecked />
                  </ConfigSetting>
                  <Separator />
                  <div className="flex justify-end mt-4">
                    <Button 
                      onClick={() => handleSave("Email Settings")} 
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </ConfigurationSection>

              <ConfigurationSection 
                title="System Alerts" 
                description="Configure who receives important system notifications" 
                icon={Bell}
              >
                <div className="space-y-4">
                  {["System Errors", "Security Alerts", "Performance Warnings", "Database Issues"].map((item) => (
                    <React.Fragment key={item}>
                      <ConfigSetting 
                        title={item} 
                        description={`Send ${item.toLowerCase()} to administrators`}
                      >
                        <Switch defaultChecked />
                      </ConfigSetting>
                      <Separator />
                    </React.Fragment>
                  ))}
                  <ConfigSetting 
                    title="Additional Recipients" 
                    description="Email addresses that will receive system alerts"
                  >
                    <Input defaultValue="tech@lovableacademy.edu" className="w-[250px]" />
                  </ConfigSetting>
                  <Separator />
                  <div className="flex justify-end mt-4">
                    <Button 
                      onClick={() => handleSave("System Alerts")} 
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </ConfigurationSection>
            </TabsContent>

            <TabsContent value="security" className="space-y-4 pr-4">
              <ConfigurationSection 
                title="Authentication" 
                description="Configure user authentication settings" 
                icon={Lock}
              >
                <div className="space-y-4">
                  <ConfigSetting 
                    title="Password Policy" 
                    description="Minimum requirements for user passwords"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Label>Minimum Length:</Label>
                        <Input type="number" defaultValue="8" className="w-20" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="requireUpper" defaultChecked />
                        <Label htmlFor="requireUpper">Require uppercase</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="requireNumber" defaultChecked />
                        <Label htmlFor="requireNumber">Require numbers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="requireSpecial" defaultChecked />
                        <Label htmlFor="requireSpecial">Require special characters</Label>
                      </div>
                    </div>
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="Two-Factor Authentication" 
                    description="Require 2FA for certain user roles"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="2faAdmin" defaultChecked />
                        <Label htmlFor="2faAdmin">Administrators</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="2faTeacher" />
                        <Label htmlFor="2faTeacher">Teachers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="2faStudent" />
                        <Label htmlFor="2faStudent">Students</Label>
                      </div>
                    </div>
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="Session Timeout" 
                    description="Automatically log out inactive users"
                  >
                    <div className="flex items-center gap-3">
                      <Input type="number" defaultValue="30" className="w-20" />
                      <Label>minutes</Label>
                    </div>
                  </ConfigSetting>
                  <Separator />
                  <div className="flex justify-end mt-4">
                    <Button 
                      onClick={() => handleSave("Authentication Settings")} 
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </ConfigurationSection>

              <ConfigurationSection 
                title="Data Protection" 
                description="Configure data security and privacy settings" 
                icon={Shield}
              >
                <div className="space-y-4">
                  <ConfigSetting 
                    title="Data Encryption" 
                    description="Enable encryption for sensitive data"
                  >
                    <Switch defaultChecked />
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="Automated Backups" 
                    description="Schedule regular system backups"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span>Daily at 2:00 AM</span>
                      </div>
                      <Button variant="outline" size="sm" className="self-start">
                        Change Schedule
                      </Button>
                    </div>
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="Data Retention" 
                    description="How long to keep historical data"
                  >
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="retention-1y" name="retention" />
                        <Label htmlFor="retention-1y">1 Year</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="retention-3y" name="retention" defaultChecked />
                        <Label htmlFor="retention-3y">3 Years</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="retention-5y" name="retention" />
                        <Label htmlFor="retention-5y">5 Years</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="retention-forever" name="retention" />
                        <Label htmlFor="retention-forever">Indefinitely</Label>
                      </div>
                    </div>
                  </ConfigSetting>
                  <Separator />
                  <div className="flex justify-end mt-4">
                    <Button 
                      onClick={() => handleSave("Data Protection")} 
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </ConfigurationSection>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-4 pr-4">
              <ConfigurationSection 
                title="Third-Party Services" 
                description="Connect with external services and APIs" 
                icon={Database}
              >
                <div className="space-y-4">
                  {[
                    { name: "Google Workspace", connected: true, icon: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" },
                    { name: "Microsoft 365", connected: false, icon: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
                    { name: "Canvas LMS", connected: true, icon: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Canvas.svg" },
                    { name: "Zoom", connected: false, icon: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg" }
                  ].map((service) => (
                    <ConfigSetting 
                      key={service.name}
                      title={service.name} 
                      description={service.connected ? "Connected" : "Not connected"}
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant={service.connected ? "default" : "outline"}>
                          {service.connected ? "Connected" : "Disconnected"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          {service.connected ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                    </ConfigSetting>
                  ))}
                  <Separator />
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" className="mr-2">Add Integration</Button>
                    <Button 
                      onClick={() => handleSave("Integrations")} 
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </ConfigurationSection>

              <ConfigurationSection 
                title="API Configuration" 
                description="Manage API keys and access tokens" 
                icon={Database}
              >
                <div className="space-y-4">
                  <ConfigSetting 
                    title="API Access" 
                    description="Enable API access for third-party integrations"
                  >
                    <Switch defaultChecked />
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="API Key" 
                    description="Your unique API key for external services"
                  >
                    <div className="flex flex-col gap-2">
                      <Input 
                        defaultValue="sk_live_51HG8h2CZgfcW0MUOyxxxxxxxxxxxxxxxxxxxxxxxxxxxx" 
                        type="password" 
                        className="w-full md:w-[300px]" 
                      />
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Show</Button>
                        <Button variant="outline" size="sm">Regenerate</Button>
                      </div>
                    </div>
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="Webhook URL" 
                    description="Endpoint for receiving event notifications"
                  >
                    <Input 
                      defaultValue="https://lovableacademy.edu/api/webhook" 
                      className="w-full md:w-[300px]" 
                    />
                  </ConfigSetting>
                  <Separator />
                  <div className="flex justify-end mt-4">
                    <Button 
                      onClick={() => handleSave("API Settings")} 
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </ConfigurationSection>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4 pr-4">
              <ConfigurationSection 
                title="System Maintenance" 
                description="Advanced system maintenance options" 
                icon={Settings}
              >
                <div className="space-y-4">
                  <ConfigSetting 
                    title="Maintenance Mode" 
                    description="Take the system offline for maintenance"
                  >
                    <div className="flex flex-col gap-2">
                      <Switch />
                      <p className="text-sm text-muted-foreground">
                        Warning: This will prevent all users from accessing the system
                      </p>
                    </div>
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="System Cache" 
                    description="Clear system cache to resolve issues"
                  >
                    <Button variant="outline">Clear Cache</Button>
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="Database Optimization" 
                    description="Optimize database for better performance"
                  >
                    <Button variant="outline">Run Optimization</Button>
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="Error Logging" 
                    description="Configure system error logging level"
                  >
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="log-errors" name="logging" defaultChecked />
                        <Label htmlFor="log-errors">Errors Only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="log-warnings" name="logging" />
                        <Label htmlFor="log-warnings">Errors & Warnings</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="log-all" name="logging" />
                        <Label htmlFor="log-all">All (Verbose)</Label>
                      </div>
                    </div>
                  </ConfigSetting>
                  <Separator />
                  <div className="flex justify-end mt-4">
                    <Button 
                      onClick={() => handleSave("System Maintenance")} 
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </ConfigurationSection>

              <ConfigurationSection 
                title="Advanced User Management" 
                description="Configure user management settings" 
                icon={Users}
              >
                <div className="space-y-4">
                  <ConfigSetting 
                    title="Auto Account Creation" 
                    description="Automatically create accounts for new students"
                  >
                    <Switch defaultChecked />
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="Account Deactivation" 
                    description="What to do with inactive accounts"
                  >
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="inactive-nothing" name="inactive" />
                        <Label htmlFor="inactive-nothing">Do nothing</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="inactive-notify" name="inactive" defaultChecked />
                        <Label htmlFor="inactive-notify">Notify administrators</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="inactive-suspend" name="inactive" />
                        <Label htmlFor="inactive-suspend">Suspend after 90 days</Label>
                      </div>
                    </div>
                  </ConfigSetting>
                  <Separator />
                  <ConfigSetting 
                    title="Login Rate Limiting" 
                    description="Limit login attempts to prevent brute force attacks"
                  >
                    <div className="flex items-center gap-3">
                      <Input type="number" defaultValue="5" className="w-20" />
                      <Label>attempts per minute</Label>
                    </div>
                  </ConfigSetting>
                  <Separator />
                  <div className="flex justify-end mt-4">
                    <Button 
                      onClick={() => handleSave("User Management")} 
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </ConfigurationSection>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ConfigurationManager;
