
import { useState } from "react";
import { Check, Save } from "lucide-react";
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
  });
  
  const [language, setLanguage] = useState("english");
  
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
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
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
                    <Label htmlFor="language">Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Switch 
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, smsNotifications: checked})
                        }
                      />
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
          </Tabs>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Settings;
