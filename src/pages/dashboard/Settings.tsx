
import { useState } from "react";
import { Check, Save, Bell, Lock, Eye, Globe, MonitorSmartphone, Share2, Zap, Palette } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    appNotifications: true,
    smsNotifications: false,
    dailySummary: true,
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    showProfile: true,
    showActivity: true,
    allowMessages: true,
    publicCalendar: false,
  });

  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    largerText: false,
    reducedMotion: false,
    screenReader: false,
  });

  const [displaySettings, setDisplaySettings] = useState({
    contentDensity: "normal",
    fontFamily: "system",
    animationsEnabled: true,
    fontSize: 16,
  });
  
  const [language, setLanguage] = useState("english");

  const [exportData, setExportData] = useState({
    includeProfile: true,
    includeActivities: true,
    includeGrades: true,
    format: "pdf",
  });
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been saved successfully.",
      duration: 3000,
    });
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="Settings" />
      
      <main className="flex-1 overflow-auto bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="grid grid-cols-4 md:grid-cols-6 mb-8">
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span className="hidden sm:inline">Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">Account</span>
              </TabsTrigger>
              <TabsTrigger value="accessibility" className="flex items-center gap-2">
                <MonitorSmartphone className="h-4 w-4" />
                <span className="hidden sm:inline">Accessibility</span>
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span className="hidden sm:inline">Advanced</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize how EduSync looks and feels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <RadioGroup 
                      id="theme" 
                      value={theme}
                      onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="light" id="light" />
                        <Label htmlFor="light" className="font-normal">
                          Light
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="dark" id="dark" />
                        <Label htmlFor="dark" className="font-normal">
                          Dark
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="system" id="system" />
                        <Label htmlFor="system" className="font-normal">
                          System
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="content-density">Content Density</Label>
                    <RadioGroup 
                      id="content-density" 
                      value={displaySettings.contentDensity}
                      onValueChange={(value) => setDisplaySettings({...displaySettings, contentDensity: value})}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="comfortable" id="comfortable" />
                        <Label htmlFor="comfortable" className="font-normal">
                          Comfortable
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="normal" id="normal" />
                        <Label htmlFor="normal" className="font-normal">
                          Normal
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="compact" id="compact" />
                        <Label htmlFor="compact" className="font-normal">
                          Compact
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="font-size">Font Size</Label>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">A</span>
                      <Slider
                        id="font-size"
                        min={12}
                        max={24}
                        step={1}
                        value={[displaySettings.fontSize]}
                        onValueChange={(values) => setDisplaySettings({...displaySettings, fontSize: values[0]})}
                        className="flex-1"
                      />
                      <span className="text-lg">A</span>
                      <span className="ml-4 min-w-[2rem] text-center">{displaySettings.fontSize}px</span>
                    </div>
                  </div>

                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language" className="w-full">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                        <SelectItem value="japanese">Japanese</SelectItem>
                        <SelectItem value="arabic">Arabic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Animations</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable interface animations
                      </p>
                    </div>
                    <Switch 
                      checked={displaySettings.animationsEnabled}
                      onCheckedChange={(checked) => 
                        setDisplaySettings({...displaySettings, animationsEnabled: checked})
                      }
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    Save changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, emailNotifications: checked})
                        }
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">App Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications in the app
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.appNotifications}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, appNotifications: checked})
                        }
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive important notifications via SMS
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          Premium
                        </Badge>
                        <Switch 
                          checked={notificationSettings.smsNotifications}
                          onCheckedChange={(checked) => 
                            setNotificationSettings({...notificationSettings, smsNotifications: checked})
                          }
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Daily Summary</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive a daily summary of activities
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.dailySummary}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, dailySummary: checked})
                        }
                      />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="notification-time">Preferred Time for Notifications</Label>
                      <Input
                        type="time"
                        id="notification-time"
                        defaultValue="09:00"
                        className="w-full md:w-1/3"
                      />
                      <p className="text-sm text-muted-foreground">
                        Non-urgent notifications will be delivered at this time.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    Save changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Control who can see your information and activity
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="bg-primary/5 border border-primary/20 mb-6">
                    <AlertDescription>
                      Your privacy is important to us. These settings determine what information others can see about you.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Profile Visibility</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow others to see your profile
                        </p>
                      </div>
                      <Switch 
                        checked={privacySettings.showProfile}
                        onCheckedChange={(checked) => 
                          setPrivacySettings({...privacySettings, showProfile: checked})
                        }
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Activity Status</Label>
                        <p className="text-sm text-muted-foreground">
                          Show when you're active on the platform
                        </p>
                      </div>
                      <Switch 
                        checked={privacySettings.showActivity}
                        onCheckedChange={(checked) => 
                          setPrivacySettings({...privacySettings, showActivity: checked})
                        }
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Direct Messages</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow other users to send you direct messages
                        </p>
                      </div>
                      <Switch 
                        checked={privacySettings.allowMessages}
                        onCheckedChange={(checked) => 
                          setPrivacySettings({...privacySettings, allowMessages: checked})
                        }
                      />
                    </div>

                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Public Calendar</Label>
                        <p className="text-sm text-muted-foreground">
                          Make your calendar visible to other users
                        </p>
                      </div>
                      <Switch 
                        checked={privacySettings.publicCalendar}
                        onCheckedChange={(checked) => 
                          setPrivacySettings({...privacySettings, publicCalendar: checked})
                        }
                      />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="data-sharing">Data Sharing</Label>
                      <Select defaultValue="minimal">
                        <SelectTrigger id="data-sharing">
                          <SelectValue placeholder="Select data sharing level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None - Don't share any data</SelectItem>
                          <SelectItem value="minimal">Minimal - Only essential information</SelectItem>
                          <SelectItem value="standard">Standard - Normal information sharing</SelectItem>
                          <SelectItem value="enhanced">Enhanced - Share more details</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        Control how much information is shared with the EduSync platform to improve your experience.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    Save changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Your full name" defaultValue="John Doe" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Your email" defaultValue="john.doe@example.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Your phone number" defaultValue="+1 234 567 890" />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" placeholder="Enter current password" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" placeholder="Enter new password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSaveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    Save changes
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  <CardDescription>
                    Perform irreversible actions on your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Once you delete your account, there is no going back. This action cannot be undone.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="accessibility" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Accessibility Settings</CardTitle>
                  <CardDescription>
                    Adjust settings to improve your browsing experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">High Contrast</Label>
                        <p className="text-sm text-muted-foreground">
                          Increase contrast for better readability
                        </p>
                      </div>
                      <Switch 
                        checked={accessibilitySettings.highContrast}
                        onCheckedChange={(checked) => 
                          setAccessibilitySettings({...accessibilitySettings, highContrast: checked})
                        }
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Larger Text</Label>
                        <p className="text-sm text-muted-foreground">
                          Increase base font size for better readability
                        </p>
                      </div>
                      <Switch 
                        checked={accessibilitySettings.largerText}
                        onCheckedChange={(checked) => 
                          setAccessibilitySettings({...accessibilitySettings, largerText: checked})
                        }
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Reduced Motion</Label>
                        <p className="text-sm text-muted-foreground">
                          Minimize animations and transitions
                        </p>
                      </div>
                      <Switch 
                        checked={accessibilitySettings.reducedMotion}
                        onCheckedChange={(checked) => 
                          setAccessibilitySettings({...accessibilitySettings, reducedMotion: checked})
                        }
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Screen Reader Support</Label>
                        <p className="text-sm text-muted-foreground">
                          Optimize interface for screen readers
                        </p>
                      </div>
                      <Switch 
                        checked={accessibilitySettings.screenReader}
                        onCheckedChange={(checked) => 
                          setAccessibilitySettings({...accessibilitySettings, screenReader: checked})
                        }
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    Save changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                  <CardDescription>
                    Export your data and manage other advanced options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Data Export</h3>
                    <p className="text-sm text-muted-foreground">
                      Export your data from the platform in various formats
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="include-profile"
                          checked={exportData.includeProfile}
                          onChange={(e) => setExportData({...exportData, includeProfile: e.target.checked})}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="include-profile">Include profile information</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="include-activities"
                          checked={exportData.includeActivities}
                          onChange={(e) => setExportData({...exportData, includeActivities: e.target.checked})}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="include-activities">Include activities and logs</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="include-grades"
                          checked={exportData.includeGrades}
                          onChange={(e) => setExportData({...exportData, includeGrades: e.target.checked})}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="include-grades">Include grades and assessments</Label>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Label htmlFor="export-format">Export format:</Label>
                      <Select 
                        value={exportData.format} 
                        onValueChange={(format) => setExportData({...exportData, format})}
                      >
                        <SelectTrigger id="export-format" className="w-32">
                          <SelectValue placeholder="Format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="xlsx">Excel</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button 
                        variant="outline"
                        className="ml-auto"
                        onClick={() => {
                          toast({
                            title: "Export Started",
                            description: `Your data export in ${exportData.format.toUpperCase()} format has begun. You'll be notified when it's ready to download.`,
                            duration: 5000,
                          });
                        }}
                      >
                        <Share2 className="mr-2 h-4 w-4" />
                        Export Data
                      </Button>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">API Access</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Manage your API tokens and access
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Personal Access Token</p>
                          <p className="text-xs text-muted-foreground">Created on Jan 15, 2025</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => {
                          toast({
                            title: "Token Regenerated",
                            description: "Your API token has been regenerated.",
                          });
                        }}>
                          Regenerate
                        </Button>
                      </div>

                      <div className="flex mt-2">
                        <Input 
                          value="sk_test_EduSync1234567890ABCDEFG" 
                          readOnly 
                          className="font-mono text-xs" 
                        />
                        <Button 
                          variant="ghost" 
                          className="ml-2"
                          onClick={() => {
                            navigator.clipboard.writeText("sk_test_EduSync1234567890ABCDEFG");
                            toast({
                              title: "Copied to clipboard",
                              description: "API token has been copied to your clipboard.",
                              duration: 2000,
                            });
                          }}
                        >
                          Copy
                        </Button>
                      </div>

                      <p className="text-xs text-muted-foreground mt-2">
                        Your API token provides full access to your account. Keep it safe!
                      </p>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Browser Sessions</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage and log out from other browser sessions
                      </p>

                      <div className="space-y-3 mt-4">
                        <div className="flex items-center justify-between p-2 rounded-md bg-secondary/50">
                          <div>
                            <p className="font-medium">Current Session</p>
                            <p className="text-xs text-muted-foreground">Chrome on Windows • New York, USA</p>
                          </div>
                          <Badge>Active</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-md">
                          <div>
                            <p className="font-medium">Safari on iPhone</p>
                            <p className="text-xs text-muted-foreground">Last active: 1 day ago • Los Angeles, USA</p>
                          </div>
                          <Button size="sm" variant="ghost" className="text-destructive">
                            Revoke
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-md">
                          <div>
                            <p className="font-medium">Firefox on Linux</p>
                            <p className="text-xs text-muted-foreground">Last active: 3 days ago • Seattle, USA</p>
                          </div>
                          <Button size="sm" variant="ghost" className="text-destructive">
                            Revoke
                          </Button>
                        </div>
                      </div>

                      <Button 
                        variant="outline" 
                        className="mt-2"
                        onClick={() => {
                          toast({
                            title: "All Sessions Revoked",
                            description: "You've been logged out from all other devices.",
                            duration: 3000,
                          });
                        }}
                      >
                        Log out from all other sessions
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    Save changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Settings;
