import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
  UserPlus,
  Filter,
  CalendarClock,
  GraduationCap,
  MoreHorizontal,
  Eye,
  Pencil,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone
} from "lucide-react";
import { AdmissionApplication } from "@/types/dashboard";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

// Mock admission applications
const mockApplications: AdmissionApplication[] = [
  {
    id: "1",
    studentName: "Emma Johnson",
    parentName: "Michael Johnson",
    email: "mjohnson@example.com",
    phone: "(555) 123-4567",
    grade: "9",
    status: "pending",
    submittedAt: "2023-05-10"
  },
  {
    id: "2",
    studentName: "Noah Smith",
    parentName: "Jennifer Smith",
    email: "jsmith@example.com",
    phone: "(555) 234-5678",
    grade: "6",
    status: "approved",
    submittedAt: "2023-05-05"
  },
  {
    id: "3",
    studentName: "Olivia Williams",
    parentName: "Robert Williams",
    email: "rwilliams@example.com",
    phone: "(555) 345-6789",
    grade: "10",
    status: "rejected",
    submittedAt: "2023-05-02"
  },
  {
    id: "4",
    studentName: "Liam Brown",
    parentName: "Sarah Brown",
    email: "sbrown@example.com",
    phone: "(555) 456-7890",
    grade: "7",
    status: "pending",
    submittedAt: "2023-05-08"
  },
  {
    id: "5",
    studentName: "Ava Jones",
    parentName: "David Jones",
    email: "djones@example.com",
    phone: "(555) 567-8901",
    grade: "11",
    status: "pending",
    submittedAt: "2023-05-12"
  },
  {
    id: "6",
    studentName: "William Miller",
    parentName: "Elizabeth Miller",
    email: "emiller@example.com",
    phone: "(555) 678-9012",
    grade: "8",
    status: "approved",
    submittedAt: "2023-04-25"
  },
  {
    id: "7",
    studentName: "Sophia Davis",
    parentName: "Thomas Davis",
    email: "tdavis@example.com",
    phone: "(555) 789-0123",
    grade: "9",
    status: "approved",
    submittedAt: "2023-04-30"
  },
  {
    id: "8",
    studentName: "James Garcia",
    parentName: "Patricia Garcia",
    email: "pgarcia@example.com",
    phone: "(555) 890-1234",
    grade: "10",
    status: "rejected",
    submittedAt: "2023-05-01"
  }
];

