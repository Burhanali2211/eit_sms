
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription,
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  Palette,
  X,
  Plus,
} from "lucide-react";

// Configuration types
interface Theme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundLight: string;
  backgroundDark: string;
  cardLight: string;
  cardDark: string;
  fontPrimary: string;
  fontSecondary: string;
}

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
  requiresAuth?: boolean;
  roles?: string[];
}

interface MenuItem {
  id: string;
  name: string;
  enabled: boolean;
  parent?: string;
  order: number;
  path?: string;
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
  navigation: MenuItem[];
  selectedTheme: string;
  themes: Theme[];
  fonts: string[];
  socialLinks: Record<string, string>;
  footer: {
    showLogo: boolean;
    showSocialLinks: boolean;
    showAddress: boolean;
    showCopyright: boolean;
    customText: string;
  };
  loginPage: {
    backgroundImage?: string;
    welcomeMessage: string;
    showLogo: boolean;
    allowRegistration: boolean;
    allowPasswordReset: boolean;
  };
}

const defaultThemes: Theme[] = [
  {
    id: "default",
    name: "EduSync Default",
    primaryColor: "#8B5CF6",
    secondaryColor: "#D946EF",
    accentColor: "#F97316",
    backgroundLight: "#F9FAFB",
    backgroundDark: "#111827",
    cardLight: "#FFFFFF",
    cardDark: "#1F2937",
    fontPrimary: "Inter",
    fontSecondary: "sans-serif"
  },
  {
    id: "ocean",
    name: "Ocean Blue",
    primaryColor: "#0EA5E9",
    secondaryColor: "#3B82F6",
    accentColor: "#14B8A6",
    backgroundLight: "#F0F9FF",
    backgroundDark: "#0F172A",
    cardLight: "#FFFFFF",
    cardDark: "#1E293B",
    fontPrimary: "Poppins",
    fontSecondary: "sans-serif"
  },
  {
    id: "forest",
    name: "Forest Green",
    primaryColor: "#22C55E",
    secondaryColor: "#16A34A",
    accentColor: "#84CC16",
    backgroundLight: "#F0FDF4",
    backgroundDark: "#14532D",
    cardLight: "#FFFFFF",
    cardDark: "#166534",
    fontPrimary: "Roboto",
    fontSecondary: "sans-serif"
  },
  {
    id: "sunset",
    name: "Sunset Orange",
    primaryColor: "#F97316",
    secondaryColor: "#EA580C",
    accentColor: "#FBBF24",
    backgroundLight: "#FFF7ED",
    backgroundDark: "#431407",
    cardLight: "#FFFFFF",
    cardDark: "#7C2D12",
    fontPrimary: "DM Sans",
    fontSecondary: "sans-serif"
  },
  {
    id: "lavender",
    name: "Lavender Dream",
    primaryColor: "#8B5CF6",
    secondaryColor: "#A78BFA",
    accentColor: "#D946EF",
    backgroundLight: "#FAF5FF",
    backgroundDark: "#2E1065",
    cardLight: "#FFFFFF",
    cardDark: "#4C1D95",
    fontPrimary: "Quicksand",
    fontSecondary: "sans-serif"
  }
];

