
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AddResourceDialogProps {
  resourceTypes: string[];
  onAddResource: (resource: NewResource) => Promise<void>;
}

export interface NewResource {
  name: string;
  type: string;
  quantity: number;
  available: number;
  location: string;
  lastMaintenance: string;
}

const AddResourceDialog = ({ resourceTypes, onAddResource }: AddResourceDialogProps) => {
  const [isAddingResource, setIsAddingResource] = useState(false);
  const [newResource, setNewResource] = useState<NewResource>({
    name: "",
    type: "Science",
    quantity: 1,
    available: 1,
    location: "",
    lastMaintenance: new Date().toISOString().split('T')[0]
  });
  
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
      await onAddResource({
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

  return (
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
  );
};

export default AddResourceDialog;
