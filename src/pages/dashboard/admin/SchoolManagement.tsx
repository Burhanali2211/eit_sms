
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  School,
  Building,
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  Plus,
  Pencil,
  Trash2,
  MoreHorizontal,
  RefreshCw,
  UserPlus,
  Save,
  Globe,
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock class data
const mockClassrooms = [
  { id: "1", name: "Room 101", capacity: 30, building: "Main Building", floor: 1, features: ["Projector", "Whiteboard"] },
  { id: "2", name: "Room 102", capacity: 25, building: "Main Building", floor: 1, features: ["Whiteboard"] },
  { id: "3", name: "Room 201", capacity: 35, building: "Main Building", floor: 2, features: ["Projector", "Whiteboard", "Computers"] },
  { id: "4", name: "Room 202", capacity: 40, building: "Main Building", floor: 2, features: ["Projector", "Whiteboard", "Smart Board"] },
  { id: "5", name: "Science Lab 1", capacity: 20, building: "Science Wing", floor: 1, features: ["Lab Equipment", "Whiteboard", "Sink"] },
  { id: "6", name: "Computer Lab", capacity: 30, building: "Technology Wing", floor: 1, features: ["Computers", "Projector", "Printer"] },
  { id: "7", name: "Library", capacity: 50, building: "Main Building", floor: 1, features: ["Bookshelves", "Study Desks", "Computers"] },
  { id: "8", name: "Auditorium", capacity: 200, building: "Arts Wing", floor: 1, features: ["Stage", "Sound System", "Seating"] },
];

// Mock academic year data
const mockAcademicYears = [
  { id: "1", name: "2023-2024", start: "2023-08-15", end: "2024-05-30", current: true },
  { id: "2", name: "2022-2023", start: "2022-08-16", end: "2023-05-31", current: false },
  { id: "3", name: "2021-2022", start: "2021-08-15", end: "2022-05-30", current: false },
];

// Mock terms data
const mockTerms = [
  { id: "1", name: "Fall 2023", start: "2023-08-15", end: "2023-12-20", academicYear: "2023-2024", current: true },
  { id: "2", name: "Spring 2024", start: "2024-01-08", end: "2024-05-30", academicYear: "2023-2024", current: false },
  { id: "3", name: "Fall 2022", start: "2022-08-16", end: "2022-12-21", academicYear: "2022-2023", current: false },
  { id: "4", name: "Spring 2023", start: "2023-01-09", end: "2023-05-31", academicYear: "2022-2023", current: false },
];