const ConfigurationManager = () => {
  const { isDarkMode, theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("features");
  const [previewMode, setPreviewMode] = useState(false);
  const [activeThemeTab, setActiveThemeTab] = useState("theme-preview");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{type: string, id: string}>({ type: '', id: '' });
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  
  // Initial configuration state
  const [config, setConfig] = useState<SchoolConfig>({
    name: "EduSync Academy",
    logo: "/placeholder.svg",
    tagline: "Empowering Minds, Shaping Futures",
    primaryColor: "#8B5CF6",
    secondaryColor: "#D946EF",
    selectedTheme: "default",
    themes: defaultThemes,
    fonts: ["Inter", "Poppins", "Roboto", "Open Sans", "Montserrat", "Lato", "DM Sans", "Quicksand", "Nunito"],
    socialLinks: {
      facebook: "https://facebook.com/edusync",
      twitter: "https://twitter.com/edusync",
      instagram: "https://instagram.com/edusync",
      linkedin: "https://linkedin.com/company/edusync"
    },
    footer: {
      showLogo: true,
      showSocialLinks: true,
      showAddress: true,
      showCopyright: true,
      customText: "EduSync Academy - Excellence in Education"
    },
    loginPage: {
      welcomeMessage: "Welcome to EduSync Academy",
      showLogo: true,
      allowRegistration: true,
      allowPasswordReset: true
    },
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
      { id: "student-portal", name: "Student Portal", path: "/student-portal", enabled: false, locked: true, icon: "lock", requiresAuth: true, roles: ["student"] },
      { id: "teacher-portal", name: "Teacher Portal", path: "/teacher-portal", enabled: false, locked: true, icon: "lock", requiresAuth: true, roles: ["teacher"] },
      { id: "admin-portal", name: "Admin Portal", path: "/admin-portal", enabled: false, locked: true, icon: "lock", requiresAuth: true, roles: ["admin", "super-admin"] }
    ],
    navigation: [
      { id: "main-home", name: "Home", enabled: true, order: 0, path: "/" },
      { id: "main-about", name: "About", enabled: true, order: 1, path: "/about" },
      { id: "main-academics", name: "Academics", enabled: true, order: 2, path: "/academics" },
      { id: "main-admissions", name: "Admissions", enabled: true, order: 3, path: "/admissions" },
      { id: "footer-contact", name: "Contact", enabled: true, parent: "footer", order: 0, path: "/contact" },
      { id: "footer-privacy", name: "Privacy Policy", enabled: true, parent: "footer", order: 1, path: "/privacy" },
      { id: "footer-terms", name: "Terms of Service", enabled: true, parent: "footer", order: 2, path: "/terms" }
    ],
    customFields: {
      founded: "2010",
      principalName: "Dr. John Smith",
      schoolEmail: "info@edusync.example.com",
      schoolPhone: "(555) 123-4567",
      address: "123 Education Lane, Knowledge City, ST 12345",
      missionStatement: "To provide quality education that empowers students to excel academically and grow personally in a supportive and innovative environment.",
      visionStatement: "To be a leading educational institution that nurtures future leaders and global citizens."
    }
  });
  
  const [newFeature, setNewFeature] = useState({
    name: "",
    description: ""
  });
  
  const [newPage, setNewPage] = useState({
    name: "",
    path: "",
    requiresAuth: false,
    roles: [] as string[]
  });
  
  const [newCustomField, setNewCustomField] = useState({
    key: "",
    value: ""
  });

  const [newTheme, setNewTheme] = useState<Theme>({
    id: "",
    name: "",
    primaryColor: "#6366f1",
    secondaryColor: "#8b5cf6",
    accentColor: "#f43f5e",
    backgroundLight: "#ffffff",
    backgroundDark: "#1e293b",
    cardLight: "#ffffff",
    cardDark: "#334155",
    fontPrimary: "Inter",
    fontSecondary: "sans-serif"
  });

  // Update unsaved changes state whenever config changes
  useEffect(() => {
    setUnsavedChanges(true);
  }, [config]);

  // Get current theme details
  const getCurrentTheme = () => {
    return config.themes.find(t => t.id === config.selectedTheme) || config.themes[0];
  };

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
          locked: false,
          requiresAuth: newPage.requiresAuth,
          roles: newPage.requiresAuth ? newPage.roles : undefined
        }
      ]
    }));
    
    setNewPage({ name: "", path: "", requiresAuth: false, roles: [] });
    
    toast({
      title: "Page Added",
      description: `${newPage.name} has been added to pages`,
    });
  };

  // Add new theme
  const addTheme = () => {
    if (!newTheme.name) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Theme name is required",
      });
      return;
    }

    const id = newTheme.name.toLowerCase().replace(/\s+/g, '-');
    
    // Check for duplicate theme name
    if (config.themes.some(theme => theme.id === id)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "A theme with this name already exists",
      });
      return;
    }

    setConfig(prev => ({
      ...prev,
      themes: [
        ...prev.themes,
        {
          ...newTheme,
          id
        }
      ]
    }));
    
    // Reset the new theme form
    setNewTheme({
      id: "",
      name: "",
      primaryColor: "#6366f1",
      secondaryColor: "#8b5cf6",
      accentColor: "#f43f5e",
      backgroundLight: "#ffffff",
      backgroundDark: "#1e293b",
      cardLight: "#ffffff",
      cardDark: "#334155",
      fontPrimary: "Inter",
      fontSecondary: "sans-serif"
    });
    
    toast({
      title: "Theme Added",
      description: `${newTheme.name} has been added to themes`,
    });
  };

  // Delete a theme
  const deleteTheme = (id: string) => {
    // Don't delete if it's the selected theme
    if (id === config.selectedTheme) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Cannot delete the currently selected theme",
      });
      return;
    }

    setConfig(prev => ({
      ...prev,
      themes: prev.themes.filter(theme => theme.id !== id)
    }));
    
    toast({
      title: "Theme Deleted",
      description: "The theme has been removed",
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

  // Remove feature
  const removeFeature = (id: string) => {
    setConfig(prev => ({
      ...prev,
      features: prev.features.filter(feature => feature.id !== id)
    }));
    
    toast({
      title: "Feature Removed",
      description: `The feature has been removed`,
    });
  };

  // Remove page
  const removePage = (id: string) => {
    setConfig(prev => ({
      ...prev,
      pages: prev.pages.filter(page => page.id !== id)
    }));
    
    toast({
      title: "Page Removed",
      description: `The page has been removed`,
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
    
    setUnsavedChanges(false);
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

  // Handle theme selection
  const handleThemeChange = (themeId: string) => {
    setConfig(prev => ({
      ...prev,
      selectedTheme: themeId
    }));
    
    toast({
      title: "Theme Updated",
      description: `Theme has been changed to ${config.themes.find(t => t.id === themeId)?.name}`,
    });
  };

  // Handle deletion confirmation
  const handleDeleteConfirm = () => {
    const { type, id } = itemToDelete;
    
    if (type === 'feature') {
      removeFeature(id);
    } else if (type === 'page') {
      removePage(id);
    } else if (type === 'theme') {
      deleteTheme(id);
    } else if (type === 'customField') {
      removeCustomField(id);
    }
    
    setDeleteDialogOpen(false);
    setItemToDelete({ type: '', id: '' });
  };

  // Prompt for deletion
  const confirmDelete = (type: string, id: string) => {
    setItemToDelete({ type, id });
    setDeleteDialogOpen(true);
  };

  // Handle social link update
  const updateSocialLink = (platform: string, url: string) => {
    setConfig(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: url
      }
    }));
  };

  // Update footer settings
  const updateFooterSetting = (key: string, value: boolean | string) => {
    setConfig(prev => ({
      ...prev,
      footer: {
        ...prev.footer,
        [key]: value
      }
    }));
  };

  // Update login page settings
  const updateLoginPageSetting = (key: string, value: boolean | string) => {
    setConfig(prev => ({
      ...prev,
      loginPage: {
        ...prev.loginPage,
        [key]: value
      }
    }));
  };

  // Get CSS variables for selected theme
  const getThemeStyles = () => {
    const selectedTheme = getCurrentTheme();
    return {
      "--primary-color": selectedTheme.primaryColor,
      "--secondary-color": selectedTheme.secondaryColor,
      "--accent-color": selectedTheme.accentColor,
      "--background-color": isDarkMode ? selectedTheme.backgroundDark : selectedTheme.backgroundLight,
      "--card-color": isDarkMode ? selectedTheme.cardDark : selectedTheme.cardLight,
      "--font-primary": selectedTheme.fontPrimary,
      "--font-secondary": selectedTheme.fontSecondary,
    } as React.CSSProperties;
  };

  // Handle theme preview toggle
  const toggleThemePreview = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="Website Configuration" />
      <div 
        className={`flex-1 overflow-auto p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
        style={previewMode ? getThemeStyles() : {}}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              Configure Your School Website
            </h2>
            <p className="text-muted-foreground">
              Customize features, pages, themes, and appearance for your school website
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 mr-4">
              <Switch 
                id="preview-mode" 
                checked={previewMode}
                onCheckedChange={toggleThemePreview}
              />
              <Label htmlFor="preview-mode" className="cursor-pointer">
                <Monitor className="h-4 w-4 inline mr-1" />
                Theme Preview Mode
              </Label>
            </div>
            <Button 
              onClick={saveConfiguration}
              variant={unsavedChanges ? "default" : "outline"}
            >
              <Save className="h-4 w-4 mr-2" />
              {unsavedChanges ? "Save Changes" : "Saved"}
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
              <TabsList className="grid grid-cols-5 mb-6">
                <TabsTrigger value="features">
                  <Check className="h-4 w-4 mr-2" />
                  Features
                </TabsTrigger>
                <TabsTrigger value="pages">
                  <Folder className="h-4 w-4 mr-2" />
                  Pages
                </TabsTrigger>
                <TabsTrigger value="themes">
                  <Palette className="h-4 w-4 mr-2" />
                  Themes
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
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => confirmDelete('feature', feature.id)}
                                className="text-destructive hover:text-destructive/90"
                              >
                                <X className="h-4 w-4" />
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
                      <Button 
                        onClick={addFeature}
                        disabled={!newFeature.name}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Feature
                      </Button>
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
                    <ScrollArea className="h-[450px] pr-4">
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
                                  <p className="text-sm text-muted-foreground flex items-center">
                                    {page.path}
                                    {page.requiresAuth && (
                                      <span className="ml-2 text-xs bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-full">
                                        Auth Required
                                      </span>
                                    )}
                                  </p>
                                  {page.roles && page.roles.length > 0 && (
                                    <div className="flex gap-1 mt-1 flex-wrap">
                                      {page.roles.map(role => (
                                        <span key={role} className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded-full">
                                          {role}
                                        </span>
                                      ))}
                                    </div>
                                  )}
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
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => confirmDelete('page', page.id)}
                                  className="text-destructive hover:text-destructive/90"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    
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
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="page-requires-auth"
                          checked={newPage.requiresAuth}
                          onCheckedChange={(checked) => 
                            setNewPage({...newPage, requiresAuth: !!checked})
                          }
                        />
                        <Label htmlFor="page-requires-auth">
                          Requires Authentication
                        </Label>
                      </div>
                      
                      {newPage.requiresAuth && (
                        <div>
                          <Label className="mb-2 block">Allowed Roles</Label>
                          <div className="flex flex-wrap gap-2">
                            {['student', 'teacher', 'admin', 'super-admin', 'principal'].map(role => (
                              <div key={role} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`role-${role}`}
                                  checked={newPage.roles.includes(role)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setNewPage({
                                        ...newPage, 
                                        roles: [...newPage.roles, role]
                                      });
                                    } else {
                                      setNewPage({
                                        ...newPage,
                                        roles: newPage.roles.filter(r => r !== role)
                                      });
                                    }
                                  }}
                                />
                                <Label htmlFor={`role-${role}`}>{role}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        onClick={addPage}
                        disabled={!newPage.name || !newPage.path || (newPage.requiresAuth && newPage.roles.length === 0)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Page
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="themes" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Website Themes</CardTitle>
                    <CardDescription>
                      Choose or create themes to customize the look of your website
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeThemeTab} onValueChange={setActiveThemeTab}>
                      <TabsList className="mb-4">
                        <TabsTrigger value="theme-preview">Choose Theme</TabsTrigger>
                        <TabsTrigger value="theme-create">Create Theme</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="theme-preview">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {config.themes.map(theme => (
                            <div
                              key={theme.id}
                              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                config.selectedTheme === theme.id 
                                  ? 'ring-2 ring-primary ring-offset-2' 
                                  : 'hover:border-primary'
                              }`}
                              onClick={() => handleThemeChange(theme.id)}
                            >
                              <div className="flex justify-between items-center mb-3">
                                <h3 className="font-medium">{theme.name}</h3>
                                {config.selectedTheme === theme.id && (
                                  <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                                    Active
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex space-x-2 mb-3">
                                <div 
                                  className="w-6 h-6 rounded-full" 
                                  style={{ backgroundColor: theme.primaryColor }}
                                  title="Primary Color"
                                />
                                <div 
                                  className="w-6 h-6 rounded-full" 
                                  style={{ backgroundColor: theme.secondaryColor }}
                                  title="Secondary Color"
                                />
                                <div 
                                  className="w-6 h-6 rounded-full" 
                                  style={{ backgroundColor: theme.accentColor }}
                                  title="Accent Color"
                                />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <div className="text-xs text-muted-foreground">Light Mode</div>
                                  <div 
                                    className="h-10 mt-1 rounded border relative overflow-hidden"
                                    style={{ backgroundColor: theme.backgroundLight }}
                                  >
                                    <div 
                                      className="absolute right-0 top-0 bottom-0 w-1/3"
                                      style={{ backgroundColor: theme.cardLight }}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs text-muted-foreground">Dark Mode</div>
                                  <div 
                                    className="h-10 mt-1 rounded border relative overflow-hidden"
                                    style={{ backgroundColor: theme.backgroundDark }}
                                  >
                                    <div 
                                      className="absolute right-0 top-0 bottom-0 w-1/3"
                                      style={{ backgroundColor: theme.cardDark }}
                                    />
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-3 flex justify-between items-center">
                                <div className="text-sm text-muted-foreground">
                                  Font: {theme.fontPrimary}
                                </div>
                                {theme.id !== config.selectedTheme && theme.id !== 'default' && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      confirmDelete('theme', theme.id);
                                    }}
                                    className="text-destructive hover:text-destructive/90"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="theme-create">
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="new-theme-name">Theme Name</Label>
                            <Input 
                              id="new-theme-name" 
                              value={newTheme.name}
                              onChange={(e) => setNewTheme({...newTheme, name: e.target.value})}
                              placeholder="e.g., Ocean Blue"
                              className="mb-4"
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="new-theme-primary">Primary Color</Label>
                              <div className="flex space-x-2 items-center">
                                <Input 
                                  id="new-theme-primary" 
                                  type="color"
                                  value={newTheme.primaryColor}
                                  onChange={(e) => setNewTheme({...newTheme, primaryColor: e.target.value})}
                                  className="w-12 h-8 p-0.5"
                                />
                                <Input 
                                  value={newTheme.primaryColor}
                                  onChange={(e) => setNewTheme({...newTheme, primaryColor: e.target.value})}
                                  className="flex-1"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="new-theme-secondary">Secondary Color</Label>
                              <div className="flex space-x-2 items-center">
                                <Input 
                                  id="new-theme-secondary" 
                                  type="color"
                                  value={newTheme.secondaryColor}
                                  onChange={(e) => setNewTheme({...newTheme, secondaryColor: e.target.value})}
                                  className="w-12 h-8 p-0.5"
                                />
                                <Input 
                                  value={newTheme.secondaryColor}
                                  onChange={(e) => setNewTheme({...newTheme, secondaryColor: e.target.value})}
                                  className="flex-1"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="new-theme-accent">Accent Color</Label>
                              <div className="flex space-x-2 items-center">
                                <Input 
                                  id="new-theme-accent" 
                                  type="color"
                                  value={newTheme.accentColor}
                                  onChange={(e) => setNewTheme({...newTheme, accentColor: e.target.value})}
                                  className="w-12 h-8 p-0.5"
                                />
                                <Input 
                                  value={newTheme.accentColor}
                                  onChange={(e) => setNewTheme({...newTheme, accentColor: e.target.value})}
                                  className="flex-1"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                              <Label htmlFor="new-theme-bg-light">Light Background</Label>
                              <div className="flex space-x-2 items-center">
                                <Input 
                                  id="new-theme-bg-light" 
                                  type="color"
                                  value={newTheme.backgroundLight}
                                  onChange={(e) => setNewTheme({...newTheme, backgroundLight: e.target.value})}
                                  className="w-12 h-8 p-0.5"
                                />
                                <Input 
                                  value={newTheme.backgroundLight}
                                  onChange={(e) => setNewTheme({...newTheme, backgroundLight: e.target.value})}
                                  className="flex-1"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="new-theme-bg-dark">Dark Background</Label>
                              <div className="flex space-x-2 items-center">
                                <Input 
                                  id="new-theme-bg-dark" 
                                  type="color"
                                  value={newTheme.backgroundDark}
                                  onChange={(e) => setNewTheme({...newTheme, backgroundDark: e.target.value})}
                                  className="w-12 h-8 p-0.5"
                                />
                                <Input 
                                  value={newTheme.backgroundDark}
                                  onChange={(e) => setNewTheme({...newTheme, backgroundDark: e.target.value})}
                                  className="flex-1"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="new-theme-card-light">Light Card</Label>
                              <div className="flex space-x-2 items-center">
                                <Input 
                                  id="new-theme-card-light" 
                                  type="color"
                                  value={newTheme.cardLight}
                                  onChange={(e) => setNewTheme({...newTheme, cardLight: e.target.value})}
                                  className="w-12 h-8 p-0.5"
                                />
                                <Input 
                                  value={newTheme.cardLight}
                                  onChange={(e) => setNewTheme({...newTheme, cardLight: e.target.value})}
                                  className="flex-1"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="new-theme-card-dark">Dark Card</Label>
                              <div className="flex space-x-2 items-center">
                                <Input 
                                  id="new-theme-card-dark" 
                                  type="color"
                                  value={newTheme.cardDark}
                                  onChange={(e) => setNewTheme({...newTheme, cardDark: e.target.value})}
                                  className="w-12 h-8 p-0.5"
                                />
                                <Input 
                                  value={newTheme.cardDark}
                                  onChange={(e) => setNewTheme({...newTheme, cardDark: e.target.value})}
                                  className="flex-1"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="new-theme-font-primary">Primary Font</Label>
                              <Select
                                value={newTheme.fontPrimary}
                                onValueChange={(value) => setNewTheme({...newTheme, fontPrimary: value})}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select font" />
                                </SelectTrigger>
                                <SelectContent>
                                  {config.fonts.map(font => (
                                    <SelectItem key={font} value={font}>
                                      {font}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label htmlFor="new-theme-font-secondary">Secondary Font</Label>
                              <Select
                                value={newTheme.fontSecondary}
                                onValueChange={(value) => setNewTheme({...newTheme, fontSecondary: value})}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select font" />
                                </SelectTrigger>
                                <SelectContent>
                                  {['sans-serif', 'serif', 'monospace'].map(font => (
                                    <SelectItem key={font} value={font}>
                                      {font}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <Button 
                            onClick={addTheme}
                            disabled={!newTheme.name}
                            className="w-full"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Theme
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
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
                    <ScrollArea className="h-[400px] pr-4">
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
                                onClick={() => confirmDelete('customField', key)}
                                className="text-destructive hover:text-destructive/90"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    
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
                      <Button 
                        onClick={addCustomField} 
                        disabled={!newCustomField.key || !newCustomField.value}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Field
                      </Button>
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
                      
                      <Separator />
                      
                      <h3 className="text-lg font-medium">Social Media Links</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="social-facebook">Facebook</Label>
                          <Input 
                            id="social-facebook" 
                            value={config.socialLinks.facebook}
                            onChange={(e) => updateSocialLink('facebook', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="social-twitter">Twitter</Label>
                          <Input 
                            id="social-twitter" 
                            value={config.socialLinks.twitter}
                            onChange={(e) => updateSocialLink('twitter', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="social-instagram">Instagram</Label>
                          <Input 
                            id="social-instagram" 
                            value={config.socialLinks.instagram}
                            onChange={(e) => updateSocialLink('instagram', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="social-linkedin">LinkedIn</Label>
                          <Input 
                            id="social-linkedin" 
                            value={config.socialLinks.linkedin}
                            onChange={(e) => updateSocialLink('linkedin', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <h3 className="text-lg font-medium">Footer Configuration</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="footer-logo" 
                            checked={config.footer.showLogo}
                            onCheckedChange={(checked) => updateFooterSetting('showLogo', checked)}
                          />
                          <Label htmlFor="footer-logo">Show Logo</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="footer-social" 
                            checked={config.footer.showSocialLinks}
                            onCheckedChange={(checked) => updateFooterSetting('showSocialLinks', checked)}
                          />
                          <Label htmlFor="footer-social">Show Social Links</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="footer-address" 
                            checked={config.footer.showAddress}
                            onCheckedChange={(checked) => updateFooterSetting('showAddress', checked)}
                          />
                          <Label htmlFor="footer-address">Show Address</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="footer-copyright" 
                            checked={config.footer.showCopyright}
                            onCheckedChange={(checked) => updateFooterSetting('showCopyright', checked)}
                          />
                          <Label htmlFor="footer-copyright">Show Copyright</Label>
                        </div>
                        
                        <div>
                          <Label htmlFor="footer-custom-text">Custom Footer Text</Label>
                          <Input 
                            id="footer-custom-text" 
                            value={config.footer.customText}
                            onChange={(e) => updateFooterSetting('customText', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <h3 className="text-lg font-medium">Login Page Configuration</h3>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="login-welcome-message">Welcome Message</Label>
                          <Input 
                            id="login-welcome-message" 
                            value={config.loginPage.welcomeMessage}
                            onChange={(e) => updateLoginPageSetting('welcomeMessage', e.target.value)}
                          />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="login-show-logo" 
                            checked={config.loginPage.showLogo}
                            onCheckedChange={(checked) => updateLoginPageSetting('showLogo', checked)}
                          />
                          <Label htmlFor="login-show-logo">Show Logo</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="login-allow-registration" 
                            checked={config.loginPage.allowRegistration}
                            onCheckedChange={(checked) => updateLoginPageSetting('allowRegistration', checked)}
                          />
                          <Label htmlFor="login-allow-registration">Allow Registration</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="login-allow-reset" 
                            checked={config.loginPage.allowPasswordReset}
                            onCheckedChange={(checked) => updateLoginPageSetting('allowPasswordReset', checked)}
                          />
                          <Label htmlFor="login-allow-reset">Allow Password Reset</Label>
                        </div>
                      </div>
                      
                      <Separator />
                      
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
                  <CardFooter>
                    <Button 
                      onClick={saveConfiguration}
                      className="w-full"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Appearance Settings
                    </Button>
                  </CardFooter>
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
                      Theme Preview
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
                    ? `Previewing the '${config.themes.find(t => t.id === config.selectedTheme)?.name}' theme` 
                    : "Summary of your current configuration"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {previewMode ? (
                  <div className="border rounded-md p-2 overflow-hidden">
                    <div 
                      className="rounded overflow-hidden shadow-lg" 
                      style={{ 
                        backgroundColor: isDarkMode ? getCurrentTheme().backgroundDark : getCurrentTheme().backgroundLight,
                        color: isDarkMode ? 'white' : 'black',
                        fontFamily: getCurrentTheme().fontPrimary
                      }}
                    >
                      {/* Simulated header */}
                      <div 
                        className="p-3 flex justify-between items-center border-b"
                        style={{ 
                          backgroundColor: getCurrentTheme().primaryColor, 
                          color: 'white' 
                        }}
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
                      <div 
                        className="p-3 text-center"
                        style={{ 
                          backgroundColor: isDarkMode ? getCurrentTheme().cardDark : getCurrentTheme().cardLight 
                        }}
                      >
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
                              <div 
                                key={feature.id} 
                                className="border rounded p-1 text-xs"
                                style={{ borderColor: getCurrentTheme().secondaryColor }}
                              >
                                {feature.name}
                              </div>
                            ))}
                        </div>
                      </div>
                      
                      {/* Simulated footer */}
                      <div 
                        className="p-2 text-xs border-t text-center"
                        style={{ backgroundColor: getCurrentTheme().secondaryColor, color: 'white' }}
                      >
                        &copy; 2025 {config.name}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-1">Theme Colors</h4>
                      <div className="flex space-x-2 mb-3">
                        <div 
                          className="w-6 h-6 rounded-full border" 
                          style={{ backgroundColor: getCurrentTheme().primaryColor }}
                          title="Primary Color"
                        />
                        <div 
                          className="w-6 h-6 rounded-full border" 
                          style={{ backgroundColor: getCurrentTheme().secondaryColor }}
                          title="Secondary Color"
                        />
                        <div 
                          className="w-6 h-6 rounded-full border" 
                          style={{ backgroundColor: getCurrentTheme().accentColor }}
                          title="Accent Color"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div>
                          <div className="text-xs text-muted-foreground">Light Backgrounds</div>
                          <div className="flex space-x-1 mt-1">
                            <div 
                              className="w-6 h-6 rounded border"
                              style={{ backgroundColor: getCurrentTheme().backgroundLight }}
                              title="Background Light"
                            />
                            <div 
                              className="w-6 h-6 rounded border"
                              style={{ backgroundColor: getCurrentTheme().cardLight }}
                              title="Card Light"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Dark Backgrounds</div>
                          <div className="flex space-x-1 mt-1">
                            <div 
                              className="w-6 h-6 rounded border"
                              style={{ backgroundColor: getCurrentTheme().backgroundDark }}
                              title="Background Dark"
                            />
                            <div 
                              className="w-6 h-6 rounded border"
                              style={{ backgroundColor: getCurrentTheme().cardDark }}
                              title="Card Dark"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        Font: <span className="font-medium">{getCurrentTheme().fontPrimary}</span>
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
                      <h3 className="text-sm font-medium text-muted-foreground">Active Theme</h3>
                      <p className="text-lg font-bold">
                        {config.themes.find(t => t.id === config.selectedTheme)?.name}
                      </p>
                      <div className="mt-1 flex space-x-1">
                        <div 
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: getCurrentTheme().primaryColor }}
                        />
                        <div 
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: getCurrentTheme().secondaryColor }}
                        />
                        <div 
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: getCurrentTheme().accentColor }}
                        />
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
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this item?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default ConfigurationManager;
