import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Search,
  Plus,
  Check,
  X,
  Users,
  CalendarDays,
  MapPin,
  MoreHorizontal,
  Pencil,
  Trash2
} from "lucide-react";
import { ClubActivity } from "@/types/dashboard";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

// Mock data for clubs and activities - explicitly typed to match ClubActivity
const mockActivities: ClubActivity[] = [
  {
    id: "1",
    name: "Chess Club",
    description: "Learn and practice chess strategies with peers and teachers.",
    schedule: "Monday, 3:30 PM - 5:00 PM",
    location: "Room 105",
    members: 18,
    status: "active"
  },
  {
    id: "2",
    name: "Debate Team",
    description: "Develop public speaking and debate skills through competitions and practice.",
    schedule: "Tuesday and Thursday, 4:00 PM - 6:00 PM",
    location: "Auditorium",
    members: 24,
    status: "active"
  },
  {
    id: "3",
    name: "Science Olympiad",
    description: "Prepare for science competitions and explore advanced topics.",
    schedule: "Wednesday, 3:30 PM - 5:30 PM",
    location: "Science Lab 1",
    members: 15,
    status: "active"
  },
  {
    id: "4",
    name: "Photography Club",
    description: "Learn photography techniques and go on photo walks around campus.",
    schedule: "Friday, 3:30 PM - 5:00 PM",
    location: "Art Room",
    members: 12,
    status: "active"
  },
  {
    id: "5",
    name: "Drama Club",
    description: "Practice acting and participate in school performances.",
    schedule: "Monday and Wednesday, 4:00 PM - 6:00 PM",
    location: "Theater",
    members: 30,
    status: "active"
  },
  {
    id: "6",
    name: "Basketball Team",
    description: "School basketball team for competitive games.",
    schedule: "Tuesday and Thursday, 3:30 PM - 5:30 PM",
    location: "Gym",
    members: 15,
    status: "active"
  },
  {
    id: "7",
    name: "Coding Club",
    description: "Learn programming and work on coding projects.",
    schedule: "Thursday, 3:30 PM - 5:00 PM",
    location: "Computer Lab",
    members: 20,
    status: "active"
  },
  {
    id: "8",
    name: "Environmental Club",
    description: "Work on sustainability initiatives around the school.",
    schedule: "Every other Friday, 3:30 PM - 4:30 PM",
    location: "Room 202",
    members: 14,
    status: "inactive"
  }
];

const ClubActivities = () => {
  const [activities, setActivities] = useState<ClubActivity[]>(mockActivities);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  
  // Define newActivity with explicitly typed status as a union type
  const [newActivity, setNewActivity] = useState<{
    name: string;
    description: string;
    schedule: string;
    location: string;
    members: number;
    status: "active" | "inactive"; // Explicitly use the union type
  }>({
    name: "",
    description: "",
    schedule: "",
    location: "",
    members: 0,
    status: "active"
  });
  
  // Filter activities based on search and filter criteria
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = 
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? activity.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });
  
  // Calculate statistics
  const totalActiveMembers = activities
    .filter(act => act.status === "active")
    .reduce((sum, act) => sum + act.members, 0);
  
  const totalActivities = activities.length;
  const activeActivities = activities.filter(a => a.status === "active").length;
  
  // Add new activity handler
  const handleAddActivity = () => {
    if (!newActivity.name || !newActivity.schedule || !newActivity.location) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Activity name, schedule, and location are required.",
      });
      return;
    }
    
    // Create new activity with proper typing
    const newActivityWithId: ClubActivity = {
      id: (activities.length + 1).toString(),
      name: newActivity.name,
      description: newActivity.description,
      schedule: newActivity.schedule,
      location: newActivity.location,
      members: newActivity.members,
      status: newActivity.status // This is now correctly typed as "active" | "inactive"
    };
    
    setActivities([...activities, newActivityWithId]);
    
    setIsAddingActivity(false);
    setNewActivity({
      name: "",
      description: "",
      schedule: "",
      location: "",
      members: 0,
      status: "active"
    });
    
    toast({
      title: "Activity Added",
      description: `${newActivity.name} has been added successfully.`,
    });
  };
  
  // Delete activity handler
  const handleDeleteActivity = (id: string) => {
    const updatedActivities = activities.filter(activity => activity.id !== id);
    setActivities(updatedActivities);
    
    toast({
      title: "Activity Deleted",
      description: "The activity has been deleted successfully.",
    });
  };
  
  // Toggle activity status handler
  const handleToggleStatus = (id: string) => {
    const updatedActivities = activities.map(activity => 
      activity.id === id 
        ? { ...activity, status: activity.status === "active" ? "inactive" : "active" as "active" | "inactive" }
        : activity
    );
    
    setActivities(updatedActivities);
    
    const activity = activities.find(a => a.id === id);
    const newStatus = activity?.status === "active" ? "inactive" : "active";
    
    toast({
      title: `Activity ${newStatus === "active" ? "Activated" : "Deactivated"}`,
      description: `${activity?.name} is now ${newStatus}.`,
    });
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="Clubs & Activities" />
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalActivities}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {activeActivities} active, {totalActivities - activeActivities} inactive
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Active Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalActiveMembers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Students in clubs & activities
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Participation Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Of total student enrollment
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Clubs & Activities</CardTitle>
                <CardDescription>Manage extracurricular activities and clubs</CardDescription>
              </div>
              <Dialog open={isAddingActivity} onOpenChange={setIsAddingActivity}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Activity
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Club/Activity</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new extracurricular activity.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="activity-name">Activity Name</Label>
                      <Input 
                        id="activity-name" 
                        placeholder="e.g., Chess Club"
                        value={newActivity.name}
                        onChange={(e) => setNewActivity({...newActivity, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Describe the activity..."
                        value={newActivity.description}
                        onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                        className="min-h-[80px]"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="schedule">Schedule</Label>
                      <Input 
                        id="schedule" 
                        placeholder="e.g., Monday, 3:30 PM - 5:00 PM"
                        value={newActivity.schedule}
                        onChange={(e) => setNewActivity({...newActivity, schedule: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        placeholder="e.g., Room 105"
                        value={newActivity.location}
                        onChange={(e) => setNewActivity({...newActivity, location: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="members">Initial Members</Label>
                        <Input 
                          id="members" 
                          type="number" 
                          min={0}
                          value={newActivity.members}
                          onChange={(e) => setNewActivity({...newActivity, members: parseInt(e.target.value) || 0})}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <div className="flex items-center space-x-2 pt-2">
                          <Switch 
                            id="status"
                            checked={newActivity.status === "active"}
                            onCheckedChange={(checked) => setNewActivity({
                              ...newActivity, 
                              status: checked ? "active" : "inactive"
                            })}
                          />
                          <Label htmlFor="status">
                            {newActivity.status === "active" ? "Active" : "Inactive"}
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddingActivity(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddActivity}>
                      Add Activity
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search activities..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="sm:w-[180px]">
                <Select
                  onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}
                  defaultValue="all"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{activity.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {activity.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{activity.schedule}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{activity.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{activity.members}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {activity.status === "active" ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                          <Check className="h-3.5 w-3.5 mr-1" />
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                          <X className="h-3.5 w-3.5 mr-1" />
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => {
                            toast({
                              title: "Edit Activity",
                              description: `Editing ${activity.name}`,
                            });
                          }}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleStatus(activity.id)}>
                            {activity.status === "active" ? (
                              <>
                                <X className="h-4 w-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteActivity(activity.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredActivities.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No activities found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClubActivities;
