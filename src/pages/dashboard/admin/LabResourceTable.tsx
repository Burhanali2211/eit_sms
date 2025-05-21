
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Monitor, 
  Search,
  MoreHorizontal,
  Pencil, 
  Wrench, 
  Trash2, 
  Microscope 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Lab resource type definition
export interface LabResource {
  id: string;
  name: string;
  type: string;
  quantity: number;
  available: number;
  location: string;
  lastMaintenance: string;
}

interface LabResourceTableProps {
  resources: LabResource[];
  onScheduleMaintenance: (id: string) => Promise<void>;
  onDeleteResource: (id: string) => Promise<void>;
}

const LabResourceTable = ({ 
  resources, 
  onScheduleMaintenance, 
  onDeleteResource 
}: LabResourceTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);

  // Filter resources based on search and filter criteria
  const filteredResources = resources ? resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        resource.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType ? resource.type === filterType : true;
    return matchesSearch && matchesType;
  }) : [];
  
  // Resource types
  const resourceTypes = ["Science", "Technology", "Art", "Sports", "Music"];

  return (
    <>
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
                      <DropdownMenuItem onClick={() => onScheduleMaintenance(resource.id)}>
                        <Wrench className="h-4 w-4 mr-2" />
                        Schedule Maintenance
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600 dark:text-red-400"
                        onClick={() => onDeleteResource(resource.id)}
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
    </>
  );
};

export default LabResourceTable;
