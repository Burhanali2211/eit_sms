
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Search, Phone, Mail, Filter, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock staff data
const mockStaffData = [
  {
    id: "1",
    name: "Taylor Smith",
    role: "Mathematics Teacher",
    department: "Mathematics",
    email: "taylor@edusync.com",
    phone: "555-123-4567",
    joinDate: "2018-08-15",
    status: "active",
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: "2",
    name: "Alex Johnson",
    role: "English Teacher",
    department: "English",
    email: "alex@edusync.com",
    phone: "555-234-5678",
    joinDate: "2019-07-20",
    status: "active",
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: "3",
    name: "Jamie Williams",
    role: "Science Teacher",
    department: "Science",
    email: "jamie@edusync.com",
    phone: "555-345-6789",
    joinDate: "2017-09-10",
    status: "active",
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: "4",
    name: "Casey Brown",
    role: "History Teacher",
    department: "Social Studies",
    email: "casey@edusync.com",
    phone: "555-456-7890",
    joinDate: "2020-01-15",
    status: "leave",
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: "5",
    name: "Morgan Davis",
    role: "Art Teacher",
    department: "Arts",
    email: "morgan@edusync.com",
    phone: "555-567-8901",
    joinDate: "2021-03-05",
    status: "active",
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: "6",
    name: "Riley Miller",
    role: "Physical Education Teacher",
    department: "Physical Education",
    email: "riley@edusync.com",
    phone: "555-678-9012",
    joinDate: "2019-11-20",
    status: "active",
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: "7",
    name: "Jordan Wilson",
    role: "Librarian",
    department: "Library",
    email: "jordan@edusync.com",
    phone: "555-789-0123",
    joinDate: "2020-06-12",
    status: "active",
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: "8",
    name: "Sam Moore",
    role: "Computer Science Teacher",
    department: "Technology",
    email: "sam@edusync.com",
    phone: "555-890-1234",
    joinDate: "2018-12-01",
    status: "inactive",
    avatar: "https://github.com/shadcn.png"
  }
];

const Staff = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const departments = [...new Set(mockStaffData.map(staff => staff.department))];
  
  const filteredStaff = mockStaffData.filter(staff => {
    // Apply search filter
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         staff.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply department filter
    const matchesDepartment = departmentFilter === "all" || staff.department === departmentFilter;
    
    // Apply status filter
    const matchesStatus = statusFilter === "all" || staff.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });
  
  return (
    <DashboardLayout>
      <DashboardHeader title="Staff Management" />
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-1 md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search staff..."
                    className="pl-8 bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Select 
                  value={departmentFilter} 
                  onValueChange={setDepartmentFilter}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((department) => (
                      <SelectItem key={department} value={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select 
                  value={statusFilter} 
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredStaff.map((staff) => (
            <Card key={staff.id} className="overflow-hidden">
              <div className="h-2 bg-school-primary" />
              <CardContent className="pt-6">
                <div className="flex flex-col items-center mb-4">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={staff.avatar} />
                    <AvatarFallback>{staff.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold">{staff.name}</h3>
                  <p className="text-sm text-muted-foreground">{staff.role}</p>
                  <Badge 
                    variant={
                      staff.status === "active" ? "default" : 
                      staff.status === "leave" ? "outline" : "secondary"
                    }
                    className="mt-2"
                  >
                    {staff.status === "active" ? "Active" : 
                     staff.status === "leave" ? "On Leave" : "Inactive"}
                  </Badge>
                </div>
                
                <div className="space-y-2 mt-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{staff.department}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{staff.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{staff.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Joined: {new Date(staff.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex justify-center mt-6">
                  <Button variant="outline" size="sm">View Profile</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Staff;
