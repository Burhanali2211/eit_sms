
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Monitor,
  Search,
  Plus,
  Filter,
  Microscope,
  Wrench,
  Trash2,
  MoreHorizontal,
  Pencil
} from "lucide-react";
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
import { useDatabaseTable, useDatabaseView } from "@/hooks/use-database-connection";

// Lab resource type definition
interface LabResource {
  id: string;
  name: string;
  type: string;
  quantity: number;
  available: number;
  location: string;
  lastMaintenance: string;
}

const LabResources = () => {
  // Get lab resources from database
  const { 
    data: resources, 
    isLoading: resourcesLoading, 
    error: resourcesError,
    create: createResource,
    update: updateResource,
    remove: removeResource,
    refresh: refreshResources
  } = useDatabaseTable<LabResource>("lab_resources");
  
  // Get additional dashboard stats from database view
  const {
    data: dashboardStats,
    isLoading: statsLoading,
    error: statsError
  } = useDatabaseView("lab_resources_dashboard_view", {}, {}, 60000);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [isAddingResource, setIsAddingResource] = useState(false);
  const [newResource, setNewResource] = useState({
    name: "",
    type: "Science",
    quantity: 1,
    available: 1,
    location: "",
    lastMaintenance: new Date().toISOString().split('T')[0]
  });
  
  // Filter resources based on search and filter criteria
  const filteredResources = resources ? resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          resource.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType ? resource.type === filterType : true;
    return matchesSearch && matchesType;
  }) : [];
  
  // Resource types
  const resourceTypes = ["Science", "Technology", "Art", "Sports", "Music"];
  
  // Location options from available resources
  const locations = resources ? [...new Set(resources.map(resource => resource.location))] : [];
  
  // Add new resource handler
  const handleAddResource = async () => {
    if (!newResource.name || !newResource.location) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Resource name and location are required.",
      });
      return;
    }
    
    try {
      await createResource({
        ...newResource,
        available: Math.min(newResource.quantity, newResource.available)
      });
      
      // Reset form and close dialog
      setIsAddingResource(false);
      setNewResource({
        name: "",
        type: "Science",
        quantity: 1,
        available: 1,
        location: "",
        lastMaintenance: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error("Error adding resource:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add resource. Please try again.",
      });
    }
  };
  
  // Delete resource handler
  const handleDeleteResource = async (id: string) => {
    try {
      await removeResource(id);
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete resource. Please try again.",
      });
    }
  };
  
  // Schedule maintenance handler
  const handleScheduleMaintenance = async (id: string) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      await updateResource(id, { lastMaintenance: today });
      toast({
        title: "Maintenance Scheduled",
        description: "Maintenance has been scheduled for today.",
      });
    } catch (error) {
      console.error("Error scheduling maintenance:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to schedule maintenance. Please try again.",
      });
    }
  };
  
  // Calculate dashboard stats
  const totalResources = resources ? resources.length : 0;
  const totalItems = resources ? resources.reduce((sum, r) => sum + r.quantity, 0) : 0;
  const availableItems = resources ? resources.reduce((sum, r) => sum + r.available, 0) : 0;
  const inUseItems = resources ? resources.reduce((sum, r) => sum + (r.quantity - r.available), 0) : 0;
  const needsMaintenance = resources ? resources.filter(r => {
    const lastMaintenance = new Date(r.lastMaintenance || "");
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return lastMaintenance < threeMonthsAgo;
  }).length : 0;
  
  if (resourcesLoading) {
    return (
      <DashboardLayout>
        <DashboardHeader title="Lab Resources" />
        <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading resources...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardHeader title="Lab Resources" />
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalResources} types</div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalItems} total items
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Available Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {availableItems} items
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Ready for use
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                In Use
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inUseItems} items
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Currently checked out
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Needs Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {needsMaintenance} items
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Over 3 months since last check
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Lab Resources Inventory</CardTitle>
                <CardDescription>Manage equipment and materials for school labs</CardDescription>
              </div>
              <Dialog open={isAddingResource} onOpenChange={setIsAddingResource}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Resource
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Lab Resource</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new lab resource or equipment.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="resource-name">Resource Name</Label>
                      <Input 
                        id="resource-name" 
                        placeholder="e.g., Microscope Set"
                        value={newResource.name}
                        onChange={(e) => setNewResource({...newResource, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="resource-type">Type</Label>
                        <Select 
                          value={newResource.type}
                          onValueChange={(value) => setNewResource({...newResource, type: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {resourceTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="resource-location">Location</Label>
                        <Input 
                          id="resource-location" 
                          placeholder="e.g., Science Lab 1"
                          value={newResource.location}
                          onChange={(e) => setNewResource({...newResource, location: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input 
                          id="quantity" 
                          type="number" 
                          min={1}
                          value={newResource.quantity}
                          onChange={(e) => setNewResource({
                            ...newResource, 
                            quantity: parseInt(e.target.value), 
                            available: Math.min(parseInt(e.target.value), newResource.available)
                          })}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="available">Available</Label>
                        <Input 
                          id="available" 
                          type="number"
                          min={0}
                          max={newResource.quantity}
                          value={newResource.available}
                          onChange={(e) => setNewResource({
                            ...newResource, 
                            available: Math.min(parseInt(e.target.value), newResource.quantity)
                          })}
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="maintenance">Last Maintenance Date</Label>
                      <Input 
                        id="maintenance" 
                        type="date"
                        value={newResource.lastMaintenance}
                        onChange={(e) => setNewResource({...newResource, lastMaintenance: e.target.value})}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddingResource(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddResource}>
                      Add Resource
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
                  placeholder="Search resources..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="sm:w-[180px]">
                <Select
                  onValueChange={(value) => setFilterType(value === "all" ? null : value)}
                  defaultValue="all"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {resourceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Resource</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Maintenance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResources.length > 0 ? (
                  filteredResources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {resource.type === "Science" ? (
                            <Microscope className="h-4 w-4 mr-2 text-purple-500" />
                          ) : resource.type === "Technology" ? (
                            <Monitor className="h-4 w-4 mr-2 text-blue-500" />
                          ) : (
                            <div className="w-4 h-4 mr-2" />
                          )}
                          {resource.name}
                        </div>
                      </TableCell>
                      <TableCell>{resource.type}</TableCell>
                      <TableCell>{resource.location}</TableCell>
                      <TableCell>
                        {resource.available}/{resource.quantity}
                      </TableCell>
                      <TableCell>
                        {resource.available === 0 ? (
                          <Badge variant="destructive">Out of Stock</Badge>
                        ) : resource.available < resource.quantity / 2 ? (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 hover:bg-yellow-100 dark:hover:bg-yellow-900">Low Stock</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-900">Available</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {resource.lastMaintenance ? resource.lastMaintenance : "Not recorded"}
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
                                title: "Edit Resource",
                                description: `Editing ${resource.name}`,
                              });
                            }}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleScheduleMaintenance(resource.id)}>
                              <Wrench className="h-4 w-4 mr-2" />
                              Schedule Maintenance
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600 dark:text-red-400"
                              onClick={() => handleDeleteResource(resource.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      {searchTerm || filterType ? 'No resources found matching your search.' : 'No resources available. Add some using the button above.'}
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

export default LabResources;