const SchoolManagement = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [schoolInfo, setSchoolInfo] = useState({
    name: "EduSync Academy",
    address: "123 Education Street",
    city: "Learning City",
    state: "Knowledge State",
    zipCode: "12345",
    country: "United States",
    phone: "(555) 123-4567",
    email: "info@edusync.academy",
    website: "https://edusync.academy",
    principal: "Pat Principal",
    founded: "2010",
    slogan: "Empowering Minds, Shaping Futures"
  });
  
  const [classrooms, setClassrooms] = useState(mockClassrooms);
  const [academicYears, setAcademicYears] = useState(mockAcademicYears);
  const [terms, setTerms] = useState(mockTerms);
  
  const [isEditingSchoolInfo, setIsEditingSchoolInfo] = useState(false);
  const [editableSchoolInfo, setEditableSchoolInfo] = useState(schoolInfo);
  const [isAddingClassroom, setIsAddingClassroom] = useState(false);
  const [newClassroom, setNewClassroom] = useState({
    name: "",
    capacity: 30,
    building: "Main Building",
    floor: 1,
    features: []
  });
  
  const buildings = [...new Set(classrooms.map(c => c.building))];
  
  const handleUpdateSchoolInfo = () => {
    setSchoolInfo(editableSchoolInfo);
    setIsEditingSchoolInfo(false);
    toast({
      title: "School Information Updated",
      description: "School information has been updated successfully.",
    });
  };
  
  const handleAddClassroom = () => {
    if (!newClassroom.name) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Classroom name is required.",
      });
      return;
    }
    
    const updatedClassrooms = [
      ...classrooms,
      {
        id: (classrooms.length + 1).toString(),
        ...newClassroom,
        features: newClassroom.features || []
      }
    ];
    
    setClassrooms(updatedClassrooms);
    setIsAddingClassroom(false);
    setNewClassroom({
      name: "",
      capacity: 30,
      building: "Main Building",
      floor: 1,
      features: []
    });
    
    toast({
      title: "Classroom Added",
      description: `${newClassroom.name} has been added successfully.`,
    });
  };
  
  const handleDeleteClassroom = (id: string) => {
    const updatedClassrooms = classrooms.filter(classroom => classroom.id !== id);
    setClassrooms(updatedClassrooms);
    
    toast({
      title: "Classroom Deleted",
      description: "Classroom has been deleted successfully.",
    });
  };
  
  const handleAddAcademicYear = () => {
    // This would have a form to add a new academic year
    toast({
      title: "Feature Coming Soon",
      description: "Adding academic years will be available in a future update.",
    });
  };
  
  const handleAddTerm = () => {
    // This would have a form to add a new term
    toast({
      title: "Feature Coming Soon",
      description: "Adding terms will be available in a future update.",
    });
  };
  
  const handleSetCurrentAcademicYear = (id: string) => {
    const updatedAcademicYears = academicYears.map(year => ({
      ...year,
      current: year.id === id
    }));
    
    setAcademicYears(updatedAcademicYears);
    
    toast({
      title: "Current Academic Year Updated",
      description: `The current academic year has been updated.`,
    });
  };
  
  const handleSetCurrentTerm = (id: string) => {
    const updatedTerms = terms.map(term => ({
      ...term,
      current: term.id === id
    }));
    
    setTerms(updatedTerms);
    
    toast({
      title: "Current Term Updated",
      description: `The current term has been updated.`,
    });
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="School Management" />
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="mb-6">
            <TabsList className="w-full grid grid-cols-3 max-w-xl">
              <TabsTrigger value="info">
                <School className="h-4 w-4 mr-2" />
                School Info
              </TabsTrigger>
              <TabsTrigger value="classrooms">
                <Building className="h-4 w-4 mr-2" />
                Classrooms
              </TabsTrigger>
              <TabsTrigger value="academic">
                <Calendar className="h-4 w-4 mr-2" />
                Academic Calendar
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="info" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>School Information</CardTitle>
                  <CardDescription>
                    View and update basic school information
                  </CardDescription>
                </div>
                <Button 
                  variant={isEditingSchoolInfo ? "default" : "outline"}
                  onClick={() => setIsEditingSchoolInfo(!isEditingSchoolInfo)}
                >
                  {isEditingSchoolInfo ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </>
                  ) : (
                    <>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                {isEditingSchoolInfo ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="school-name">School Name</Label>
                          <Input 
                            id="school-name" 
                            value={editableSchoolInfo.name}
                            onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, name: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input 
                            id="address" 
                            value={editableSchoolInfo.address}
                            onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, address: e.target.value})}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input 
                              id="city" 
                              value={editableSchoolInfo.city}
                              onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, city: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input 
                              id="state" 
                              value={editableSchoolInfo.state}
                              onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, state: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="zip">Zip Code</Label>
                            <Input 
                              id="zip" 
                              value={editableSchoolInfo.zipCode}
                              onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, zipCode: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input 
                              id="country" 
                              value={editableSchoolInfo.country}
                              onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, country: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone" 
                            value={editableSchoolInfo.phone}
                            onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, phone: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email"
                            value={editableSchoolInfo.email}
                            onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, email: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input 
                            id="website" 
                            value={editableSchoolInfo.website}
                            onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, website: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="principal">Principal</Label>
                          <Input 
                            id="principal" 
                            value={editableSchoolInfo.principal}
                            onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, principal: e.target.value})}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="founded">Founded</Label>
                            <Input 
                              id="founded" 
                              value={editableSchoolInfo.founded}
                              onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, founded: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="slogan">School Slogan</Label>
                      <Input 
                        id="slogan" 
                        value={editableSchoolInfo.slogan}
                        onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, slogan: e.target.value})}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="space-x-2">
                        <Button variant="outline" onClick={() => {
                          setEditableSchoolInfo(schoolInfo);
                          setIsEditingSchoolInfo(false);
                        }}>
                          Cancel
                        </Button>
                        <Button onClick={handleUpdateSchoolInfo}>
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold">{schoolInfo.name}</h3>
                          <p className="text-sm text-muted-foreground italic">"{schoolInfo.slogan}"</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                            <div>
                              <p>{schoolInfo.address}</p>
                              <p>{schoolInfo.city}, {schoolInfo.state} {schoolInfo.zipCode}</p>
                              <p>{schoolInfo.country}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                          <p>{schoolInfo.phone}</p>
                        </div>
                        
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                          <p>{schoolInfo.email}</p>
                        </div>
                        
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 mr-2 text-muted-foreground" />
                          <p>{schoolInfo.website}</p>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <p className="flex items-center">
                            <span className="font-medium mr-2">Principal:</span> {schoolInfo.principal}
                          </p>
                          <p className="flex items-center">
                            <span className="font-medium mr-2">Founded:</span> {schoolInfo.founded}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classrooms" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Classrooms & Facilities</CardTitle>
                  <CardDescription>
                    Manage all classrooms and facilities in the school
                  </CardDescription>
                </div>
                <Dialog open={isAddingClassroom} onOpenChange={setIsAddingClassroom}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Classroom
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Classroom</DialogTitle>
                      <DialogDescription>
                        Enter the details for the new classroom or facility.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="room-name">Room Name</Label>
                        <Input 
                          id="room-name" 
                          placeholder="e.g., Room 101"
                          value={newClassroom.name}
                          onChange={(e) => setNewClassroom({...newClassroom, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="building">Building</Label>
                          <Select 
                            value={newClassroom.building}
                            onValueChange={(value) => setNewClassroom({...newClassroom, building: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select building" />
                            </SelectTrigger>
                            <SelectContent>
                              {buildings.map((building) => (
                                <SelectItem key={building} value={building}>
                                  {building}
                                </SelectItem>
                              ))}
                              <SelectItem value="New Building">New Building</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="floor">Floor</Label>
                          <Input 
                            id="floor" 
                            type="number" 
                            min={0}
                            value={newClassroom.floor}
                            onChange={(e) => setNewClassroom({...newClassroom, floor: parseInt(e.target.value)})}
                          />
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="capacity">Capacity (seats)</Label>
                        <Input 
                          id="capacity" 
                          type="number" 
                          min={1}
                          value={newClassroom.capacity}
                          onChange={(e) => setNewClassroom({...newClassroom, capacity: parseInt(e.target.value)})}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="features">Features (comma separated)</Label>
                        <Input 
                          id="features" 
                          placeholder="e.g., Projector, Whiteboard, Computers"
                          onChange={(e) => setNewClassroom({
                            ...newClassroom, 
                            features: e.target.value.split(',').map(f => f.trim()).filter(f => f)
                          })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddingClassroom(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddClassroom}>
                        Add Classroom
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Building</TableHead>
                      <TableHead>Floor</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Features</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classrooms.map((classroom) => (
                      <TableRow key={classroom.id}>
                        <TableCell className="font-medium">{classroom.name}</TableCell>
                        <TableCell>{classroom.building}</TableCell>
                        <TableCell>{classroom.floor}</TableCell>
                        <TableCell>{classroom.capacity} seats</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {classroom.features.map((feature, index) => (
                              <span 
                                key={index} 
                                className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
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
                                  title: "Edit Classroom",
                                  description: `Editing ${classroom.name}`,
                                });
                              }}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                toast({
                                  title: "View Schedule",
                                  description: `Viewing schedule for ${classroom.name}`,
                                });
                              }}>
                                <Calendar className="h-4 w-4 mr-2" />
                                View Schedule
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteClassroom(classroom.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Academic Years</CardTitle>
                    <CardDescription>
                      Configure academic years for the school
                    </CardDescription>
                  </div>
                  <Button onClick={handleAddAcademicYear}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Year
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {academicYears.map((year) => (
                        <TableRow key={year.id}>
                          <TableCell className="font-medium">{year.name}</TableCell>
                          <TableCell>{year.start}</TableCell>
                          <TableCell>{year.end}</TableCell>
                          <TableCell className="text-right">
                            {year.current ? (
                              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                Current
                              </span>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSetCurrentAcademicYear(year.id)}
                              >
                                Set as Current
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Terms</CardTitle>
                    <CardDescription>
                      Configure terms within academic years
                    </CardDescription>
                  </div>
                  <Button onClick={handleAddTerm}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Term
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Academic Year</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {terms.map((term) => (
                        <TableRow key={term.id}>
                          <TableCell className="font-medium">{term.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{term.start} to {term.end}</span>
                            </div>
                          </TableCell>
                          <TableCell>{term.academicYear}</TableCell>
                          <TableCell className="text-right">
                            {term.current ? (
                              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                Current
                              </span>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSetCurrentTerm(term.id)}
                              >
                                Set as Current
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SchoolManagement;