const Admissions = () => {
  const [applications, setApplications] = useState<AdmissionApplication[]>(mockApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [gradeFilter, setGradeFilter] = useState<string | null>(null);
  const [isAddingApplication, setIsAddingApplication] = useState(false);
  const [newApplication, setNewApplication] = useState<Omit<AdmissionApplication, "id" | "submittedAt" | "status">>({
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
    grade: ""
  });
  const [selectedApplication, setSelectedApplication] = useState<AdmissionApplication | null>(null);
  const [isViewingApplication, setIsViewingApplication] = useState(false);

  // Filter applications based on search, status, and grade
  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? app.status === statusFilter : true;
    const matchesGrade = gradeFilter ? app.grade === gradeFilter : true;
    return matchesSearch && matchesStatus && matchesGrade;
  });

  // Calculate statistics
  const totalApplications = applications.length;
  const pendingApplications = applications.filter(app => app.status === "pending").length;
  const approvedApplications = applications.filter(app => app.status === "approved").length;
  const rejectedApplications = applications.filter(app => app.status === "rejected").length;

  // Add new application handler
  const handleAddApplication = () => {
    if (!newApplication.studentName || !newApplication.parentName || !newApplication.email || !newApplication.grade) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const updatedApplications: AdmissionApplication[] = [
      ...applications,
      {
        id: (applications.length + 1).toString(),
        ...newApplication,
        status: "pending",
        submittedAt: today
      }
    ];

    setApplications(updatedApplications);
    setIsAddingApplication(false);
    setNewApplication({
      studentName: "",
      parentName: "",
      email: "",
      phone: "",
      grade: ""
    });

    toast({
      title: "Application Submitted",
      description: `Application for ${newApplication.studentName} has been submitted.`,
    });
  };

  // View application handler
  const handleViewApplication = (id: string) => {
    const application = applications.find(app => app.id === id);
    if (application) {
      setSelectedApplication(application);
      setIsViewingApplication(true);
    }
  };

  // Update application status handler
  const handleUpdateStatus = (id: string, status: 'pending' | 'approved' | 'rejected') => {
    const updatedApplications = applications.map(app =>
      app.id === id ? { ...app, status } : app
    );

    setApplications(updatedApplications);

    const statusVerb = status === 'approved' ? 'approved' : status === 'rejected' ? 'rejected' : 'pending review';
    const application = applications.find(app => app.id === id);

    toast({
      title: `Application ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      description: `${application?.studentName}'s application has been ${statusVerb}.`,
    });

    setIsViewingApplication(false);
  };

  // Available grades
  const grades = ["6", "7", "8", "9", "10", "11", "12"];

  return (
    <DashboardLayout>
      <DashboardHeader title="Admissions" />
      <div className={cn("flex-1 overflow-auto dashboard-content p-6")}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalApplications}</div>
              <p className="text-xs text-muted-foreground mt-1">
                All time
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingApplications}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Awaiting decision
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Approved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedApplications}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Ready for enrollment
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Rejected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rejectedApplications}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Not accepted
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Admission Applications</CardTitle>
                <CardDescription>Review and process student admission requests</CardDescription>
              </div>
              <Dialog open={isAddingApplication} onOpenChange={setIsAddingApplication}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    New Application
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>New Admission Application</DialogTitle>
                    <DialogDescription>
                      Enter student and parent information for a new admission application.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="student-name">Student Name*</Label>
                        <Input
                          id="student-name"
                          placeholder="Full name of student"
                          value={newApplication.studentName}
                          onChange={(e) => setNewApplication({ ...newApplication, studentName: e.target.value })}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="parent-name">Parent/Guardian Name*</Label>
                        <Input
                          id="parent-name"
                          placeholder="Full name of parent/guardian"
                          value={newApplication.parentName}
                          onChange={(e) => setNewApplication({ ...newApplication, parentName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email Address*</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Contact email"
                          value={newApplication.email}
                          onChange={(e) => setNewApplication({ ...newApplication, email: e.target.value })}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="Contact phone number"
                          value={newApplication.phone}
                          onChange={(e) => setNewApplication({ ...newApplication, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="grade">Grade Applying For*</Label>
                      <Select
                        onValueChange={(value) => setNewApplication({ ...newApplication, grade: value })}
                      >
                        <SelectTrigger id="grade">
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {grades.map((grade) => (
                            <SelectItem key={grade} value={grade}>
                              Grade {grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any additional information about the applicant"
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddingApplication(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddApplication}>
                      Submit Application
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="mb-4">
              <TabsList>
                <TabsTrigger value="all">All Applications</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="mb-4 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="sm:w-[180px]">
                <Select
                  onValueChange={(value) => setGradeFilter(value === "all" ? null : value)}
                  defaultValue="all"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        Grade {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Parent/Guardian</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.studentName}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Grade {app.grade}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{app.parentName}</div>
                        <div className="text-sm text-muted-foreground">{app.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarClock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{app.submittedAt}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {app.status === "pending" ? (
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          Pending
                        </Badge>
                      ) : app.status === "approved" ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                          <CheckCircle className="h-3.5 w-3.5 mr-1" />
                          Approved
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                          <XCircle className="h-3.5 w-3.5 mr-1" />
                          Rejected
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
                          <DropdownMenuItem onClick={() => handleViewApplication(app.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            toast({
                              title: "Email Sent",
                              description: `Email sent to ${app.parentName} regarding ${app.studentName}'s application.`,
                            });
                          }}>
                            <Mail className="h-4 w-4 mr-2" />
                            Contact Parent
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(app.id, "approved")}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(app.id, "rejected")}>
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredApplications.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No applications found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog
          open={isViewingApplication}
          onOpenChange={(open) => {
            setIsViewingApplication(open);
            if (!open) setSelectedApplication(null);
          }}
        >
          {selectedApplication && (
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Application Details</DialogTitle>
                <DialogDescription>
                  Review application information and make a decision
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Student Name</h3>
                    <p className="text-base">{selectedApplication.studentName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Applying for</h3>
                    <p className="text-base">Grade {selectedApplication.grade}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Parent/Guardian</h3>
                    <p className="text-base">{selectedApplication.parentName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Submitted On</h3>
                    <p className="text-base">{selectedApplication.submittedAt}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Email Address</h3>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="text-base">{selectedApplication.email}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone Number</h3>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="text-base">{selectedApplication.phone}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Current Status</h3>
                  {selectedApplication.status === "pending" ? (
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      Pending
                    </Badge>
                  ) : selectedApplication.status === "approved" ? (
                    <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      Approved
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                      <XCircle className="h-3.5 w-3.5 mr-1" />
                      Rejected
                    </Badge>
                  )}
                </div>

                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium mb-2">Application Notes</h3>
                  <p className="text-muted-foreground text-sm">
                    No additional notes were provided with this application.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <div className="flex space-x-2">
                  <Button
                    variant="destructive"
                    onClick={() => handleUpdateStatus(selectedApplication.id, "rejected")}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsViewingApplication(false)}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => handleUpdateStatus(selectedApplication.id, "approved")}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </DashboardLayout >
  );
};

export default Admissions;
