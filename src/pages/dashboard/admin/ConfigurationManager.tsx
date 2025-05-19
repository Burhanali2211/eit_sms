
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Check,
  Lock,
  Eye,
  EyeOff,
  Save,
  Monitor,
  Pencil,
  Download,
  Upload,
  Settings,
  Folder,
} from "lucide-react";

// Configuration types
interface Feature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  locked: boolean;
  requiresSetup: boolean;
  setupComplete: boolean;
}

interface Page {
  id: string;
  name: string;
  path: string;
  enabled: boolean;
  locked: boolean;
  icon?: string;
}

interface SchoolConfig {
  name: string;
  logo: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  features: Feature[];
  pages: Page[];
  customFields: Record<string, string>;
}

const ConfigurationManager = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("features");
  const [previewMode, setPreviewMode] = useState(false);
  
  // Initial configuration state
  const [config, setConfig] = useState<SchoolConfig>({
    name: "EduSync Academy",
    logo: "/placeholder.svg",
    tagline: "Empowering Minds, Shaping Futures",
    primaryColor: "#8B5CF6",
    secondaryColor: "#D946EF",
    features: [
      {
        id: "ict-lab",
        name: "ICT Lab",
        description: "Computer laboratory with up-to-date equipment",
        enabled: true,
        locked: false,
        requiresSetup: true,
        setupComplete: false
      },
      {
        id: "library",
        name: "Library",
        description: "Digital and physical library resources",
        enabled: true,
        locked: false,
        requiresSetup: true,
        setupComplete: true
      },
      {
        id: "sports",
        name: "Sports Facilities",
        description: "Sports grounds, equipment, and team information",
        enabled: true,
        locked: false,
        requiresSetup: false,
        setupComplete: false
      },
      {
        id: "events",
        name: "Events Calendar",
        description: "School events, holidays, and important dates",
        enabled: true,
        locked: false,
        requiresSetup: true,
        setupComplete: false
      },
      {
        id: "elearning",
        name: "E-Learning Platform",
        description: "Online learning resources and virtual classroom",
        enabled: false,
        locked: true,
        requiresSetup: true,
        setupComplete: false
      },
      {
        id: "alumni",
        name: "Alumni Network",
        description: "Connect with former students and alumni events",
        enabled: false,
        locked: false,
        requiresSetup: true,
        setupComplete: false
      }
    ],
    pages: [
      { id: "home", name: "Home", path: "/", enabled: true, locked: false, icon: "home" },
      { id: "about", name: "About Us", path: "/about", enabled: true, locked: false, icon: "info" },
      { id: "academics", name: "Academics", path: "/academics", enabled: true, locked: false, icon: "book" },
      { id: "admissions", name: "Admissions", path: "/admissions", enabled: true, locked: false, icon: "user-plus" },
      { id: "faculty", name: "Faculty", path: "/faculty", enabled: true, locked: false, icon: "users" },
      { id: "gallery", name: "Gallery", path: "/gallery", enabled: true, locked: false, icon: "image" },
      { id: "news", name: "News & Updates", path: "/news", enabled: true, locked: false, icon: "newspaper" },
      { id: "contact", name: "Contact Us", path: "/contact", enabled: true, locked: false, icon: "phone" },
      { id: "student-portal", name: "Student Portal", path: "/student-portal", enabled: false, locked: true, icon: "lock" }
    ],
    customFields: {
      founded: "2010",
      principalName: "Dr. John Smith",
      schoolEmail: "info@edusync.example.com",
      schoolPhone: "(555) 123-4567"
    }
  });
  
  const [newFeature, setNewFeature] = useState({
    name: "",
    description: ""
  });
  
  const [newPage, setNewPage] = useState({
    name: "",
    path: ""
  });
  
  const [newCustomField, setNewCustomField] = useState({
    key: "",
    value: ""
  });

  // Toggle feature enabled state
  const toggleFeature = (id: string) => {
    setConfig(prev => ({
      ...prev,
      features: prev.features.map(feature => 
        feature.id === id ? { ...feature, enabled: !feature.enabled } : feature
      )
    }));
  };

  // Toggle feature lock state
  const toggleFeatureLock = (id: string) => {
    setConfig(prev => ({
      ...prev,
      features: prev.features.map(feature => 
        feature.id === id ? { ...feature, locked: !feature.locked } : feature
      )
    }));
  };

  // Toggle page enabled state
  const togglePage = (id: string) => {
    setConfig(prev => ({
      ...prev,
      pages: prev.pages.map(page => 
        page.id === id ? { ...page, enabled: !page.enabled } : page
      )
    }));
  };

  // Toggle page lock state
  const togglePageLock = (id: string) => {
    setConfig(prev => ({
      ...prev,
      pages: prev.pages.map(page => 
        page.id === id ? { ...page, locked: !page.locked } : page
      )
    }));
  };

  // Add new feature
  const addFeature = () => {
    if (!newFeature.name) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Feature name is required",
      });
      return;
    }

    const id = newFeature.name.toLowerCase().replace(/\s+/g, '-');
    
    setConfig(prev => ({
      ...prev,
      features: [
        ...prev.features,
        {
          id,
          name: newFeature.name,
          description: newFeature.description,
          enabled: true,
          locked: false,
          requiresSetup: false,
          setupComplete: false
        }
      ]
    }));
    
    setNewFeature({ name: "", description: "" });
    
    toast({
      title: "Feature Added",
      description: `${newFeature.name} has been added to features`,
    });
  };

  // Add new page
  const addPage = () => {
    if (!newPage.name || !newPage.path) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Page name and path are required",
      });
      return;
    }

    const id = newPage.name.toLowerCase().replace(/\s+/g, '-');
    const path = newPage.path.startsWith('/') ? newPage.path : `/${newPage.path}`;
    
    setConfig(prev => ({
      ...prev,
      pages: [
        ...prev.pages,
        {
          id,
          name: newPage.name,
          path,
          enabled: true,
          locked: false
        }
      ]
    }));
    
    setNewPage({ name: "", path: "" });
    
    toast({
      title: "Page Added",
      description: `${newPage.name} has been added to pages`,
    });
  };

  // Add new custom field
  const addCustomField = () => {
    if (!newCustomField.key || !newCustomField.value) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Both field name and value are required",
      });
      return;
    }
    
    setConfig(prev => ({
      ...prev,
      customFields: {
        ...prev.customFields,
        [newCustomField.key]: newCustomField.value
      }
    }));
    
    setNewCustomField({ key: "", value: "" });
    
    toast({
      title: "Custom Field Added",
      description: `${newCustomField.key} has been added to custom fields`,
    });
  };

  // Remove custom field
  const removeCustomField = (key: string) => {
    setConfig(prev => {
      const newCustomFields = { ...prev.customFields };
      delete newCustomFields[key];
      
      return {
        ...prev,
        customFields: newCustomFields
      };
    });
    
    toast({
      title: "Custom Field Removed",
      description: `${key} has been removed from custom fields`,
    });
  };

  // Update basic info
  const updateBasicInfo = (field: keyof SchoolConfig, value: string) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Save configuration
  const saveConfiguration = () => {
    // In a real application, this would save to a database
    console.log("Saving configuration:", config);
    
    toast({
      title: "Configuration Saved",
      description: "Your website configuration has been saved successfully",
    });
  };

  // Export configuration
  const exportConfiguration = () => {
    const configString = JSON.stringify(config, null, 2);
    const blob = new Blob([configString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.name.toLowerCase().replace(/\s+/g, '-')}-config.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Configuration Exported",
      description: "Your website configuration has been exported as JSON",
    });
  };

  // Import configuration
  const importConfiguration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedConfig = JSON.parse(e.target?.result as string);
        setConfig(importedConfig);
        
        toast({
          title: "Configuration Imported",
          description: "Your website configuration has been imported successfully",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Import Error",
          description: "Failed to import configuration. Invalid file format.",
        });
      }
    };
    reader.readAsText(file);
    
    // Reset the input
    event.target.value = '';
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="Website Configuration" />
      <div className={`flex-1 overflow-auto p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              Configure Your School Website
            </h2>
            <p className="text-muted-foreground">
              Customize features, pages, and appearance for your school website
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 mr-4">
              <Switch 
                id="preview-mode" 
                checked={previewMode}
                onCheckedChange={setPreviewMode}
              />
              <Label htmlFor="preview-mode" className="cursor-pointer">
                <Monitor className="h-4 w-4 inline mr-1" />
                Preview Mode
              </Label>
            </div>
            <Button onClick={saveConfiguration}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={exportConfiguration}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <div className="relative">
              <input
                type="file"
                id="import-config"
                className="absolute inset-0 opacity-0 w-full cursor-pointer"
                accept=".json"
                onChange={importConfiguration}
              />
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main configuration area */}
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="features">
                  <Check className="h-4 w-4 mr-2" />
                  Features
                </TabsTrigger>
                <TabsTrigger value="pages">
                  <Folder className="h-4 w-4 mr-2" />
                  Pages
                </TabsTrigger>
                <TabsTrigger value="custom">
                  <Pencil className="h-4 w-4 mr-2" />
                  Custom
                </TabsTrigger>
                <TabsTrigger value="appearance">
                  <Settings className="h-4 w-4 mr-2" />
                  Appearance
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="features" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>School Features</CardTitle>
                    <CardDescription>
                      Enable or disable features based on what your school offers
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {config.features.map(feature => (
                        <div 
                          key={feature.id} 
                          className={`p-4 rounded-lg border ${
                            isDarkMode ? 'bg-gray-800' : 'bg-white'
                          } ${feature.locked ? 'opacity-70' : ''}`}
                        >
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <Checkbox 
                                id={`feature-${feature.id}`}
                                checked={feature.enabled}
                                onCheckedChange={() => !feature.locked && toggleFeature(feature.id)}
                                disabled={feature.locked}
                                className="mr-3"
                              />
                              <div>
                                <Label 
                                  htmlFor={`feature-${feature.id}`}
                                  className={`text-base font-medium ${
                                    feature.locked ? 'text-muted-foreground' : ''
                                  }`}
                                >
                                  {feature.name}
                                  {feature.locked && (
                                    <Lock className="h-4 w-4 ml-2 inline text-muted-foreground" />
                                  )}
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {feature.requiresSetup && (
                                <StatusBadge 
                                  status={feature.setupComplete ? "success" : "pending"} 
                                  label={feature.setupComplete ? "Setup Complete" : "Setup Required"}
                                />
                              )}
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => toggleFeatureLock(feature.id)}
                              >
                                {feature.locked ? <Lock className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Add Custom Feature</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                          <Label htmlFor="new-feature-name">Feature Name</Label>
                          <Input 
                            id="new-feature-name" 
                            value={newFeature.name}
                            onChange={(e) => setNewFeature({...newFeature, name: e.target.value})}
                            placeholder="e.g., Art Gallery"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="new-feature-desc">Description</Label>
                          <Input 
                            id="new-feature-desc" 
                            value={newFeature.description}
                            onChange={(e) => setNewFeature({...newFeature, description: e.target.value})}
                            placeholder="Brief description of the feature"
                          />
                        </div>
                      </div>
                      <Button onClick={addFeature}>Add Feature</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="pages" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Website Pages</CardTitle>
                    <CardDescription>
                      Configure which pages are visible on your school website
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {config.pages.map(page => (
                        <div 
                          key={page.id} 
                          className={`p-4 rounded-lg border ${
                            isDarkMode ? 'bg-gray-800' : 'bg-white'
                          } ${page.locked ? 'opacity-70' : ''}`}
                        >
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <Checkbox 
                                id={`page-${page.id}`}
                                checked={page.enabled}
                                onCheckedChange={() => !page.locked && togglePage(page.id)}
                                disabled={page.locked}
                                className="mr-3"
                              />
                              <div>
                                <Label 
                                  htmlFor={`page-${page.id}`}
                                  className={`text-base font-medium ${
                                    page.locked ? 'text-muted-foreground' : ''
                                  }`}
                                >
                                  {page.name}
                                  {page.locked && (
                                    <Lock className="h-4 w-4 ml-2 inline text-muted-foreground" />
                                  )}
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  {page.path}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <StatusBadge 
                                status={page.enabled ? "active" : "inactive"} 
                                label={page.enabled ? "Visible" : "Hidden"}
                              />
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => togglePageLock(page.id)}
                              >
                                {page.locked ? <Lock className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Add Custom Page</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="new-page-name">Page Name</Label>
                          <Input 
                            id="new-page-name" 
                            value={newPage.name}
                            onChange={(e) => setNewPage({...newPage, name: e.target.value})}
                            placeholder="e.g., Alumni Network"
                          />
                        </div>
                        <div>
                          <Label htmlFor="new-page-path">Page Path</Label>
                          <Input 
                            id="new-page-path" 
                            value={newPage.path}
                            onChange={(e) => setNewPage({...newPage, path: e.target.value})}
                            placeholder="e.g., /alumni"
                          />
                        </div>
                      </div>
                      <Button onClick={addPage}>Add Page</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="custom" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Custom Fields</CardTitle>
                    <CardDescription>
                      Add school-specific information that will be used throughout the website
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {Object.entries(config.customFields).map(([key, value]) => (
                        <div 
                          key={key} 
                          className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                        >
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium">{key}</h4>
                              <p className="text-sm text-muted-foreground">{value}</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeCustomField(key)}
                            >
                              <EyeOff className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Add Custom Field</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="new-field-key">Field Name</Label>
                          <Input 
                            id="new-field-key" 
                            value={newCustomField.key}
                            onChange={(e) => setNewCustomField({...newCustomField, key: e.target.value})}
                            placeholder="e.g., missionStatement"
                          />
                        </div>
                        <div>
                          <Label htmlFor="new-field-value">Field Value</Label>
                          <Input 
                            id="new-field-value" 
                            value={newCustomField.value}
                            onChange={(e) => setNewCustomField({...newCustomField, value: e.target.value})}
                            placeholder="e.g., Our mission is to..."
                          />
                        </div>
                      </div>
                      <Button onClick={addCustomField}>Add Field</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="appearance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Website Appearance</CardTitle>
                    <CardDescription>
                      Customize the look and feel of your school website
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="school-name">School Name</Label>
                        <Input 
                          id="school-name" 
                          value={config.name}
                          onChange={(e) => updateBasicInfo('name', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="school-tagline">Tagline/Slogan</Label>
                        <Input 
                          id="school-tagline" 
                          value={config.tagline}
                          onChange={(e) => updateBasicInfo('tagline', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="school-logo">Logo URL</Label>
                        <Input 
                          id="school-logo" 
                          value={config.logo}
                          onChange={(e) => updateBasicInfo('logo', e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="primary-color">Primary Color</Label>
                          <div className="flex space-x-2">
                            <Input 
                              id="primary-color" 
                              value={config.primaryColor}
                              onChange={(e) => updateBasicInfo('primaryColor', e.target.value)}
                            />
                            <div 
                              className="h-10 w-10 rounded border"
                              style={{ backgroundColor: config.primaryColor }}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="secondary-color">Secondary Color</Label>
                          <div className="flex space-x-2">
                            <Input 
                              id="secondary-color" 
                              value={config.secondaryColor}
                              onChange={(e) => updateBasicInfo('secondaryColor', e.target.value)}
                            />
                            <div 
                              className="h-10 w-10 rounded border"
                              style={{ backgroundColor: config.secondaryColor }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="text-lg font-medium mb-2">Display Options</h4>
                        <ToggleGroup type="multiple" variant="outline">
                          <ToggleGroupItem value="logo" aria-label="Toggle Logo">
                            Show Logo
                          </ToggleGroupItem>
                          <ToggleGroupItem value="search" aria-label="Toggle Search">
                            Search Bar
                          </ToggleGroupItem>
                          <ToggleGroupItem value="social" aria-label="Toggle Social Media">
                            Social Media
                          </ToggleGroupItem>
                          <ToggleGroupItem value="footer" aria-label="Toggle Footer">
                            Full Footer
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Preview/summary panel */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>
                  {previewMode ? (
                    <div className="flex items-center">
                      <Monitor className="h-5 w-5 mr-2" />
                      Site Preview
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      Configuration Summary
                    </div>
                  )}
                </CardTitle>
                <CardDescription>
                  {previewMode 
                    ? "A preview of your configured website" 
                    : "Summary of your current configuration"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {previewMode ? (
                  <div className="border rounded-md p-2 overflow-hidden">
                    <div 
                      className="rounded overflow-hidden shadow-lg" 
                      style={{ 
                        backgroundColor: isDarkMode ? '#1f2937' : 'white',
                        color: isDarkMode ? 'white' : 'black'
                      }}
                    >
                      {/* Simulated header */}
                      <div 
                        className="p-3 flex justify-between items-center border-b"
                        style={{ backgroundColor: config.primaryColor, color: 'white' }}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="bg-white rounded p-1">
                            <img src={config.logo} alt="Logo" className="h-6 w-6" />
                          </div>
                          <span className="font-bold text-sm">{config.name}</span>
                        </div>
                        <div className="text-xs">
                          {config.pages
                            .filter(page => page.enabled)
                            .slice(0, 3)
                            .map(page => (
                              <span key={page.id} className="mx-1">{page.name}</span>
                            ))}
                          {config.pages.filter(page => page.enabled).length > 3 && <span>...</span>}
                        </div>
                      </div>
                      
                      {/* Simulated hero */}
                      <div className="p-3 text-center">
                        <h2 className="text-sm font-bold mb-1">{config.name}</h2>
                        <p className="text-xs italic">{config.tagline}</p>
                      </div>
                      
                      {/* Simulated features */}
                      <div className="px-3 pb-3">
                        <div className="text-xs font-medium mb-2">Featured:</div>
                        <div className="grid grid-cols-2 gap-2">
                          {config.features
                            .filter(feature => feature.enabled)
                            .slice(0, 4)
                            .map(feature => (
                              <div key={feature.id} className="border rounded p-1 text-xs">
                                {feature.name}
                              </div>
                            ))}
                        </div>
                      </div>
                      
                      {/* Simulated footer */}
                      <div 
                        className="p-2 text-xs border-t text-center"
                        style={{ backgroundColor: config.secondaryColor, color: 'white' }}
                      >
                        &copy; 2025 {config.name}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Basic Info</h3>
                      <p className="text-lg font-bold">{config.name}</p>
                      <p className="text-sm">{config.tagline}</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Features Enabled</h3>
                      <p className="text-lg font-bold">
                        {config.features.filter(f => f.enabled).length} / {config.features.length}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {config.features
                          .filter(f => f.enabled)
                          .slice(0, 3)
                          .map(feature => (
                            <span 
                              key={feature.id}
                              className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-900/30 dark:text-blue-200 dark:ring-blue-500/20"
                            >
                              {feature.name}
                            </span>
                          ))}
                        {config.features.filter(f => f.enabled).length > 3 && (
                          <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20 dark:bg-gray-700 dark:text-gray-200 dark:ring-gray-500/20">
                            +{config.features.filter(f => f.enabled).length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Pages Visible</h3>
                      <p className="text-lg font-bold">
                        {config.pages.filter(p => p.enabled).length} / {config.pages.length}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {config.pages
                          .filter(p => p.enabled)
                          .slice(0, 3)
                          .map(page => (
                            <span 
                              key={page.id}
                              className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/30 dark:text-green-200 dark:ring-green-500/20"
                            >
                              {page.name}
                            </span>
                          ))}
                        {config.pages.filter(p => p.enabled).length > 3 && (
                          <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20 dark:bg-gray-700 dark:text-gray-200 dark:ring-gray-500/20">
                            +{config.pages.filter(p => p.enabled).length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Custom Fields</h3>
                      <p className="text-lg font-bold">
                        {Object.keys(config.customFields).length}
                      </p>
                    </div>
                    
                    <div className="pt-4">
                      <Button onClick={saveConfiguration} className="w-full">
                        <Save className="h-4 w-4 mr-2" />
                        Save Configuration
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ConfigurationManager;
