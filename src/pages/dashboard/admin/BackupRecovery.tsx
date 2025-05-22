import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  DatabaseBackup,
  Calendar,
  Clock,
  Download,
  Trash2,
  UploadCloud,
  FileArchive,
  Check,
  AlertTriangle,
  HardDrive,
  Lock,
  Play,
  Settings,
  RefreshCw,
  Database,
  Plus,
  BellRing,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

// Types
interface Backup {
  id: string;
  name: string;
  date: string;
  time: string;
  type: 'full' | 'incremental';
  size: string;
  status: 'completed' | 'failed' | 'in-progress';
  nodes?: string[];
}

interface BackupSchedule {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  retention: string;
  time: string;
  lastRun?: string;
  nextRun: string;
  enabled: boolean;
}

// Mock data
const mockBackups: Backup[] = [
  {
    id: '1',
    name: 'Full System Backup',
    date: '2025-05-17',
    time: '23:00',
    type: 'full',
    size: '1.2 GB',
    status: 'completed'
  },
  {
    id: '2',
    name: 'Database Backup',
    date: '2025-05-17',
    time: '18:00',
    type: 'full',
    size: '450 MB',
    status: 'completed'
  },
  {
    id: '3',
    name: 'User Data Backup',
    date: '2025-05-17',
    time: '12:00',
    type: 'incremental',
    size: '85 MB',
    status: 'completed'
  },
  {
    id: '4',
    name: 'Content Files Backup',
    date: '2025-05-16',
    time: '23:00',
    type: 'incremental',
    size: '124 MB',
    status: 'completed'
  },
  {
    id: '5',
    name: 'Configuration Backup',
    date: '2025-05-16',
    time: '18:00',
    type: 'full',
    size: '12 MB',
    status: 'completed'
  },
  {
    id: '6',
    name: 'Full System Backup',
    date: '2025-05-16',
    time: '03:00',
    type: 'full',
    size: '1.1 GB',
    status: 'failed',
    nodes: ['Database connection timeout', 'Insufficient storage space']
  },
  {
    id: '7',
    name: 'Media Library Backup',
    date: '2025-05-15',
    time: '23:00',
    type: 'incremental',
    size: '340 MB',
    status: 'completed'
  }
];

const mockSchedules: BackupSchedule[] = [
  {
    id: '1',
    name: 'Full System Backup',
    frequency: 'daily',
    retention: '7 days',
    time: '23:00',
    lastRun: '2025-05-17 23:00',
    nextRun: '2025-05-18 23:00',
    enabled: true
  },
  {
    id: '2',
    name: 'Database Backup',
    frequency: 'daily',
    retention: '14 days',
    time: '18:00',
    lastRun: '2025-05-17 18:00',
    nextRun: '2025-05-18 18:00',
    enabled: true
  },
  {
    id: '3',
    name: 'User Data Backup',
    frequency: 'daily',
    retention: '7 days',
    time: '12:00',
    lastRun: '2025-05-17 12:00',
    nextRun: '2025-05-18 12:00',
    enabled: true
  },
  {
    id: '4',
    name: 'Configuration Backup',
    frequency: 'weekly',
    retention: '30 days',
    time: '18:00',
    lastRun: '2025-05-16 18:00',
    nextRun: '2025-05-23 18:00',
    enabled: true
  },
  {
    id: '5',
    name: 'Media Library Backup',
    frequency: 'weekly',
    retention: '14 days',
    time: '23:00',
    lastRun: '2025-05-15 23:00',
    nextRun: '2025-05-22 23:00',
    enabled: false
  }
];

const BackupRecovery = () => {
  const [activeTab, setActiveTab] = useState<string>('backups');
  const [backupInProgress, setBackupInProgress] = useState<boolean>(false);
  const [backupProgress, setBackupProgress] = useState<number>(0);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState<boolean>(false);
  const [selectedBackup, setSelectedBackup] = useState<Backup | null>(null);
  const [schedules, setSchedules] = useState<BackupSchedule[]>(mockSchedules);
  const [createScheduleOpen, setCreateScheduleOpen] = useState<boolean>(false);
  const [newSchedule, setNewSchedule] = useState<Partial<BackupSchedule>>({
    name: '',
    frequency: 'daily',
    retention: '7 days',
    time: '00:00',
    enabled: true
  });

  // Start backup handler
  const handleStartBackup = () => {
    if (backupInProgress) return;
    
    setBackupInProgress(true);
    setBackupProgress(0);
    
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setBackupInProgress(false);
          
          toast({
            title: "Backup Completed",
            description: "Full system backup has been created successfully."
          });
          
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };

  // Handle restore
  const handleRestore = () => {
    if (!selectedBackup) return;
    
    setRestoreDialogOpen(false);
    
    toast({
      title: "Restore Started",
      description: `Restoring system from backup: ${selectedBackup.name}`
    });
  };

  // Toggle schedule status
  const toggleScheduleStatus = (id: string) => {
    setSchedules(prev => 
      prev.map(schedule => 
        schedule.id === id 
          ? { ...schedule, enabled: !schedule.enabled } 
          : schedule
      )
    );
    
    const schedule = schedules.find(s => s.id === id);
    
    if (schedule) {
      toast({
        title: schedule.enabled ? "Schedule Disabled" : "Schedule Enabled",
        description: `Backup schedule "${schedule.name}" has been ${schedule.enabled ? 'disabled' : 'enabled'}.`
      });
    }
  };

  // Handle create schedule
  const handleCreateSchedule = () => {
    if (!newSchedule.name) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Schedule name is required."
      });
      return;
    }
    
    const now = new Date();
    const nextRun = new Date();
    const [hours, minutes] = newSchedule.time?.split(':') || ['00', '00'];
    nextRun.setHours(parseInt(hours), parseInt(minutes), 0);
    
    if (nextRun <= now) {
      nextRun.setDate(nextRun.getDate() + 1);
    }
    
    const schedule: BackupSchedule = {
      id: (schedules.length + 1).toString(),
      name: newSchedule.name,
      frequency: newSchedule.frequency as 'daily' | 'weekly' | 'monthly',
      retention: newSchedule.retention || '7 days',
      time: newSchedule.time || '00:00',
      nextRun: nextRun.toISOString().split('T')[0] + ' ' + newSchedule.time,
      enabled: newSchedule.enabled || true
    };
    
    setSchedules([...schedules, schedule]);
    setCreateScheduleOpen(false);
    
    toast({
      title: "Schedule Created",
      description: `Backup schedule "${schedule.name}" has been created.`
    });
    
    // Reset form
    setNewSchedule({
      name: '',
      frequency: 'daily',
      retention: '7 days',
      time: '00:00',
      enabled: true
    });
  };

  return (
    <DashboardLayout>
      <DashboardHeader 
        title="Backup & Recovery" 
        description="Manage system backups and data recovery"
      />
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="backups">Backups</TabsTrigger>
            <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="backups" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Backups
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockBackups.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Available for recovery
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Latest Backup
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-medium">
                    {mockBackups[0].date} {mockBackups[0].time}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Check className="h-3.5 w-3.5 mr-1 text-green-500" />
                    {mockBackups[0].name}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Storage Used
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.4 GB</div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>42% of quota</span>
                    <span>8 GB allocated</span>
                  </div>
                  <Progress value={42} className="h-1 mt-2" />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Backup History</CardTitle>
                    <CardDescription>View and manage system backups</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={handleStartBackup}
                      disabled={backupInProgress}
                    >
                      <UploadCloud className="h-4 w-4 mr-2" />
                      Create Backup
                    </Button>
                  </div>
                </div>
                
                {backupInProgress && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Creating full system backup...</span>
                      <span>{backupProgress}%</span>
                    </div>
                    <Progress value={backupProgress} className="h-2" />
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBackups.map((backup) => (
                      <TableRow key={backup.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <FileArchive className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{backup.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center text-sm">
                              <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              {backup.date}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              {backup.time}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={backup.type === 'full' ? "secondary" : "outline"}>
                            {backup.type === 'full' ? 'Full' : 'Incremental'}
                          </Badge>
                        </TableCell>
                        <TableCell>{backup.size}</TableCell>
                        <TableCell>
                          {backup.status === 'completed' ? (
                            <span className="inline-flex items-center text-green-600">
                              <Check className="h-4 w-4 mr-1" />
                              Completed
                            </span>
                          ) : backup.status === 'failed' ? (
                            <span className="inline-flex items-center text-red-600">
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              Failed
                            </span>
                          ) : (
                            <span className="inline-flex items-center text-blue-600">
                              <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                              In Progress
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                toast({
                                  title: "Downloading Backup",
                                  description: `Preparing ${backup.name} for download.`
                                });
                              }}
                            >
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              disabled={backup.status !== 'completed'}
                              onClick={() => {
                                setSelectedBackup(backup);
                                setRestoreDialogOpen(true);
                              }}
                            >
                              <Play className="h-4 w-4" />
                              <span className="sr-only">Restore</span>
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                toast({
                                  title: "Backup Deleted",
                                  description: `${backup.name} has been deleted.`
                                });
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Dialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Restore</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to restore the system from this backup? This action cannot be undone and will replace current data.
                  </DialogDescription>
                </DialogHeader>
                
                {selectedBackup && (
                  <div className="py-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center">
                        <FileArchive className="h-5 w-5 mr-2 text-primary" />
                        <div className="font-medium">{selectedBackup.name}</div>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        <div>Date: {selectedBackup.date} {selectedBackup.time}</div>
                        <div>Type: {selectedBackup.type === 'full' ? 'Full Backup' : 'Incremental Backup'}</div>
                        <div>Size: {selectedBackup.size}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-sm text-amber-600 rounded-md bg-amber-50 border border-amber-200 p-3 flex items-start">
                      <AlertTriangle className="h-4 w-4 mr-2 mt-0.5" />
                      <div>
                        <strong>Warning:</strong> Restoring from a backup will replace all current data and settings. The system will be unavailable during the restore process.
                      </div>
                    </div>
                  </div>
                )}
                
                <DialogFooter>
                  <Button 
                    variant="outline"
                    onClick={() => setRestoreDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleRestore}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Restore System
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>
          
          <TabsContent value="scheduling" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Backup Schedules</CardTitle>
                    <CardDescription>Configure automated backup schedules</CardDescription>
                  </div>
                  <Dialog open={createScheduleOpen} onOpenChange={setCreateScheduleOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Schedule
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create Backup Schedule</DialogTitle>
                        <DialogDescription>
                          Configure a new automated backup schedule
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Schedule Name</Label>
                          <Input 
                            id="name"
                            placeholder="Enter schedule name"
                            value={newSchedule.name}
                            onChange={(e) => setNewSchedule({...newSchedule, name: e.target.value})}
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="frequency">Frequency</Label>
                          <Select
                            value={newSchedule.frequency}
                            onValueChange={(value) => setNewSchedule({...newSchedule, frequency: value as any})}
                          >
                            <SelectTrigger id="frequency">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="time">Time</Label>
                          <Input 
                            id="time"
                            type="time"
                            value={newSchedule.time}
                            onChange={(e) => setNewSchedule({...newSchedule, time: e.target.value})}
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="retention">Retention Period</Label>
                          <Select
                            value={newSchedule.retention}
                            onValueChange={(value) => setNewSchedule({...newSchedule, retention: value})}
                          >
                            <SelectTrigger id="retention">
                              <SelectValue placeholder="Select retention period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="7 days">7 Days</SelectItem>
                              <SelectItem value="14 days">14 Days</SelectItem>
                              <SelectItem value="30 days">30 Days</SelectItem>
                              <SelectItem value="90 days">90 Days</SelectItem>
                              <SelectItem value="1 year">1 Year</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Label htmlFor="enabled">Enabled</Label>
                          <Switch 
                            id="enabled"
                            checked={newSchedule.enabled}
                            onCheckedChange={(checked) => setNewSchedule({...newSchedule, enabled: checked})}
                          />
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button 
                          variant="outline"
                          onClick={() => setCreateScheduleOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleCreateSchedule}>
                          Create Schedule
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Retention</TableHead>
                      <TableHead>Next Run</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedules.map((schedule) => (
                      <TableRow key={schedule.id}>
                        <TableCell>
                          <div className="font-medium">{schedule.name}</div>
                        </TableCell>
                        <TableCell className="capitalize">{schedule.frequency}</TableCell>
                        <TableCell>{schedule.time}</TableCell>
                        <TableCell>{schedule.retention}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div>{schedule.nextRun}</div>
                            {schedule.lastRun && (
                              <div className="text-xs text-muted-foreground">
                                Last run: {schedule.lastRun}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={schedule.enabled ? "outline" : "secondary"} className={
                            schedule.enabled 
                              ? "bg-green-100 text-green-800 hover:bg-green-100" 
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }>
                            {schedule.enabled ? 'Enabled' : 'Disabled'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => toggleScheduleStatus(schedule.id)}
                            >
                              {schedule.enabled ? 'Disable' : 'Enable'}
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                toast({
                                  title: "Schedule Deleted",
                                  description: `${schedule.name} has been deleted.`
                                });
                                setSchedules(schedules.filter(s => s.id !== schedule.id));
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Backup Settings</CardTitle>
                <CardDescription>Configure backup and recovery preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="storage">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <HardDrive className="h-4 w-4 mr-2" />
                        Storage Configuration
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div className="grid gap-2">
                          <Label htmlFor="storage-location">Backup Storage Location</Label>
                          <Select defaultValue="local">
                            <SelectTrigger id="storage-location">
                              <SelectValue placeholder="Select storage location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="local">Local Storage</SelectItem>
                              <SelectItem value="cloud">Cloud Storage</SelectItem>
                              <SelectItem value="network">Network Storage</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="storage-quota">Storage Quota (GB)</Label>
                          <Input id="storage-quota" type="number" defaultValue="8" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="auto-cleanup">Auto-cleanup old backups</Label>
                          <Switch id="auto-cleanup" defaultChecked />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="encryption">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <Lock className="h-4 w-4 mr-2" />
                        Encryption Settings
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="enable-encryption">Enable Backup Encryption</Label>
                          <Switch id="enable-encryption" defaultChecked />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="encryption-algorithm">Encryption Algorithm</Label>
                          <Select defaultValue="aes-256">
                            <SelectTrigger id="encryption-algorithm">
                              <SelectValue placeholder="Select algorithm" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="aes-256">AES-256</SelectItem>
                              <SelectItem value="aes-128">AES-128</SelectItem>
                              <SelectItem value="twofish">Twofish</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="key-management">Key Management</Label>
                          <Select defaultValue="system">
                            <SelectTrigger id="key-management">
                              <SelectValue placeholder="Select key management" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="system">System Managed</SelectItem>
                              <SelectItem value="custom">Custom Key</SelectItem>
                              <SelectItem value="kms">Key Management Service</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="notifications">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <BellRing className="h-4 w-4 mr-2" />
                        Notification Settings
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <Switch id="email-notifications" defaultChecked />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="notification-email">Notification Email</Label>
                          <Input id="notification-email" type="email" defaultValue="admin@example.com" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Notify On</Label>
                          <div className="grid grid-cols-1 gap-2">
                            <div className="flex items-center gap-2">
                              <Checkbox id="notify-success" defaultChecked />
                              <Label htmlFor="notify-success" className="text-sm">Backup Success</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox id="notify-failure" defaultChecked />
                              <Label htmlFor="notify-failure" className="text-sm">Backup Failure</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox id="notify-restore" defaultChecked />
                              <Label htmlFor="notify-restore" className="text-sm">System Restore</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox id="notify-quota" defaultChecked />
                              <Label htmlFor="notify-quota" className="text-sm">Storage Quota Warning</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="advanced">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Advanced Settings
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div className="grid gap-2">
                          <Label htmlFor="compression-level">Compression Level</Label>
                          <Select defaultValue="optimal">
                            <SelectTrigger id="compression-level">
                              <SelectValue placeholder="Select compression level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="fast">Fast</SelectItem>
                              <SelectItem value="optimal">Optimal</SelectItem>
                              <SelectItem value="maximum">Maximum</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="differential-backups">Enable Differential Backups</Label>
                          <Switch id="differential-backups" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="backup-verification">Verify Backups After Creation</Label>
                          <Switch id="backup-verification" defaultChecked />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="concurrent-backups">Max Concurrent Backups</Label>
                          <Input id="concurrent-backups" type="number" defaultValue="2" />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
              <CardFooter className="border-t pt-6 flex justify-end">
                <Button
                  onClick={() => {
                    toast({
                      title: "Settings Saved",
                      description: "Your backup settings have been updated."
                    });
                  }}
                >
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BackupRecovery;
